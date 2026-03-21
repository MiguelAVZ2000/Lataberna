import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { ProductCard } from "@/components/tienda/product-card"
import { Producto } from "@/lib/shop-types"
import { ArrowRight } from "lucide-react"

/**
 * Server Component que muestra los 4 productos más recientes activos.
 * Se renderiza en el servidor — no requiere estado ni efectos cliente.
 * Fallback silencioso: si Supabase falla, no rompe el home.
 */
export async function FeaturedProducts() {
  const supabase = await createClient()

  const { data: products, error } = await supabase
    .from("productos")
    .select("*")
    .eq("Activo", true)
    .order("Creado_en", { ascending: false })
    .limit(4)

  if (error || !products || products.length === 0) return null

  return (
    <section className="py-24 bg-bg-light">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="text-gold font-black uppercase tracking-[0.3em] text-[10px] mb-3">Equipamiento Destacado</div>
            <h2 className="font-heading font-black text-4xl sm:text-5xl tracking-tight text-[#1c1a17] uppercase">
              EL MERCADO
            </h2>
          </div>
          <Link
            href="/tienda"
            className="hidden sm:flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-[#1c1a17]/60 hover:text-gold transition-colors"
          >
            Ver todo <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Divider */}
        <div
          className="h-px mb-12"
          style={{ background: "linear-gradient(to right, #EE8600 0%, rgba(238,134,0,0.2) 100%)" }}
        />

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {(products as Producto[]).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="mt-10 text-center sm:hidden">
          <Link
            href="/tienda"
            className="inline-flex items-center gap-2 bg-[#1c1a17] text-white font-black uppercase tracking-widest text-xs px-8 py-3"
          >
            Ver toda la tienda <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
