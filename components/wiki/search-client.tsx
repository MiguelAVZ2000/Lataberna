"use client"

import { useSearchParams } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Search, BookOpen, User, Shield, Sparkles, ChevronRight } from "lucide-react"
import { Suspense } from "react"

// Tipos para los resultados
export type SearchResultItem = {
    name: string
    description: string
    type: string
    href: string
    id: string
}

interface WikiSearchClientProps {
    initialResults: SearchResultItem[]
    query: string
}

export function WikiSearchClient({ initialResults, query }: WikiSearchClientProps) {
  return (
    <Suspense fallback={<div className="py-20 text-center">Cargando resultados...</div>}>
      <SearchResultsContent results={initialResults} query={query} />
    </Suspense>
  )
}

function SearchResultsContent({ results, query }: { results: SearchResultItem[], query: string }) {
  // Nota: Ya no necesitamos useEffect para buscar hechizos, vienen del servidor.
  // Mantenemos useSearchParams solo si necesitamos reaccionar a cambios en el cliente sin recarga,
  // pero Next.js Server Components manejan esto via navegación.

  return (
    <div className="max-w-7xl mx-auto space-y-12 pb-20">
      {/* Header Section */}
      <div className="space-y-6 pt-8">
        <h1 className="font-heading font-bold text-5xl uppercase tracking-tight text-[#242528]">
          Resultados de Búsqueda
        </h1>
        <div className="h-[3px] w-48 bg-[#EE8600]" />
        <p className="text-xl text-[#242528] font-sans max-w-3xl leading-relaxed">
          {query ? (
            <>Mostrando resultados para <span className="font-bold text-[#EE8600]">«{query}»</span></>
          ) : (
            "Explora la wiki de La Taberna"
          )}
        </p>
      </div>

      {/* Results Grid */}
      <div className="grid gap-4">
        {results.length > 0 ? (
          results.map((result, i) => (
            <Link 
              key={`${result.type}-${result.id}-${i}`} 
              href={result.href}
              className="group bg-white border border-[#E1E1E1] hover:border-[#EE8600] p-6 flex items-center gap-6 transition-all shadow-sm hover:shadow-md"
            >
              <div className="h-12 w-12 bg-[#F9F9F9] border border-[#E1E1E1] flex items-center justify-center shrink-0 group-hover:bg-[#242528] group-hover:border-[#242528] transition-colors">
                {result.type === "Raza" && <User className="h-6 w-6 text-[#242528] group-hover:text-[#EE8600]" />}
                {result.type === "Clase" && <Shield className="h-6 w-6 text-[#242528] group-hover:text-[#EE8600]" />}
                {result.type === "Trasfondo" && <BookOpen className="h-6 w-6 text-[#242528] group-hover:text-[#EE8600]" />}
                {result.type === "Hechizo" && <Sparkles className="h-6 w-6 text-[#242528] group-hover:text-[#EE8600]" />}
              </div>

              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-3">
                  <h3 className="font-heading text-2xl font-bold uppercase tracking-tight text-[#242528] group-hover:text-[#EE8600] transition-colors">
                    {result.name}
                  </h3>
                  <Badge variant="outline" className="border-[#E1E1E1] text-[#242528]/40 text-[9px] font-bold uppercase tracking-widest rounded-none">
                    {result.type}
                  </Badge>
                </div>
                <p className="text-sm text-[#242528]/60 line-clamp-1 font-sans italic">
                  {result.description}
                </p>
              </div>

              <div className="text-[#E1E1E1] group-hover:text-[#EE8600] transition-colors">
                <ChevronRight className="h-6 w-6" />
              </div>
            </Link>
          ))
        ) : (
          <div className="py-32 text-center space-y-6 bg-white border border-[#E1E1E1]">
            <Search className="h-16 w-16 text-[#E1E1E1] mx-auto" />
            <div className="space-y-2">
              <p className="font-heading text-2xl font-bold uppercase text-[#242528]">No se encontró ningún rastro</p>
              <p className="text-sm text-[#242528]/40 font-sans">Prueba con otros términos de búsqueda como «Elfo», «Mago» o «Bola de Fuego».</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
