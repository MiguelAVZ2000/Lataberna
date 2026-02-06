"use client"

import { useCharacter } from "../character-context"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Shield, Sword, Package, FlaskConical, Hammer } from "lucide-react"

const starterItems = [
  { id: "exploracion", category: "Exploración", icon: Package, items: ["Mochila", "Saco de dormir", "Caja de raciones (10)", "Odre", "Antorchas (10)", "Cuerda de cáñamo (50 pies)"] },
  { id: "armas", category: "Armas", icon: Sword, items: ["Espada larga", "Arco corto", "Daga", "Hacha de mano", "Martillo de guerra", "Flechas (20)"] },
  { id: "armaduras", category: "Armaduras", icon: Shield, items: ["Armadura de cuero", "Cota de malla", "Escudo"] },
  { id: "utilidad", category: "Utilidad", icon: FlaskConical, items: ["Poción de curación", "Caja de herramientas de ladrón", "Símbolo sagrado", "Libro de hechizos", "Foco arcano"] },
]

export function EquipmentStep() {
  const { character, updateCharacter } = useCharacter()

  const toggleItem = (item: string) => {
    const currentItems = character.items || []
    if (currentItems.includes(item)) {
      updateCharacter({ items: currentItems.filter((i) => i !== item) })
    } else {
      updateCharacter({ items: [...currentItems, item] })
    }
  }

  return (
    <div className="space-y-10 pb-10">
      <div className="space-y-4">
        <h2 className="font-heading text-4xl font-bold text-[#242528] uppercase tracking-tight">4. Equipo de Aventurero</h2>
        <div className="h-[3px] w-32 bg-[#EE8600]" />
        <p className="text-lg text-[#242528]/60 font-sans italic">
          «Un héroe es tan bueno como las herramientas que lleva.»
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {starterItems.map((group) => (
          <div key={group.id} className="p-6 border border-[#E1E1E1] bg-white shadow-sm flex flex-col h-full">
            <div className="flex items-center gap-3 mb-6 border-b border-[#E1E1E1] pb-4">
              <div className="p-2 bg-[#F9F9F9] border border-[#E1E1E1]">
                <group.icon className="w-5 h-5 text-[#EE8600]" />
              </div>
              <h3 className="font-heading text-xl font-bold uppercase tracking-tight text-[#242528]">{group.category}</h3>
            </div>
            
            <ScrollArea className="flex-grow">
              <div className="space-y-3">
                {group.items.map((item) => {
                  const isSelected = character.items?.includes(item)
                  return (
                    <div 
                      key={item} 
                      className={`flex items-center space-x-3 p-3 transition-colors cursor-pointer border ${isSelected ? 'border-[#EE8600] bg-[#EE8600]/5' : 'border-transparent hover:bg-[#F9F9F9]'}`}
                      onClick={() => toggleItem(item)}
                    >
                      <Checkbox 
                        id={item} 
                        checked={isSelected}
                        className="rounded-none border-[#E1E1E1] data-[state=checked]:bg-[#EE8600] data-[state=checked]:border-[#EE8600]"
                      />
                      <label
                        htmlFor={item}
                        className="text-sm font-medium leading-none cursor-pointer flex-grow"
                      >
                        {item}
                      </label>
                      {isSelected && <Badge className="bg-[#EE8600] text-white text-[10px] rounded-none border-none">Añadido</Badge>}
                    </div>
                  )
                })}
              </div>
            </ScrollArea>
          </div>
        ))}
      </div>

      <div className="p-6 border border-[#242528] bg-[#F9F9F9] shadow-[6px_6px_0px_0px_rgba(36,37,40,1)]">
        <h4 className="font-heading text-sm font-bold uppercase tracking-widest text-[#242528]/40 mb-3">Resumen de Carga</h4>
        <div className="flex flex-wrap gap-2">
          {character.items?.length === 0 ? (
            <p className="text-sm text-[#242528]/40 italic">No has seleccionado ningún objeto aún...</p>
          ) : (
            character.items?.map((item) => (
              <Badge key={item} variant="outline" className="rounded-none border-[#E1E1E1] bg-white text-[#242528] px-3 py-1">
                {item}
              </Badge>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
