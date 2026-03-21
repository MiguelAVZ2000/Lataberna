// hooks/use-search-suggestions.ts
import { useState, useEffect } from "react"
import { useDebounce } from "@/hooks/use-debounce"
import { SearchResult } from "@/lib/search-utils"

/**
 * Hook que gestiona sugerencias de búsqueda con debounce.
 * Encapsula el fetch a /api/search/suggestions con abort automático
 * cuando la query cambia antes de que el fetch complete.
 *
 * @param query - Texto ingresado por el usuario
 * @returns suggestions: array de resultados, isSearching: indica carga en curso
 *
 * @example
 * const { suggestions, isSearching } = useSearchSuggestions(searchQuery)
 */
export function useSearchSuggestions(query: string): {
  suggestions: SearchResult[]
  isSearching: boolean
} {
  const [suggestions, setSuggestions] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const debouncedQuery = useDebounce(query, 300)

  useEffect(() => {
    if (debouncedQuery.length < 2) {
      setSuggestions([])
      return
    }

    const controller = new AbortController()
    setIsSearching(true)

    fetch(`/api/search/suggestions?query=${encodeURIComponent(debouncedQuery)}`, {
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then((data) => setSuggestions(data))
      .catch((err) => {
        if (err.name !== "AbortError") console.error(err)
      })
      .finally(() => setIsSearching(false))

    return () => controller.abort()
  }, [debouncedQuery])

  return { suggestions, isSearching }
}
