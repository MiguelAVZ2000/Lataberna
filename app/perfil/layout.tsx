import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ProfileNav } from "@/components/perfil/profile-nav"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export default async function PerfilLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <SiteHeader />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Sidebar */}
            <aside className="w-full lg:w-72 space-y-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-16 w-16 bg-black border-4 border-[#EE8600] rounded-none flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <span className="text-2xl font-black text-[#EE8600]">
                    {user.email?.[0].toUpperCase()}
                  </span>
                </div>
                <div>
                  <h2 className="font-heading font-black uppercase text-xl tracking-tight leading-none">Mi Cuenta</h2>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1 truncate max-w-[150px]">
                    {user.user_metadata?.username || user.email?.split('@')[0]}
                  </p>
                </div>
              </div>
              <ProfileNav />
            </aside>

            {/* Content Area */}
            <div className="flex-1 min-w-0">
              {children}
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
