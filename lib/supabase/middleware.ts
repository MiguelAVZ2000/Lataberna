import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

type CookieItem = { name: string; value: string; options: CookieOptions }

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  // Cliente Supabase que INYECTA cookies en la respuesta
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet: CookieItem[]) {
          cookiesToSet.forEach(({ name, value }: CookieItem) =>
            request.cookies.set(name, value)
          )
          
          supabaseResponse = NextResponse.next({
            request,
          })
          
          cookiesToSet.forEach(({ name, value, options }: CookieItem) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // IMPORTANTE: Refresca el token de autenticación
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const pathname = request.nextUrl.pathname;

  // Rutas protegidas que requieren autenticación
  const protectedRoutes = ['/perfil', '/mis-personajes', '/personaje'];
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

  // Protección de Rutas: Si no hay usuario y trata de entrar a rutas protegidas
  if (!user && isProtectedRoute) {
    // Log de intento de acceso no autorizado
    if (process.env.NODE_ENV === 'production') {
      const ip = request.headers.get('x-forwarded-for') || 'unknown';
      console.log(JSON.stringify({
        timestamp: new Date().toISOString(),
        event: 'UNAUTHORIZED_ACCESS',
        ip,
        path: pathname,
        severity: 'medium',
      }));
    }

    const url = request.nextUrl.clone()
    url.pathname = '/login'
    // Preservar la URL original para redirección después del login
    url.searchParams.set('redirect', pathname)
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}

