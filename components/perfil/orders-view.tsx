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
        <div className="flex justify-between items-end border-b border-border-dark pb-4">
            <h2 className="text-3xl font-heading font-black uppercase tracking-tight text-text-primary">Historial de Compras</h2>
            <Link href="/tienda">
                <Button variant="outline" className="border border-border-dark text-text-primary rounded font-black uppercase tracking-widest text-[10px] h-12 px-6 hover:bg-bg-raised transition-all">
                    <ShoppingBag className="mr-2 h-4 w-4" /> Ir a la Tienda
                </Button>
            </Link>
        </div>

        {sales.length === 0 ? (
            <div className="text-center py-24 border-4 border-dashed border-border-dark bg-bg-raised/50">
                <ShoppingBag className="h-16 w-16 mx-auto text-text-muted mb-6" />
                <h3 className="text-xl font-black uppercase text-text-primary">Sin pedidos</h3>
                <p className="text-text-muted font-sans">No se han encontrado registros de compras en tu cuenta.</p>
            </div>
        ) : (
            <div className="grid grid-cols-1 gap-8">
                {sales.map((sale) => (
                    <Card key={sale.id} className="border border-border-dark rounded overflow-hidden bg-bg-surface">
                        <CardHeader className="bg-bg-raised border-b border-border-dark p-6">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                    <div className="h-12 w-12 rounded bg-bg-base flex items-center justify-center text-gold border border-border-dark">
                                        <ShoppingBag className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <CardTitle className="font-heading text-lg font-black uppercase tracking-tight text-text-primary">Pedido #{sale.id.slice(0, 8)}</CardTitle>
                                        <CardDescription className="flex items-center gap-2 text-[10px] font-bold uppercase text-text-muted">
                                            <Calendar className="h-3 w-3" />
                                            {new Date(sale.fecha).toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' })}
                                        </CardDescription>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="font-black text-2xl text-gold tabular-nums">{formatPrice(sale.total)}</div>
                                    <Badge className={`rounded font-black uppercase tracking-widest text-[9px] ${
                                        sale.estado === 'completado' ? 'bg-green-500 text-white' : 'bg-gold text-white'
                                    }`}>
                                        {sale.estado.toUpperCase()}
                                    </Badge>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="p-6 space-y-6 bg-bg-surface">
                            <div className="space-y-3">
                                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted border-b border-border-dark pb-1 mb-2">Artículos adquiridos</h4>
                                {sale.items.map((item: any, idx: number) => (
                                    <div key={idx} className="flex justify-between text-sm font-bold border-b border-border-dark pb-2">
                                        <span className="text-text-primary uppercase tracking-tight">
                                            <span className="text-gold mr-2">{item.cantidad}X</span>
                                            {item.nombre}
                                        </span>
                                        <span className="text-text-muted tabular-nums">{formatPrice(item.precio * item.cantidad)}</span>
                                    </div>
                                ))}
                            </div>

                            {sale.direccion_envio && (
                                <div className="p-4 bg-bg-raised border border-border-dark rounded space-y-2 mt-4">
                                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gold">
                                        <Truck className="h-3 w-3" /> Información de Envío
                                    </div>
                                    <p className="text-sm font-bold flex items-start gap-2 text-text-primary">
                                        <MapPin className="h-4 w-4 mt-0.5 text-text-muted" />
                                        <span>
                                            {sale.direccion_envio.calle}, {sale.direccion_envio.comuna}<br/>
                                            <span className="text-xs text-text-muted font-sans italic">{sale.direccion_envio.region}</span>
                                        </span>
                                    </p>
                                    <p className="text-xs font-bold text-text-muted">CONTACTO: {sale.direccion_envio.telefono}</p>
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
