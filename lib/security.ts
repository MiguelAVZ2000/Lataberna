/**
 * Utilidades de validación y sanitización de entrada.
 * Previene inyecciones y valida datos del usuario.
 */

/**
 * Sanitiza una cadena de texto eliminando caracteres peligrosos
 * para prevenir XSS y inyecciones.
 */
export function sanitizeString(input: string): string {
  if (!input) return '';
  
  return input
    .trim()
    .replace(/[<>]/g, '') // Eliminar etiquetas HTML básicas
    .replace(/javascript:/gi, '') // Eliminar protocolo javascript:
    .replace(/on\w+=/gi, ''); // Eliminar manejadores de eventos inline
}

/**
 * Valida que un email tenga formato correcto.
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Valida que un número de teléfono sea válido.
 */
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^(\+\d{1,3})?[\s-]?\d{2,4}[\s-]?\d{4}[\s-]?\d{4}$/;
  return phoneRegex.test(phone);
}

/**
 * Valida que una cantidad sea un número positivo válido.
 */
export function isValidQuantity(quantity: number): boolean {
  return Number.isInteger(quantity) && quantity > 0 && quantity <= 999;
}

/**
 * Valida que un precio sea válido (positivo y con máximo 2 decimales).
 */
export function isValidPrice(price: number): boolean {
  return price > 0 && Number.isFinite(price) && /^\d+(\.\d{1,2})?$/.test(price.toString());
}

/**
 * Sanitiza un objeto eliminando propiedades peligrosas o no permitidas.
 */
export function sanitizeObject<T extends Record<string, unknown>>(
  obj: T,
  allowedKeys: (keyof T)[]
): Partial<T> {
  const sanitized: Partial<T> = {};
  
  allowedKeys.forEach((key) => {
    if (key in obj) {
      const value = obj[key];
      
      if (typeof value === 'string') {
        sanitized[key] = sanitizeString(value) as T[keyof T];
      } else {
        sanitized[key] = value;
      }
    }
  });
  
  return sanitized;
}

/**
 * Valida que un UUID tenga formato correcto.
 */
export function isValidUUID(uuid: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
}

/**
 * Previene inyección SQL básica verificando caracteres peligrosos.
 * Nota: Esto es una capa adicional. SIEMPRE usa prepared statements o ORMs.
 */
export function containsSQLInjection(input: string): boolean {
  const dangerousPatterns = [
    /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|EXECUTE)\b)/gi,
    /(--|;|\/\*|\*\/|xp_|sp_)/gi,
    /('|"|`)(.*?)(\1)/gi, // Comillas sospechosas
  ];
  
  return dangerousPatterns.some(pattern => pattern.test(input));
}

/**
 * Limita la longitud de una cadena para prevenir ataques de denegación de servicio.
 */
export function limitStringLength(input: string, maxLength: number = 1000): string {
  return input.slice(0, maxLength);
}

/**
 * Valida que una URL sea segura (solo http/https).
 */
export function isValidURL(url: string): boolean {
  try {
    const parsed = new URL(url);
    return ['http:', 'https:'].includes(parsed.protocol);
  } catch {
    return false;
  }
}

/**
 * Codifica HTML para prevenir XSS.
 */
export function escapeHTML(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  };
  
  return text.replace(/[&<>"'/]/g, (char) => map[char]);
}

/**
 * Valida que un nombre de personaje sea válido (para D&D).
 */
export function isValidCharacterName(name: string): boolean {
  // Permitir letras, espacios, apóstrofes y guiones
  const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s'-]{2,50}$/;
  return nameRegex.test(name);
}

/**
 * Valida que un nivel de personaje sea válido (1-20 para D&D 5e).
 */
export function isValidCharacterLevel(level: number): boolean {
  return Number.isInteger(level) && level >= 1 && level <= 20;
}

/**
 * Valida que una puntuación de habilidad sea válida (1-30 para D&D 5e).
 */
export function isValidAbilityScore(score: number): boolean {
  return Number.isInteger(score) && score >= 1 && score <= 30;
}
