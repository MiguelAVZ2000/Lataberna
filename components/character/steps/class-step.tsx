"use client"

import { classes } from "@/lib/character-data"
import { useCharacter } from "../character-context"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { ChevronRight, Heart, Shield } from "lucide-react"

export function ClassStep() {
  const { character, updateCharacter } = useCharacter()

  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <h2 className="font-heading text-4xl font-bold text-[#242528] uppercase tracking-tight">2. Elige tu Clase</h2>
        <div className="h-[3px] w-32 bg-[#EE8600]" />
        <p className="text-lg text-[#242528]/60 font-sans italic">
          «Tu clase define tus habilidades, poderes y estilo de juego en el mundo de La Taberna.»
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {classes.map((charClass) => (
          <div
            key={charClass.id}
            onClick={() => updateCharacter({ class: charClass })}
            className={cn(
              "group relative bg-white border transition-all duration-300 cursor-pointer overflow-hidden",
              character.class?.id === charClass.id
                ? "border-[#EE8600] shadow-xl ring-1 ring-[#EE8600]"
                : "border-[#E1E1E1] hover:border-[#EE8600] shadow-sm"
            )}
          >
            {/* Selection indicator bar */}
            <div className={cn(
              "absolute top-0 left-0 w-full h-1 transition-colors",
              character.class?.id === charClass.id ? "bg-[#EE8600]" : "bg-[#242528] group-hover:bg-[#EE8600]"
            )} />

            <div className="flex flex-col h-full">
              {/* Image Container */}
              <div className="relative h-56 w-full bg-[#f9f9f9] border-b border-[#E1E1E1] overflow-hidden">
                <Image
                  src={charClass.image}
                  alt={charClass.name}
                  fill
                  className="object-contain object-top pt-4 transition-transform duration-700 group-hover:scale-105"
                />
                {character.class?.id === charClass.id && (
                  <div className="absolute top-4 right-4 bg-[#EE8600] text-white text-[9px] font-bold px-3 py-1 uppercase tracking-widest animate-in fade-in zoom-in">
                    Seleccionado
                  </div>
                )}
              </div>

              {/* Info Section */}
              <div className="p-6 space-y-4 flex-1 flex flex-col">
                <div className="flex justify-between items-start">
                   <h3 className="font-heading text-2xl font-bold uppercase text-[#242528] group-hover:text-[#EE8600] transition-colors tracking-tight">
                     {charClass.name}
                   </h3>
                   <div className="flex items-center gap-1 text-[#242528]/40">
                     <Heart className="h-3 w-3" />
                     <span className="text-[10px] font-bold uppercase">d{charClass.hitDie}</span>
                   </div>
                </div>

                {/* Abilities */}
                <div className="flex flex-wrap gap-1">
                  {charClass.primaryAbility.map((ability) => (
                    <Badge key={ability} variant="outline" className="border-[#242528] text-[#242528] text-[9px] font-bold uppercase py-0 rounded-none bg-[#F9F9F9]">
                      {ability}
                    </Badge>
                  ))}
                </div>

                <div className="space-y-2">
                   <span className="text-[9px] font-bold uppercase tracking-widest text-[#242528]/40">Cualidades</span>
                   <p className="text-xs text-[#242528]/70 font-sans leading-relaxed line-clamp-2">
                     {charClass.description}
                   </p>
                </div>

                <div className="pt-4 mt-auto">
                   <div className={cn(
                     "flex items-center justify-between py-3 border-t border-[#E1E1E1] transition-colors",
                     character.class?.id === charClass.id ? "text-[#EE8600]" : "text-[#242528] group-hover:text-[#EE8600]"
                   )}>
                     <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Competencias</span>
                     <Shield className="h-4 w-4" />
                   </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
