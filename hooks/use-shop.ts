"use client"

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export interface Product {
    id: string
    nombre: string
    descripcion: string
    precio: number
    imagen: string
    categoria: string
    destacado: boolean
}

export interface CartItem extends Product {
    cantidad: number
}

export function useShop() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  const fetchProducts = async () => {
    setLoading(true)
    const { data, error } = await supabase
        .from('productos')
        .select('*')
        .order('nombre')
    
    if (!error && data) {
        setProducts(data)
    }
    setLoading(false)
  }

  const buyItems = async (items: CartItem[], total: number) => {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) return { success: false, error: "Debes iniciar sesión para comprar" }

    const { error } = await supabase.from('ventas').insert({
        usuario_id: user.id,
        items: items,
        total: total,
    })

    if (error) return { success: false, error: error.message }
    return { success: true }
  }

  const [sales, setSales] = useState<any[]>([])

  const fetchSales = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { data, error } = await supabase
        .from('ventas')
        .select('*')
        .eq('usuario_id', user.id)
        .order('fecha', { ascending: false })
    
    if (!error && data) {
        setSales(data)
    }
  }

  useEffect(() => {
    fetchProducts()
    fetchSales()
  }, [])

  return { products, sales, loading, buyItems, refresh: fetchProducts, refreshSales: fetchSales }
}
