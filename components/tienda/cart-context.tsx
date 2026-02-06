"use client"

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react"
import { Producto, CartItem } from "@/lib/shop-types"
import { toast } from "sonner"

interface CartContextType {
    cart: CartItem[]
    isCartOpen: boolean
    setIsCartOpen: (open: boolean) => void
    addToCart: (product: Producto) => void
    removeFromCart: (productId: string) => void
    updateQuantity: (productId: string, delta: number) => void
    clearCart: () => void
    total: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

/**
 * Proveedor del contexto del carrito con optimizaciones de rendimiento.
 * Utiliza memoización para evitar re-renders innecesarios de los consumidores.
 */
export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([])
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [isMounted, setIsMounted] = useState(false)

    // Cargar carrito desde localStorage al montar
    useEffect(() => {
        setIsMounted(true)
        const savedCart = localStorage.getItem("lataberna-cart")
        if (savedCart) {
            try {
                setCart(JSON.parse(savedCart))
            } catch (e) {
                console.error("Error parsing cart", e)
            }
        }
    }, [])

    // Persistir cambios en localStorage
    useEffect(() => {
        if (isMounted) {
            localStorage.setItem("lataberna-cart", JSON.stringify(cart))
        }
    }, [cart, isMounted])

    /**
     * Añade un producto al carrito de compras.
     * Si el producto ya existe, incrementa su cantidad en 1.
     * Abre automáticamente el sidebar del carrito para feedback visual.
     * 
     * @param {Producto} product - El objeto del producto a añadir.
     */
    const addToCart = useCallback((product: Producto) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id)
            if (existing) {
                return prev.map(item => 
                    item.id === product.id ? { ...item, cantidad: item.cantidad + 1 } : item
                )
            }
            return [...prev, { ...product, cantidad: 1 }]
        })
        toast.success("Añadido al carrito", { position: "bottom-right" })
        setIsCartOpen(true)
    }, [])

    /**
     * Elimina un producto del carrito basándose en su ID único.
     * 
     * @param {string} productId - ID del producto a eliminar.
     */
    const removeFromCart = useCallback((productId: string) => {
        setCart(prev => prev.filter(item => item.id !== productId))
    }, [])

    /**
     * Actualiza la cantidad de un producto existente.
     * Asegura que la cantidad mínima sea 1.
     * 
     * @param {string} productId - ID del producto a actualizar.
     * @param {number} delta - Cambio en la cantidad (ej: +1 o -1).
     */
    const updateQuantity = useCallback((productId: string, delta: number) => {
        setCart(prev => prev.map(item => {
            if (item.id === productId) {
                const newQty = Math.max(1, item.cantidad + delta)
                return { ...item, cantidad: newQty }
            }
            return item
        }))
    }, [])

    /**
     * Vacía completamente el carrito.
     */
    const clearCart = useCallback(() => setCart([]), [])

    /**
     * Cálculo memorizado del precio total del carrito.
     */
    const total = useMemo(() => 
        cart.reduce((sum, item) => sum + (item.Precio * item.cantidad), 0),
    [cart])

    /**
     * Valor del contexto memorizado para evitar re-renders de los consumidores
     * cuando otros estados no relacionados cambian.
     */
    const contextValue = useMemo(() => ({
        cart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        total
    }), [cart, isCartOpen, addToCart, removeFromCart, updateQuantity, clearCart, total])

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    )
}

/**
 * Hook personalizado para acceder al contexto del carrito.
 */
export function useCart() {
    const context = useContext(CartContext)
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider")
    }
    return context
}
