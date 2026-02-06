import { createClient } from "@/lib/supabase/server"
import { SettingsView } from "@/components/perfil/settings-view"

export const dynamic = "force-dynamic"

export default async function ConfiguracionPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  const { data: profile } = await supabase
    .from('perfiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return <SettingsView user={user} initialProfile={profile} />
}
