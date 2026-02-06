import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export function useCharacters() {
  const [characters, setCharacters] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const fetchCharacters = async () => {
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()
    
    if (user) {
      const { data, error } = await supabase
        .from('personajes')
        .select('*')
        .eq('usuario_id', user.id)
        .order('creado_en', { ascending: false })

      if (!error) setCharacters(data || [])
    }
    setLoading(false)
  }

  const saveCharacter = async (characterData: any) => {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) return { error: 'No hay usuario autenticado' }

    const { data, error } = await supabase
      .from('personajes')
      .upsert({
        usuario_id: user.id,
        nombre: characterData.nombre,
        raza_id: characterData.raza_id,
        clase_id: characterData.clase_id,
        nivel: characterData.nivel || 1,
        estadisticas: characterData.estadisticas,
        biografia: characterData.biografia,
        actualizado_en: new Date().toISOString()
      })
      .select()

    if (!error) await fetchCharacters()
    return { data, error }
  }

  useEffect(() => {
    fetchCharacters()
  }, [])

  return { characters, loading, saveCharacter, refresh: fetchCharacters }
}
