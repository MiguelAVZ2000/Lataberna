"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Trash2, 
  Calendar,
  ChevronRight,
  User,
  Sword,
  Plus,
  Users,
  Download
} from "lucide-react"
import { races, classes, backgrounds } from "@/lib/character-data"
import { generateCharacterPDF } from "@/lib/pdf-service"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { toast } from "sonner"
import Link from "next/link"

interface Personaje {
  id: string
  nombre: string
  raza_id: string
  clase_id: string
  nivel: number
  estadisticas: any
  biografia: any
  creado_en: string
}

interface PersonajesListProps {
  initialPersonajes: Personaje[]
}

export function PersonajesList({ initialPersonajes }: PersonajesListProps) {
  const [personajes, setPersonajes] = useState<Personaje[]>(initialPersonajes)

  const handleDownloadPDF = (personaje: Personaje) => {
    const race = races.find(r => r.id === personaje.raza_id)
    const charClass = classes.find(c => c.id === personaje.clase_id)
    const background = backgrounds.find(b => b.id === personaje.biografia?.background)

    const fullCharacter = {
        name: personaje.nombre,
        level: personaje.nivel || personaje.estadisticas?.level || 1,
        race,
        class: charClass,
        background,
        abilities: personaje.estadisticas.abilities,
        skills: personaje.estadisticas.skills || [],
        spells: personaje.estadisticas.spells || [],
        alignment: personaje.biografia?.alignment,
        personalityTraits: personaje.biografia?.personalityTraits,
        ideals: personaje.biografia?.ideals,
        bonds: personaje.biografia?.bonds,
        flaws: personaje.biografia?.flaws,
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

    generateCharacterPDF(fullCharacter as any, undefined, false)
  }

  const handleDelete = async (id: string, nombre: string) => {
    if (!confirm(`¿Estás seguro de que quieres eliminar a ${nombre}?`)) return

    const { error } = await supabase
      .from('personajes')
      .delete()
      .eq('id', id)

    if (error) {
      toast.error("No se pudo eliminar el personaje")
    } else {
      setPersonajes(prev => prev.filter(p => p.id !== id))
      toast.success(`${nombre} ha partido al descanso eterno`)
    }
  }

  if (personajes.length === 0) {
    return (
      <div className="py-24 text-center border-2 border-dashed border-[#E1E1E1] bg-[#F9F9F9] space-y-6">
          <Sword className="h-16 w-16 text-[#242528]/10 mx-auto" />
          <div className="space-y-2">
            <h3 className="text-2xl font-heading text-[#242528] font-bold uppercase tracking-tight">Tu Sala de Héroes está vacía</h3>
            <p className="text-[#242528]/40 font-sans italic max-w-sm mx-auto uppercase text-[10px] tracking-widest">Aún no has forjado ninguna leyenda en esta cuenta.</p>
          </div>
          <Button asChild variant="outline" className="border-[#242528] text-[#242528] rounded-none hover:bg-[#242528] hover:text-white font-bold uppercase tracking-widest h-12 px-8">
             <Link href="/personaje">Empezar Creación</Link>
          </Button>
      </div>
    )
  }

  return (
    <div className="space-y-12">
      <div className="border border-[#E1E1E1] bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-[#242528]">
            <TableRow className="hover:bg-transparent border-none">
              <TableHead className="text-white font-bold uppercase text-[10px] tracking-[0.2em] py-5 pl-8">Héroe</TableHead>
              <TableHead className="text-white font-bold uppercase text-[10px] tracking-[0.2em] py-5">Raza y Clase</TableHead>
              <TableHead className="text-white font-bold uppercase text-[10px] tracking-[0.2em] py-5">Nivel</TableHead>
              <TableHead className="text-white font-bold uppercase text-[10px] tracking-[0.2em] py-5">Fecha de Creación</TableHead>
              <TableHead className="text-white font-bold uppercase text-[10px] tracking-[0.2em] py-5 pr-8 text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {personajes.map((personaje) => {
              const raceName = races.find(r => r.id === personaje.raza_id)?.name || personaje.raza_id
              const className = classes.find(c => c.id === personaje.clase_id)?.name || personaje.clase_id
              
              return (
                <TableRow key={personaje.id} className="group hover:bg-[#F9F9F9] transition-colors border-[#E1E1E1]">
                  <TableCell className="py-6 pl-8">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 bg-[#EE8600]/10 border border-[#EE8600]/30 rounded-none flex items-center justify-center shrink-0">
                        <User className="h-5 w-5 text-[#EE8600]" />
                      </div>
                      <div className="space-y-0.5">
                        <p className="font-heading text-xl font-bold uppercase tracking-tight text-[#242528] group-hover:text-[#EE8600] transition-colors cursor-pointer">
                          {personaje.nombre}
                        </p>
                        <span className="text-[9px] font-bold text-[#242528]/30 uppercase tracking-widest">Personaje Jugable</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-6">
                    <div className="flex gap-2">
                      <Badge variant="outline" className="border-[#242528] text-[#242528] text-[9px] font-bold uppercase px-2 py-0 rounded-none bg-white">{raceName}</Badge>
                      <Badge variant="outline" className="border-[#EE8600] text-[#EE8600] text-[9px] font-bold uppercase px-2 py-0 rounded-none bg-white">{className}</Badge>
                    </div>
                  </TableCell>
                  <TableCell className="py-6">
                    <span className="font-heading text-2xl font-bold text-[#242528] opacity-50"># {personaje.nivel || personaje.estadisticas?.level || 1}</span>
                  </TableCell>
                  <TableCell className="py-6">
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#242528]/40">
                      <Calendar className="h-3 w-3" />
                      {new Date(personaje.creado_en).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                    </div>
                  </TableCell>
                  <TableCell className="py-6 pr-8 text-right">
                    <div className="flex justify-end items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button 
                        variant="ghost" 
                        className="h-10 w-10 p-0 text-[#242528] hover:bg-[#242528] hover:text-white rounded-none"
                        onClick={() => handleDownloadPDF(personaje)}
                        title="Descargar PDF"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        className="h-10 w-10 p-0 text-red-500 hover:bg-red-500 hover:text-white rounded-none"
                        onClick={() => handleDelete(personaje.id, personaje.nombre)}
                        title="Eliminar"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        className="h-10 px-4 text-[#EE8600] hover:bg-[#EE8600] hover:text-white rounded-none font-bold uppercase text-[10px] tracking-widest"
                        onClick={() => handleDownloadPDF(personaje)}
                      >
                        Ver Ficha <ChevronRight className="ml-2 h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>

      {/* Quick Stats Summary moved here to keep it reactive if needed */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="p-10 border border-[#242528] bg-[#F9F9F9] shadow-[8px_8px_0px_0px_rgba(36,37,40,1)] flex flex-col justify-center gap-6">
          <h3 className="font-heading text-2xl font-bold uppercase tracking-tight text-[#242528]">Tu Patrimonio Bélico</h3>
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-1">
              <span className="text-5xl font-heading font-bold text-[#EE8600]">{personajes.length}</span>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#242528]/40 leading-tight">Leyendas<br/>Registradas</p>
            </div>
            <div className="space-y-1">
              <span className="text-5xl font-heading font-bold text-[#242528]">#{Math.max(0, ...personajes.map(p => p.estadisticas?.level || 0))}</span>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#242528]/40 leading-tight">Nivel<br/>Máximo</p>
            </div>
          </div>
        </div>
        
        <div className="p-10 border border-[#E1E1E1] bg-white flex flex-col justify-center gap-6 relative overflow-hidden group">
          <div className="absolute -right-10 -bottom-10 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity duration-700">
            <Users className="h-64 w-64 text-black -rotate-12" />
          </div>
          <div className="space-y-3 relative z-10">
            <h3 className="font-heading text-2xl font-bold uppercase tracking-tight text-[#242528]">¿Listo para más?</h3>
            <p className="text-sm text-[#242528]/60 font-sans leading-relaxed italic">«Cada nuevo héroe es una puerta a un mundo de posibilidades infinitas.»</p>
          </div>
          <Button asChild className="w-fit h-12 px-8 bg-[#242528] hover:bg-[#EE8600] text-white rounded-none font-bold uppercase tracking-widest transition-colors relative z-10">
            <Link href="/personaje">Forjar Nuevo Héroe</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
