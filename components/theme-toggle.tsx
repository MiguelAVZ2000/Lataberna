"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"

/**
 * ThemeToggle para el header desktop.
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button
        className="flex items-center justify-center h-9 w-9 text-white/60 hover:text-white hover:bg-white/10 transition-colors"
        aria-label="Cambiar tema"
      >
        <Sun className="h-5 w-5" />
      </button>
    )
  }

  const isDark = resolvedTheme === "dark"

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="flex items-center justify-center h-9 w-9 text-white/60 hover:text-white hover:bg-white/10 transition-colors"
      aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
    >
      {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  )
}

/**
 * ThemeToggle para el menú móvil (Sheet).
 */
export function ThemeToggleMobile({ onToggle }: { onToggle?: () => void }) {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button className="flex items-center gap-3 px-4 py-4 text-[11px] font-bold uppercase tracking-widest text-white/50 hover:text-white hover:bg-white/5 transition-all text-left">
        <Moon className="h-4 w-4" />
        Tema
      </button>
    )
  }

  const isDark = resolvedTheme === "dark"

  return (
    <button
      onClick={() => {
        setTheme(isDark ? "light" : "dark")
        onToggle?.()
      }}
      className="flex items-center gap-3 px-4 py-4 text-[11px] font-bold uppercase tracking-widest text-white/50 hover:text-white hover:bg-white/5 transition-all text-left w-full"
    >
      {isDark ? (
        <>
          <Sun className="h-4 w-4 text-[var(--color-accent-gold)]" />
          Modo Claro
        </>
      ) : (
        <>
          <Moon className="h-4 w-4" />
          Modo Oscuro
        </>
      )}
    </button>
  )
}
