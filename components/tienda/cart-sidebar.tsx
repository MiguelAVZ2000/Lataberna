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
            <div className="relative w-full sm:w-[400px] h-full bg-white border-l-2 border-[var(--color-dark-section)] shadow-2xl p-6 flex flex-col animate-in slide-in-from-right duration-300">
                <div className="flex items-center justify-between mb-6 border-b-2 border-[var(--color-dark-section)] pb-4">
                    <h2 className="font-heading font-black text-2xl uppercase tracking-tighter text-[var(--color-dark-section)]">Tu Carrito</h2>
                    <Button variant="ghost" size="icon" onClick={() => setIsCartOpen(false)} className="text-[var(--color-dark-section)] hover:bg-[var(--color-dark-section)] hover:text-white transition-colors rounded">
                        <X className="h-5 w-5" />
                    </Button>
                </div>

                <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                    {cart.length === 0 ? (
                        <div className="text-center py-10 text-[var(--color-dark-section)]/40">
                            <ShoppingCart className="h-12 w-12 mx-auto mb-3 opacity-20" />
                            <p className="font-bold uppercase tracking-wide">Tu inventario está vacío.</p>
                        </div>
                    ) : (
                        cart.map((item) => (
                            <div key={item.id} className="flex gap-4 p-3 border border-[var(--color-border)] items-center bg-[var(--color-muted)]">
                                <div className="h-16 w-16 bg-[var(--color-dark-section)] flex items-center justify-center relative overflow-hidden shrink-0 border border-[var(--color-border)]">
                                   {item.Imagen_url ? (
                                        <Image src={item.Imagen_url} alt={item.Nombre} fill sizes="64px" className="object-cover" />
                                   ) : <Package className="h-6 w-6 text-white" />}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-bold text-sm text-[var(--color-dark-section)] truncate uppercase tracking-tight">{item.Nombre}</h4>
                                    <p className="text-sm text-[var(--color-accent-gold)] font-bold">{formatPrice(item.Precio * item.cantidad)}</p>
                                    <div className="flex items-center gap-2 mt-2">
                                        <Button variant="outline" size="icon" className="h-6 w-6 rounded border-[var(--color-border)] hover:bg-[var(--color-dark-section)] hover:text-white" onClick={() => updateQuantity(item.id, -1)}>
                                            <Minus className="h-3 w-3" />
                                        </Button>
                                        <span className="text-xs w-6 text-center font-bold text-[var(--color-dark-section)]">{item.cantidad}</span>
                                        <Button variant="outline" size="icon" className="h-6 w-6 rounded border-[var(--color-border)] hover:bg-[var(--color-dark-section)] hover:text-white" onClick={() => updateQuantity(item.id, 1)}>
                                            <Plus className="h-3 w-3" />
                                        </Button>
                                    </div>
                                </div>
                                <Button variant="ghost" size="icon" className="text-[var(--color-dark-section)]/40 hover:text-red-600 rounded" onClick={() => removeFromCart(item.id)}>
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        ))
                    )}
                </div>

                <div className="pt-6 mt-4 border-t-2 border-[var(--color-dark-section)]">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-[var(--color-dark-section)] font-bold uppercase tracking-widest text-sm">Total</span>
                        <span className="text-2xl font-black text-[var(--color-accent-gold)]">{formatPrice(total)}</span>
                    </div>
                    <Button 
                        className="w-full bg-[var(--color-accent-gold)] hover:bg-[var(--color-accent-gold)]/90 text-white py-6 text-lg font-black uppercase tracking-widest shadow-sm transition-all rounded" 
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
