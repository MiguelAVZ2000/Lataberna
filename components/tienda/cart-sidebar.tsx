"use client"

import { useCart } from "@/components/tienda/cart-context"
import { Button } from "@/components/ui/button"
import { X, ShoppingCart, Minus, Plus, Trash2, Package } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import Image from "next/image"
import { useAuth } from "@/components/auth/auth-context"
import { useRouter } from "next/navigation"

export function CartSidebar() {
    const router = useRouter()
    const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, total, clearCart } = useCart()
    const { user } = useAuth()
    const [isCheckingOut, setIsCheckingOut] = useState(false)

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('es-CL', {
            style: 'currency',
            currency: 'CLP',
            minimumFractionDigits: 0
        }).format(price)
    }

    const handleCheckout = async () => {
        if (cart.length === 0) return
        
        if (!user) {
            toast.error("Debes iniciar sesión para comprar")
            router.push("/login?returnUrl=/tienda/checkout")
            setIsCartOpen(false)
            return
        }

        router.push("/tienda/checkout")
        setIsCartOpen(false)
    }

    if (!isCartOpen) return null

    return (
        <div className="fixed inset-0 z-[100] flex items-start justify-end sm:items-center">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
                onClick={() => setIsCartOpen(false)}
            />
            
            {/* Cart Content */}
            <div
                role="dialog"
                aria-modal="true"
                aria-label="Carrito de compras"
                className="relative w-full sm:w-[400px] h-full bg-bg-base border-l-2 border-border-dark shadow-2xl flex flex-col animate-in slide-in-from-right duration-300"
            >
                <div className="flex items-center justify-between px-6 py-5 border-b border-gold bg-bg-base">
                    <h2 className="font-heading font-black text-2xl uppercase tracking-tighter text-text-primary">Tu Carrito</h2>
                    <Button variant="ghost" size="icon" aria-label="Cerrar carrito" onClick={() => setIsCartOpen(false)} className="text-text-primary hover:bg-bg-raised transition-colors rounded">
                        <X className="h-5 w-5" />
                    </Button>
                </div>

                <div className="flex-1 overflow-y-auto space-y-0 bg-bg-surface p-4">
                    {cart.length === 0 ? (
                        <div className="text-center py-10 text-text-muted">
                            <ShoppingCart className="h-12 w-12 mx-auto mb-3 opacity-30" />
                            <p className="font-bold uppercase tracking-wide">Tu inventario está vacío.</p>
                        </div>
                    ) : (
                        <div className="space-y-2">
                        {cart.map((item) => (
                            <div key={item.id} className="flex gap-4 p-3 border-b border-border-dark items-center">
                                <div className="h-16 w-16 bg-bg-raised flex items-center justify-center relative overflow-hidden shrink-0 border border-border-dark">
                                   {item.Imagen_url ? (
                                        <Image src={item.Imagen_url} alt={item.Nombre} fill sizes="64px" className="object-cover" />
                                   ) : <Package className="h-6 w-6 text-text-muted" />}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-bold text-sm text-text-primary truncate uppercase tracking-tight">{item.Nombre}</h4>
                                    <p className="text-sm text-gold font-bold">{formatPrice(item.Precio * item.cantidad)}</p>
                                    <div className="flex items-center gap-2 mt-2">
                                        <Button variant="outline" size="icon" className="h-6 w-6 rounded border-border-dark bg-bg-raised hover:bg-bg-surface text-text-primary" onClick={() => updateQuantity(item.id, -1)}>
                                            <Minus className="h-3 w-3" />
                                        </Button>
                                        <span className="text-xs w-6 text-center font-bold text-text-primary">{item.cantidad}</span>
                                        <Button variant="outline" size="icon" className="h-6 w-6 rounded border-border-dark bg-bg-raised hover:bg-bg-surface text-text-primary" onClick={() => updateQuantity(item.id, 1)}>
                                            <Plus className="h-3 w-3" />
                                        </Button>
                                    </div>
                                </div>
                                <Button variant="ghost" size="icon" className="text-text-muted hover:text-red-400 rounded" onClick={() => removeFromCart(item.id)}>
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                        </div>
                    )}
                </div>

                <div className="px-6 pt-5 pb-6 mt-0 border-t border-border-dark bg-bg-surface">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-text-primary font-bold uppercase tracking-widest text-sm">Total</span>
                        <span className="text-2xl font-black text-gold">{formatPrice(total)}</span>
                    </div>
                    <Button
                        className="w-full bg-gold hover:bg-gold/90 text-white py-6 text-lg font-black uppercase tracking-widest shadow-sm transition-all rounded"
                        disabled={cart.length === 0 || isCheckingOut}
                        onClick={handleCheckout}
                    >
                        {isCheckingOut ? "Procesando..." : "Realizar Pedido"}
                    </Button>
                </div>
            </div>
        </div>
    )
}
