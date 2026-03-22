"use client"

import { races } from "@/lib/character-data"
import { useCharacter } from "../character-context"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { Globe, Users } from "lucide-react"

export function RaceStep() {
  const { character, updateCharacter } = useCharacter()

  return (
    <div className="space-y-10">
      {/* Step Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 border border-gold/30 bg-gold/5 text-gold text-[10px] font-black uppercase tracking-[0.2em]">
          Capítulo I
        </div>
        <h2 className="font-heading text-4xl lg:text-5xl font-bold text-text-primary uppercase tracking-tight leading-tight">
          Elige tu Linaje
        </h2>
        <div className="h-[3px] w-24 bg-gold" />
        <p className="text-lg text-text-muted font-sans italic max-w-2xl">
          «Tu sangre porta un legado ancestral. ¿Desciendes de enanos forjadores, elfos inmortales o
          humanos tenaces? Tu raza moldea tu cuerpo, tus sentidos y tu destino.»
        </p>
      </div>

      {/* Race Cards Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {races.map((race) => {
          const isSelected = character.race?.id === race.id
          return (
            <div
              key={race.id}
              onClick={() => updateCharacter({ race })}
              className={cn(
                "group relative flex min-h-[260px] overflow-hidden bg-white shadow-sm transition-all duration-500 cursor-pointer border-2 rounded-xl",
                isSelected
                  ? "border-[#EE8600] shadow-xl shadow-[#EE8600]/15"
                  : "border-[#242528] hover:shadow-xl"
              )}
            >
              {/* Image as background (right side) */}
              <div className="absolute inset-0 flex items-center justify-end z-0">
                <div className="relative h-full w-[85%]">
                  <Image
                    src={race.image}
                    alt={race.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-contain object-right pt-4 transition-all duration-700 group-hover:scale-105 opacity-75 group-hover:opacity-95"
                  />
                </div>
              </div>

              {/* Gradient overlay from left */}
              <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-transparent transition-all duration-500" />

              {/* Left gold accent line */}
              <div className={cn(
                "absolute left-0 inset-y-0 w-1.5 bg-[#EE8600] transition-transform duration-500",
                isSelected ? "scale-y-100" : "scale-y-0 group-hover:scale-y-100"
              )} />

              {/* Selected badge */}
              {isSelected && (
                <div className="absolute top-3 right-3 z-20 bg-[#EE8600] text-white text-[9px] font-black px-3 py-1.5 uppercase tracking-widest shadow-lg">
                  Elegido
                </div>
              )}

              {/* Content */}
              <div className="relative z-10 w-full p-6 flex flex-col justify-between max-w-[75%]">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 border-2 border-[#242528] flex items-center justify-center bg-white shrink-0">
                      <Users className="h-4 w-4 text-[#242528]" />
                    </div>
                    <h3 className="font-heading text-2xl font-black uppercase text-[#242528] leading-none tracking-tighter">
                      {race.name}
                    </h3>
                  </div>

                  <div className={cn(
                    "h-0.5 bg-[#EE8600] transition-all duration-700",
                    isSelected ? "w-full" : "w-12 group-hover:w-full"
                  )} />

                  <p className="text-xs text-[#242528]/60 font-sans leading-relaxed italic line-clamp-2">
                    «{race.description}»
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {Object.entries(race.abilityBonuses).map(([ability, bonus]) => (
                      <Badge
                        key={ability}
                        variant="outline"
                        className="text-[9px] font-bold uppercase py-0.5 px-2 rounded border-[#242528]/30 text-[#242528] bg-transparent"
                      >
                        {ability.slice(0, 3).toUpperCase()} +{bonus}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-1.5 pt-3 border-t border-[#242528]/10 mt-3">
                  <Globe className="h-3 w-3 text-[#242528]/40" />
                  <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#242528]/40">
                    {race.size} • {race.speed} pies
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
