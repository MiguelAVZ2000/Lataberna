"use client"

import Link from "next/link"
import { ShoppingCart, BookOpen, Users, Search } from "lucide-react"
import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { useSearchSuggestions } from "@/hooks/use-search-suggestions"
import { SearchSuggestions } from "@/components/wiki/search-suggestions"

/** Textura de puntos SVG inline — sin dependencias externas */
const DOT_TEXTURE = `url("data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1' cy='1' r='1' fill='%23EE8600' fill-opacity='0.06'/%3E%3C/svg%3E")`

export function HeroSection() {
  const [search, setSearch] = useState("")
  const { suggestions, isSearching } = useSearchSuggestions(search)
  const router = useRouter()

  const handleSearch = useCallback((e?: React.FormEvent) => {
    e?.preventDefault()
    if (search.trim()) {
      router.push(`/wiki/search?query=${encodeURIComponent(search)}`)
    }
  }, [search, router])

  return (
    <section
      className="relative px-4 py-24 lg:py-40 flex flex-col items-center justify-center text-center overflow-hidden bg-bg-base"
      style={{ backgroundImage: DOT_TEXTURE }}
    >
      {/* Gradiente radial dorado central */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, rgba(238,134,0,0.10) 0%, transparent 65%)" }}
      />
      {/* Gradiente inferior de transición */}
      <div
        className="absolute bottom-0 inset-x-0 h-24 pointer-events-none"
        style={{ background: "linear-gradient(to top, #0f1117, transparent)" }}
      />

      <div className="container mx-auto max-w-5xl relative z-10">

        <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-gold/30 bg-gold/10 text-gold text-[10px] font-black uppercase tracking-[0.2em] mb-8">
          Manuales / Herramientas / Comunidad
        </div>

        <h1 className="font-heading font-black text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tighter text-text-primary uppercase mb-8 leading-[0.8]">
          TU AVENTURA <br/>
          <span className="text-gold">COMIENZA AQUÍ</span>
        </h1>

        <p className="font-sans text-xl md:text-2xl text-text-muted mb-12 max-w-3xl mx-auto leading-relaxed font-normal">
          La plataforma definitiva para <strong className="text-text-primary">Dungeons & Dragons</strong> en español.
          Gestiona tus personajes, consulta el saber arcano y forja tu propia leyenda.
        </p>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-20 relative z-50">
          <form onSubmit={handleSearch} className="relative group">
            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
              <Search className="h-6 w-6 text-text-muted group-hover:text-gold transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Buscar hechizos, monstruos, reglas..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-16 pl-16 pr-6 border border-border-dark bg-bg-surface/60 backdrop-blur-md text-text-primary shadow-2xl text-lg focus:outline-none focus:border-gold transition-all placeholder:text-text-muted"
            />
            <div className="absolute inset-y-0 right-3 flex items-center">
              <button
                type="submit"
                className="bg-gold hover:bg-gold/90 text-black h-10 px-8 font-black uppercase tracking-widest text-xs shadow-lg border-none transition-colors"
              >
                Buscar
              </button>
            </div>
          </form>
          <SearchSuggestions
            suggestions={suggestions}
            isSearching={isSearching}
            searchQuery={search}
            onSuggestionClick={(href) => { router.push(href); setSearch("") }}
            onViewAllClick={handleSearch}
            className="text-left"
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
              <div className="relative bg-bg-surface/50 border border-border-dark p-8 hover:bg-bg-raised hover:border-gold/30 transition-all duration-500 h-full flex flex-col items-center">
                <div className="absolute bottom-0 inset-x-0 h-0.5 bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                <div className="h-14 w-14 bg-bg-surface border border-border-dark flex items-center justify-center mb-6 group-hover:bg-gold/10 group-hover:border-gold/40 transition-all duration-300">
                  <item.icon className="h-7 w-7 text-text-muted group-hover:text-gold transition-colors" />
                </div>
                <h3 className="font-heading font-black text-xl uppercase mb-3 text-text-primary tracking-tight">{item.title}</h3>
                <p className="text-sm text-text-muted font-sans leading-relaxed">{item.desc}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Stats Strip */}
        <div className="w-full mt-4 grid grid-cols-4 gap-4 border-t border-border-dark pt-8">
          {[
            { val: "500+", label: "Hechizos" },
            { val: "13", label: "Razas" },
            { val: "12", label: "Clases" },
            { val: "1.2K+", label: "Aventureros" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="font-heading font-black text-2xl text-text-primary">{stat.val}</div>
              <div className="text-[9px] uppercase tracking-widest text-text-muted mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
