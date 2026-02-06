"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { useCart } from "@/components/tienda/cart-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { 
  ShoppingBag, 
  MapPin, 
  Truck, 
  CreditCard, 
  ChevronRight, 
  Package, 
  Store, 
  Tag, 
  Lock,
  Search,
  CheckCircle2,
  Info
} from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { AddressAutocomplete } from "@/components/tienda/address-autocomplete"
import { regiones } from "@/lib/regiones-data"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { cn } from "@/lib/utils"

const checkoutSchema = z.object({
  email: z.string().email("Correo inválido"),
  novedades: z.boolean().default(false),
  nombre: z.string().min(2, "Nombre requerido"),
  apellidos: z.string().min(2, "Apellidos requeridos"),
  calle: z.string().min(5, "Dirección completa requerida"),
  referencia: z.string().optional(),
  region: z.string().min(1, "Selecciona una región"),
  comuna: z.string().min(1, "Selecciona una comuna"),
  codigoPostal: z.string().optional(),
  telefono: z.string().min(8, "Teléfono inválido"),
  metodoEnvio: z.enum(["domicilio", "retiro"]).default("domicilio"),
  tipoDocumento: z.enum(["boleta", "factura"]).default("boleta"),
  rut: z.string().min(8, "RUT inválido"),
  metodoPago: z.enum(["mercadopago", "tarjeta", "transferencia"]).default("mercadopago"),
  guardarInfo: z.boolean().default(false)
})

type CheckoutValues = z.infer<typeof checkoutSchema>

export function CheckoutClient({ user }: { user: any }) {
    const { cart, total, clearCart } = useCart()
    const router = useRouter()
    const [isProcessing, setIsProcessing] = useState(false)
    const [couponCode, setCouponCode] = useState("")

    const form = useForm<CheckoutValues>({
        resolver: zodResolver(checkoutSchema),
        defaultValues: {
            email: user?.email || "",
            novedades: false,
            nombre: "",
            apellidos: "",
            calle: "",
            referencia: "",
            region: "",
            comuna: "",
            codigoPostal: "",
            telefono: "",
            metodoEnvio: "domicilio",
            tipoDocumento: "boleta",
            rut: "",
            metodoPago: "mercadopago",
            guardarInfo: false
        }
    })

    const selectedRegion = form.watch("region")
    const metodoEnvio = form.watch("metodoEnvio")
    const filteredComunas = useMemo(() => {
        return regiones.find(r => r.nombre === selectedRegion)?.comunas || []
    }, [selectedRegion])

    const regionCost = useMemo(() => {
        if (!selectedRegion) return 0
        const isMetropolitana = selectedRegion.toLowerCase().includes("metropolitana")
        return isMetropolitana ? 3500 : 7000
    }, [selectedRegion])

    const shippingCost = useMemo(() => {
        if (metodoEnvio === "retiro") return 0
        return regionCost
    }, [regionCost, metodoEnvio])

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('es-CL', {
            style: 'currency',
            currency: 'CLP',
            minimumFractionDigits: 0
        }).format(price)
    }

    const onSubmit = async (data: CheckoutValues) => {
        setIsProcessing(true)
        try {
            const { error } = await supabase
                .from('ventas')
                .insert({
                    usuario_id: user.id,
                    total: total + shippingCost,
                    estado: 'pendiente',
                    items: cart.map(item => ({
                        producto_id: item.id,
                        nombre: item.Nombre,
                        cantidad: item.cantidad,
                        precio: item.Precio
                    })),
                    direccion_envio: {
                        nombre: `${data.nombre} ${data.apellidos}`,
                        calle: data.calle,
                        referencia: data.referencia,
                        comuna: data.comuna,
                        region: data.region,
                        telefono: data.telefono,
                        email: data.email,
                        metodo_envio: data.metodoEnvio
                    },
                    metodo_pago: data.metodoPago,
                    datos_facturacion: {
                        tipo: data.tipoDocumento,
                        rut: data.rut
                    }
                })

            if (error) throw error

            toast.success("¡Compra realizada con éxito!", {
                description: "Te hemos enviado un correo con los detalles."
            })
            clearCart()
            router.push("/perfil/pedidos")
        } catch (error: any) {
            console.error("Error finalizing order:", error)
            toast.error("Error al procesar la compra")
        } finally {
            setIsProcessing(false)
        }
    }

    if (cart.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-32 space-y-8 animate-in fade-in duration-500">
                <div className="h-24 w-24 bg-gray-50 rounded-full flex items-center justify-center border-2 border-dashed border-gray-200">
                    <ShoppingBag className="h-10 w-10 text-gray-300" />
                </div>
                <div className="text-center">
                    <h2 className="text-3xl font-black uppercase tracking-tight">Tu carrito está vacío</h2>
                    <p className="text-gray-500 mt-2">Agrega algunos artículos del tesoro antes de pagar.</p>
                </div>
                <Button 
                  className="bg-black hover:bg-[#EE8600] text-white rounded-none px-12 h-14 font-black uppercase tracking-widest text-[11px] transition-all"
                  onClick={() => router.push("/tienda")}
                >
                    Explorar la Tienda
                </Button>
            </div>
        )
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="flex flex-col lg:flex-row gap-16">
                    {/* Left Column: Forms */}
                    <div className="flex-1 space-y-12">
                        {/* Section: Email & Marketing */}
                        <div className="space-y-4">
                           <div className="flex items-center justify-between">
                             <h2 className="text-2xl font-black uppercase tracking-tight">Contacto</h2>
                           </div>
                           <FormField
                             control={form.control}
                             name="email"
                             render={({ field }) => (
                               <FormItem>
                                 <FormControl>
                                   <Input placeholder="Correo electrónico" className="h-12 rounded-none border-gray-200 focus-visible:ring-0 focus-visible:border-black bg-white" {...field} />
                                 </FormControl>
                                 <FormMessage className="text-[10px] uppercase font-bold" />
                               </FormItem>
                             )}
                           />
                           <FormField
                             control={form.control}
                             name="novedades"
                             render={({ field }) => (
                               <FormItem className="flex items-center space-x-3 space-y-0">
                                 <FormControl>
                                   <Checkbox 
                                     checked={field.value} 
                                     onCheckedChange={field.onChange} 
                                     className="rounded-none border-gray-300 data-[state=checked]:bg-black"
                                   />
                                 </FormControl>
                                 <FormLabel className="text-xs text-gray-600 font-medium">Enviarme novedades y ofertas por correo electrónico</FormLabel>
                               </FormItem>
                             )}
                           />
                        </div>

                        {/* Section: Delivery Address */}
                        <div className="space-y-6">
                            <h2 className="text-2xl font-black uppercase tracking-tight">Entrega</h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="nombre"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input placeholder="Nombre" className="h-12 rounded-none border-gray-200 focus-visible:ring-0 focus-visible:border-black bg-white" {...field} />
                                            </FormControl>
                                            <FormMessage className="text-[10px] uppercase font-bold" />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="apellidos"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input placeholder="Apellidos" className="h-12 rounded-none border-gray-200 focus-visible:ring-0 focus-visible:border-black bg-white" {...field} />
                                            </FormControl>
                                            <FormMessage className="text-[10px] uppercase font-bold" />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="calle"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <AddressAutocomplete 
                                                value={field.value}
                                                onChange={field.onChange}
                                                onAddressSelect={(address) => {
                                                    if (address.region) {
                                                        const matchedRegion = regiones.find(r => 
                                                            address.region.toLowerCase().includes(r.nombre.toLowerCase()) || 
                                                            r.nombre.toLowerCase().includes(address.region.toLowerCase())
                                                        )
                                                        if (matchedRegion) {
                                                            form.setValue("region", matchedRegion.nombre)
                                                            setTimeout(() => {
                                                                if (address.comuna) {
                                                                    const comunas = matchedRegion.comunas
                                                                    const matchedComuna = comunas.find(c => 
                                                                        c.toLowerCase() === address.comuna.toLowerCase() ||
                                                                        address.comuna.toLowerCase().includes(c.toLowerCase())
                                                                    )
                                                                    if (matchedComuna) {
                                                                        form.setValue("comuna", matchedComuna)
                                                                    }
                                                                }
                                                            }, 100)
                                                        }
                                                    }
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-[10px] uppercase font-bold" />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="referencia"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input placeholder="Casa, apartamento, depto, etc. (opcional)" className="h-12 rounded-none border-gray-200 focus-visible:ring-0 focus-visible:border-black bg-white" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <FormField
                                    control={form.control}
                                    name="region"
                                    render={({ field }) => (
                                        <FormItem>
                                            <Select onValueChange={(val) => {
                                                field.onChange(val)
                                                form.setValue("comuna", "")
                                            }} value={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className="h-12 rounded-none border-gray-200 focus:ring-0 bg-white shadow-none">
                                                        <SelectValue placeholder="Región" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent className="rounded-none border border-gray-200 bg-white shadow-lg z-[100]">
                                                    {regiones.map(r => (
                                                        <SelectItem key={r.id} value={r.nombre}>{r.nombre}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage className="text-[10px] uppercase font-bold" />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="comuna"
                                    render={({ field }) => (
                                        <FormItem>
                                            <Select onValueChange={field.onChange} value={field.value} disabled={!selectedRegion}>
                                                <FormControl>
                                                    <SelectTrigger className="h-12 rounded-none border-gray-200 focus:ring-0 bg-white shadow-none">
                                                        <SelectValue placeholder="Comuna" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent className="rounded-none border border-gray-200 max-h-60 bg-white shadow-lg z-[100]">
                                                    {filteredComunas.map(c => (
                                                        <SelectItem key={c} value={c}>{c}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage className="text-[10px] uppercase font-bold" />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="codigoPostal"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input placeholder="Cód. Postal (opcional)" className="h-12 rounded-none border-gray-200 focus-visible:ring-0 focus-visible:border-black bg-white" {...field} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="telefono"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className="relative">
                                              <Input placeholder="Teléfono" className="h-12 rounded-none border-gray-200 focus-visible:ring-0 focus-visible:border-black pl-4 bg-white" {...field} />
                                              <Info className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-300" />
                                            </div>
                                        </FormControl>
                                        <FormMessage className="text-[10px] uppercase font-bold" />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="guardarInfo"
                                render={({ field }) => (
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <Checkbox checked={field.value} onCheckedChange={field.onChange} className="rounded-none border-gray-300 data-[state=checked]:bg-black" />
                                        </FormControl>
                                        <FormLabel className="text-xs text-gray-600 font-medium">Guardar mi información y consultar más rápidamente la próxima vez</FormLabel>
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Section: Shipping Methods */}
                        <div className="space-y-6">
                            <h2 className="text-2xl font-black uppercase tracking-tight">Métodos de envío</h2>
                            <FormField
                                control={form.control}
                                name="metodoEnvio"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                                value={field.value}
                                                className="grid gap-0 border border-gray-200 rounded-none overflow-hidden"
                                            >
                                                <Label 
                                                  className={cn(
                                                    "flex items-center justify-between p-4 border-b border-gray-200 cursor-pointer transition-colors hover:bg-gray-50",
                                                    field.value === "domicilio" ? "bg-gray-50 ring-1 ring-inset ring-black" : ""
                                                  )}
                                                  htmlFor="domicilio"
                                                >
                                                  <div className="flex items-center space-x-4">
                                                    <RadioGroupItem value="domicilio" id="domicilio" className="border-gray-300 text-black" />
                                                    <span className="font-bold text-sm cursor-pointer">Envío a Domicilio (Recíbelo)</span>
                                                  </div>
                                                  <span className="font-black text-sm">{formatPrice(regionCost || 3500)}</span>
                                                </Label>
                                                
                                                <Label 
                                                  className={cn(
                                                    "flex items-center justify-between p-4 cursor-pointer transition-colors hover:bg-gray-50",
                                                    field.value === "retiro" ? "bg-gray-50 ring-1 ring-inset ring-black" : ""
                                                  )}
                                                  htmlFor="retiro"
                                                >
                                                  <div className="flex items-center space-x-4">
                                                    <RadioGroupItem value="retiro" id="retiro" className="border-gray-300 text-black" />
                                                    <div className="space-y-0.5">
                                                      <span className="font-bold text-sm cursor-pointer">Retiro en Tienda - Sede Central</span>
                                                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">Disponible 24-48h hábiles</p>
                                                    </div>
                                                  </div>
                                                  <span className="font-black text-sm">GRATIS</span>
                                                </Label>
                                            </RadioGroup>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Section: Billing Type */}
                        <div className="space-y-6">
                            <h2 className="text-2xl font-black uppercase tracking-tight">Datos para facturación</h2>
                            <FormField
                                control={form.control}
                                name="tipoDocumento"
                                render={({ field }) => (
                                    <FormItem>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="h-12 rounded-none border-gray-200 focus:ring-0 bg-white shadow-none">
                                                    <SelectValue placeholder="Tipo de documento" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent className="rounded-none border border-gray-200 bg-white shadow-lg z-[100]">
                                                <SelectItem value="boleta">Boleta</SelectItem>
                                                <SelectItem value="factura">Factura</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage className="text-[10px] uppercase font-bold" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="rut"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400">RUT del comprador *</FormLabel>
                                        <FormControl>
                                            <Input placeholder="12.345.678-9" className="h-12 rounded-none border-gray-200 focus-visible:ring-0 focus-visible:border-black bg-white" {...field} />
                                        </FormControl>
                                        <FormMessage className="text-[10px] uppercase font-bold" />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Section: Payment Methods */}
                        <div className="space-y-6 pb-20">
                            <h2 className="text-2xl font-black uppercase tracking-tight">Pago</h2>
                            <p className="text-xs text-gray-400 font-medium">Todas las transacciones son seguras y están encriptadas.</p>
                            
                            <FormField
                                control={form.control}
                                name="metodoPago"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                className="grid gap-0 border border-gray-200 rounded-none overflow-hidden"
                                            >
                                                <div className={cn(
                                                  "p-0 border-b border-gray-200 transition-all",
                                                  field.value === "mercadopago" ? "z-10 bg-white" : ""
                                                )}>
                                                  <div className="flex items-center justify-between p-4 cursor-pointer" onClick={() => field.onChange("mercadopago")}>
                                                    <div className="flex items-center space-x-4">
                                                      <RadioGroupItem value="mercadopago" id="mercadopago" className="border-gray-300 text-black" />
                                                      <Label htmlFor="mercadopago" className="font-bold text-sm cursor-pointer flex items-center gap-2">
                                                        Mercado Pago
                                                      </Label>
                                                    </div>
                                                    <div className="flex gap-1">
                                                      <div className="h-5 w-8 bg-white border border-gray-100 rounded-sm flex items-center justify-center grayscale text-[8px] font-black">VISA</div>
                                                      <div className="h-5 w-8 bg-white border border-gray-100 rounded-sm flex items-center justify-center grayscale text-[8px] font-black">MC</div>
                                                      <div className="h-5 w-8 bg-white border border-gray-100 rounded-sm flex items-center justify-center grayscale text-[8px] font-black">AMEX</div>
                                                    </div>
                                                  </div>
                                                </div>

                                                <div className={cn(
                                                  "flex items-center justify-between p-4 cursor-pointer transition-colors",
                                                  field.value === "transferencia" ? "bg-gray-50 ring-1 ring-inset ring-black" : "hover:bg-gray-50"
                                                )}>
                                                  <div className="flex items-center space-x-4">
                                                    <RadioGroupItem value="transferencia" id="transferencia" className="border-gray-300 text-black" />
                                                    <Label htmlFor="transferencia" className="font-bold text-sm cursor-pointer">Transferencia Electrónica</Label>
                                                  </div>
                                                  <Info className="h-4 w-4 text-gray-300" />
                                                </div>
                                            </RadioGroup>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <Button 
                            type="submit" 
                            disabled={isProcessing}
                            className="w-full h-16 bg-black text-white hover:bg-[#EE8600] rounded-none font-black uppercase tracking-widest text-xs transition-all"
                        >
                            {isProcessing ? "Procesando..." : "Pagar ahora"}
                        </Button>
                    </div>

                    {/* Right Column: Summary */}
                    <div className="lg:w-[480px]">
                        <div className="lg:sticky lg:top-28 space-y-8 bg-gray-50 border-2 border-black p-8">
                            <h2 className="text-sm font-black uppercase tracking-widest border-b-2 border-black pb-4 flex items-center gap-3">
                                <ShoppingBag className="h-4 w-4 text-[#EE8600]" /> Resumen de tu pedido
                            </h2>

                            {/* Cart Items List */}
                            <div className="space-y-6 max-h-[300px] overflow-y-auto pr-2 pt-2 custom-scrollbar">
                                {cart.map(item => (
                                    <div key={item.id} className="flex gap-4 items-center">
                                        <div className="relative h-16 w-16 bg-white border-2 border-black flex-shrink-0 flex items-center justify-center group">
                                            {item.Imagen_url ? (
                                                <Image 
                                                    src={item.Imagen_url} 
                                                    alt={item.Nombre} 
                                                    width={48} 
                                                    height={48} 
                                                    className="h-12 w-12 object-contain" 
                                                />
                                            ) : (
                                                <Package className="h-8 w-8 text-gray-200" />
                                            )}
                                                <span className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 h-5 w-5 bg-black text-white text-[9px] font-black rounded-full flex items-center justify-center border border-white">
                                                    {item.cantidad}
                                                </span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs font-black uppercase tracking-tight truncate">{item.Nombre}</p>
                                            <p className="text-[10px] text-gray-400 font-bold uppercase">{item.Categoria || "Tesoro Directo"}</p>
                                        </div>
                                        <span className="text-sm font-black tabular-nums">{formatPrice(item.Precio * item.cantidad)}</span>
                                    </div>
                                ))}
                            </div>

                            <Separator className="bg-gray-200" />

                            {/* Discount Code */}
                            <div className="flex gap-2">
                                <Input 
                                    placeholder="Código de descuento" 
                                    value={couponCode}
                                    onChange={(e) => setCouponCode(e.target.value)}
                                    className="h-12 rounded-none border-gray-300 focus-visible:ring-0 focus-visible:border-black bg-white" 
                                />
                                <Button 
                                  variant="outline" 
                                  className="h-12 rounded-none border-2 border-black font-black uppercase tracking-widest text-[10px] px-6 hover:bg-black hover:text-white transition-all bg-white"
                                  onClick={(e) => {
                                    e.preventDefault()
                                    toast.error("Código inválido", { description: "Prueba con WELCOME10 (Próximamente)" })
                                  }}
                                >
                                    Aplicar
                                </Button>
                            </div>

                            {/* Calculations */}
                            <div className="space-y-3 pt-4">
                                <div className="flex justify-between text-xs font-bold uppercase text-gray-500">
                                    <span>Subtotal</span>
                                    <span className="text-black">{formatPrice(total)}</span>
                                </div>
                                <div className="flex justify-between text-xs font-bold uppercase text-gray-500">
                                    <span>Envío</span>
                                    <span className="text-black">{shippingCost === 0 ? "GRATIS" : formatPrice(shippingCost)}</span>
                                </div>
                                {form.watch("tipoDocumento") === "factura" && (
                                  <div className="flex justify-between text-xs font-bold uppercase text-gray-500">
                                      <span>IVA (Incl.)</span>
                                      <span className="text-black">{formatPrice(total * 0.19)}</span>
                                  </div>
                                )}
                                <div className="flex justify-between items-end pt-6 border-t-2 border-black mt-4">
                                    <span className="font-black uppercase text-sm tracking-widest">Total</span>
                                    <div className="text-right">
                                        <span className="text-[10px] font-bold text-gray-400 block -mb-1">CLP</span>
                                        <span className="text-4xl font-black text-[#EE8600] tabular-nums leading-none tracking-tighter">
                                          {formatPrice(total + shippingCost).replace("CLP", "").trim()}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Trust Badge */}
                            <div className="pt-6 flex items-center gap-4 border-t border-gray-200">
                                <div className="flex -space-x-2">
                                  <div className="h-8 w-12 bg-white border border-gray-100 rounded-sm flex items-center justify-center shadow-sm grayscale opacity-50"><CreditCard className="h-4 w-4" /></div>
                                  <div className="h-8 w-12 bg-white border border-gray-100 rounded-sm flex items-center justify-center shadow-sm grayscale opacity-50"><CheckCircle2 className="h-4 w-4" /></div>
                                </div>
                                <p className="text-[9px] text-gray-400 font-bold uppercase leading-tight">Pagos protegidos mediante encriptación SSL de nivel militar.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </Form>
    )
}
