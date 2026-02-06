"use client"

import { useEffect, useState, use } from "react"
import type { ReactElement } from "react"
import { supabase } from "@/lib/supabase"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { useCart } from "@/components/tienda/cart-context"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Loader2, ShoppingBag, ArrowLeft, Package, ShieldCheck, Truck } from "lucide-react"
import Image from "next/image"
import { Producto } from "@/lib/shop-types"
import Link from "next/link"

export default function ProductPage({ params }: { params: Promise<{ id: string }> }): ReactElement {
    const { addToCart } = useCart()
    const [product, setProduct] = useState<Producto | null>(null)
    const [loading, setLoading] = useState(true)
    const [resolvedParams, setResolvedParams] = useState<{ id: string } | null>(null)

    useEffect(() => {
        params.then(setResolvedParams)
    }, [params])

    useEffect(() => {
        if (!resolvedParams?.id) return

        const fetchProduct = async () => {
            setLoading(true)
            const { data, error } = await supabase
                .from('Productos')
                .select('*')
                .eq('id', resolvedParams.id)
                .single()
            
            if (data) {
                setProduct(data as Producto)
            } else {
                console.error("Error fetching product:", error)
            }
            setLoading(false)
        }

        fetchProduct()
    }, [resolvedParams])

    if (loading) {
        return (
            <div className="flex min-h-screen flex-col bg-background">
                <SiteHeader />
                <main className="flex-1 flex items-center justify-center">
                    <Loader2 className="h-12 w-12 animate-spin text-[#EE8600]" />
                </main>
                <SiteFooter />
            </div>
        )
    }

    if (!product) {
        return (
            <div className="flex min-h-screen flex-col bg-background">
                <SiteHeader />
                <main className="flex-1 flex flex-col items-center justify-center gap-4">
                    <h1 className="text-2xl font-bold uppercase">Producto no encontrado</h1>
                    <Link href="/tienda">
                        <Button variant="outline">Volver a la Tienda</Button>
                    </Link>
                </main>
                <SiteFooter />
            </div>
        )
    }

    const imageUrl = product.Imagen_url || "/placeholder.svg"

    return (
        <div className="flex min-h-screen flex-col bg-background">
            <SiteHeader />
            <main className="flex-1 py-12 lg:py-20 relative bg-white">
                <div className="container mx-auto px-4 max-w-6xl">
                    <Link href="/tienda" className="inline-flex items-center text-sm font-bold text-[#EE8600] uppercase tracking-widest hover:underline mb-8">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Volver al Mercado
                    </Link>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                        {/* Image Column */}
                        <div className="relative aspect-square bg-[#F9F9F9] border border-[#E1E1E1] p-8 shadow-sm group overflow-hidden">
                            <div className="relative w-full h-full">
                                <Image
                                    src={imageUrl}
                                    alt={product.Nombre}
                                    fill
                                    className="object-contain transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>
                            {!product.Activo && (
                                <Badge className="absolute top-4 left-4 bg-destructive text-white uppercase tracking-widest">Inactivo</Badge>
                            )}
                            {product.Stock <= 0 && product.Activo && (
                                <Badge className="absolute top-4 left-4 bg-gray-500 text-white uppercase tracking-widest">Agotado</Badge>
                            )}
                        </div>

                        {/* Info Column */}
                        <div className="flex flex-col space-y-8">
                            <div>
                                <h1 className="font-heading font-black text-5xl lg:text-6xl text-[#242528] uppercase tracking-tighter leading-none mb-4">
                                    {product.Nombre}
                                </h1>
                                <div className="flex items-center gap-4">
                                     <Badge variant="outline" className="text-[#EE8600] border-[#EE8600] font-bold uppercase tracking-widest rounded-none">
                                        {product.Categoria}
                                     </Badge>
                                     <span className="text-sm text-[#242528]/50 font-bold uppercase tracking-widest">
                                        Stock: {product.Stock > 0 ? product.Stock : "Sin stock"}
                                     </span>
                                </div>
                            </div>

                            <div className="text-4xl font-heading font-black text-[#EE8600] uppercase tracking-tighter">
                                ${product.Precio.toLocaleString('es-CL')}
                            </div>

                            <div className="prose prose-stone max-w-none text-[#242528]/80 font-sans leading-relaxed">
                                <p>{product.Descripcion || "Sin descripción disponible."}</p>
                            </div>

                            <div className="border-t border-b border-[#E1E1E1] py-8 space-y-4">
                                <Button 
                                    size="lg" 
                                    className="w-full bg-[#EE8600] hover:bg-[#EE8600]/90 text-white font-black uppercase text-xs tracking-[0.25em] h-16 shadow-lg shadow-[#EE8600]/20 transition-all rounded-none"
                                    onClick={() => addToCart(product)}
                                    disabled={product.Stock <= 0 || !product.Activo}
                                >
                                    <ShoppingBag className="h-5 w-5 mr-3" />
                                    {product.Stock > 0 ? "Añadir al Carrito" : "No Disponible"}
                                </Button>
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-xs font-bold uppercase tracking-widest text-[#242528]/50">
                                <div className="flex items-center gap-2">
                                    <ShieldCheck className="h-5 w-5 text-[#242528]" />
                                    <span>Garantía Arcana</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Truck className="h-5 w-5 text-[#242528]" />
                                    <span>Envío Inmediato</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <SiteFooter />
        </div>
    )
}
