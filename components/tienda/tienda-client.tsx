"use client"

import { useState, useMemo } from "react"
import { useCart } from "@/components/tienda/cart-context"
import { ProductCard } from "@/components/tienda/product-card"
import { StoreFilters } from "@/components/tienda/store-filters"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Package, User } from "lucide-react"
import { Producto } from "@/lib/shop-types"

interface TiendaClientProps {
  initialProducts: Producto[]
  user: any // Ajustar tipo si tenemos definicion de Usuario de Supabase
}

export function TiendaClient({ initialProducts, user }: TiendaClientProps) {
  const { addToCart } = useCart()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  // Lógica de filtrado memorizada
  const filteredProducts = useMemo(() => {
    return initialProducts.filter(product => {
      const matchesSearch = product.Nombre.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            (product.Descripcion && product.Descripcion.toLowerCase().includes(searchTerm.toLowerCase()))
      
      const cat = product.Categoria ? product.Categoria.toLowerCase() : ""
      const matchesCategory = selectedCategory === "all" ? true : cat === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [initialProducts, searchTerm, selectedCategory])

  return (
    <div className="flex min-h-screen flex-col">
      {/* Dark banner */}
      <div className="bg-bg-surface border-b border-border-dark py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
            <div className="space-y-4">
              <div className="text-gold font-black uppercase tracking-[0.3em] text-[10px] mb-2">El Mercado</div>
              <h1 className="font-heading font-black text-4xl sm:text-5xl text-text-primary uppercase tracking-tight">
                Equipamiento de Aventurero
              </h1>
              <p className="text-text-muted text-lg max-w-2xl leading-relaxed font-sans italic">
                «Equípate para tu próxima aventura con nuestra selección de artefactos, forjados en la fragua de la experiencia.»
              </p>
            </div>
            {user && (
              <Button variant="outline" className="border-border-dark text-text-muted hover:bg-bg-raised hover:text-gold rounded font-bold uppercase text-[10px] tracking-[0.2em] px-6 h-12 transition-all" onClick={() => window.location.href = '/perfil'}>
                <User className="h-4 w-4 mr-2" />
                Mi Cuenta
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Light content area */}
      <div className="bg-bg-light min-h-screen px-4 py-12">
        <div className="container mx-auto max-w-7xl">
          {/* Toolbar */}
          <div className="flex flex-col md:flex-row gap-8 mb-16 items-center">
            <div className="relative flex-1 group w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#242528]/40 group-focus-within:text-[#EE8600] transition-colors" />
              <Input
                placeholder="Buscar artefactos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-14 bg-white border border-[#e5e0d8] focus:border-gold text-lg font-sans rounded placeholder:text-[#242528]/30 text-[#242528] transition-all"
              />
            </div>
            <div className="w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
              <StoreFilters selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />
            </div>
          </div>

          {/* Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-32 bg-white border border-dashed border-[#e5e0d8]">
              <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-[#e5e0d8]">
                <Package className="h-8 w-8 text-[#242528]/30" />
              </div>
              <h3 className="text-2xl font-heading font-bold text-[#242528] uppercase tracking-tight">No se encontraron artefactos</h3>
              <p className="text-[#242528]/60 font-sans mt-2">Intenta con otros términos o categorías.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map((product: Producto) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={(p) => addToCart(p)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
