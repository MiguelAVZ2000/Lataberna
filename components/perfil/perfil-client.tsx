"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ShoppingBag, User, Calendar, Plus, ExternalLink, Skull, Truck, MapPin, Settings, Lock, Edit, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { formatDistanceToNow } from 'date-fns'
import { es } from 'date-fns/locale'
import { races, classes, backgrounds } from "@/lib/character-data"
import { generateCharacterPDF } from "@/lib/pdf-service"
import { supabase } from "@/lib/supabase"
import { toast } from "sonner"
import { useState } from "react"

// Tipos reflejando la estructura real de la DB
type Character = {
  id: string
  nombre: string
  raza_id: string
  clase_id: string
  nivel: number
  actualizado_el: string
  biografia: {
    alignment?: string
    personalityTraits?: string
    ideals?: string
    bonds?: string
    flaws?: string
    background?: string
  }
  estadisticas: {
    abilities: any
    skills: string[]
    spells: string[]
  }
}

type Sale = {
  id: string
  total: number
  estado: string
  fecha: string
  items: {
    nombre: string
    cantidad: number
    precio: number
  }[]
  direccion_envio?: {
    calle: string
    ciudad: string
    region: string
    telefono: string
  }
}

interface PerfilClientProps {
  user: any
  characters: any[]
  sales: any[]
  initialProfile: any
}

export function PerfilClient({ user, characters, sales, initialProfile }: PerfilClientProps) {
  const [isUpdating, setIsUpdating] = useState(false)
  const [profile, setProfile] = useState(initialProfile || {
    username: user.user_metadata?.username || user.email?.split('@')[0],
    calle: "",
    ciudad: "",
    region: "",
    telefono: ""
  })

  const [passwords, setPasswords] = useState({
    newPassword: "",
    confirmPassword: ""
  })

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsUpdating(true)
    
    try {
        const { error } = await supabase
            .from('perfiles')
            .upsert({
                id: user.id,
                username: profile.username,
                calle: profile.calle,
                ciudad: profile.ciudad,
                region: profile.region,
                telefono: profile.telefono,
                actualizado_el: new Date().toISOString()
            })

        if (error) throw error

        // También actualizar metadatos para la barra de navegación
        await supabase.auth.updateUser({
            data: { username: profile.username }
        })

        toast.success("Perfil actualizado correctamente")
    } catch (error: any) {
        toast.error("Error al actualizar perfil", {
            description: error.message
        })
    } finally {
        setIsUpdating(false)
    }
  }

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    if (passwords.newPassword !== passwords.confirmPassword) {
        toast.error("Las contraseñas no coinciden")
        return
    }

    setIsUpdating(true)
    try {
        const { error } = await supabase.auth.updateUser({
            password: passwords.newPassword
        })
        if (error) throw error
        toast.success("Contraseña actualizada con éxito")
        setPasswords({ newPassword: "", confirmPassword: "" })
    } catch (error: any) {
        toast.error("Error al cambiar contraseña", {
            description: error.message
        })
    } finally {
        setIsUpdating(false)
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0
    }).format(price)
  }

  const handleDownloadPDF = (char: any) => {
    const race = races.find(r => r.id === char.raza_id)
    const charClass = classes.find(c => c.id === char.clase_id)
    const background = backgrounds.find(b => b.id === char.biografia?.background)

    const fullCharacter = {
        name: char.nombre,
        level: char.nivel,
        race,
        class: charClass,
        background,
        abilities: char.estadisticas.abilities,
        skills: char.estadisticas.skills || [],
        spells: char.estadisticas.spells || [],
        alignment: char.biografia?.alignment,
        personalityTraits: char.biografia?.personalityTraits,
        ideals: char.biografia?.ideals,
        bonds: char.biografia?.bonds,
        flaws: char.biografia?.flaws,
        xp: "0",
        subclass: "",
        subrace: "",
        items: [],
        age: "",
        height: "",
        weight: "",
        eyes: "",
        skin: "",
        hair: "",
        languages: "",
        feats: "",
        equipment: "",
        classFeatures: ""
    }

    generateCharacterPDF(fullCharacter as any, user.email, false)
  }

  return (
    <div className="container mx-auto py-10 max-w-6xl px-4">
      <div className="flex items-center gap-6 mb-12">
        <div className="h-20 w-20 rounded-full bg-black flex items-center justify-center border-4 border-[#EE8600] shadow-xl">
            <User className="h-10 w-10 text-[#EE8600]" />
        </div>
        <div>
            <h1 className="font-heading text-5xl font-black text-[#242528] tracking-tighter uppercase">Mi Perfil</h1>
            <p className="text-[#242528]/60 font-sans">Gestiona tu información personal, personajes y pedidos.</p>
        </div>
      </div>

      <Tabs defaultValue="personajes" className="w-full">
        <TabsList className="bg-[#242528] p-1 h-14 rounded-none mb-10 overflow-x-auto flex flex-nowrap justify-start sm:inline-flex">
          <TabsTrigger value="personajes" className="px-8 font-black uppercase tracking-widest text-[10px] data-[state=active]:bg-[#EE8600] data-[state=active]:text-white rounded-none transition-all flex-1 sm:flex-none">Mis Personajes</TabsTrigger>
          <TabsTrigger value="pedidos" className="px-8 font-black uppercase tracking-widest text-[10px] data-[state=active]:bg-[#EE8600] data-[state=active]:text-white rounded-none transition-all flex-1 sm:flex-none">Historial de Compras</TabsTrigger>
          <TabsTrigger value="editar" className="px-8 font-black uppercase tracking-widest text-[10px] data-[state=active]:bg-[#EE8600] data-[state=active]:text-white rounded-none transition-all flex-1 sm:flex-none">Editar Perfil</TabsTrigger>
        </TabsList>

        <TabsContent value="personajes" className="space-y-4 outline-none">
            <div className="flex justify-between items-end mb-8 border-b-2 border-black pb-4">
                <h2 className="text-3xl font-heading font-black uppercase tracking-tight">Mis Personajes</h2>
                <Link href="/personaje">
                    <Button className="bg-[#EE8600] hover:bg-[#EE8600]/90 text-white rounded-none font-black uppercase tracking-widest text-[10px]">
                        <Plus className="mr-2 h-4 w-4" /> Nuevo Personaje
                    </Button>
                </Link>
            </div>

            {characters.length === 0 ? (
                <div className="text-center py-24 border-4 border-dashed border-gray-200 bg-gray-50/50">
                    <Skull className="h-16 w-16 mx-auto text-gray-300 mb-6" />
                    <h3 className="text-xl font-black uppercase">Sin personajes</h3>
                    <p className="text-gray-500 mb-8 font-sans">No has guardado ningún personaje todavía.</p>
                    <Link href="/personaje">
                        <Button variant="outline" className="border-2 border-black rounded-none font-black uppercase tracking-widest text-[10px]">Crear Primero</Button>
                    </Link>
                </div>
            ) : (
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {characters.map((char) => {
                        const raceName = races.find(r => r.id === char.raza_id)?.name || char.raza_id
                        const className = classes.find(c => c.id === char.clase_id)?.name || char.clase_id
                        
                        return (
                            <Card key={char.id} className="border-2 border-black rounded-none shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all overflow-hidden group">
                                <CardHeader className="bg-black text-white p-6">
                                    <div className="flex justify-between items-start">
                                        <div className="space-y-1">
                                            <CardTitle className="font-heading text-2xl font-black uppercase tracking-tight text-[#EE8600]">{char.nombre}</CardTitle>
                                            <CardDescription className="text-gray-400 font-black uppercase text-[10px] tracking-widest">
                                                {raceName} {className} • Nivel {char.nivel}
                                            </CardDescription>
                                        </div>
                                        <Badge variant="outline" className="text-[9px] border-[#EE8600] text-[#EE8600] font-black uppercase rounded-none">
                                            {formatDistanceToNow(new Date(char.actualizado_el), { addSuffix: true, locale: es })}
                                        </Badge>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-6 text-sm text-gray-600 bg-white min-h-[100px]">
                                    <div className="line-clamp-3 italic font-sans leading-relaxed">
                                        «{char.biografia?.personalityTraits || "Un aventurero cuyo destino aún está por escribirse en las crónicas de la Taberna..."}»
                                    </div>
                                </CardContent>
                                <CardFooter className="p-0 border-t-2 border-black">
                                    <Button 
                                        variant="ghost" 
                                        className="w-full h-12 rounded-none font-black uppercase tracking-widest text-[10px] hover:bg-gray-100 flex items-center justify-center gap-2"
                                        onClick={() => handleDownloadPDF(char)}
                                    >
                                        <ExternalLink className="h-4 w-4 text-[#EE8600]" /> Descargar Ficha PDF
                                    </Button>
                                </CardFooter>
                            </Card>
                        )
                    })}
                </div>
            )}
        </TabsContent>

        <TabsContent value="pedidos" className="outline-none">
              <div className="flex justify-between items-end mb-8 border-b-2 border-black pb-4">
                <h2 className="text-3xl font-heading font-black uppercase tracking-tight">Historial de Compras</h2>
                <Link href="/tienda">
                    <Button variant="outline" className="border-2 border-black rounded-none font-black uppercase tracking-widest text-[10px]">
                        <ShoppingBag className="mr-2 h-4 w-4" /> Ir a la Tienda
                    </Button>
                </Link>
            </div>

            {sales.length === 0 ? (
                <div className="text-center py-24 border-4 border-dashed border-gray-200 bg-gray-50/50">
                    <ShoppingBag className="h-16 w-16 mx-auto text-gray-300 mb-6" />
                    <h3 className="text-xl font-black uppercase">Sin pedidos</h3>
                    <p className="text-gray-500 font-sans">No se han encontrado compras en tu historial.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {sales.map((sale) => (
                        <Card key={sale.id} className="border-2 border-black rounded-none shadow-[8px_8px_0px_0px_rgba(36,37,40,1)] overflow-hidden">
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
                                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 border-b pb-1 mb-2">Artículos del Tesoro</h4>
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
                                    <div className="p-4 bg-gray-50 border border-gray-200 space-y-2 mt-4">
                                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#EE8600]">
                                            <Truck className="h-3 w-3" /> Datos de Entrega
                                        </div>
                                        <p className="text-sm font-bold flex items-start gap-2">
                                            <MapPin className="h-4 w-4 mt-0.5 text-gray-400" />
                                            <span>
                                                {sale.direccion_envio.calle}, {sale.direccion_envio.ciudad}<br/>
                                                <span className="text-xs text-gray-500 font-sans italic">{sale.direccion_envio.region}</span>
                                            </span>
                                        </p>
                                        <p className="text-xs font-bold text-gray-400">TEL: {sale.direccion_envio.telefono}</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </TabsContent>

        <TabsContent value="editar" className="outline-none">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Datos de la Cuenta */}
                <div className="space-y-10">
                    <div className="border-b-2 border-black pb-4 flex items-center gap-3">
                        <User className="h-6 w-6 text-[#EE8600]" />
                        <h2 className="text-2xl font-heading font-black uppercase tracking-tight">Datos Personales</h2>
                    </div>

                    <form onSubmit={handleUpdateProfile} className="space-y-6">
                        <div className="grid gap-2">
                            <Label htmlFor="username" className="text-[10px] font-black uppercase tracking-widest text-gray-400">Nombre de Usuario</Label>
                            <Input 
                                id="username"
                                value={profile.username}
                                onChange={(e) => setProfile({...profile, username: e.target.value})}
                                className="rounded-none border-2 border-black h-12 focus-visible:ring-[#EE8600]"
                                placeholder="Tu nombre público..."
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Dirección de Envío</Label>
                            <div className="grid grid-cols-2 gap-4">
                                <Input 
                                    placeholder="Calle y Número"
                                    value={profile.calle}
                                    onChange={(e) => setProfile({...profile, calle: e.target.value})}
                                    className="rounded-none border-2 border-black h-12 focus-visible:ring-[#EE8600] col-span-2"
                                />
                                <Input 
                                    placeholder="Ciudad"
                                    value={profile.ciudad}
                                    onChange={(e) => setProfile({...profile, ciudad: e.target.value})}
                                    className="rounded-none border-2 border-black h-12 focus-visible:ring-[#EE8600]"
                                />
                                <Input 
                                    placeholder="Región"
                                    value={profile.region}
                                    onChange={(e) => setProfile({...profile, region: e.target.value})}
                                    className="rounded-none border-2 border-black h-12 focus-visible:ring-[#EE8600]"
                                />
                                <Input 
                                    placeholder="Teléfono"
                                    value={profile.telefono}
                                    onChange={(e) => setProfile({...profile, telefono: e.target.value})}
                                    className="rounded-none border-2 border-black h-12 focus-visible:ring-[#EE8600] col-span-2"
                                />
                            </div>
                        </div>

                        <Button 
                            type="submit" 
                            disabled={isUpdating}
                            className="w-full h-14 bg-black hover:bg-[#EE8600] text-white rounded-none font-black uppercase tracking-widest transition-colors shadow-[6px_6px_0px_0px_rgba(238,134,0,1)] hover:shadow-none"
                        >
                            {isUpdating ? "Grabando Crónicas..." : "Actualizar mis Datos"}
                        </Button>
                    </form>
                </div>

                {/* Seguridad */}
                <div className="space-y-10">
                    <div className="border-b-2 border-black pb-4 flex items-center gap-3">
                        <Lock className="h-6 w-6 text-[#EE8600]" />
                        <h2 className="text-2xl font-heading font-black uppercase tracking-tight">Seguridad</h2>
                    </div>

                    <form onSubmit={handleChangePassword} className="space-y-6">
                        <div className="p-6 bg-gray-50 border-2 border-dashed border-gray-200 space-y-4">
                            <p className="text-xs text-gray-500 font-sans">Cambia tu contraseña para mantener tu cuenta protegida.</p>
                            
                            <div className="grid gap-2">
                                <Label htmlFor="newPass" className="text-[10px] font-black uppercase tracking-widest text-gray-400">Nueva Contraseña</Label>
                                <Input 
                                    id="newPass"
                                    type="password"
                                    value={passwords.newPassword}
                                    onChange={(e) => setPasswords({...passwords, newPassword: e.target.value})}
                                    className="rounded-none border-2 border-black h-12 focus-visible:ring-[#EE8600]"
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="confirmPass" className="text-[10px] font-black uppercase tracking-widest text-gray-400">Confirmar Nueva Contraseña</Label>
                                <Input 
                                    id="confirmPass"
                                    type="password"
                                    value={passwords.confirmPassword}
                                    onChange={(e) => setPasswords({...passwords, confirmPassword: e.target.value})}
                                    className="rounded-none border-2 border-black h-12 focus-visible:ring-[#EE8600]"
                                />
                            </div>
                        </div>

                        <Button 
                            type="submit" 
                            disabled={isUpdating}
                            variant="outline"
                            className="w-full h-14 border-2 border-black hover:bg-black hover:text-white rounded-none font-black uppercase tracking-widest transition-all"
                        >
                            <Edit className="mr-2 h-4 w-4" /> Cambiar mi Llave
                        </Button>
                    </form>
                </div>
            </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
