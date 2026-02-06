"use client"

import { abilities, calculateModifier, formatModifier } from "@/lib/character-data"
import { useCharacter } from "../character-context"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Dices, RotateCcw, Sparkles, ChevronUp, ChevronDown } from "lucide-react"
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

      {/* Control Bar - D&D Beyond Style */}
      <div className="bg-white border border-[#E1E1E1] p-6 flex flex-wrap items-center justify-between gap-6 shadow-sm">
        <div className="flex gap-4">
          <Button 
            onClick={rollStats} 
            className="h-12 px-6 bg-[#242528] hover:bg-[#EE8600] text-white rounded-none font-bold uppercase tracking-widest text-[10px] transition-colors"
          >
            <Dices className="mr-3 h-4 w-4" />
            Tirar Dados (4d6)
          </Button>
          <Button 
            onClick={resetStats} 
            variant="outline"
            className="h-12 px-6 border-[#E1E1E1] text-[#242528] rounded-none font-bold uppercase tracking-widest text-[10px] hover:bg-gray-50"
          >
            <RotateCcw className="mr-3 h-4 w-4 text-[#EE8600]" />
            Reiniciar
          </Button>
        </div>

        <div className="flex items-center gap-4 border-l border-[#E1E1E1] pl-6">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#242528]/40">Puntos Disponibles</span>
          <div className={cn(
            "text-3xl font-heading font-bold",
            remainingPoints < 0 ? "text-red-500" : "text-[#242528]"
          )}>
            {remainingPoints}
          </div>
        </div>
      </div>

      {/* Ability Scores Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {abilities.map((ability) => {
          const baseScore = character.abilities[ability.id as keyof typeof character.abilities]
          const racialBonus = racialBonuses[ability.id] || 0
          const totalScore = baseScore + racialBonus
          const modifier = calculateModifier(totalScore)

          return (
            <div key={ability.id} className="border border-[#E1E1E1] bg-white group hover:border-[#EE8600] transition-colors shadow-sm overflow-hidden">
               {/* Accent top bar */}
               <div className="h-1 w-full bg-[#242528] group-hover:bg-[#EE8600] transition-colors" />
               
               <div className="p-8 space-y-8">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <h3 className="font-heading text-3xl font-bold text-[#242528] uppercase tracking-tight">{ability.name}</h3>
                      <span className="text-[10px] font-bold text-[#242528]/30 uppercase tracking-[0.2em]">{ability.id}</span>
                    </div>
                    {/* Big Mod Circle style - La Taberna themed */}
                    <div className="w-20 h-20 rounded-none border-2 border-[#242528] flex flex-col items-center justify-center bg-[#F9F9F9] shadow-[4px_4px_0px_0px_rgba(36,37,40,1)]">
                       <span className="text-[10px] font-bold text-[#242528]/40 uppercase leading-none mb-1">MOD</span>
                       <span className="text-3xl font-heading font-bold text-[#242528]">
                         {formatModifier(modifier)}
                       </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 items-center">
                    <div className="space-y-1">
                       <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#242528]/40">Valor Total</span>
                       <div className="text-4xl font-heading font-bold text-[#EE8600]">{totalScore}</div>
                    </div>
                    {/* Stepper controls */}
                    <div className="flex border border-[#E1E1E1] h-14">
                       <button 
                        onClick={() => handleAbilityChange(ability.id, Math.max(8, baseScore - 1))}
                        className="flex-1 flex items-center justify-center hover:bg-[#F9F9F9] border-r border-[#E1E1E1] transition-colors"
                       >
                         <ChevronDown className="h-4 w-4 text-[#242528]" />
                       </button>
                       <div className="w-12 flex items-center justify-center font-bold text-[#242528] bg-white">
                         {baseScore}
                       </div>
                       <button 
                        onClick={() => handleAbilityChange(ability.id, Math.min(15, baseScore + 1))}
                        className="flex-1 flex items-center justify-center hover:bg-[#F9F9F9] transition-colors"
                       >
                         <ChevronUp className="h-4 w-4 text-[#242528]" />
                       </button>
                    </div>
                  </div>

                  {/* Racial Bonus pill */}
                  <div className="pt-4 border-t border-[#E1E1E1] flex items-center justify-between">
                     <span className="text-[9px] font-bold uppercase tracking-widest text-[#242528]/30 italic">Puntos Base: {baseScore}</span>
                     {racialBonus > 0 && (
                        <div className="flex items-center gap-2 bg-[#242528] text-white px-3 py-1 text-[9px] font-bold uppercase tracking-widest">
                          +{racialBonus} {character.race?.name}
                        </div>
                     )}
                  </div>
               </div>
            </div>
          )
        })}
      </div>

      {/* Racial Summary Footer */}
      {character.race && (
        <div className="p-10 border border-[#E1E1E1] bg-[#F9F9F9] space-y-6">
           <h4 className="font-heading text-xl font-bold uppercase tracking-tight text-[#242528] flex items-center gap-3">
             <Sparkles className="h-5 w-5 text-[#EE8600]" /> Ajustes de Linaje
           </h4>
           <div className="flex flex-wrap gap-4">
              {Object.entries(character.race.abilityBonuses).map(([ability, bonus]) => (
                <div key={ability} className="flex items-center gap-3 bg-white border border-[#E1E1E1] p-4 min-w-[160px]">
                   <span className="w-1.5 h-1.5 bg-[#EE8600] rounded-full" />
                   <span className="text-[10px] font-bold uppercase tracking-widest text-[#242528]/40 shrink-0">
                     {abilities.find(a => a.id === ability)?.name}
                   </span>
                   <span className="text-2xl font-heading font-bold text-[#242528] ml-auto">+{bonus}</span>
                </div>
              ))}
           </div>
        </div>
      )}
    </div>
  )
}
