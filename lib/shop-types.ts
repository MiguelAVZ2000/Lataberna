export interface Producto {
  id: string
  Nombre: string
  Descripcion: string | null
  Precio: number
  Imagen_url: string | null
  Categoria: string | null
  Stock: number
  Activo: boolean
  Creado_en: string
}

export interface CartItem extends Producto {
  cantidad: number
}

export interface Venta {
  id: string
  usuario_id: string
  items: CartItem[]
  total: number
  estado?: string
  direccion_envio?: Record<string, unknown>
  metodo_pago?: string
  datos_facturacion?: Record<string, unknown>
  fecha: string
}
