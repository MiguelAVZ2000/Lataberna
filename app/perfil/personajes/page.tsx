import { createClient } from "@/lib/supabase/server"
import { CharactersView } from "@/components/perfil/characters-view"

export const dynamic = "force-dynamic"

export default async function PersonajesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  const { data: characters } = await supabase
    .from('personajes')
    .select('*')
    .eq('usuario_id', user.id)
    .order('actualizado_el', { ascending: false })

  return <CharactersView user={user} characters={characters || []} />
}
