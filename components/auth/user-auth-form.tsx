"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { supabase } from "@/lib/supabase"
import { cn } from "@/lib/utils"

import { Eye, EyeOff, ShieldAlert } from "lucide-react"

const authSchema = z.object({
  email: z.string().email({
    message: "Introduce un correo electrónico válido.",
  }),
  username: z.string().min(3, "El nombre de guerrero debe tener al menos 3 caracteres").optional(),
  password: z.string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .regex(/[A-Z]/, "Debe contener al menos una mayúscula")
    .regex(/[0-9]/, "Debe contener al menos un número")
    .regex(/[^A-Za-z0-9]/, "Debe contener al menos un carácter especial"),
  confirmPassword: z.string().optional(),
  honeypot: z.string().max(0).optional(), // Si se llena, es un bot
}).refine((data) => {
    // Solo validar confirmación en modo registro (esto se maneja en el componente)
    return true
}, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
})

type FormData = z.infer<typeof authSchema>

interface UserAuthFormProps {
  mode: "login" | "register"
}

export function UserAuthForm({ mode }: UserAuthFormProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const returnUrl = searchParams.get("returnUrl")
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [showPassword, setShowPassword] = React.useState<boolean>(false)

  const form = useForm<FormData>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      honeypot: "",
    },
  })

  async function onSubmit(data: FormData) {
    if (data.honeypot) return // Bot detectado
    
    if (mode === "register" && data.password !== data.confirmPassword) {
        form.setError("confirmPassword", { message: "Las contraseñas deben coincidir" })
        return
    }

    setIsLoading(true)

    try {
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({
          email: data.email,
          password: data.password,
        })
        if (error) {
            // Error genérico para evitar enumeración de cuentas
            if (error.message.includes("Invalid login credentials")) {
                throw new Error("Credenciales inválidas. Revisa tu correo o contraseña.")
            }
            throw error
        }
        toast.success("¡Bienvenido aventurero!", {
          description: "Puertas de la Taberna abiertas.",
        })
      } else {
        const { error } = await supabase.auth.signUp({
          email: data.email,
          password: data.password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
            data: {
                username: data.username
            }
          }
        })
        if (error) throw error
        toast.success("¡Contrato firmado!", {
          description: "Verifica tu correo para activar tu cuenta.",
        })
      }
      
      router.push(returnUrl || "/")
      router.refresh()
    } catch (error: any) {
      toast.error("Fallo de Seguridad o Acceso", {
        description: error.message,
        icon: <ShieldAlert className="h-4 w-4 text-red-500" />
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="grid gap-8">
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-6">
          {/* Honeypot Field - Invisible para humanos */}
          <div className="hidden" aria-hidden="true">
            <Input {...form.register("honeypot")} tabIndex={-1} autoComplete="off" />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email" className="text-[10px] font-bold uppercase tracking-widest text-[#242528]/40">
              Correo electrónico
            </Label>
            <Input
              id="email"
              placeholder="tu@taberna.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              className="rounded-none border-[#E1E1E1] focus-visible:ring-[#EE8600] h-12"
              {...form.register("email")}
            />
            {form.formState.errors.email && (
              <p className="text-xs text-red-500 font-bold mt-1 uppercase tracking-tight">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>

          {mode === "register" && (
            <div className="grid gap-2">
                <Label htmlFor="username" className="text-[10px] font-bold uppercase tracking-widest text-[#242528]/40">
                Nombre de Guerrero (Username)
                </Label>
                <Input
                    id="username"
                    placeholder="Aragorn64"
                    type="text"
                    disabled={isLoading}
                    className="rounded-none border-[#E1E1E1] focus-visible:ring-[#EE8600] h-12"
                    {...form.register("username")}
                />
                {form.formState.errors.username && (
                <p className="text-xs text-red-500 font-bold mt-1 uppercase tracking-tight">
                    {form.formState.errors.username.message}
                </p>
                )}
            </div>
          )}

          <div className="grid gap-2">
            <Label htmlFor="password" className="text-[10px] font-bold uppercase tracking-widest text-[#242528]/40">
              Contraseña
            </Label>
            <div className="relative">
                <Input
                id="password"
                placeholder="••••••••"
                type={showPassword ? "text" : "password"}
                autoCapitalize="none"
                autoComplete={mode === "login" ? "current-password" : "new-password"}
                disabled={isLoading}
                className="rounded-none border-[#E1E1E1] focus-visible:ring-[#EE8600] h-12 pr-10"
                {...form.register("password")}
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#EE8600]"
                >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
            </div>
            {form.formState.errors.password && (
              <p className="text-xs text-red-500 font-bold mt-1 uppercase tracking-tight">
                {form.formState.errors.password.message}
              </p>
            )}
          </div>

          {mode === "register" && (
            <div className="grid gap-2">
                <Label htmlFor="confirmPassword" className="text-[10px] font-bold uppercase tracking-widest text-[#242528]/40">
                Confirmar Contraseña
                </Label>
                <Input
                    id="confirmPassword"
                    placeholder="••••••••"
                    type={showPassword ? "text" : "password"}
                    autoCapitalize="none"
                    autoComplete="new-password"
                    disabled={isLoading}
                    className="rounded-none border-[#E1E1E1] focus-visible:ring-[#EE8600] h-12"
                    {...form.register("confirmPassword")}
                />
                {form.formState.errors.confirmPassword && (
                <p className="text-xs text-red-500 font-bold mt-1 uppercase tracking-tight">
                    {form.formState.errors.confirmPassword.message}
                </p>
                )}
            </div>
          )}

          <Button disabled={isLoading} className="h-14 bg-[#242528] hover:bg-black text-white rounded-none font-bold uppercase tracking-widest shadow-lg transition-colors">
            {isLoading && (
              <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            )}
            {mode === "login" ? "Entrar a la Taberna" : "Forjar mi Cuenta"}
          </Button>
        </div>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-[#E1E1E1]" />
        </div>
        <div className="relative flex justify-center text-[10px] font-bold uppercase tracking-widest">
          <span className="bg-white px-2 text-[#242528]/40">
            O continúa con
          </span>
        </div>
      </div>
      
      <Button
        variant="outline"
        type="button"
        disabled={isLoading}
        className="h-14 border-[#242528] border-2 bg-white text-[#242528] hover:bg-[#F9F9F9] rounded-none font-bold uppercase tracking-widest transition-all"
        onClick={async () => {
          setIsLoading(true)
          try {
            const { error } = await supabase.auth.signInWithOAuth({
              provider: "google",
              options: {
                redirectTo: `${window.location.origin}/auth/callback${returnUrl ? `?next=${encodeURIComponent(returnUrl)}` : ""}`,
              }
            })
            if (error) throw error
          } catch (error: any) {
            toast.error("Error al conectar con Google", {
              description: error.message
            })
          } finally {
            setIsLoading(false)
          }
        }}
      >
        <svg className="mr-3 h-5 w-5" viewBox="0 0 24 24">
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.25z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z"
            fill="#EA4335"
          />
        </svg>
        Entrar con Google
      </Button>
    </div>
  )
}
