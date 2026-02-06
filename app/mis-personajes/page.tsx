import { createClient } from "@/lib/supabase/server"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PersonajesList } from "@/components/personajes/personajes-list"
import { Button } from "@/components/ui/button"
import { Plus, Users } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"

export const dynamic = "force-dynamic"

export default async function MisPersonajesPage() {
  const supabase = await createClient()

  // 1. Verificar Usuario
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return (
      <div className="flex min-h-screen flex-col bg-white">
        <SiteHeader />
        <main className="flex-1 flex flex-col items-center justify-center space-y-8 text-center px-4">
            <div className="w-24 h-24 bg-[#242528] rounded-full flex items-center justify-center border-4 border-[#EE8600] shadow-xl">
               <Users className="h-10 w-10 text-white" />
            </div>
            <div className="space-y-4">
              <h2 className="text-4xl font-heading font-bold text-[#242528] uppercase tracking-tight">Acceso a la Biblioteca</h2>
              <p className="text-[#242528]/60 max-w-md mx-auto italic font-sans">
                  «Debes iniciar sesión para acceder a tu colección personal de héroes y aventureros.»
              </p>
            </div>
            <Button asChild className="h-14 px-10 rounded-none bg-[#242528] hover:bg-[#EE8600] text-white font-bold uppercase tracking-widest transition-colors shadow-lg">
              <Link href="/login">Entrar a la Taberna</Link>
            </Button>
        </main>
        <SiteFooter />
      </div>
    )
  }

  // 2. Fetch de datos en el servidor
  const { data: personajes, error } = await supabase
    .from('personajes')
    .select('*')
    .eq('usuario_id', user.id)
    .order('creado_en', { ascending: false })

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <SiteHeader />
      <main className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
          
          {/* Page Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b-4 border-[#EE8600] pb-8">
             <div className="space-y-4">
               <h1 className="font-heading text-5xl font-bold text-[#242528] uppercase tracking-tight">Mis Personajes</h1>
               <p className="text-lg text-[#242528]/60 font-sans italic">
                 «Gestiona tus leyendas y prepárate para tu próxima gran aventura.»
               </p>
             </div>
             <Button asChild className="h-14 px-8 bg-[#242528] hover:bg-[#EE8600] text-white rounded-none font-bold uppercase tracking-widest shadow-lg transition-colors">
                <Link href="/personaje">
                  <Plus className="mr-3 h-5 w-5" /> Crear Héroe
                </Link>
             </Button>
          </div>

          <PersonajesList initialPersonajes={personajes || []} />
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
