"use client"

import { useCart } from "@/components/tienda/cart-context"
import { Button } from "@/components/ui/button"
import { X, ShoppingCart, Minus, Plus, Trash2, Package } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import Image from "next/image"
import { supabase } from "@/lib/supabase"

import { useRouter } from "next/navigation"

export function CartSidebar() {
    const router = useRouter()
    const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, total, clearCart } = useCart()
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
        
        // Verificar usuario
        const { data: { user } } = await supabase.auth.getUser()
        
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
            <div className="relative w-full sm:w-[400px] h-full bg-white border-l-2 border-[#242528] shadow-2xl p-6 flex flex-col animate-in slide-in-from-right duration-300">
                <div className="flex items-center justify-between mb-6 border-b-2 border-[#242528] pb-4">
                    <h2 className="font-heading font-black text-2xl uppercase tracking-tighter text-[#242528]">Tu Carrito</h2>
                    <Button variant="ghost" size="icon" onClick={() => setIsCartOpen(false)} className="text-[#242528] hover:bg-[#242528] hover:text-white transition-colors rounded-none">
                        <X className="h-5 w-5" />
                    </Button>
                </div>

                <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                    {cart.length === 0 ? (
                        <div className="text-center py-10 text-[#242528]/40">
                            <ShoppingCart className="h-12 w-12 mx-auto mb-3 opacity-20" />
                            <p className="font-bold uppercase tracking-wide">Tu inventario está vacío.</p>
                        </div>
                    ) : (
                        cart.map((item) => (
                            <div key={item.id} className="flex gap-4 p-3 border border-[#E1E1E1] items-center bg-[#F9F9F9]">
                                <div className="h-16 w-16 bg-[#242528] flex items-center justify-center relative overflow-hidden shrink-0 border border-[#E1E1E1]">
                                   {item.Imagen_url ? (
                                        <Image src={item.Imagen_url} alt={item.Nombre} fill className="object-cover" />
                                   ) : <Package className="h-6 w-6 text-white" />}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-bold text-sm text-[#242528] truncate uppercase tracking-tight">{item.Nombre}</h4>
                                    <p className="text-sm text-[#EE8600] font-bold">{formatPrice(item.Precio * item.cantidad)}</p>
                                    <div className="flex items-center gap-2 mt-2">
                                        <Button variant="outline" size="icon" className="h-6 w-6 rounded-none border-[#E1E1E1] hover:bg-[#242528] hover:text-white" onClick={() => updateQuantity(item.id, -1)}>
                                            <Minus className="h-3 w-3" />
                                        </Button>
                                        <span className="text-xs w-6 text-center font-bold text-[#242528]">{item.cantidad}</span>
                                        <Button variant="outline" size="icon" className="h-6 w-6 rounded-none border-[#E1E1E1] hover:bg-[#242528] hover:text-white" onClick={() => updateQuantity(item.id, 1)}>
                                            <Plus className="h-3 w-3" />
                                        </Button>
                                    </div>
                                </div>
                                <Button variant="ghost" size="icon" className="text-[#242528]/40 hover:text-red-600 rounded-none" onClick={() => removeFromCart(item.id)}>
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        ))
                    )}
                </div>

                <div className="pt-6 mt-4 border-t-2 border-[#242528]">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-[#242528] font-bold uppercase tracking-widest text-sm">Total</span>
                        <span className="text-2xl font-black text-[#EE8600]">{formatPrice(total)}</span>
                    </div>
                    <Button 
                        className="w-full bg-[#EE8600] hover:bg-[#EE8600]/90 text-white py-6 text-lg font-black uppercase tracking-widest shadow-sm transition-all rounded-none" 
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
