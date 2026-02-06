import { createClient } from "@/lib/supabase/server"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { TiendaClient } from "@/components/tienda/tienda-client"
import { Producto } from "@/lib/shop-types"

export const dynamic = "force-dynamic"

export default async function TiendaPage() {
  const supabase = await createClient()

  // Fetch Usuario
  const { data: { user } } = await supabase.auth.getUser()

  // Fetch Productos
  const { data: products, error } = await supabase
    .from('Productos')
    .select('*')
    .eq('Activo', true)
    .order('Creado_en', { ascending: false })

  if (error) {
    console.error("Error fetching products:", error)
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <TiendaClient 
        initialProducts={(products as Producto[]) || []} 
        user={user}
      />
      <SiteFooter />
    </div>
  )
}
