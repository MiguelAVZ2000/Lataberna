"use client"

import { classes } from "@/lib/character-data"
import { useCharacter } from "../character-context"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { ChevronRight, Heart, Shield, Swords } from "lucide-react"

export function ClassStep() {
  const { character, updateCharacter } = useCharacter()

  return (
    <div className="space-y-10">
      {/* Step Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 border border-[var(--color-accent-gold)]/30 bg-[var(--color-accent-gold)]/5 text-[var(--color-accent-gold)] text-[10px] font-black uppercase tracking-[0.2em]">
          Capítulo II
        </div>
        <h2 className="font-heading text-4xl lg:text-5xl font-bold text-[var(--color-dark-section)] uppercase tracking-tight leading-tight">
          Elige tu Vocación
        </h2>
        <div className="h-[3px] w-24 bg-[var(--color-accent-gold)]" />
        <p className="text-lg text-[var(--color-dark-section)]/50 font-sans italic max-w-2xl">
          «¿Empuñarás la espada del guerrero, invocarás la magia del hechicero, o 
          te ocultarás entre las sombras como un pícaro? Tu clase define tu destino en el campo de batalla.»
        </p>
      </div>

      {/* Class Cards Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {classes.map((charClass) => {
          const isSelected = character.class?.id === charClass.id
          return (
            <div
              key={charClass.id}
              onClick={() => updateCharacter({ class: charClass })}
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
                  src={charClass.image}
                  alt={charClass.name}
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

                {/* Hit Die badge */}
                <div className="absolute top-3 left-3 bg-[var(--color-dark-section)] text-white text-[10px] font-bold px-2.5 py-1 flex items-center gap-1.5">
                  <Heart className="h-3 w-3 text-[var(--color-accent-gold)]" />
                  d{charClass.hitDie}
                </div>

                {/* Class name overlay */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[var(--color-dark-section)]/90 to-transparent p-4 pt-12">
                  <h3 className="font-heading text-2xl font-bold uppercase text-white tracking-tight drop-shadow-lg">
                    {charClass.name}
                  </h3>
                </div>
              </div>

              {/* Info Section */}
              <div className="p-5 space-y-3">
                {/* Primary Abilities */}
                <div className="flex flex-wrap gap-1.5">
                  {charClass.primaryAbility.map((ability) => (
                    <Badge key={ability} variant="outline" className={cn(
                      "text-[9px] font-bold uppercase py-0.5 px-2 rounded border",
                      isSelected
                        ? "border-[var(--color-accent-gold)] text-[var(--color-accent-gold)] bg-[var(--color-accent-gold)]/5"
                        : "border-[var(--color-dark-section)]/20 text-[var(--color-dark-section)]/50 bg-[var(--color-muted)]"
                    )}>
                      {ability}
                    </Badge>
                  ))}
                </div>

                {/* Description */}
                <p className="text-xs text-[var(--color-dark-section)]/50 font-sans leading-relaxed line-clamp-2">
                  {charClass.description}
                </p>

                {/* Footer */}
                <div className={cn(
                  "flex items-center justify-between py-3 border-t transition-colors",
                  isSelected ? "border-[var(--color-accent-gold)]/20 text-[var(--color-accent-gold)]" : "border-[var(--color-border)] text-[var(--color-dark-section)]/30 group-hover:text-[var(--color-accent-gold)]"
                )}>
                  <div className="flex items-center gap-1.5">
                    <Shield className="h-3 w-3" />
                    <span className="text-[9px] font-bold uppercase tracking-[0.15em]">Competencias</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Swords className="h-3 w-3" />
                    <ChevronRight className="h-3 w-3" />
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
