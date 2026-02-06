"use client"

import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface WizardStepsProps {
  steps: { id: number; title: string }[]
  currentStep: number
  onStepClick?: (step: number) => void
}

export function WizardSteps({ steps, currentStep, onStepClick }: WizardStepsProps) {
  return (
    <nav aria-label="Progreso" className="mb-12">
      <ol className="flex items-center justify-between">
        {steps.map((step, index) => (
          <li key={step.id} className="relative flex-1">
            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "absolute top-6 left-[calc(50%+24px)] right-[calc(-50%+24px)] h-1",
                  currentStep > step.id ? "bg-[#EE8600]" : "bg-[#E1E1E1]"
                )}
                aria-hidden="true"
              />
            )}

            <button
              type="button"
              onClick={() => onStepClick?.(step.id)}
              disabled={step.id > currentStep}
              className={cn(
                "group relative flex flex-col items-center",
                step.id <= currentStep ? "cursor-pointer" : "cursor-not-allowed"
              )}
            >
              {/* Step Circle */}
              <span
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-none border-2 transition-all duration-300 shadow-sm",
                  currentStep > step.id
                    ? "border-[#242528] bg-[#242528] text-white scale-100"
                    : currentStep === step.id
                    ? "border-[#EE8600] bg-white text-[#EE8600] ring-4 ring-[#EE8600]/10 scale-110 z-10"
                    : "border-[#E1E1E1] bg-[#F9F9F9] text-[#242528]/20"
                )}
              >
                {currentStep > step.id ? (
                  <Check className="h-5 w-5 stroke-[4] text-[#EE8600]" />
                ) : (
                  <span className="text-sm font-bold">{step.id + 1}</span>
                )}
              </span>

              {/* Step Title */}
              <span
                className={cn(
                  "mt-4 text-[9px] font-bold uppercase tracking-widest text-center max-w-[80px] transition-colors",
                  currentStep === step.id ? "text-[#EE8600]" : currentStep > step.id ? "text-[#242528]" : "text-[#242528]/20"
                )}
              >
                {step.title}
              </span>
            </button>
          </li>
        ))}
      </ol>
    </nav>
  )
}
