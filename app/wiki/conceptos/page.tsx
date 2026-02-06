import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Scroll, Shield, Zap, Sparkles, Sword, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function ConceptosIndexPage() {
  const concepts = [
    {
      title: "Reglas Básicas",
      desc: "Los fundamentos: D20, ventaja, CA y puntos de golpe.",
      href: "/wiki/conceptos/reglas-basicas",
      icon: Scroll
    },
    {
      title: "Combate",
      desc: "Turnos, acciones, iniciativa y tácticas de batalla.",
      href: "/wiki/conceptos/combate",
      icon: Sword
    },
    {
      title: "Magia",
      desc: "Cómo funciona la Trama, componentes y concentración.",
      href: "/wiki/conceptos/magia",
      icon: Zap
    },
    {
      title: "Hechizos",
      desc: "Grimorio con ejemplos de conjuros icónicos.",
      href: "/wiki/conceptos/hechizos",
      icon: Sparkles
    },
    {
      title: "Rasgos y Aptitudes",
      desc: "Habilidades especiales de raza, clase y trasfondo.",
      href: "/wiki/conceptos/rasgos",
      icon: Shield
    }
  ]

  return (
    <div className="space-y-12">
      <div className="border-b-4 border-accent-gold pb-8">
        <h1 className="font-heading font-black text-4xl uppercase tracking-tighter text-[#242528]">
          Reglas y Mecánicas
        </h1>
        <p className="mt-4 text-xl text-gray-500 max-w-2xl leading-relaxed">
          Domina los sistemas que dan vida a tus aventuras en La Taberna. Del combate a la magia, todo lo que necesitas saber.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {concepts.map((concept) => (
          <Link key={concept.title} href={concept.href}>
            <Card className="h-full border border-gray-200 bg-white hover:border-primary/40 hover:shadow-xl hover:shadow-black/5 transition-all group rounded-sm">
              <CardHeader className="p-6">
                 <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-sm bg-gray-50 border border-gray-100 group-hover:bg-primary/10 transition-colors">
                  <concept.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="font-heading font-bold text-2xl uppercase text-[#242528] group-hover:text-primary transition-colors tracking-tighter">
                  {concept.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="px-6 pb-6 pt-0">
                <p className="text-gray-500 leading-relaxed text-sm mb-4 font-sans">
                  {concept.desc}
                </p>
                <div className="text-[10px] font-bold text-primary uppercase tracking-widest flex items-center gap-1">
                  Leer Más <ArrowRight className="h-3 w-3" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

