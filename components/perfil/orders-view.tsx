"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ShoppingBag, Calendar, Truck, MapPin } from "lucide-react"
import Link from "next/link"

export function OrdersView({ sales }: { sales: any[] }) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0
    }).format(price)
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex justify-between items-end border-b-2 border-black pb-4">
            <h2 className="text-3xl font-heading font-black uppercase tracking-tight">Historial de Compras</h2>
            <Link href="/tienda">
                <Button variant="outline" className="border-2 border-black rounded-none font-black uppercase tracking-widest text-[10px] h-12 px-6 hover:bg-black hover:text-[#EE8600] transition-all">
                    <ShoppingBag className="mr-2 h-4 w-4" /> Ir a la Tienda
                </Button>
            </Link>
        </div>

        {sales.length === 0 ? (
            <div className="text-center py-24 border-4 border-dashed border-gray-200 bg-gray-50/50">
                <ShoppingBag className="h-16 w-16 mx-auto text-gray-300 mb-6" />
                <h3 className="text-xl font-black uppercase">Sin pedidos</h3>
                <p className="text-gray-500 font-sans">No se han encontrado registros de compras en tu cuenta.</p>
            </div>
        ) : (
            <div className="grid grid-cols-1 gap-8">
                {sales.map((sale) => (
                    <Card key={sale.id} className="border-2 border-black rounded-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                        <CardHeader className="bg-[#F9F9F9] border-b-2 border-black p-6">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                    <div className="h-12 w-12 rounded-none bg-black flex items-center justify-center text-[#EE8600]">
                                        <ShoppingBag className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <CardTitle className="font-heading text-lg font-black uppercase tracking-tight">Pedido #{sale.id.slice(0, 8)}</CardTitle>
                                        <CardDescription className="flex items-center gap-2 text-[10px] font-bold uppercase text-gray-400">
                                            <Calendar className="h-3 w-3" />
                                            {new Date(sale.fecha).toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' })}
                                        </CardDescription>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="font-black text-2xl text-[#EE8600] tabular-nums">{formatPrice(sale.total)}</div>
                                    <Badge className={`rounded-none font-black uppercase tracking-widest text-[9px] ${
                                        sale.estado === 'completado' ? 'bg-green-500 text-white' : 'bg-[#EE8600] text-white'
                                    }`}>
                                        {sale.estado.toUpperCase()}
                                    </Badge>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="p-6 space-y-6 bg-white">
                            <div className="space-y-3">
                                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 border-b pb-1 mb-2">Artículos adquiridos</h4>
                                {sale.items.map((item: any, idx: number) => (
                                    <div key={idx} className="flex justify-between text-sm font-bold border-b border-gray-50 pb-2">
                                        <span className="text-black uppercase tracking-tight">
                                            <span className="text-[#EE8600] mr-2">{item.cantidad}X</span>
                                            {item.nombre}
                                        </span>
                                        <span className="text-gray-400 tabular-nums">{formatPrice(item.precio * item.cantidad)}</span>
                                    </div>
                                ))}
                            </div>

                            {sale.direccion_envio && (
                                <div className="p-4 bg-gray-50 border-2 border-black rounded-none space-y-2 mt-4">
                                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#EE8600]">
                                        <Truck className="h-3 w-3" /> Información de Envío
                                    </div>
                                    <p className="text-sm font-bold flex items-start gap-2">
                                        <MapPin className="h-4 w-4 mt-0.5 text-gray-400" />
                                        <span>
                                            {sale.direccion_envio.calle}, {sale.direccion_envio.comuna}<br/>
                                            <span className="text-xs text-gray-500 font-sans italic">{sale.direccion_envio.region}</span>
                                        </span>
                                    </p>
                                    <p className="text-xs font-bold text-gray-400">CONTACTO: {sale.direccion_envio.telefono}</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>
        )}
    </div>
  )
}
