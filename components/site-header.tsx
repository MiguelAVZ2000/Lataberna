"use client"

import Link from "next/link"
import { useState, useCallback } from "react"
import { Menu, ShoppingCart, Beer, BookOpen, Users, User, Search, Dice5, Scroll } from "lucide-react"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useAuth } from "@/components/auth/auth-context"
import { useCart } from "@/components/tienda/cart-context"
import { useRouter } from "next/navigation"
import { useSearchSuggestions } from "@/hooks/use-search-suggestions"
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
  { name: "Tienda", href: "/tienda", icon: ShoppingCart },
  { name: "Guías", href: "/guias", icon: Dice5 },
  { name: "Personajes", href: "/personaje", icon: Users },
  { name: "Wiki", href: "/wiki", icon: BookOpen },
]

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, loading, signOut } = useAuth()
  const { cart, setIsCartOpen } = useCart()
  const router = useRouter()

  // Search State
  const [showSearch, setShowSearch] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const { suggestions, isSearching } = useSearchSuggestions(searchQuery)

  const handleSearchSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/wiki/search?query=${encodeURIComponent(searchQuery)}`)
      setShowSearch(false)
      setSearchQuery("")
    }
  }, [searchQuery, router])

  return (
    <header className="sticky top-0 z-50 w-full bg-bg-base/95 backdrop-blur-md text-white border-b-2 border-[#EE8600] shadow-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:h-20 max-w-7xl">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 mr-8 shrink-0">
          <div className="flex items-center justify-center h-10 w-10 bg-[#EE8600]">
            <Beer className="h-6 w-6 text-white" />
          </div>
          <span className="font-heading font-black text-2xl tracking-tighter text-white uppercase leading-none hidden sm:inline-block">
            LA<span className="text-[#EE8600]">TABERNA</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-2 flex-1">
          {navigation.map((item) => (
            <Link key={item.name} href={item.href}
              className="group relative px-4 py-2 text-[11px] font-black uppercase tracking-widest text-white transition-colors">
              {item.name}
              <span className="absolute inset-x-4 -bottom-1 h-0.5 bg-[#EE8600] scale-x-0 transition-transform duration-200 group-hover:scale-x-100" />
            </Link>
          ))}
        </nav>

        {/* Right Actions - SIEMPRE VISIBLES */}
        <div className="flex items-center gap-2">
          
          {/* Search */}
          <div className="relative">
            {showSearch ? (
              <div className="relative animate-in fade-in slide-in-from-right-4 duration-300 mr-2">
                <form onSubmit={handleSearchSubmit}>
                  <input autoFocus type="text" placeholder="Buscar en la Wiki..."
                    className="h-9 w-40 sm:w-64 bg-white border border-white/20 rounded-sm pl-3 pr-8 text-xs text-black placeholder:text-black/60 focus:outline-none focus:border-[#EE8600]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onBlur={() => { setTimeout(() => { if (!searchQuery) setShowSearch(false) }, 200) }}
                  />
                  <Search className="absolute right-2 top-2.5 h-4 w-4 text-black/40 pointer-events-none" />
                </form>
                <SearchSuggestions 
                  suggestions={suggestions} isSearching={isSearching} searchQuery={searchQuery}
                  onSuggestionClick={(href) => { router.push(href); setShowSearch(false); setSearchQuery("") }}
                  onViewAllClick={() => handleSearchSubmit({ preventDefault: () => {} } as any)}
                  className="min-w-[320px] shadow-xl border border-gray-200"
                />
              </div>
            ) : (
              <button onClick={() => setShowSearch(true)} className="hidden sm:flex items-center justify-center h-10 w-10 bg-bg-surface text-text-primary hover:bg-gold hover:text-white border border-border-dark rounded-sm transition-colors duration-200 active:scale-95">
                <Search className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
              </button>
            )}
          </div>

          {/* Cart */}
          <button onClick={() => setIsCartOpen(true)} className="flex items-center justify-center h-10 w-10 bg-bg-surface text-text-primary hover:bg-gold hover:text-white relative border border-border-dark rounded-sm transition-colors duration-200 active:scale-95 group/cart">
            <ShoppingCart className="h-5 w-5 transition-transform duration-200 group-hover/cart:scale-110" />
            {cart.length > 0 && (
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-[#EE8600] border-2 border-[#242528] group-hover/cart:border-white" />
            )}
          </button>

          <div className="hidden sm:block h-6 w-px bg-white/10 mx-2" />

          {/* Auth - SIEMPRE MOSTRAR (solo cambia contenido) */}
          {!loading && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="hidden sm:flex items-center gap-2 text-gray-200 hover:text-white hover:bg-white/10 font-black uppercase tracking-widest text-[10px] border border-white/5 px-3 py-2">
                  <div className="h-6 w-6 rounded-full bg-[#EE8600] flex items-center justify-center">
                    <User className="h-3 w-3 text-white" />
                  </div>
                  {user.user_metadata?.username || user.email?.split('@')[0]}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-bg-surface border-white/10 text-white shadow-2xl rounded-sm">
                <DropdownMenuLabel className="font-heading uppercase text-[10px] tracking-widest text-gray-500">Cuenta de Tabernero</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem asChild className="focus:bg-white/5 focus:text-[#EE8600] cursor-pointer font-black uppercase text-[10px] tracking-widest py-3">
                  <Link href="/perfil">Perfil</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="focus:bg-white/5 focus:text-[#EE8600] cursor-pointer font-black uppercase text-[10px] tracking-widest py-3">
                  <Link href="/mis-personajes">Mis Personajes</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem onClick={signOut} className="text-[#EE8600] focus:bg-[#EE8600]/20 cursor-pointer font-black uppercase text-[10px] tracking-widest py-3">
                  Cerrar Sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <Link href="/login" className="text-gray-200 hover:text-white hover:bg-white/10 font-black uppercase tracking-widest text-[10px] px-4 py-2 transition-colors">
                Ingresar
              </Link>
              <Link href="/register" className="bg-[#EE8600] text-white hover:bg-[#EE8600]/90 font-black uppercase tracking-widest text-[10px] rounded-sm px-6 py-2 shadow-lg shadow-black/20 transition-colors">
                Registrarse
              </Link>
            </div>
          )}

          {/* Mobile Menu - SIEMPRE VISIBLE */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <button className="lg:hidden flex items-center justify-center h-10 w-10 text-gray-400 hover:text-white border border-white/5">
                <Menu className="h-6 w-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-[#242528] border-l border-white/5 p-0 shadow-2xl text-white">
              <SheetTitle className="sr-only">Menú de navegación</SheetTitle>
              <div className="p-6 border-b border-white/5">
                <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-3">
                  <div className="h-8 w-8 bg-[#EE8600] flex items-center justify-center">
                    <Beer className="h-5 w-5 text-white" />
                  </div>
                  <span className="font-heading font-black text-xl tracking-tighter text-white uppercase">
                    LA<span className="text-[#EE8600]">TABERNA</span>
                  </span>
                </Link>
              </div>
              <div className="flex flex-col p-4">
                {/* Mobile Search */}
                <form onSubmit={(e) => { e.preventDefault(); if (searchQuery.trim()) { router.push(`/wiki/search?query=${encodeURIComponent(searchQuery)}`); setIsOpen(false); setSearchQuery("") }}} className="relative mb-2">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Buscar en la Wiki..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-10 pl-9 pr-3 bg-white/5 border border-white/10 text-white text-xs placeholder:text-gray-500 focus:outline-none focus:border-[#EE8600] rounded-sm"
                  />
                </form>
                <div className="h-px bg-white/5 my-2" />

                {navigation.map((item) => (
                  <Link key={item.name} href={item.href} onClick={() => setIsOpen(false)}
                    className="px-4 py-4 text-[11px] font-black uppercase tracking-widest text-gray-400 hover:text-white hover:bg-white/5 rounded-sm transition-all flex items-center gap-3">
                    <item.icon className="h-4 w-4 text-gray-400" />
                    {item.name}
                  </Link>
                ))}
                <div className="h-px bg-white/5 my-4" />
                <button onClick={() => { setIsCartOpen(true); setIsOpen(false) }}
                  className="flex items-center gap-3 px-4 py-4 text-[11px] font-black uppercase tracking-widest text-gray-400 hover:text-white hover:bg-white/5 rounded-sm text-left">
                  <ShoppingCart className="h-4 w-4" /> Carrito ({cart.length})
                </button>
                <div className="h-px bg-white/5 my-4" />
                {user ? (
                  <>
                    <Link href="/perfil" onClick={() => setIsOpen(false)} className="px-4 py-4 text-[11px] font-black uppercase tracking-widest text-gray-400 hover:text-white hover:bg-white/5 rounded-sm flex items-center gap-3">
                      <User className="h-4 w-4" /> Perfil
                    </Link>
                    <button onClick={() => { signOut(); setIsOpen(false) }}
                      className="w-full text-left px-4 py-4 text-[11px] font-black uppercase tracking-widest text-red-500 hover:bg-red-500/10 rounded-sm flex items-center gap-3">
                      <Beer className="h-4 w-4" /> Cerrar Sesión
                    </button>
                  </>
                ) : (
                  <div className="grid grid-cols-1 gap-3 mt-4">
                    <Link href="/login" onClick={() => setIsOpen(false)}
                      className="flex items-center justify-center py-3 text-[11px] font-black uppercase tracking-widest text-gray-300 border border-white/10 hover:bg-white/5">
                      Ingresar
                    </Link>
                    <Link href="/register" onClick={() => setIsOpen(false)}
                      className="flex items-center justify-center py-3 text-[11px] font-black uppercase tracking-widest text-white bg-[#EE8600] hover:bg-[#EE8600]/90 shadow-lg shadow-black/30">
                      Crear Cuenta
                    </Link>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
