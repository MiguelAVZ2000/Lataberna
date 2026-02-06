import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Users, Star, Sparkles, BookOpen } from "lucide-react"

export default function RasgosWikiPage() {
  const categories = [
    {
      title: "Rasgos Raciales",
      desc: "Habilidades innatas que provienen de tu linaje. Incluyen visión en la oscuridad, resistencias naturales y aptitudes mágicas básicas.",
      icon: Users
    },
    {
      title: "Rasgos de Clase",
      desc: "Poderes que obtienes a través del entrenamiento y la experiencia. Un guerrero aprende estilos de combate, mientras que un bardo aprende a inspirar a otros.",
      icon: Shield
    },
    {
      title: "Dotes (Feats)",
      desc: "Talentos especializados que puedes elegir en lugar de mejorar tus atributos. Permiten una personalización profunda de tu estilo de juego.",
      icon: Star
    }
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground">Rasgos y Aptitudes</h1>
        <p className="mt-4 text-xl text-muted-foreground">
          Los rasgos son las características especiales que definen lo que tu personaje puede hacer más allá de sus atributos básicos.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {categories.map((cat) => (
          <Card key={cat.title} className="border-border bg-card">
            <CardHeader className="pb-2">
              <cat.icon className="h-6 w-6 text-primary mb-2" />
              <CardTitle className="font-serif text-lg">{cat.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {cat.desc}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <section className="prose prose-stone dark:prose-invert max-w-none">
        <h2 className="font-serif text-2xl font-bold flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" />
          ¿Cómo funcionan los Rasgos?
        </h2>
        <p>
          Los rasgos suelen proporcionar ventajas mecánicas pasivas o activar acciones especiales bajo ciertas condiciones. 
        </p>
        <ul className="space-y-4 list-none pl-0">
          <li className="p-4 rounded-lg border border-border bg-muted/20">
            <strong>Condicionales:</strong> Algunos rasgos solo se activan cuando tienes poca vida o cuando atacas a un enemigo específico.
          </li>
          <li className="p-4 rounded-lg border border-border bg-muted/20">
            <strong>Recursos:</strong> Ciertos rasgos poderosos tienen un número limitado de usos (ej: por Descanso Corto o Largo).
          </li>
        </ul>
      </section>

      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="font-serif text-lg flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            Rasgos de Trasfondo
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          No olvides que tu trasfondo también te otorga un rasgo único que suele estar relacionado con tu vida antes de ser aventurero, como contactos en el bajo mundo o conocimientos de leyes locales.
        </CardContent>
      </Card>
    </div>
  )
}
