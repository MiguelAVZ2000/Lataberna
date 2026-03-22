"use client"

import Image from "next/image"
import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Producto } from "@/lib/shop-types"

interface ProductCardProps {
  product: Producto
  onAddToCart?: (product: Producto) => void
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const imageUrl = product.Imagen_url || "/placeholder.svg"

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
        minimumFractionDigits: 0
    }).format(price)
  }

  return (
    <Link href={`/tienda/${product.id}`} className="group block">
      <Card className="overflow-hidden border-[#e5e0d8] bg-white transition-all duration-300 hover:border-gold/50 hover:shadow-[0_4px_20px_rgba(238,134,0,0.12)] hover:-translate-y-0.5">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-[#F9F9F9]">
          <Image
            src={imageUrl}
            alt={product.Nombre}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {!product.Activo && (
            <div className="absolute top-3 left-3">
              <Badge className="bg-destructive text-destructive-foreground font-semibold">
                Inactivo
              </Badge>
            </div>
          )}
          {product.Stock <= 0 && product.Activo && (
            <div className="absolute top-3 left-3">
              <Badge className="bg-gray-500 text-white font-semibold">
                Agotado
              </Badge>
            </div>
          )}

          {/* Quick Add Button */}
          <div className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-black/80 to-transparent p-4 transition-transform duration-300 group-hover:translate-y-0">
            <Button
              onClick={(e) => { e.preventDefault(); onAddToCart?.(product) }}
              disabled={product.Stock <= 0 || !product.Activo}
              className="w-full bg-[#EE8600] text-white hover:bg-[#EE8600]/90 font-bold uppercase tracking-wider text-xs"
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              {product.Stock > 0 ? "Agregar al Carrito" : "Agotado"}
            </Button>
          </div>
        </div>

        {/* Content */}
        <CardContent className="p-4">
          <div className="mb-2 text-[10px] font-bold uppercase tracking-widest text-[#242528]/50 border border-[#e5e0d8] px-2 py-0.5 inline-block">
            {product.Categoria || "General"}
          </div>
          <h3 className="font-heading text-lg font-bold text-[#242528] line-clamp-1 group-hover:text-gold transition-colors">
            {product.Nombre}
          </h3>
          <p className="mt-1 text-sm text-[#242528]/70 line-clamp-2 font-sans">
            {product.Descripcion}
          </p>
        </CardContent>

        {/* Footer */}
        <CardFooter className="p-4 pt-0">
          <div className="flex items-baseline gap-2">
            <span className="font-heading text-xl font-bold text-gold">
              {formatPrice(product.Precio)}
            </span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}
