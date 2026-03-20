"use client"

import Link from "next/link"
import { ShoppingCart, BookOpen, Users, Search, ChevronRight } from "lucide-react"
import { useState, useCallback, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useDebounce } from "@/hooks/use-debounce"
import { SearchResult } from "@/lib/search-utils"
import { SearchSuggestions } from "@/components/wiki/search-suggestions"

export function HeroSection() {
  const [search, setSearch] = useState("")
  const [suggestions, setSuggestions] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const debouncedSearch = useDebounce(search, 300)
  const router = useRouter()

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (debouncedSearch.length < 2) { setSuggestions([]); return }
      setIsSearching(true)
      try {
        const response = await fetch(`/api/search/suggestions?query=${encodeURIComponent(debouncedSearch)}`)
        setSuggestions(await response.json())
      } catch (e) { console.error(e) }
      finally { setIsSearching(false) }
    }
    fetchSuggestions()
  }, [debouncedSearch])

  const handleSearch = useCallback((e?: React.FormEvent) => {
    e?.preventDefault()
    if (search.trim()) {
      router.push(`/wiki/search?query=${encodeURIComponent(search)}`)
    }
  }, [search, router])

  return (
    <section className="relative px-4 py-24 lg:py-40 bg-[#242528] flex flex-col items-center justify-center text-center overflow-hidden">
      
      {/* Background */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519074063912-ad2a602a558a?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-overlay" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#242528]/50 via-transparent to-[#242528]" />

      <div className="container mx-auto max-w-5xl relative z-30">
        
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-sm border border-[#EE8600]/30 bg-[#EE8600]/10 text-[#EE8600] text-[10px] font-black uppercase tracking-[0.2em] mb-8">
          Manuales / Herramientas / Comunidad
        </div>

        <h1 className="font-heading font-black text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tighter text-white uppercase mb-8 leading-[0.8] drop-shadow-2xl">
          TU AVENTURA <br/>
          <span className="text-[#EE8600] drop-shadow-[0_0_15px_rgba(238,134,0,0.3)]">COMIENZA AQUÍ</span>
        </h1>

        <p className="font-sans text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed font-normal">
          La plataforma definitiva para <strong className="text-white">Dungeons & Dragons</strong> en español. 
          Gestiona tus personajes, consulta el saber arcano y forja tu propia leyenda.
        </p>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-20 relative scale-105 z-50">
          <form onSubmit={handleSearch} className="relative group">
            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
              <Search className="h-6 w-6 text-white/60 group-hover:text-[#EE8600] transition-colors" />
            </div>
            <input 
              type="text" placeholder="Buscar hechizos, monstruos, reglas..." 
              value={search} onChange={(e) => setSearch(e.target.value)}
              className="w-full h-16 pl-16 pr-6 rounded-sm border border-white/10 bg-white/5 backdrop-blur-md text-white shadow-2xl text-lg focus:outline-none focus:border-[#EE8600] transition-all placeholder:text-white/50"
            />
            <div className="absolute inset-y-0 right-3 flex items-center">
              <button type="submit" className="bg-[#EE8600] hover:bg-[#EE8600]/90 text-black rounded-sm h-10 px-8 font-black uppercase tracking-widest text-xs shadow-lg border-none">
                Buscar
              </button>
            </div>
          </form>
          <SearchSuggestions 
            suggestions={suggestions} isSearching={isSearching} searchQuery={search}
            onSuggestionClick={(href) => { router.push(href); setSearch(""); setSuggestions([]) }}
            onViewAllClick={handleSearch} className="text-left"
          />
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
          {[
            { href: "/personaje", icon: Users, title: "Crear Personaje", desc: "Diseña tu héroe paso a paso." },
            { href: "/wiki/conceptos", icon: BookOpen, title: "Reglas Básicas", desc: "Consulta el sistema de juego." },
            { href: "/tienda", icon: ShoppingCart, title: "El Mercado", desc: "Equípate para la gloria." }
          ].map((item, i) => (
            <Link key={i} href={item.href} className="group">
              <div className="relative bg-white/5 border border-white/10 p-8 hover:bg-white/[0.08] hover:border-white/20 transition-all duration-500 h-full flex flex-col items-center backdrop-blur-sm overflow-hidden">
                {/* Bottom gold accent */}
                <div className="absolute bottom-0 inset-x-0 h-0.5 bg-[#EE8600] scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                <div className="h-14 w-14 bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:bg-[#EE8600]/10 group-hover:border-[#EE8600]/40 transition-all duration-300">
                  <item.icon className="h-7 w-7 text-white/70 group-hover:text-[#EE8600] transition-colors" />
                </div>
                <h3 className="font-heading font-black text-xl uppercase mb-3 text-white tracking-tight">{item.title}</h3>
                <p className="text-sm text-white/60 font-sans leading-relaxed">{item.desc}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Stats Strip */}
        <div className="w-full mt-4 grid grid-cols-4 gap-4 border-t border-white/10 pt-8">
          {[
            { val: "500+", label: "Hechizos" },
            { val: "13", label: "Razas" },
            { val: "12", label: "Clases" },
            { val: "1.2K+", label: "Aventureros" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="font-heading font-black text-2xl text-white">{stat.val}</div>
              <div className="text-[9px] uppercase tracking-widest text-white/40 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white to-transparent z-20 dark:from-[oklch(0.12_0_0)]" />
    </section>
  )
}
