import { createClient } from "@/lib/supabase/server"
import { WikiSearchClient, SearchResultItem } from "@/components/wiki/search-client"
import { getStaticSearchResults } from "@/lib/search-utils"

export const dynamic = "force-dynamic"

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function SearchResultsPage({ searchParams }: Props) {
  const resolvedSearchParams = await searchParams
  const query = (resolvedSearchParams.query as string)?.toLowerCase() || ""
  
  let spellResults: SearchResultItem[] = []

  // 1. Búsqueda estática (Razas, Clases, Trasfondos, Secciones)
  const staticResults = getStaticSearchResults(query).map(item => ({
    ...item,
    type: item.type as string
  }))

  // 2. Búsqueda dinámica (Hechizos en DB) solo si hay query
  if (query) {
    const supabase = await createClient()
    const { data } = await supabase
        .from('hechizos')
        .select('*')
        .or(`nombre.ilike.%${query}%,descripcion.ilike.%${query}%`)
        .limit(20)

    if (data) {
        spellResults = data.map((s: any) => ({
            name: s.nombre,
            description: s.descripcion,
            type: "Hechizo",
            href: `/wiki/conceptos/hechizos?search=${encodeURIComponent(s.nombre)}`,
            id: s.id
        }))
    }
  }

  const results = [...staticResults, ...spellResults]

  return <WikiSearchClient initialResults={results} query={query} />
}
