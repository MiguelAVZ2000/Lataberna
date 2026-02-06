import { NextRequest, NextResponse } from "next/server"
import { getStaticSearchResults } from "@/lib/search-utils"
import { createClient } from "@/lib/supabase/server"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const query = searchParams.get("query") || ""

  if (!query || query.length < 2) {
    return NextResponse.json([])
  }

  // 1. Static Results
  const staticResults = getStaticSearchResults(query)

  // 2. Dynamic Spells (optional for suggestions, keep it fast)
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('hechizos')
      .select('id, nombre, descripcion')
      .ilike('nombre', `%${query}%`)
      .limit(5)

    const spellResults = data?.map((s: any) => ({
      id: s.id,
      name: s.nombre,
      description: s.descripcion,
      type: "Hechizo",
      href: `/wiki/conceptos/hechizos?search=${encodeURIComponent(s.nombre)}`
    })) || []

    const results = [...staticResults, ...spellResults].slice(0, 8)
    return NextResponse.json(results)
  } catch (error) {
    console.error("Search API Error:", error)
    return NextResponse.json(staticResults.slice(0, 8))
  }
}
