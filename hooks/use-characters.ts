import { useCallback, useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/components/auth/auth-context'
import type { DBCharacter } from '@/lib/types'

interface SaveCharacterInput {
  nombre: string
  raza_id: string
  clase_id: string
  nivel: number
  estadisticas: Record<string, unknown>
  biografia: Record<string, unknown>
}

/**
 * Hook para CRUD de personajes.
 * Usa useAuth() para obtener el usuario autenticado,
 * eliminando llamadas duplicadas a supabase.auth.getUser().
 */
export function useCharacters() {
  const { user } = useAuth()
  const [characters, setCharacters] = useState<DBCharacter[]>([])
  const [loading, setLoading] = useState(true)

  const fetchCharacters = useCallback(async () => {
    if (!user) {
      setCharacters([])
      setLoading(false)
      return
    }

    setLoading(true)
    const { data, error } = await supabase
      .from('personajes')
      .select('*')
      .eq('usuario_id', user.id)
      .order('creado_en', { ascending: false })

    if (!error) setCharacters((data as DBCharacter[]) || [])
    setLoading(false)
  }, [user])

  const saveCharacter = async (characterData: SaveCharacterInput) => {
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
  }, [fetchCharacters])

  return { characters, loading, saveCharacter, refresh: fetchCharacters }
}
