import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dices, Scroll, Target, Shield, Zap, Sparkles, BookOpen, Heart, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ReglasBasicasWikiPage() {
  const rules = [
    {
      title: "La Tirada de Dados (D20)",
      description: "Casi todo en DnD se resuelve lanzando un dado de 20 caras (D20). Lanzas el dado, sumas tus modificadores y comparas el resultado con una Clase de Dificultad (CD).",
      icon: Dices,
      accent: "text-primary"
    },
    {
      title: "Ventaja y Desventaja",
      description: "A veces las circunstancias te favorecen o te perjudican. Con Ventaja, lanzas dos D20 y te quedas con el mayor. Con Desventaja, te quedas con el menor.",
      icon: Target,
      accent: "text-primary"
    },
    {
      title: "Clase de Armadura (CA)",
      description: "Representa qué tan difícil es golpearte en combate. Un ataque debe igualar o superar tu CA para hacerte daño.",
      icon: Shield,
      accent: "text-primary"
    },
    {
      title: "Puntos de Golpe (PG)",
      description: "Tu vitalidad. Si llegan a 0, caes inconsciente. Se recuperan descansando o mediante magia curativa.",
      icon: Heart,
      accent: "text-primary"
    }
  ]

  return (
    <div className="space-y-12 pb-12">
      {/* Header Section */}
      <div className="border-b border-gray-100 pb-8">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm border border-red-200 bg-red-50 text-primary text-[10px] font-bold uppercase tracking-widest">
            Fundamentos del Juego
          </div>
          <h1 className="font-heading font-black text-5xl lg:text-6xl uppercase tracking-tighter text-[#242528]">
            Reglas Básicas
          </h1>
          <div className="max-w-2xl">
            <p className="text-xl text-gray-500 leading-relaxed font-sans mt-4">
              Los cimientos sobre los que se construyen todas las historias. Domina estos conceptos y estarás listo para cualquier desafío en la mesa.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {rules.map((rule) => (
          <Card key={rule.title} className="group border-gray-200 bg-white hover:border-primary/40 hover:shadow-xl hover:shadow-black/5 transition-all duration-300 rounded-sm">
            <CardHeader className="flex flex-row items-center gap-4 space-y-0 p-6">
              <div className={`p-3 rounded-sm bg-gray-50 border border-gray-100 ${rule.accent} group-hover:bg-primary/10 transition-colors`}>
                <rule.icon className="h-6 w-6" />
              </div>
              <CardTitle className="font-heading text-2xl font-bold uppercase tracking-tighter text-[#242528] group-hover:text-primary transition-colors">
                {rule.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="px-6 pb-6 pt-0">
              <p className="text-gray-500 leading-relaxed text-sm font-sans mb-4">
                {rule.description}
              </p>
               <div className="text-[10px] font-bold text-primary uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all transform translate-y-1 group-hover:translate-y-0">
                  Aprender más
                </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Special Rule Section */}
      <Card className="border-red-100 bg-red-50 shadow-sm rounded-sm overflow-hidden">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
            <div className="p-4 rounded-sm bg-white shadow-sm border border-red-100 shrink-0">
              <Sparkles className="h-10 w-10 text-primary" />
            </div>
            <div className="space-y-4">
              <h3 className="font-heading text-2xl font-black text-primary uppercase tracking-tighter">La Regla de Oro</h3>
              <p className="text-red-900/70 max-w-3xl italic font-sans italic text-lg leading-relaxed">
                «Recuerda siempre la regla más importante: el Dungeon Master tiene la última palabra. Las reglas están para servir a la diversión y la narrativa, no al revés. Si una regla entorpece la épica, ¡cámbiala!»
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <div className="flex justify-center pt-8">
         <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-wide rounded-sm py-8 px-12 text-lg">
          <Link href="/wiki/conceptos/combate">
            Continuar al Combate <ArrowRight className="ml-2 h-6 w-6" />
          </Link>
        </Button>
      </div>
    </div>
  )
}

