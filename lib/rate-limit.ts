/**
 * Utilidades de rate limiting para prevenir ataques de fuerza bruta.
 * 
 * Estrategia dual:
 * - Producción (Vercel): Upstash Redis → compartido entre todas las funciones serverless
 * - Desarrollo local: In-memory Map → sin dependencias externas
 * 
 * La detección es automática: si existen las variables de entorno UPSTASH,
 * se usa Redis. Si no, fallback a memoria.
 */

import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

// --- Configuración ---

export interface RateLimitConfig {
  maxAttempts: number;
  windowSeconds: number;
  errorMessage?: string;
}

export interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetTime: number;
  errorMessage?: string;
}

/**
 * Configuraciones predefinidas para diferentes escenarios
 */
export const RATE_LIMIT_CONFIGS = {
  LOGIN: {
    maxAttempts: 5,
    windowSeconds: 900,
    errorMessage: 'Demasiados intentos de inicio de sesión. Intenta nuevamente en 15 minutos.',
  },
  REGISTER: {
    maxAttempts: 3,
    windowSeconds: 3600,
    errorMessage: 'Demasiados intentos de registro. Intenta nuevamente en una hora.',
  },
  API: {
    maxAttempts: 100,
    windowSeconds: 60,
    errorMessage: 'Demasiadas solicitudes. Intenta nuevamente en un minuto.',
  },
  CHARACTER_CREATION: {
    maxAttempts: 10,
    windowSeconds: 3600,
    errorMessage: 'Has creado demasiados personajes. Intenta nuevamente en una hora.',
  },
  PDF_GENERATION: {
    maxAttempts: 5,
    windowSeconds: 600,
    errorMessage: 'Demasiadas generaciones de PDF. Intenta nuevamente en 10 minutos.',
  },
  CHECKOUT: {
    maxAttempts: 3,
    windowSeconds: 300,
    errorMessage: 'Demasiados intentos de compra. Intenta nuevamente en 5 minutos.',
  },
} as const;

// --- Backend: Upstash Redis ---

const hasUpstash = !!(
  process.env.UPSTASH_REDIS_REST_URL && 
  process.env.UPSTASH_REDIS_REST_TOKEN
)

let redis: Redis | null = null
let ratelimiters: Map<string, Ratelimit> | null = null

if (hasUpstash) {
  redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
  })

  // Crear instancias de Ratelimit pre-configuradas para cada tipo
  ratelimiters = new Map()
  for (const [name, config] of Object.entries(RATE_LIMIT_CONFIGS)) {
    ratelimiters.set(name, new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(config.maxAttempts, `${config.windowSeconds}s`),
      analytics: true,
      prefix: `lataberna:rl:${name.toLowerCase()}`,
    }))
  }
}

// --- Backend: In-memory (desarrollo) ---

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

function checkRateLimitMemory(
  key: string,
  config: RateLimitConfig
): RateLimitResult {
  const now = Date.now();
  const entry = rateLimitStore.get(key);
  
  if (!entry || now > entry.resetTime) {
    const resetTime = now + config.windowSeconds * 1000;
    rateLimitStore.set(key, { count: 1, resetTime });
    return { success: true, remaining: config.maxAttempts - 1, resetTime };
  }
  
  if (entry.count >= config.maxAttempts) {
    return {
      success: false,
      remaining: 0,
      resetTime: entry.resetTime,
      errorMessage: config.errorMessage || 'Demasiadas solicitudes. Intenta más tarde.',
    };
  }
  
  entry.count++;
  rateLimitStore.set(key, entry);
  
  return {
    success: true,
    remaining: config.maxAttempts - entry.count,
    resetTime: entry.resetTime,
  };
}

// --- API Pública ---

/**
 * Verifica si una clave ha excedido el límite de tasa.
 * Usa Upstash Redis en producción, memoria en desarrollo.
 * 
 * @param key - Identificador único (ej: IP, user ID, email)
 * @param configOrName - Configuración de rate limiting o nombre del preset
 * @returns Resultado de la verificación
 */
export async function checkRateLimit(
  key: string,
  configOrName: RateLimitConfig | keyof typeof RATE_LIMIT_CONFIGS
): Promise<RateLimitResult> {
  const config: RateLimitConfig = typeof configOrName === 'string'
    ? RATE_LIMIT_CONFIGS[configOrName]
    : configOrName;

  // Upstash Redis (producción)
  if (hasUpstash && ratelimiters) {
    const presetName = typeof configOrName === 'string' ? configOrName : 'API'
    const limiter = ratelimiters.get(presetName) || ratelimiters.get('API')!
    
    const result = await limiter.limit(key)
    
    return {
      success: result.success,
      remaining: result.remaining,
      resetTime: result.reset,
      errorMessage: result.success ? undefined : config.errorMessage,
    }
  }

  // In-memory (desarrollo)
  return checkRateLimitMemory(key, config);
}

/**
 * Obtiene la IP del cliente desde los headers de la request.
 * Maneja proxies y CDNs correctamente.
 */
export function getClientIP(headers: Headers): string {
  // Vercel y Cloudflare
  const forwardedFor = headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }
  
  // Cloudflare
  const cfConnectingIP = headers.get('cf-connecting-ip');
  if (cfConnectingIP) {
    return cfConnectingIP;
  }
  
  // Nginx
  const realIP = headers.get('x-real-ip');
  if (realIP) {
    return realIP;
  }
  
  return 'unknown';
}

/**
 * Crea una clave única para rate limiting basada en múltiples factores.
 */
export function createRateLimitKey(
  identifier: string,
  action: string
): string {
  return `ratelimit:${action}:${identifier}`;
}

// --- Mantenimiento (solo in-memory) ---

function cleanupExpiredEntries(): void {
  const now = Date.now();
  for (const [key, entry] of rateLimitStore.entries()) {
    if (now > entry.resetTime) {
      rateLimitStore.delete(key);
    }
  }
}

// Limpieza periódica solo en memoria (no aplica a Upstash, TTL automático)
if (!hasUpstash && typeof setInterval !== 'undefined') {
  setInterval(cleanupExpiredEntries, 10 * 60 * 1000);
}

/**
 * Verifica si el rate limiting está configurado con Upstash Redis.
 * Útil para logging y debugging.
 */
export function isUsingRedis(): boolean {
  return hasUpstash;
}
