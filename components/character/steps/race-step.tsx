"use client"

import { races } from "@/lib/character-data"
import { useCharacter } from "../character-context"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { ChevronRight, Globe } from "lucide-react"

export function RaceStep() {
  const { character, updateCharacter } = useCharacter()

  return (
    <div className="space-y-10">
      {/* Step Header with atmospheric text */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 border border-[var(--color-accent-gold)]/30 bg-[var(--color-accent-gold)]/5 text-[var(--color-accent-gold)] text-[10px] font-black uppercase tracking-[0.2em]">
          Capítulo I
        </div>
        <h2 className="font-heading text-4xl lg:text-5xl font-bold text-[var(--color-dark-section)] uppercase tracking-tight leading-tight">
          Elige tu Linaje
        </h2>
        <div className="h-[3px] w-24 bg-[var(--color-accent-gold)]" />
        <p className="text-lg text-[var(--color-dark-section)]/50 font-sans italic max-w-2xl">
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
                "group relative bg-white border-2 transition-all duration-500 cursor-pointer overflow-hidden",
                isSelected
                  ? "border-[var(--color-accent-gold)] shadow-xl shadow-[var(--color-accent-gold)]/10 ring-1 ring-[var(--color-accent-gold)]/20"
                  : "border-[var(--color-border)] hover:border-[var(--color-accent-gold)]/50 hover:shadow-lg"
              )}
            >
              {/* Top accent bar */}
              <div className={cn(
                "absolute top-0 left-0 w-full h-1 transition-all duration-500 z-10",
                isSelected ? "bg-[var(--color-accent-gold)]" : "bg-[var(--color-dark-section)]/10 group-hover:bg-[var(--color-accent-gold)]/50"
              )} />

              {/* Image Container */}
              <div className="relative h-60 w-full bg-[var(--color-muted)] overflow-hidden">
                <Image
                  src={race.image}
                  alt={race.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-contain object-center p-4 transition-transform duration-700 group-hover:scale-110"
                />

                {/* Selection badge */}
                {isSelected && (
                  <div className="absolute top-3 right-3 bg-[var(--color-accent-gold)] text-white text-[9px] font-black px-3 py-1.5 uppercase tracking-widest shadow-lg animate-in fade-in zoom-in">
                    Elegido
                  </div>
                )}

                {/* Race name overlay on image bottom */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[var(--color-dark-section)]/90 to-transparent p-4 pt-12">
                  <h3 className="font-heading text-2xl font-bold uppercase text-white tracking-tight drop-shadow-lg">
                    {race.name}
                  </h3>
                </div>
              </div>

              {/* Info Section */}
              <div className="p-5 space-y-3">
                {/* Ability Bonuses */}
                <div className="flex flex-wrap gap-1.5">
                  {Object.entries(race.abilityBonuses).map(([ability, bonus]) => (
                    <Badge key={ability} variant="outline" className={cn(
                      "text-[9px] font-bold uppercase py-0.5 px-2 rounded border",
                      isSelected
                        ? "border-[var(--color-accent-gold)] text-[var(--color-accent-gold)] bg-[var(--color-accent-gold)]/5"
                        : "border-[var(--color-dark-section)]/20 text-[var(--color-dark-section)]/50 bg-[var(--color-muted)]"
                    )}>
                      {ability.slice(0, 3)} +{bonus}
                    </Badge>
                  ))}
                </div>

                {/* Description */}
                <p className="text-xs text-[var(--color-dark-section)]/50 font-sans leading-relaxed line-clamp-2 italic">
                  «{race.description}»
                </p>

                {/* Race traits */}
                <div className="flex flex-wrap gap-1">
                  {race.traits.slice(0, 3).map((trait) => (
                    <span key={trait.name} className="text-[9px] font-bold text-[var(--color-dark-section)]/30 uppercase tracking-wider">
                      {trait.name}
                    </span>
                  ))}
                  {race.traits.length > 3 && (
                    <span className="text-[9px] font-bold text-[var(--color-dark-section)]/20 uppercase tracking-wider">
                      +{race.traits.length - 3}
                    </span>
                  )}
                </div>

                {/* Footer */}
                <div className={cn(
                  "flex items-center justify-between py-3 border-t transition-colors",
                  isSelected ? "border-[var(--color-accent-gold)]/20 text-[var(--color-accent-gold)]" : "border-[var(--color-border)] text-[var(--color-dark-section)]/30 group-hover:text-[var(--color-accent-gold)]"
                )}>
                  <div className="flex items-center gap-1.5">
                    <Globe className="h-3 w-3" />
                    <span className="text-[9px] font-bold uppercase tracking-[0.15em]">{race.size} • {race.speed} pies</span>
                  </div>
                  <ChevronRight className="h-3 w-3" />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
