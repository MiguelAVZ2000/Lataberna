import React from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { UserAuthForm } from "@/components/auth/user-auth-form"
import { Sword } from "lucide-react"
import Link from "next/link"

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <SiteHeader />
      <main className="flex-1 flex items-center justify-center p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-10 sm:w-[450px] bg-white border border-[#242528] p-12 shadow-[12px_12px_0px_0px_rgba(36,37,40,1)]">
          <div className="flex flex-col space-y-4 text-center">
            <div className="flex justify-center mb-2">
               <div className="p-4 bg-[#242528] text-white">
                  <Sword className="h-10 w-10 text-[#EE8600]" />
               </div>
            </div>
            <h1 className="text-4xl font-heading font-bold tracking-tight text-[#242528] uppercase">
              FORJAR CUENTA
            </h1>
            <p className="text-sm text-[#242528]/60 font-sans italic">
              «Todo héroe necesita un nombre y un lugar al que llamar hogar. Empieza tu viaje aquí.»
            </p>
          </div>
          <React.Suspense fallback={<div className="h-40 flex items-center justify-center text-[10px] font-black uppercase tracking-widest text-[#242528]/20">Preparando pergaminos...</div>}>
            <UserAuthForm mode="register" />
          </React.Suspense>
          <div className="space-y-4 text-center">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#242528]/40">
              ¿Ya eres un aventurero veterano?
            </p>
            <Link 
              href="/login" 
              className="inline-block text-xs font-bold uppercase tracking-widest text-[#EE8600] hover:text-[#242528] transition-colors border-b-2 border-[#EE8600] pb-1"
            >
              Entrar a mi Cuenta
            </Link>
          </div>
          
          <p className="text-center text-[9px] text-[#242528]/30 font-bold uppercase tracking-tighter leading-tight">
            Al registrarte, juras respetar los términos de servicio <br/> y la política de privacidad de los reinos.
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
