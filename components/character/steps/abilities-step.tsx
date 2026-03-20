"use client"

import { abilities, calculateModifier, formatModifier } from "@/lib/character-data"
import { useCharacter } from "../character-context"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Dices, RotateCcw, Sparkles, Plus, Minus } from "lucide-react"
import { cn } from "@/lib/utils"

export function AbilitiesStep() {
  const { character, updateCharacter } = useCharacter()

  const pointsUsed = Object.values(character.abilities).reduce((sum, val) => {
    if (val <= 13) return sum + (val - 8)
    if (val === 14) return sum + 7
    if (val === 15) return sum + 9
    return sum
  }, 0)

  const maxPoints = 27
  const remainingPoints = maxPoints - pointsUsed

  const handleAbilityChange = (abilityId: string, value: number) => {
    updateCharacter({
      abilities: {
        ...character.abilities,
        [abilityId]: value,
      },
    })
  }

  const rollStats = () => {
    const roll4d6DropLowest = () => {
      const rolls = Array.from({ length: 4 }, () => Math.floor(Math.random() * 6) + 1)
      rolls.sort((a, b) => b - a)
      return rolls.slice(0, 3).reduce((sum, val) => sum + val, 0)
    }

    const newAbilities = {
      str: roll4d6DropLowest(),
      dex: roll4d6DropLowest(),
      con: roll4d6DropLowest(),
      int: roll4d6DropLowest(),
      wis: roll4d6DropLowest(),
      cha: roll4d6DropLowest(),
    }

    updateCharacter({ abilities: newAbilities })
  }

  const resetStats = () => {
    updateCharacter({
      abilities: { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 },
    })
  }

  const racialBonuses = character.race?.abilityBonuses || {}

  return (
    <div className="space-y-10 pb-10">
      <div className="space-y-4">
        <h2 className="font-heading text-4xl font-bold text-[#242528] uppercase tracking-tight">3. Atributos</h2>
        <div className="h-[3px] w-32 bg-[#EE8600]" />
        <p className="text-lg text-[#242528]/60 font-sans italic">
          «Define el potencial físico y mental de tu aventurero.»
        </p>
      </div>

      {/* Control Bar */}
      <div className="bg-white border border-[#E1E1E1] px-4 py-3 flex flex-wrap items-center justify-between gap-3 shadow-sm">
        <div className="flex gap-2">
          <Button
            onClick={rollStats}
            className="h-9 px-4 bg-[#242528] hover:bg-[#EE8600] text-white rounded font-bold uppercase tracking-widest text-[10px] transition-colors"
          >
            <Dices className="mr-2 h-3.5 w-3.5" />
            Tirar Dados (4d6)
          </Button>
          <Button
            onClick={resetStats}
            variant="outline"
            className="h-9 px-4 border-[#E1E1E1] text-[#242528] rounded font-bold uppercase tracking-widest text-[10px] hover:bg-gray-50"
          >
            <RotateCcw className="mr-2 h-3.5 w-3.5 text-[#EE8600]" />
            Reiniciar
          </Button>
        </div>
        <div className="flex items-center gap-3 border-l border-[#E1E1E1] pl-4">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#242528]/40">Puntos disponibles</span>
          <span className={cn("text-2xl font-heading font-bold", remainingPoints < 0 ? "text-red-500" : "text-[#242528]")}>
            {remainingPoints}
          </span>
        </div>
      </div>

      {/* Ability Scores Grid */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {abilities.map((ability) => {
          const baseScore = character.abilities[ability.id as keyof typeof character.abilities]
          const racialBonus = racialBonuses[ability.id] || 0
          const totalScore = baseScore + racialBonus
          const modifier = calculateModifier(totalScore)

          return (
            <div key={ability.id} className="border border-[#E1E1E1] bg-white group hover:border-[#EE8600] transition-colors shadow-sm overflow-hidden">
              <div className="h-0.5 w-full bg-[#242528] group-hover:bg-[#EE8600] transition-colors" />

              <div className="p-4 space-y-3">
                {/* Header: name + mod badge */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-heading text-base font-bold text-[#242528] uppercase tracking-tight leading-none">{ability.name}</h3>
                    <span className="text-[9px] font-bold text-[#242528]/30 uppercase tracking-widest">{ability.id.toUpperCase()}</span>
                  </div>
                  <div className="flex flex-col items-center justify-center w-14 h-14 border-2 border-[#242528] bg-[#F9F9F9]">
                    <span className="text-[8px] font-bold text-[#242528]/40 uppercase leading-none">MOD</span>
                    <span className="text-xl font-heading font-bold text-[#242528] leading-tight">{formatModifier(modifier)}</span>
                  </div>
                </div>

                {/* Stepper + total */}
                <div className="flex items-center gap-3">
                  <div className="flex border border-[#E1E1E1] h-9 flex-1">
                    <button
                      onClick={() => handleAbilityChange(ability.id, Math.max(8, baseScore - 1))}
                      className="w-9 flex items-center justify-center hover:bg-[#EE8600] hover:text-white border-r border-[#E1E1E1] transition-colors active:bg-[#EE8600]/80 text-[#242528] font-bold text-lg leading-none"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <div className="flex-1 flex items-center justify-center font-bold text-sm text-[#242528]">
                      {baseScore}
                    </div>
                    <button
                      onClick={() => handleAbilityChange(ability.id, Math.min(15, baseScore + 1))}
                      className="w-9 flex items-center justify-center hover:bg-[#EE8600] hover:text-white border-l border-[#E1E1E1] transition-colors active:bg-[#EE8600]/80 text-[#242528] font-bold text-lg leading-none"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <div className="text-right">
                    <div className="text-[8px] font-bold uppercase tracking-widest text-[#242528]/30 leading-none">total</div>
                    <div className="text-2xl font-heading font-bold text-[#EE8600] leading-tight">{totalScore}</div>
                  </div>
                </div>

                {/* Racial bonus */}
                {racialBonus > 0 && (
                  <div className="flex justify-end">
                    <span className="bg-[#242528] text-white px-2 py-0.5 text-[8px] font-bold uppercase tracking-widest">
                      +{racialBonus} {character.race?.name}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Racial Summary Footer */}
      {character.race && Object.keys(character.race.abilityBonuses).length > 0 && (
        <div className="px-4 py-3 border border-[#E1E1E1] bg-[#F9F9F9] flex flex-wrap items-center gap-3">
          <span className="text-[9px] font-bold uppercase tracking-widest text-[#242528]/40 flex items-center gap-1.5 shrink-0">
            <Sparkles className="h-3 w-3 text-[#EE8600]" /> Ajustes de Linaje
          </span>
          {Object.entries(character.race.abilityBonuses).map(([ability, bonus]) => (
            <div key={ability} className="flex items-center gap-2 bg-white border border-[#E1E1E1] px-3 py-1.5">
              <span className="text-[9px] font-bold uppercase tracking-widest text-[#242528]/50">
                {abilities.find(a => a.id === ability)?.name}
              </span>
              <span className="text-sm font-heading font-bold text-[#242528]">+{bonus}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
