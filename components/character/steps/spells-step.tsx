"use client"

import { useCharacter } from "../character-context"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Sparkles, Zap, ChevronRight } from "lucide-react"

// Datos simulados de hechizos por clase para el MVP
const classSpells: Record<string, { level: number, name: string, desc: string }[]> = {
  wizard: [
    { level: 0, name: "Rayo de Escarcha", desc: "Rayo de energía fría que reduce velocidad." },
    { level: 0, name: "Luz", desc: "Objeto brilla como una antorcha." },
    { level: 0, name: "Mano de Mago", desc: "Mano espectral para manipular objetos." },
    { level: 1, name: "Proyectil Mágico", desc: "3 dardos infalibles de fuerza." },
    { level: 1, name: "Escudo", desc: "+5 CA como reacción." },
    { level: 1, name: "Dormir", desc: "Duerme criaturas en un área." },
  ],
  cleric: [
    { level: 0, name: "Llama Sagrada", desc: "Fuego radiante cae sobre el enemigo." },
    { level: 0, name: "Guía", desc: "+1d4 a una prueba de habilidad." },
    { level: 1, name: "Curar Heridas", desc: "Restaura puntos de golpe al contacto." },
    { level: 1, name: "Bendición", desc: "+1d4 a ataques y salvaciones para 3 aliados." },
    { level: 1, name: "Palabra de Curación", desc: "Cura a distancia como acción bonus." },
  ],
  bard: [
    { level: 0, name: "Burla Dañina", desc: "Insulto psíquico que da desventaja." },
    { level: 0, name: "Prestidigitación", desc: "Trucos menores sensoriales." },
    { level: 1, name: "Curar Heridas", desc: "Restaura puntos de golpe." },
    { level: 1, name: "Inspiración Bárdica", desc: "Otorga un dado de inspiración." },
    { level: 1, name: "Onda Atronadora", desc: "Empuja enemigos con sonido." },
  ],
  druid: [
    { level: 0, name: "Producir Llama", desc: "Fuego en tu mano para atacar o iluminar." },
    { level: 0, name: "Shillelagh", desc: "Imbuye tu bastón con magia natural." },
    { level: 1, name: "Enredar", desc: "Plantas sujetan a los enemigos." },
    { level: 1, name: "Buenas Bayas", desc: "Bayas mágicas que curan 1 PG." },
  ],
  sorcerer: [
    { level: 0, name: "Descarga de Fuego", desc: "Lanza una mota de fuego." },
    { level: 0, name: "Prestidigitación", desc: "Trucos menores." },
    { level: 1, name: "Armadura de Mago", desc: "CA se vuelve 13 + Destreza." },
    { level: 1, name: "Proyectil Mágico", desc: "Dardos de fuerza." },
  ],
  warlock: [
    { level: 0, name: "Descarga Eldritch", desc: "Rayo de fuerza pura (1d10)." },
    { level: 0, name: "Toque Helado", desc: "Daño necrótico e impide curación." },
    { level: 1, name: "Maleficio", desc: "Daño extra a un objetivo marcado." },
    { level: 1, name: "Reprensión Infernal", desc: "Reacción de fuego al ser dañado." },
  ]
}

export function SpellsStep() {
  const { character, updateCharacter } = useCharacter()
  const spells = character.class ? classSpells[character.class.id] : []
  
  if (!spells || spells.length === 0) {
    return (
      <div className="text-center py-20 border border-dashed border-[#E1E1E1] space-y-4 bg-[#F9F9F9]">
        <Zap className="mx-auto h-12 w-12 text-[#242528]/10" />
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#242528]/40">Tu clase no selecciona hechizos a nivel 1</p>
      </div>
    )
  }

  const selectedSpells = character.spells || []

  const toggleSpell = (spellName: string) => {
    if (selectedSpells.includes(spellName)) {
      updateCharacter({ spells: selectedSpells.filter(s => s !== spellName) })
    } else {
      if (selectedSpells.length < 4) {
         updateCharacter({ spells: [...selectedSpells, spellName] })
      }
    }
  }

  return (
    <div className="space-y-10 pb-10">
      <div className="space-y-4">
        <h2 className="font-heading text-4xl font-bold text-[#242528] uppercase tracking-tight">Selección de Hechizos</h2>
        <div className="h-[3px] w-32 bg-[#EE8600]" />
        <p className="text-lg text-[#242528]/60 font-sans italic">
          «Elige los conjuros que has preparado para tu aventura (Máx 4).»
        </p>
      </div>

      {/* Spells Grid - Clean Table-like cards */}
      <div className="grid gap-6 sm:grid-cols-2">
        {spells.map((spell) => {
          const isSelected = selectedSpells.includes(spell.name)
          return (
            <div
              key={spell.name}
              onClick={() => toggleSpell(spell.name)}
              className={cn(
                "group relative bg-white border transition-all duration-300 cursor-pointer overflow-hidden p-8 flex flex-col gap-4",
                isSelected
                  ? "border-[#EE8600] shadow-xl ring-1 ring-[#EE8600]"
                  : "border-[#E1E1E1] hover:border-[#EE8600] shadow-sm"
              )}
            >
              <div className={cn(
                "absolute top-0 left-0 w-full h-1 transition-colors",
                isSelected ? "bg-[#EE8600]" : "bg-[#242528] group-hover:bg-[#EE8600]"
              )} />

              <div className="flex justify-between items-start">
                 <div className="space-y-2">
                    <h3 className="font-heading text-2xl font-bold uppercase text-[#242528] tracking-tight group-hover:text-[#EE8600] transition-colors line-clamp-1">
                      {spell.name}
                    </h3>
                    <Badge variant="outline" className="border-[#242528] text-[#242528] text-[9px] font-bold uppercase py-0 rounded-none bg-[#F9F9F9]">
                      {spell.level === 0 ? "Truco" : `Nivel ${spell.level}`}
                    </Badge>
                 </div>
                 {isSelected && <Sparkles className="h-5 w-5 text-[#EE8600] animate-pulse shrink-0" />}
              </div>

              <p className="text-sm text-[#242528]/70 font-sans leading-relaxed italic border-l-2 border-[#E1E1E1] pl-4">
                «{spell.desc}»
              </p>

              <div className="pt-4 mt-auto">
                 <div className={cn(
                   "flex items-center justify-between py-3 border-t border-[#E1E1E1] transition-colors",
                   isSelected ? "text-[#EE8600]" : "text-[#242528] group-hover:text-[#EE8600]"
                 )}>
                   <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{isSelected ? "Seleccionado" : "Elegir Hechizo"}</span>
                   <ChevronRight className="h-4 w-4" />
                 </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Selected Counter Footer */}
      <div className="p-8 border-t-4 border-[#EE8600] bg-[#242528] text-white flex justify-between items-center">
         <span className="text-[10px] font-bold uppercase tracking-widest text-[#EE8600]">Hechizos Preparados</span>
         <div className="flex items-center gap-4">
            <div className="flex gap-2">
               {[1, 2, 3, 4].map(idx => (
                 <div key={idx} className={cn(
                   "h-3 w-3 rounded-none border border-white/20 transition-colors",
                   selectedSpells.length >= idx ? "bg-[#EE8600]" : "bg-transparent"
                 )} />
               ))}
            </div>
            <span className="text-2xl font-heading font-bold">{selectedSpells.length}/4</span>
         </div>
      </div>
    </div>
  )
}
