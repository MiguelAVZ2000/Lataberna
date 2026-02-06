import { createBrowserClient } from '@supabase/ssr'

/**
 * Cliente singleton de Supabase configurado para interactuar con la base de datos (Client Side).
 * Utiliza variables de entorno para la URL y la clave anónima.
 */

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

const isPlaceholder = !supabaseUrl || supabaseUrl.includes('placeholder')

// Mostrar un aviso crítico en la consola si las variables faltan
if (isPlaceholder) {
  if (typeof window !== 'undefined') {
    console.error('ERROR DE CONFIGURACION:', 'color: white; background: red; font-weight: bold; padding: 4px;', 'Faltan las variables de entorno de Supabase.')
    console.warn('Para solucionar esto:\n1. Ve a Vercel > Settings > Environment Variables\n2. Añade NEXT_PUBLIC_SUPABASE_URL\n3. Añade NEXT_PUBLIC_SUPABASE_ANON_KEY\n4. Haz un "Redeploy"')
  }
}

export const supabase = createBrowserClient(
  supabaseUrl || 'https://placeholder.supabase.co', 
  supabaseAnonKey || 'placeholder'
)
