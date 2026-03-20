"use client"

import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { Scroll, Swords, Sparkles, Shield, BookOpen, Map, Backpack, ScrollText } from "lucide-react"

interface WizardStepsProps {
  steps: { id: number; title: string }[]
  currentStep: number
  onStepClick?: (step: number) => void
}

// Iconos temáticos por paso - cada uno representa una fase de la creación del héroe
const stepIcons = [Scroll, Swords, Sparkles, Shield, BookOpen, Map, Backpack, ScrollText]

export function WizardSteps({ steps, currentStep, onStepClick }: WizardStepsProps) {
  return (
    <nav aria-label="Progreso del héroe" className="mb-16">
      <ol className="flex items-center justify-center gap-1 sm:gap-2">
        {steps.map((step, index) => {
          const StepIcon = stepIcons[index % stepIcons.length]
          const isCompleted = currentStep > step.id
          const isCurrent = currentStep === step.id
          const isAccessible = step.id <= currentStep

          return (
            <li key={step.id} className="relative flex items-center">
              {/* Connector Line */}
              {index > 0 && (
                <div className={cn(
                  "hidden sm:block w-6 lg:w-10 h-[2px] mx-1",
                  isCompleted ? "bg-[var(--color-accent-gold)]" : "bg-[var(--color-border)]"
                )} />
              )}

              <button
                type="button"
                onClick={() => onStepClick?.(step.id)}
                disabled={!isAccessible}
                className={cn(
                  "group relative flex flex-col items-center gap-2 transition-all duration-300",
                  isAccessible ? "cursor-pointer" : "cursor-not-allowed opacity-40"
                )}
              >
                {/* Step Icon Circle */}
                <div className={cn(
                  "relative flex h-12 w-12 items-center justify-center border-2 transition-all duration-300",
                  isCompleted
                    ? "border-[var(--color-accent-gold)] bg-[var(--color-accent-gold)] text-white shadow-md shadow-[var(--color-accent-gold)]/20"
                    : isCurrent
                    ? "border-[var(--color-accent-gold)] bg-white text-[var(--color-accent-gold)] ring-4 ring-[var(--color-accent-gold)]/15 scale-110 z-10 shadow-lg"
                    : "border-[var(--color-border)] bg-[var(--color-muted)] text-[var(--color-dark-section)]/20"
                )}>
                  {isCompleted ? (
                    <Check className="h-5 w-5 stroke-[3]" />
                  ) : (
                    <StepIcon className="h-5 w-5" />
                  )}

                  {/* Glow effect for current step */}
                  {isCurrent && (
                    <div className="absolute inset-0 bg-[var(--color-accent-gold)]/5 animate-pulse" />
                  )}
                </div>

                {/* Step Title */}
                <span className={cn(
                  "hidden sm:block text-[9px] font-bold uppercase tracking-widest text-center max-w-[70px] transition-colors leading-tight",
                  isCurrent 
                    ? "text-[var(--color-accent-gold)]" 
                    : isCompleted 
                    ? "text-[var(--color-dark-section)]" 
                    : "text-[var(--color-dark-section)]/25"
                )}>
                  {step.title}
                </span>
              </button>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
