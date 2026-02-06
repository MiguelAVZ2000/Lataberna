import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Book, Users, Sword, Globe, Scroll, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function WikiPage() {
  const categories = [
    {
      title: "Razas",
      description: "Conoce a los habitantes del multiverso, desde elfos ancestrales hasta tieflings marcados.",
      icon: Users,
      href: "/wiki/razas",
      color: "text-black"
    },
    {
      title: "Clases",
      description: "Define tu camino: guerrero, mago, bardo o cualquier otra senda heroica.",
      icon: Sword,
      href: "/wiki/clases",
      color: "text-black"
    },
    {
      title: "Reglas",
      description: "Todo lo que necesitas saber sobre combate, magia y mecánicas de juego.",
      icon: Scroll,
      href: "/wiki/conceptos",
      color: "text-black"
    }
  ]

  return (
    <div className="space-y-12">
      <div className="border-b-4 border-accent-gold pb-8">
        <h1 className="font-heading font-black text-4xl uppercase tracking-tighter text-foreground">
          Enciclopedia de La Taberna
        </h1>
        <p className="mt-4 text-xl text-muted-foreground max-w-2xl leading-relaxed">
          Tu fuente definitiva de conocimiento sobre Dungeons & Dragons, nuestro mundo y las reglas que lo rigen.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Link key={category.title} href={category.href}>
            <Card className="h-full border border-neutral-200 bg-card transition-all hover:border-black hover:shadow-xl hover:shadow-black/5 group">
              <CardHeader className="p-6">
                <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-sm bg-accent border border-neutral-200 group-hover:bg-black/5 transition-colors`}>
                  <category.icon className={`h-6 w-6 ${category.color}`} />
                </div>
                <CardTitle className="font-heading font-bold text-2xl uppercase text-black group-hover:text-black transition-colors">
                  {category.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="px-6 pb-6 pt-0">
                <p className="text-zinc-600 leading-relaxed text-sm mb-4">
                  {category.description}
                </p>
                <div className="text-xs font-bold text-black uppercase tracking-widest flex items-center gap-1">
                  Explorar <ArrowRight className="h-3 w-3" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="rounded-sm border border-border bg-muted/50 p-8 shadow-sm">
        <div className="flex flex-col gap-8 md:flex-row md:items-center">
          <div className="flex-1 space-y-4">
             <div className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-xs">
                <Book className="h-4 w-4" />
                Aprendizaje
             </div>
            <h3 className="font-heading text-3xl font-black text-foreground uppercase tracking-tighter">
              ¿Nuevo en la Taberna?
            </h3>
            <p className="text-muted-foreground max-w-xl">
              Si es tu primera vez en el mundo del rol, te recomendamos empezar por nuestras guías rápidas antes de sumergirte en la profundidad de la enciclopedia. Aprenderás lo esencial para empezar a jugar hoy mismo.
            </p>
          </div>
          <Button asChild size="lg" className="bg-primary text-white hover:bg-primary/90 rounded-sm font-bold uppercase tracking-wide">
            <Link href="/guias">
              Ver Guías de Juego
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

