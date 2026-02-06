"use client"

import { useState } from "react"

import { CharacterProvider, useCharacter } from "./character-context"
import { useCharacters } from "@/hooks/use-characters"
import { toast } from "sonner"
import { useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { generateCharacterPDF } from "@/lib/pdf-service"
import { WizardSteps } from "./wizard-steps"
import { RaceStep } from "./steps/race-step"
import { ClassStep } from "./steps/class-step"
import { AbilitiesStep } from "./steps/abilities-step"
import { BackgroundStep } from "./steps/background-step"
import { DetailsStep } from "./steps/details-step"
import { EquipmentStep } from "./steps/equipment-step"
import { SummaryStep } from "./steps/summary-step"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, ArrowRight, Users, FileText } from "lucide-react"

import { SpellsStep } from "./steps/spells-step"

const casterClasses = ['bard', 'cleric', 'druid', 'sorcerer', 'warlock', 'wizard']

function WizardContent() {
  const { character, currentStep, setCurrentStep } = useCharacter()
  const { saveCharacter } = useCharacters()
  const [isSaving, setIsSaving] = useState(false)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
    })
  }, [])

  const isCaster = character.class && casterClasses.includes(character.class.id)

  // Definición dinámica de pasos
  const allStepsDefinition = [
    { title: "Raza", component: RaceStep, validate: () => character.race !== null },
    { title: "Clase", component: ClassStep, validate: () => character.class !== null },
    ...(isCaster ? [{ title: "Hechizos", component: SpellsStep, validate: () => true }] : []),
    { title: "Atributos", component: AbilitiesStep, validate: () => true },
    { title: "Trasfondo", component: BackgroundStep, validate: () => character.background !== null },
    { title: "Detalles", component: DetailsStep, validate: () => character.name.trim() !== "" },
    { title: "Equipo", component: EquipmentStep, validate: () => true },
    { title: "Resumen", component: SummaryStep, validate: () => true },
  ]

  const steps = allStepsDefinition.map((step, index) => ({
    id: index,
    title: step.title,
    component: step.component,
    validate: step.validate
  }))

  const canProceed = () => {
    return steps[currentStep]?.validate() ?? true
  }

  const handleNext = async () => {
    if (currentStep === steps.length - 1) {
      setIsSaving(true)
      const { error } = await saveCharacter({
        nombre: character.name,
        raza_id: character.race?.id,
        clase_id: character.class?.id,
        nivel: character.level,
        estadisticas: { 
            abilities: character.abilities, 
            skills: character.skills, 
            spells: character.spells,
            hitDie: character.class?.hitDie, 
            speed: character.race?.speed 
        },
        biografia: { 
            alignment: character.alignment,
            personalityTraits: character.personalityTraits, 
            ideals: character.ideals, 
            bonds: character.bonds, 
            flaws: character.flaws,
            background: character.background?.id 
        }
      })
      setIsSaving(false)

      if (error) {
        toast.error("Error al guardar personaje", { description: typeof error === 'string' ? error : error.message })
      } else {
        toast.success("¡Personaje guardado!", { description: "Tu heroe ha sido inmortalizado en la taberna." })
      }
      return
    }

    if (currentStep < steps.length - 1 && canProceed()) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const StepComponent = steps[currentStep]?.component || (() => null)

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center h-20 w-20 rounded-none bg-[#242528] text-white mb-6 border-b-4 border-[#EE8600] shadow-xl">
          <Users className="h-10 w-10" />
        </div>
        <h1 className="font-heading text-5xl lg:text-7xl font-bold tracking-tight text-[#242528] uppercase leading-none">
          CREADOR DE PERSONAJES
        </h1>
        <p className="mt-4 text-xl text-muted-foreground font-sans italic">
          «Forja tu héroe paso a paso y desciende a la aventura.»
        </p>
        <div className="mt-8">
            <Button 
                variant="outline" 
                size="sm" 
                className="gap-2 border-border text-gray-500 hover:text-primary hover:bg-gray-50 font-black uppercase tracking-widest text-[10px] h-10 px-6" 
                onClick={() => generateCharacterPDF(character, user?.email, true)}
            >
                <FileText className="h-4 w-4 text-primary" />
                Descargar Hoja en Blanco
            </Button>
        </div>
      </div>

      {/* Progress Steps */}
      <WizardSteps
        steps={steps.map(s => ({ id: s.id, title: s.title }))}
        currentStep={currentStep}
        onStepClick={(step) => step <= currentStep && setCurrentStep(step)}
      />

      {/* Step Content */}
      <Card className="high-contrast-card">
        <CardContent className="p-8 lg:p-12">
          <StepComponent />
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="mt-10 flex items-center justify-between border-t-4 border-accent-gold pt-8">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={currentStep === 0 || isSaving}
          className="border-[#E1E1E1] bg-white text-[#242528] hover:bg-[#F9F9F9] font-bold uppercase tracking-widest text-xs h-14 px-10 rounded-none"
        >
          <ArrowLeft className="mr-3 h-5 w-5 text-[#EE8600]" />
          Anterior
        </Button>
        <div className="text-xs font-bold uppercase tracking-[0.3em] text-[#242528]/40">
          PASO {currentStep + 1} DE {steps.length}
        </div>
        <Button
          onClick={handleNext}
          disabled={!canProceed() || isSaving}
          className="bg-[#242528] text-white hover:bg-black min-w-[200px] h-14 rounded-none font-bold uppercase tracking-widest text-xs shadow-lg"
        >
          {isSaving ? (
            <>
              <span className="mr-3 h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Guardando...
            </>
          ) : currentStep === steps.length - 1 ? (
            <>
              Guardar Personaje
              <Users className="ml-3 h-5 w-5" />
            </>
          ) : (
            <>
              Siguiente
              <ArrowRight className="ml-3 h-5 w-5" />
            </>
          )}
        </Button>
      </div>
    </div>
  )
}

export function CharacterCreatorWizard() {
  return (
    <CharacterProvider>
      <WizardContent />
    </CharacterProvider>
  )
}
