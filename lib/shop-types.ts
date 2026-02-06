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
