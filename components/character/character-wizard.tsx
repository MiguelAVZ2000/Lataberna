"use client"

import { CharacterProvider, useCharacter } from "./character-context"
import { useCharacters } from "@/hooks/use-characters"
import { useAuth } from "@/components/auth/auth-context"
import { toast } from "sonner"
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
import { ArrowLeft, ArrowRight, ScrollText, FileText, Sword, LogIn } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

import { SpellsStep } from "./steps/spells-step"

const casterClasses = ['bard', 'cleric', 'druid', 'sorcerer', 'warlock', 'wizard']

function WizardContent() {
  const { character, currentStep, setCurrentStep } = useCharacter()
  const { saveCharacter } = useCharacters()
  const { user } = useAuth()
  const [isSaving, setIsSaving] = useState(false)
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)

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
      if (!user) {
        setShowLoginPrompt(true)
        return
      }
      setIsSaving(true)
      const { error } = await saveCharacter({
        nombre: character.name,
        raza_id: character.race!.id,
        clase_id: character.class!.id,
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
      {/* Atmospheric Header */}
      <div className="text-center mb-12 relative">
        {/* Background decorative elements */}
        <div className="absolute inset-0 -z-10 flex items-center justify-center opacity-[0.03]">
          <Sword className="h-[300px] w-[300px] text-text-primary" />
        </div>

        <div className="inline-flex items-center justify-center h-20 w-20 bg-bg-raised text-gold mb-6 border-b-4 border-gold shadow-xl shadow-gold/10">
          <ScrollText className="h-10 w-10" />
        </div>
        <h1 className="font-heading text-5xl lg:text-7xl font-bold tracking-tight text-text-primary uppercase leading-none">
          CREADOR DE HÉROES
        </h1>
        <p className="mt-4 text-xl text-text-muted font-sans italic">
          «Forja tu leyenda paso a paso. Cada elección escribe un capítulo de tu historia.»
        </p>
        <div className="mt-8 flex justify-center">
            <Button
                variant="outline"
                size="sm"
                className="gap-2 border-border-dark text-text-muted hover:text-gold hover:bg-bg-raised font-black uppercase tracking-widest text-[10px] h-10 px-6 rounded"
                onClick={() => generateCharacterPDF(character, user?.email, true)}
            >
                <FileText className="h-4 w-4 text-gold" />
                Hoja en Blanco (PDF)
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
      <Card className="border border-border-dark bg-bg-surface shadow-lg overflow-hidden">
        <CardContent className="p-8 lg:p-12">
          <StepComponent />
        </CardContent>
      </Card>

      {/* Login Prompt */}
      {showLoginPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="relative bg-white border-2 border-[#242528] shadow-[6px_6px_0px_0px_rgba(238,134,0,1)] max-w-md w-full mx-4 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-12 w-12 bg-[#242528] flex items-center justify-center shrink-0">
                <LogIn className="h-6 w-6 text-[#EE8600]" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-xl text-[#242528] uppercase tracking-tight">¿Guardar tu héroe?</h3>
                <p className="text-xs text-gray-500 font-sans mt-0.5">Necesitas una cuenta para guardar personajes</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 font-sans leading-relaxed mb-6">
              Tu personaje está listo. Crea una cuenta gratuita o inicia sesión para guardarlo y acceder a él desde cualquier dispositivo.
            </p>
            <div className="flex flex-col gap-3">
              <Link href="/register" className="flex items-center justify-center gap-2 bg-[#242528] text-white font-heading font-bold uppercase tracking-widest text-xs py-3 px-6 hover:bg-black transition-colors">
                Crear cuenta gratuita
              </Link>
              <Link href="/login" className="flex items-center justify-center gap-2 border-2 border-[#242528] text-[#242528] font-heading font-bold uppercase tracking-widest text-xs py-3 px-6 hover:bg-gray-50 transition-colors">
                Iniciar sesión
              </Link>
              <button
                onClick={() => { generateCharacterPDF(character, undefined, true); setShowLoginPrompt(false) }}
                className="flex items-center justify-center gap-2 text-[#242528]/50 hover:text-[#242528] font-sans text-xs py-2 transition-colors"
              >
                <FileText className="h-3 w-3" /> Descargar PDF sin cuenta
              </button>
            </div>
            <button onClick={() => setShowLoginPrompt(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-lg leading-none">×</button>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="mt-12 flex items-center justify-between border-t-2 border-gold pt-8">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={currentStep === 0 || isSaving}
          className="border-border-dark bg-bg-raised text-text-primary hover:bg-bg-surface font-bold uppercase tracking-widest text-xs h-14 px-10 rounded"
        >
          <ArrowLeft className="mr-3 h-5 w-5 text-gold" />
          Anterior
        </Button>
        <div className="text-xs font-bold uppercase tracking-[0.3em] text-text-muted">
          PASO {currentStep + 1} DE {steps.length}
        </div>
        <Button
          onClick={handleNext}
          disabled={!canProceed() || isSaving}
          className="bg-gold text-white hover:bg-gold/90 min-w-[200px] h-14 rounded font-bold uppercase tracking-widest text-xs shadow-lg"
        >
          {isSaving ? (
            <>
              <span className="mr-3 h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Guardando...
            </>
          ) : currentStep === steps.length - 1 ? (
            <>
              Guardar Personaje
              <ScrollText className="ml-3 h-5 w-5" />
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
