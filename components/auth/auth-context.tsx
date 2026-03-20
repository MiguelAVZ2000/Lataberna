"use client"

import { createContext, useContext, useEffect, useState, useCallback } from "react"
import { supabase } from "@/lib/supabase"
import { User } from "@supabase/supabase-js"

interface AuthContextType {
  user: User | null
  loading: boolean
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

/**
 * Proveedor de autenticación global.
 * 
 * IMPORTANTE: Incluye timeout de seguridad (3 segundos).
 * Si Supabase no responde, loading=false igualmente para
 * que el UI no se quede en estado de carga infinita.
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    // Timeout de seguridad: si Supabase no responde en 1.5s,
    // asumir no autenticado y mostrar UI igualmente
    const timeoutId = setTimeout(() => {
      if (mounted) {
        setLoading(false)
      }
    }, 1500)

    // Intentar obtener sesión
    supabase.auth.getSession()
      .then(({ data: { session } }) => {
        if (mounted) {
          setUser(session?.user ?? null)
          setLoading(false)
          clearTimeout(timeoutId)
        }
      })
      .catch(() => {
        // Si falla (red, URL inválida, etc), mostrar UI igualmente
        if (mounted) {
          setLoading(false)
          clearTimeout(timeoutId)
        }
      })

    // Suscribirse a cambios de auth
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (mounted) {
          setUser(session?.user ?? null)
          setLoading(false)
        }
      }
    )

    return () => {
      mounted = false
      clearTimeout(timeoutId)
      subscription.unsubscribe()
    }
  }, [])

  const signOut = useCallback(async () => {
    await supabase.auth.signOut()
    window.location.href = "/"
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
