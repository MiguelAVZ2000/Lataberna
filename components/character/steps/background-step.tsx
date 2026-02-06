"use client"

import { backgrounds } from "@/lib/character-data"
import { useCharacter } from "../character-context"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Scroll, ChevronRight, UserCircle } from "lucide-react"

export function BackgroundStep() {
  const { character, updateCharacter } = useCharacter()

  return (
    <div className="space-y-10 pb-10">
      <div className="space-y-4">
        <h2 className="font-heading text-4xl font-bold text-[#242528] uppercase tracking-tight">4. Elige tu Trasfondo</h2>
        <div className="h-[3px] w-32 bg-[#EE8600]" />
        <p className="text-lg text-[#242528]/60 font-sans italic">
          «Tu trasfondo define tu historia antes de convertirte en aventurero.»
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {backgrounds.map((bg) => (
          <div
            key={bg.id}
            onClick={() => updateCharacter({ background: bg })}
            className={cn(
              "group relative bg-white border transition-all duration-300 cursor-pointer overflow-hidden flex flex-col",
              character.background?.id === bg.id
                ? "border-[#EE8600] shadow-xl ring-1 ring-[#EE8600]"
                : "border-[#E1E1E1] hover:border-[#EE8600] shadow-sm"
            )}
          >
            {/* Selection indicator bar */}
            <div className={cn(
              "absolute top-0 left-0 w-full h-1 transition-colors",
              character.background?.id === bg.id ? "bg-[#EE8600]" : "bg-[#242528] group-hover:bg-[#EE8600]"
            )} />

            <div className="p-8 space-y-6 flex-1 flex flex-col">
              <div className="flex justify-between items-start gap-4">
                 <div className="space-y-2">
                    <h3 className="font-heading text-3xl font-bold uppercase text-[#242528] group-hover:text-[#EE8600] transition-colors tracking-tight">
                      {bg.name}
                    </h3>
                    {character.background?.id === bg.id && (
                      <div className="inline-block bg-[#EE8600] text-white text-[9px] font-bold px-3 py-1 uppercase tracking-widest animate-in fade-in zoom-in">
                        Seleccionado
                      </div>
                    )}
                 </div>
                 <UserCircle className="h-6 w-6 text-[#E1E1E1] group-hover:text-[#EE8600] transition-colors shrink-0" />
              </div>

              <p className="text-sm text-[#242528]/70 font-sans leading-relaxed italic">
                «{bg.description}»
              </p>

              <div className="space-y-4 pt-4 border-t border-[#E1E1E1]">
                 <div className="space-y-2">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-[#242528]/40">Competencias</span>
                    <div className="flex flex-wrap gap-1">
                      {bg.skillProficiencies.map(skill => (
                        <Badge key={skill} variant="outline" className="border-[#242528] text-[#242528] text-[9px] font-bold uppercase px-2 py-0 rounded-none bg-[#F9F9F9]">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                 </div>

                 <div className="space-y-2">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-[#242528]/40">Rasgo Distintivo</span>
                    <p className="text-xs text-[#242528]/70 font-sans font-bold italic line-clamp-1">{bg.feature}</p>
                 </div>
              </div>

              <div className="pt-6 mt-auto">
                 <div className={cn(
                   "flex items-center justify-between py-3 border-t border-[#E1E1E1] transition-colors",
                   character.background?.id === bg.id ? "text-[#EE8600]" : "text-[#242528] group-hover:text-[#EE8600]"
                 )}>
                   <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Detalles de Origen</span>
                   <ChevronRight className="h-4 w-4" />
                 </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
