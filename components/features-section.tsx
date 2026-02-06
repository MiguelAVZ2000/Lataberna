import Link from "next/link"
import { ShoppingCart, BookOpen, Users, Dices, Sparkles, Shield } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    icon: ShoppingCart,
    title: "Tienda de Rol",
    description: "Dados artesanales, libros de reglas oficiales, miniaturas detalladas y todo el equipamiento para tus aventuras.",
    href: "/tienda",
    accent: "primary",
  },
  {
    icon: BookOpen,
    title: "Guias Completas",
    description: "Aprende a jugar D&D desde cero, domina las reglas y conviertete en un Dungeon Master legendario.",
    href: "/guias",
    accent: "accent",
  },
  {
    icon: Users,
    title: "Creador de Personajes",
    description: "Herramienta paso a paso para crear tu hoja de personaje. Elige raza, clase, atributos y exporta a PDF.",
    href: "/personaje",
    accent: "primary",
  },
  {
    icon: Dices,
    title: "Tirador de Dados",
    description: "Lanza dados virtuales con animaciones épicas. D4, D6, D8, D10, D12 y el legendario D20.",
    href: "/dados",
    accent: "accent",
  },
  {
    icon: Sparkles,
    title: "Contenido Original",
    description: "Homebrew exclusivo, campañas originales y recursos creados por nuestra comunidad de roleros.",
    href: "/contenido",
    accent: "primary",
  },
  {
    icon: Shield,
    title: "Comunidad Activa",
    description: "Únete a otros aventureros, encuentra grupos de juego y comparte tus historias épicas.",
    href: "/comunidad",
    accent: "accent",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-24 parchment-bg border-y border-border">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center mb-20">
          <div className="text-primary font-black uppercase tracking-[0.3em] text-[10px] mb-4">Recursos de Aventurero</div>
          <h2 className="font-heading font-black text-4xl sm:text-5xl tracking-tight text-foreground uppercase">
            TODO LO QUE NECESITAS
          </h2>
          <div className="h-1.5 w-24 bg-accent-gold mx-auto my-6" />
          <p className="mt-4 text-xl text-muted-foreground font-sans leading-relaxed">
            Desde el equipamiento hasta el conocimiento, La Taberna tiene todo para roleros novatos y veteranos.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Link key={feature.title} href={feature.href} className="group">
              <Card className="h-full border border-border bg-white transition-all duration-500 hover:border-accent-gold/50 shadow-sm hover:shadow-2xl hover:-translate-y-1 rounded-sm overflow-hidden">
                <CardHeader className="p-8 pb-4">
                  <div className="h-12 w-12 bg-muted rounded-sm flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors border border-border">
                    <feature.icon className={`h-6 w-6 ${feature.accent === 'primary' ? 'text-primary' : 'text-muted-foreground'} group-hover:scale-110 transition-transform`} />
                  </div>
                  <CardTitle className="font-heading font-black text-2xl text-foreground group-hover:text-primary transition-colors uppercase tracking-tight">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 pt-0">
                  <CardDescription className="text-muted-foreground text-sm leading-relaxed font-sans font-normal italic mb-6">
                    {feature.description}
                  </CardDescription>
                  <div className="h-px w-full bg-border group-hover:bg-accent-gold/30 transition-colors" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

