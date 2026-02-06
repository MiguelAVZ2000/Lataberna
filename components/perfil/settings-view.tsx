"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { User, Lock, Edit, MapPin, ShieldCheck, AlertCircle } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { toast } from "sonner"
import { regiones } from "@/lib/regiones-data"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function SettingsView({ user, initialProfile }: { user: any, initialProfile: any }) {
  const [isUpdating, setIsUpdating] = useState(false)
  const [profile, setProfile] = useState(initialProfile || {
    username: user.user_metadata?.username || user.email?.split('@')[0],
    calle: "",
    region: "",
    comuna: "",
    telefono: ""
  })

  // Detectar si el usuario tiene contraseña (si se logeo con Google, suele no tenerla a menos que se cree)
  const hasPassword = user.identities?.some((id: any) => id.provider === 'email') || false;

  const [passwords, setPasswords] = useState({
    newPassword: "",
    confirmPassword: ""
  })

  const filteredComunas = regiones.find(r => r.nombre === profile.region)?.comunas || []

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
                region: profile.region,
                comuna: profile.comuna,
                telefono: profile.telefono,
                actualizado_el: new Date().toISOString()
            })

        if (error) throw error

        await supabase.auth.updateUser({
            data: { username: profile.username }
        })

        toast.success("Datos actualizados correctamente")
    } catch (error: any) {
        toast.error("Error al actualizar", { description: error.message })
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
        toast.success("Contraseña establecida con éxito")
        setPasswords({ newPassword: "", confirmPassword: "" })
    } catch (error: any) {
        toast.error("Error al asignar contraseña", { description: error.message })
    } finally {
        setIsUpdating(false)
    }
  }

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
        <div className="border-b-2 border-black pb-4">
            <h2 className="text-3xl font-heading font-black uppercase tracking-tight">Configuración de Cuenta</h2>
        </div>

        <div className="grid grid-cols-1 gap-12">
            {/* Datos Personales y Dirección */}
            <div className="space-y-8">
                <div className="flex items-center gap-3">
                    <User className="h-6 w-6 text-[#EE8600]" />
                    <h3 className="text-xl font-heading font-black uppercase tracking-tight">Datos Personales y Envío</h3>
                </div>

                <form onSubmit={handleUpdateProfile} className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white border-2 border-black p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                    <div className="space-y-6">
                        <div className="grid gap-2">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Nombre de Usuario</Label>
                            <Input 
                                value={profile.username}
                                onChange={(e) => setProfile({...profile, username: e.target.value})}
                                className="rounded-none border-2 border-black h-12 focus-visible:ring-0 focus-visible:border-[#EE8600]"
                                placeholder="Tu apodo público..."
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Teléfono</Label>
                            <Input 
                                placeholder="+56 9 1234 5678"
                                value={profile.telefono}
                                onChange={(e) => setProfile({...profile, telefono: e.target.value})}
                                className="rounded-none border-2 border-black h-12 focus-visible:ring-0 focus-visible:border-[#EE8600]"
                            />
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="grid gap-2">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Dirección (Calle y Número)</Label>
                            <Input 
                                placeholder="Av. Siempre Viva 742"
                                value={profile.calle}
                                onChange={(e) => setProfile({...profile, calle: e.target.value})}
                                className="rounded-none border-2 border-black h-12 focus-visible:ring-0 focus-visible:border-[#EE8600]"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Región</Label>
                                <Select 
                                  value={profile.region} 
                                  onValueChange={(val) => setProfile({...profile, region: val, comuna: ""})}
                                >
                                    <SelectTrigger className="rounded-none border-2 border-black h-12">
                                        <SelectValue placeholder="Región" />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-none border-2 border-black max-h-60">
                                        {regiones.map(r => (
                                            <SelectItem key={r.id} value={r.nombre}>{r.nombre}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Comuna</Label>
                                <Select 
                                  value={profile.comuna} 
                                  onValueChange={(val) => setProfile({...profile, comuna: val})}
                                  disabled={!profile.region}
                                >
                                    <SelectTrigger className="rounded-none border-2 border-black h-12">
                                        <SelectValue placeholder="Comuna" />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-none border-2 border-black max-h-60">
                                        {filteredComunas.map(c => (
                                            <SelectItem key={c} value={c}>{c}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    <div className="md:col-span-2 pt-4">
                        <Button 
                            type="submit" 
                            disabled={isUpdating}
                            className="w-full h-14 bg-black hover:bg-[#EE8600] text-white rounded-none font-black uppercase tracking-widest transition-all shadow-[6px_6px_0px_0px_rgba(238,134,0,1)] hover:shadow-none"
                        >
                            {isUpdating ? "Guardando Cambios..." : "Guardar Información"}
                        </Button>
                    </div>
                </form>
            </div>

            {/* Seguridad / Contraseña */}
            <div className="space-y-8">
                <div className="flex items-center gap-3">
                    <Lock className="h-6 w-6 text-[#EE8600]" />
                    <h3 className="text-xl font-heading font-black uppercase tracking-tight">Seguridad</h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {!hasPassword && (
                        <div className="p-6 bg-red-50 border-2 border-red-200 border-dashed rounded-none flex items-start gap-4">
                            <AlertCircle className="h-6 w-6 text-red-500 mt-1 flex-shrink-0" />
                            <div>
                                <h4 className="text-xs font-black uppercase text-red-700">Cuenta sin contraseña</h4>
                                <p className="text-xs text-red-600 mt-1 leading-relaxed">
                                    Parece que has iniciado sesión con Google. Te recomendamos asignar una contraseña para que puedas entrar directamente con tu correo en el futuro.
                                </p>
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleChangePassword} className="space-y-6 bg-white border-2 border-black p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] lg:col-span-1">
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Nueva Contraseña</Label>
                                <Input 
                                    type="password"
                                    value={passwords.newPassword}
                                    onChange={(e) => setPasswords({...passwords, newPassword: e.target.value})}
                                    className="rounded-none border-2 border-black h-12 focus-visible:ring-0 focus-visible:border-[#EE8600]"
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Confirmar Contraseña</Label>
                                <Input 
                                    type="password"
                                    value={passwords.confirmPassword}
                                    onChange={(e) => setPasswords({...passwords, confirmPassword: e.target.value})}
                                    className="rounded-none border-2 border-black h-12 focus-visible:ring-0 focus-visible:border-[#EE8600]"
                                />
                            </div>
                        </div>

                        <Button 
                            type="submit" 
                            disabled={isUpdating}
                            variant="outline"
                            className="w-full h-14 border-2 border-black hover:bg-black hover:text-white rounded-none font-black uppercase tracking-widest transition-all"
                        >
                            <ShieldCheck className="mr-2 h-4 w-4" /> Asignar Contraseña
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}
