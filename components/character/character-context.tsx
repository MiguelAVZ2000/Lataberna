"use client"

import { createContext, useContext, useState, ReactNode } from "react"
import { Race, CharacterClass, Background, races, classes, backgrounds } from "@/lib/character-data"

export interface CharacterData {
  name: string
  race: Race | null
  class: CharacterClass | null
  background: Background | null
  level: number
  subrace: string
  subclass: string
  xp: number
  abilities: {
    str: number
    dex: number
    con: number
    int: number
    wis: number
    cha: number
  }
  skills: string[]
  spells: string[]
  alignment: string
  personalityTraits: string
  ideals: string
  bonds: string
  flaws: string
  // Nuevos campos para la ficha completa
  age: string
  height: string
  weight: string
  eyes: string
  skin: string
  hair: string
  languages: string
  equipment: string
  items: string[]
  classFeatures: string
  feats: string
}

interface CharacterContextType {
  character: CharacterData
  updateCharacter: (updates: Partial<CharacterData>) => void
  currentStep: number
  setCurrentStep: (step: number) => void
  resetCharacter: () => void
}

const defaultCharacter: CharacterData = {
  name: "",
  race: null,
  class: null,
  background: null,
  level: 1,
  subrace: "",
  subclass: "",
  xp: 0,
  abilities: {
    str: 10,
    dex: 10,
    con: 10,
    int: 10,
    wis: 10,
    cha: 10,
  },
  skills: [],
  spells: [],
  alignment: "",
  personalityTraits: "",
  ideals: "",
  bonds: "",
  flaws: "",
  age: "",
  height: "",
  weight: "",
  eyes: "",
  skin: "",
  hair: "",
  languages: "",
  equipment: "",
  items: [],
  classFeatures: "",
  feats: "",
}

const CharacterContext = createContext<CharacterContextType | undefined>(undefined)

export function CharacterProvider({ children }: { children: ReactNode }) {
  const [character, setCharacter] = useState<CharacterData>(defaultCharacter)
  const [currentStep, setCurrentStep] = useState(0)

  const updateCharacter = (updates: Partial<CharacterData>) => {
    setCharacter((prev) => ({ ...prev, ...updates }))
  }

  const resetCharacter = () => {
    setCharacter(defaultCharacter)
    setCurrentStep(0)
  }

  return (
    <CharacterContext.Provider
      value={{
        character,
        updateCharacter,
        currentStep,
        setCurrentStep,
        resetCharacter,
      }}
    >
      {children}
    </CharacterContext.Provider>
  )
}

export function useCharacter() {
  const context = useContext(CharacterContext)
  if (context === undefined) {
    throw new Error("useCharacter must be used within a CharacterProvider")
  }
  return context
}
