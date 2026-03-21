import React from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { UserAuthForm } from "@/components/auth/user-auth-form"
import { Shield } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col bg-bg-base" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1' cy='1' r='1' fill='%23EE8600' fill-opacity='0.06'/%3E%3C/svg%3E")` }}>
      <SiteHeader />
      <main className="flex-1 flex items-center justify-center p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-10 sm:w-[450px] bg-bg-surface border border-border-dark p-12 shadow-[12px_12px_0px_0px_rgba(36,37,40,1)]">
          <div className="flex flex-col space-y-4 text-center">
            <div className="flex justify-center mb-2">
               <div className="p-4 bg-[#242528] text-white">
                  <Shield className="h-10 w-10 text-gold" />
               </div>
            </div>
            <h1 className="text-4xl font-heading font-bold tracking-tight text-text-primary uppercase">
              ENTRAR A LA TABERNA
            </h1>
            <p className="text-sm text-text-muted font-sans italic">
              «Tus personajes y tesoros te esperan. Identifícate para continuar.»
            </p>
          </div>
          
          <React.Suspense fallback={<div className="h-40 flex items-center justify-center">Cargando oráculo...</div>}>
            <UserAuthForm mode="login" />
          </React.Suspense>
          
          <div className="space-y-4 text-center">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#242528]/40">
              ¿No tienes una cuenta aventurera?
            </p>
            <Link 
              href="/register" 
              className="inline-block text-xs font-bold uppercase tracking-widest text-[#EE8600] hover:text-[#242528] transition-colors border-b-2 border-[#EE8600] pb-1"
            >
              Forjar mi Cuenta Nueva
            </Link>
          </div>
          
          <p className="text-center text-[9px] text-[#242528]/30 font-bold uppercase tracking-tighter leading-tight">
            Al continuar, juras respetar los términos de servicio <br/> y la política de privacidad de los reinos.
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
