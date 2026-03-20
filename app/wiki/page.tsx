import { Book, Users, Sword, Scroll, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function WikiPage() {
  const categories = [
    {
      title: "Razas",
      description: "Conoce a los habitantes del multiverso, desde elfos ancestrales hasta tieflings marcados por el destino.",
      icon: Users,
      href: "/wiki/razas",
      tag: "13 Razas",
    },
    {
      title: "Clases",
      description: "Define tu camino: guerrero, mago, bardo o cualquier otra senda heroica que forje tu leyenda.",
      icon: Sword,
      href: "/wiki/clases",
      tag: "12 Clases",
    },
    {
      title: "Reglas",
      description: "Todo lo que necesitas saber sobre combate, magia y mecánicas de juego.",
      icon: Scroll,
      href: "/wiki/conceptos",
      tag: "5 Secciones",
    },
  ]

  return (
    <div className="space-y-12">

      {/* Header */}
      <div className="space-y-4 border-b-4 border-[#EE8600] pb-8">
        <h1 className="font-heading font-black text-5xl uppercase tracking-tighter text-[#242528]">
          Enciclopedia de La Taberna
        </h1>
        <p className="mt-2 text-xl text-gray-500 max-w-2xl leading-relaxed">
          Tu fuente definitiva de conocimiento sobre Dungeons & Dragons, nuestro mundo y las reglas que lo rigen.
        </p>
      </div>

      {/* Category Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Link key={category.title} href={category.href} className="group">
            <div className="relative h-full min-h-[280px] border-2 border-[#242528] bg-white overflow-hidden hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 flex flex-col">
              {/* Top gold accent line */}
              <div className="h-1 w-0 bg-[#EE8600] group-hover:w-full transition-all duration-700" />

              <div className="p-8 flex flex-col flex-1">
                {/* Icon + tag */}
                <div className="flex items-start justify-between mb-6">
                  <div className="h-14 w-14 border-2 border-[#242528] flex items-center justify-center bg-white group-hover:bg-[#242528] transition-all duration-300">
                    <category.icon className="h-7 w-7 text-[#242528] group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-widest text-[#242528]/40 border border-[#242528]/20 px-2 py-1">
                    {category.tag}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-heading font-black text-3xl uppercase text-[#242528] tracking-tighter mb-3">
                  {category.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-500 leading-relaxed font-sans flex-1">
                  {category.description}
                </p>

                {/* Footer link */}
                <div className="mt-6 pt-4 border-t border-[#242528]/10 flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-[#242528]/40 group-hover:text-[#242528] transition-colors">
                  Explorar <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* CTA Banner */}
      <div className="border-2 border-[#242528] bg-[#242528] text-white p-8 shadow-[4px_4px_0px_0px_rgba(238,134,0,1)]">
        <div className="flex flex-col gap-6 md:flex-row md:items-center">
          <div className="flex-1 space-y-3">
            <div className="inline-flex items-center gap-2 text-[#EE8600] font-black uppercase tracking-widest text-xs">
              <Book className="h-4 w-4" />
              Aprendizaje
            </div>
            <h3 className="font-heading text-3xl font-black text-white uppercase tracking-tighter">
              ¿Nuevo en la Taberna?
            </h3>
            <p className="text-white/70 max-w-xl text-sm leading-relaxed font-sans">
              Si es tu primera vez en el mundo del rol, te recomendamos empezar por nuestras guías rápidas antes de sumergirte en la profundidad de la enciclopedia.
            </p>
          </div>
          <Button asChild size="lg" className="bg-[#EE8600] text-white hover:bg-[#EE8600]/90 rounded font-black uppercase tracking-widest text-xs border-none px-10 h-14 shrink-0">
            <Link href="/guias">
              Ver Guías de Juego
            </Link>
          </Button>
        </div>
      </div>

    </div>
  )
}
