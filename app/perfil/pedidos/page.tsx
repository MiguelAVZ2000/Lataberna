import { createClient } from "@/lib/supabase/server"
import { OrdersView } from "@/components/perfil/orders-view"

export const dynamic = "force-dynamic"

export default async function PedidosPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  const { data: sales } = await supabase
    .from('ventas')
    .select('*')
    .eq('usuario_id', user.id)
    .order('fecha', { ascending: false })

  return <OrdersView sales={sales || []} />
}
