"use client"

import { useCharacter } from "../character-context"
import { abilities, calculateModifier, formatModifier } from "@/lib/character-data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download, FileText, Save, Loader2, Shield, Heart, Zap, User, Star } from "lucide-react"
import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { generateCharacterPDF } from "@/lib/pdf-service"
import { characterSchema } from "@/lib/schemas"

export function SummaryStep() {
  const { character, resetCharacter } = useCharacter()
  const [isSaving, setIsSaving] = useState(false)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
    })
  }, [])

  const racialBonuses = character.race?.abilityBonuses || {}
  const conModifier = calculateModifier(character.abilities.con + (racialBonuses.con || 0))
  const hitDie = character.class?.hitDie || 8
  const maxHP = hitDie + conModifier
  const dexModifier = calculateModifier(character.abilities.dex + (racialBonuses.dex || 0))
  const baseAC = 10 + dexModifier

  // Simplificado al usar el servicio centralizado
  const generatePDF = (isEmpty: boolean) => generateCharacterPDF(character, user?.email, isEmpty)

  const handleSaveToDatabase = async () => {
    if (!user) {
      toast.error("Debes iniciar sesión para guardar", { description: "Redirigiendo al acceso..." })
      router.push("/login")
      return
    }

    setIsSaving(true)
    const characterData = {
        usuario_id: user.id,
        nombre: character.name || "Héroe sin nombre",
        raza_id: character.race?.id || "",
        clase_id: character.class?.id || "",
        nivel: character.level,
        estadisticas: { 
          abilities: character.abilities, 
          skills: character.skills, 
          spells: character.spells,
          hitDie: character.class?.hitDie, 
          speed: character.race?.speed 
        },
        biografia: { 
          alignment: character.alignment,
          personalityTraits: character.personalityTraits, 
          ideals: character.ideals, 
          bonds: character.bonds, 
          flaws: character.flaws,
          background: character.background?.id 
        }
    }

    // Validación con Zod antes de enviar a Supabase
    const validation = characterSchema.safeParse(characterData)
    
    if (!validation.success) {
        const errorMsg = validation.error.errors[0].message
        toast.error("Datos inválidos", { description: errorMsg })
        setIsSaving(false)
        return
    }

    try {
      const { error } = await supabase.from('personajes').insert(validation.data)

      if (error) throw error
      toast.success("Personaje guardado en la biblioteca")
      router.push("/mis-personajes")
    } catch (error: any) {
      toast.error("Error al guardar", { description: error.message })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-10 pb-10">
      <div className="space-y-4">
        <h2 className="font-heading text-4xl font-bold text-[#242528] uppercase tracking-tight">6. Resumen de tu Héroe</h2>
        <div className="h-[3px] w-32 bg-[#EE8600]" />
        <p className="text-lg text-[#242528]/60 font-sans italic">
          «Tu leyenda comienza aquí. Revisa tu hoja y prepárate para la aventura.»
        </p>
      </div>

      {/* Hero Master Card - Digital Character Sheet Style */}
      <div className="bg-white border border-[#242528] overflow-hidden shadow-[12px_12px_0px_0px_rgba(36,37,40,1)]">
        {/* Header */}
        <div className="bg-[#242528] p-8 text-white flex flex-col md:flex-row justify-between items-center gap-6">
           <div className="flex items-center gap-6 text-center md:text-left">
              <div className="w-20 h-20 rounded-full bg-[#EE8600] flex items-center justify-center text-white border-4 border-white">
                <User className="h-10 w-10" />
              </div>
              <div className="space-y-1">
                <h1 className="font-heading text-4xl font-bold uppercase tracking-tight leading-none">{character.name || "Héroe Sin Nombre"}</h1>
                <p className="text-[#EE8600] font-bold uppercase tracking-[0.2em] text-xs">
                  {character.race?.name} {character.class?.name} • Nivel {character.level}
                </p>
              </div>
           </div>
           <div className="flex gap-4">
              <div className="bg-white/5 p-4 border border-white/10 text-center min-w-[80px]">
                <span className="block text-[10px] font-bold uppercase text-[#EE8600] mb-1">Inic.</span>
                <span className="text-2xl font-heading font-bold">{formatModifier(dexModifier)}</span>
              </div>
              <div className="bg-white/5 p-4 border border-white/10 text-center min-w-[80px]">
                <span className="block text-[10px] font-bold uppercase text-[#EE8600] mb-1">Sent.</span>
                <span className="text-2xl font-heading font-bold">10</span>
              </div>
           </div>
        </div>

        {/* Vital Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 border-b border-[#242528]">
           <div className="p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-[#E1E1E1] bg-[#F9F9F9]">
              <Shield className="h-6 w-6 text-[#242528] mb-2" />
              <span className="text-5xl font-heading font-bold text-[#242528]">{baseAC}</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#242528]/40 mt-1">Armadura (CA)</span>
           </div>
           <div className="p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-[#E1E1E1]">
              <Heart className="h-6 w-6 text-[#EE8600] mb-2" />
              <span className="text-5xl font-heading font-bold text-[#242528]">{maxHP}</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#242528]/40 mt-1">Puntos de Golpe</span>
           </div>
           <div className="p-8 flex flex-col items-center justify-center bg-[#F9F9F9]">
              <Zap className="h-6 w-6 text-[#EE8600] mb-2" />
              <span className="text-5xl font-heading font-bold text-[#242528]">{character.race?.speed || 30}</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#242528]/40 mt-1">Velocidad (Pies)</span>
           </div>
        </div>

        {/* Details Grid */}
        <div className="p-8 grid md:grid-cols-2 gap-12">
           {/* Abilities Column */}
           <div className="space-y-6">
              <h3 className="font-heading text-xl font-bold uppercase tracking-tight text-[#242528] border-b border-[#E1E1E1] pb-4">Atributos Básicos</h3>
              <div className="grid grid-cols-3 gap-4">
                 {Object.entries(character.abilities).map(([id, val]) => {
                   const bonus = racialBonuses[id] || 0
                   const total = val + bonus
                   const mod = calculateModifier(total)
                   return (
                     <div key={id} className="p-4 border border-[#E1E1E1] bg-[#F9F9F9] text-center space-y-1">
                        <span className="text-[9px] font-bold uppercase text-[#242528]/40">{id}</span>
                        <div className="text-2xl font-heading font-bold text-[#242528]">{total}</div>
                        <div className="text-[10px] font-bold text-[#EE8600]">{formatModifier(mod)}</div>
                     </div>
                   )
                 })}
              </div>
           </div>

           {/* Features Column */}
           <div className="space-y-6">
              <h3 className="font-heading text-xl font-bold uppercase tracking-tight text-[#242528] border-b border-[#E1E1E1] pb-4">Identidad y Magia</h3>
              <div className="space-y-4">
                 <div className="flex gap-4">
                    <div className="flex-1 p-4 border border-[#E1E1E1] space-y-1">
                       <span className="text-[9px] font-bold uppercase text-[#242528]/40">Trasfondo</span>
                       <p className="text-sm font-bold text-[#242528]">{character.background?.name || "Desconocido"}</p>
                    </div>
                    <div className="flex-1 p-4 border border-[#E1E1E1] space-y-1">
                       <span className="text-[9px] font-bold uppercase text-[#242528]/40">Alineamiento</span>
                       <p className="text-sm font-bold text-[#242528] uppercase">{character.alignment || "Neutral"}</p>
                    </div>
                 </div>
                 
                 {character.spells && character.spells.length > 0 && (
                   <div className="p-4 border border-[#EE8600] bg-[#EE8600]/5 space-y-2">
                      <span className="text-[9px] font-bold uppercase text-[#EE8600]">Hechizos Preparados</span>
                      <div className="flex flex-wrap gap-2">
                        {character.spells.map(spell => (
                          <Badge key={spell} variant="outline" className="border-[#242528] text-[#242528] text-[9px] font-bold uppercase px-2 py-0 rounded-none bg-white">
                            {spell}
                          </Badge>
                        ))}
                      </div>
                   </div>
                 )}
              </div>
           </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 pt-6">
        <Button onClick={() => generatePDF(false)} className="flex-1 bg-[#242528] hover:bg-black text-white h-16 rounded-none font-bold uppercase tracking-widest text-[11px] shadow-lg">
          <Download className="mr-3 h-5 w-5" /> Exportar Ficha PDF
        </Button>
        <Button onClick={handleSaveToDatabase} disabled={isSaving} className="flex-1 bg-[#EE8600] hover:bg-[#D47600] text-white h-16 rounded-none font-bold uppercase tracking-widest text-[11px] shadow-lg">
          {isSaving ? <Loader2 className="mr-3 h-5 w-5 animate-spin" /> : <Save className="mr-3 h-5 w-5" />} Guardar en la Taberna
        </Button>
      </div>
    </div>
  )
}
