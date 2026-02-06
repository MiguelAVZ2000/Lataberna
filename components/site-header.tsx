"use client"

import Link from "next/link"
import { useState, useEffect, useCallback } from "react"
import { Menu, ShoppingCart, Scroll, Beer, BookOpen, Users, User, Search, Dice5, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { supabase } from "@/lib/supabase"
import { User as SupabaseUser } from "@supabase/supabase-js"
import { useCart } from "@/components/tienda/cart-context"
import { useRouter } from "next/navigation"
import { useDebounce } from "@/hooks/use-debounce"
import { SearchResult } from "@/lib/search-utils"
import { SearchSuggestions } from "@/components/wiki/search-suggestions"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const navigation = [
  { name: "Tienda", href: "/tienda", icon: BookOpen },
  { name: "Guías", href: "/guias", icon: Dice5 },
  { name: "Personajes", href: "/personaje", icon: Users },
]

const wikiSubMenu = [
    { name: "Introducción", href: "/wiki" },
    { name: "Razas", href: "/wiki/razas" },
    { name: "Clases", href: "/wiki/clases" },
    { name: "Trasfondos", href: "/wiki/trasfondos" },
    { name: "Hechizos", href: "/wiki/conceptos/hechizos" },
]

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [user, setUser] = useState<SupabaseUser | null>(null)
  
  const { cart, setIsCartOpen } = useCart()

  // Search State
  const router = useRouter()
  const [showSearch, setShowSearch] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [suggestions, setSuggestions] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const debouncedSearch = useDebounce(searchQuery, 300)

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (debouncedSearch.length < 2) {
        setSuggestions([])
        return
      }
      setIsSearching(true)
      try {
        const response = await fetch(`/api/search/suggestions?query=${encodeURIComponent(debouncedSearch)}`)
        const data = await response.json()
        setSuggestions(data)
      } catch (error) {
        console.error("Error fetching suggestions:", error)
      } finally {
        setIsSearching(false)
      }
    }

    fetchSuggestions()
  }, [debouncedSearch])

  const handleSearchSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/wiki/search?query=${encodeURIComponent(searchQuery)}`)
      setShowSearch(false)
      setSearchQuery("")
      setSuggestions([])
    }
  }, [searchQuery, router])

  const handleSuggestionClick = (href: string) => {
    router.push(href)
    setShowSearch(false)
    setSearchQuery("")
    setSuggestions([])
  }

  useEffect(() => {
    setMounted(true)
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  const handleLogout = useCallback(async () => {
    await supabase.auth.signOut()
    window.location.href = "/"
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full bg-[var(--color-dark-section)] text-white border-b-2 border-[var(--color-accent-gold)] shadow-xl">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4 lg:h-20 max-w-7xl">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group mr-8 shrink-0">
          <div className="relative flex items-center justify-center h-10 w-10 bg-[var(--color-primary)] rounded-sm transition-transform duration-300 group-hover:scale-105 shadow-lg shadow-black/20">
            <Beer className="h-6 w-6 text-white" />
          </div>
          <span className="font-heading font-black text-2xl tracking-tighter text-white uppercase leading-none hidden sm:inline-block">
            LA<span className="text-[var(--color-primary)]">TABERNA</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-2 flex-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="group relative px-4 py-2 text-[11px] font-black uppercase tracking-widest text-white transition-colors"
            >
              {item.name}
              <span className="absolute inset-x-4 -bottom-1 h-0.5 bg-[var(--color-accent-gold)] scale-x-0 transition-transform duration-200 group-hover:scale-x-100" />
            </Link>
          ))}
          
          <Link
            href="/wiki"
            className="group relative px-4 py-2 text-[11px] font-black uppercase tracking-widest text-white transition-colors"
          >
            Wiki
            <span className="absolute inset-x-4 -bottom-1 h-0.5 bg-[var(--color-accent-gold)] scale-x-0 transition-transform duration-200 group-hover:scale-x-100" />
          </Link>
        </nav>

        {/* Tools & Auth */}
        <div className="flex items-center gap-2">
          
          <div className="relative">
            {showSearch ? (
               <div className="relative animate-in fade-in slide-in-from-right-4 duration-300 mr-2">
                 <form onSubmit={handleSearchSubmit}>
                   <input 
                     autoFocus
                     type="text" 
                     placeholder="Buscar en la Wiki..." 
                     className="h-9 w-40 sm:w-64 bg-white border border-white/20 rounded-sm pl-3 pr-8 text-xs text-black placeholder:text-black/40 focus:outline-none focus:border-[#EE8600]"
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                     onBlur={() => {
                        // Delay hide to allow clicks
                        setTimeout(() => {
                           if (!searchQuery) setShowSearch(false)
                        }, 200)
                     }}
                   />
                   <Search className="absolute right-2 top-2.5 h-4 w-4 text-black/40" />
                 </form>

                 {/* Suggestions Dropdown */}
                 <SearchSuggestions 
                    suggestions={suggestions}
                    isSearching={isSearching}
                    searchQuery={searchQuery}
                    onSuggestionClick={handleSuggestionClick}
                    onViewAllClick={() => handleSearchSubmit({ preventDefault: () => {} } as any)}
                    className="min-w-[320px] shadow-xl border border-gray-200"
                 />
               </div>
            ) : (
              <Button variant="ghost" size="icon" onClick={() => setShowSearch(true)} className="bg-white text-black hover:bg-gray-200 hover:text-black hidden sm:flex border border-white/5 rounded-sm">
                 <Search className="h-5 w-5" />
              </Button>
            )}
          </div>

          <Button variant="ghost" size="icon" onClick={() => setIsCartOpen(true)} className="bg-white text-black hover:bg-gray-200 hover:text-black relative border border-white/5 rounded-sm">
             <ShoppingCart className="h-5 w-5" />
             {cart.length > 0 && (
                <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-[#EE8600] border-2 border-[var(--color-dark-section)]" />
             )}
          </Button>

          <div className="hidden sm:block h-6 w-px bg-white/10 mx-2" />

          {mounted && (
            user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="hidden sm:flex items-center gap-2 text-gray-200 hover:text-white hover:bg-white/10 font-black uppercase tracking-widest text-[10px] border border-white/5">
                    <div className="h-6 w-6 rounded-full bg-[var(--color-primary)] flex items-center justify-center">
                      <User className="h-3 w-3 text-[var(--color-primary)]" />
                    </div>
                    {user.user_metadata?.username || user.email?.split('@')[0]}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-[var(--color-dark-section)] border-white/10 text-white shadow-2xl rounded-sm">
                  <DropdownMenuLabel className="font-heading uppercase text-[10px] tracking-widest text-gray-500">Cuenta de Tabernero</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem asChild className="focus:bg-white/5 focus:text-[var(--color-primary)] cursor-pointer font-black uppercase text-[10px] tracking-widest py-3">
                    <Link href="/perfil">Perfil</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="focus:bg-white/5 focus:text-[var(--color-primary)] cursor-pointer font-black uppercase text-[10px] tracking-widest py-3">
                    <Link href="/mis-personajes">Mis Personajes</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem 
                    className="text-[var(--color-primary)] focus:bg-[var(--color-primary)]/20 focus:text-[var(--color-primary)] cursor-pointer font-black uppercase text-[10px] tracking-widest py-3"
                    onClick={handleLogout}
                  >
                    Cerrar Sesión
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
               <div className="hidden sm:flex items-center gap-2">
                  <Button variant="ghost" asChild className="text-gray-200 hover:text-white hover:bg-white/10 font-black uppercase tracking-widest text-[10px]">
                    <Link href="/login">Ingresar</Link>
                  </Button>
                  <Button asChild className="bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary)]/90 font-black uppercase tracking-widest text-[10px] rounded-sm px-6 h-9 shadow-lg shadow-black/20">
                    <Link href="/register">Registrarse</Link>
                  </Button>
               </div>
            )
          )}

          {/* Mobile Menu Icon */}
          {!mounted ? (
             <Button variant="ghost" size="icon" className="lg:hidden text-gray-400 border border-white/5">
                <Menu className="h-6 w-6" />
             </Button>
          ) : (
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden text-gray-400 border border-white/5">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] bg-[var(--color-dark-section)] border-l border-white/5 p-0 shadow-2xl text-white">
  
                <div className="p-6 border-b border-white/5">
                   <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-3">
                      <div className="h-8 w-8 bg-[var(--color-primary)] rounded-sm flex items-center justify-center">
                        <Beer className="h-5 w-5 text-white" />
                      </div>
                      <span className="font-heading font-black text-xl tracking-tighter text-white uppercase">
                        LA<span className="text-[var(--color-primary)]">TABERNA</span>
                      </span>
                   </Link>
                </div>
                <div className="flex flex-col p-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="px-4 py-4 text-[11px] font-black uppercase tracking-widest text-gray-400 hover:text-white hover:bg-white/5 rounded-sm transition-all flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className="h-4 w-4 text-gray-500 group-hover:text-[var(--color-primary)]" />
                        {item.name}
                      </div>
                      <Dice5 className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  ))}
                  <div className="h-px bg-white/5 my-4" />
                   <Button variant="ghost" onClick={() => { setIsCartOpen(true); setIsOpen(false) }} className="justify-between px-4 text-gray-400 hover:text-white hover:bg-white/5 font-black uppercase tracking-widest text-[11px] h-12">
                      <div className="flex items-center gap-3">
                        <ShoppingCart className="h-4 w-4" />
                        Carrito
                      </div>
                      <span className="bg-[var(--color-primary)] text-white text-[9px] px-2 py-0.5 rounded-full">{cart.length}</span>
                   </Button>
                   <div className="h-px bg-white/5 my-4" />
                   {user ? (
                      <>
                        <Link href="/perfil" onClick={() => setIsOpen(false)} className="px-4 py-4 text-[11px] font-black uppercase tracking-widest text-gray-400 hover:text-white hover:bg-white/5 rounded-sm flex items-center gap-3">
                           <User className="h-4 w-4" /> Perfil
                        </Link>
                        <button onClick={handleLogout} className="w-full text-left px-4 py-4 text-[11px] font-black uppercase tracking-widest text-red-500 hover:bg-red-500/10 rounded-sm flex items-center gap-3 mt-auto">
                           <Beer className="h-4 w-4" /> Cerrar Sesión
                        </button>
                      </>
                   ) : (
                      <div className="grid grid-cols-1 gap-3 mt-4">
                        <Button variant="outline" asChild className="border-white/10 text-gray-300 font-black uppercase tracking-widest text-[10px] rounded-sm h-12 hover:bg-white/5">
                          <Link href="/login" onClick={() => setIsOpen(false)}>Ingresar</Link>
                        </Button>
                        <Button asChild className="bg-[var(--color-primary)] text-white font-black uppercase tracking-widest text-[10px] rounded-sm h-12 shadow-lg shadow-black/30">
                          <Link href="/register" onClick={() => setIsOpen(false)}>Crear Cuenta</Link>
                        </Button>
                      </div>
                   )}
                </div>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </nav>
    </header>
  )
}

