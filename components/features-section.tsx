import Link from "next/link"
import { ShoppingCart, BookOpen, Users } from "lucide-react"

const features = [
  {
    icon: ShoppingCart,
    title: "Tienda de Rol",
    description: "Dados artesanales, libros de reglas oficiales, miniaturas detalladas y todo el equipamiento para tus aventuras.",
    href: "/tienda",
  },
  {
    icon: BookOpen,
    title: "Guías Completas",
    description: "Aprende a jugar D&D desde cero, domina las reglas y conviértete en un Dungeon Master legendario.",
    href: "/guias",
  },
  {
    icon: Users,
    title: "Creador de Personajes",
    description: "Herramienta paso a paso para crear tu hoja de personaje. Elige raza, clase, atributos y exporta a PDF.",
    href: "/personaje",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-24 bg-bg-surface">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <div className="text-gold font-black uppercase tracking-[0.3em] text-[10px] mb-4">Recursos de Aventurero</div>
          <h2 className="font-heading font-black text-4xl sm:text-5xl tracking-tight text-text-primary uppercase">
            TODO LO QUE NECESITAS
          </h2>
          <div
            className="h-px w-24 mx-auto my-6"
            style={{ background: "linear-gradient(to right, transparent, #EE8600, transparent)" }}
          />
          <p className="text-lg text-text-muted font-sans leading-relaxed">
            Desde el equipamiento hasta el conocimiento, La Taberna tiene todo para roleros novatos y veteranos.
          </p>
        </div>

        {/* Features Grid — 3 cols */}
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <Link key={feature.title} href={feature.href} className="group">
              <div className="h-full border border-border-dark bg-bg-base/40 hover:bg-bg-raised hover:border-gold/30 transition-all duration-300 hover:shadow-[0_0_20px_rgba(238,134,0,0.10)] flex flex-col p-8 gap-4">
                <div className="h-12 w-12 bg-bg-surface border border-border-dark flex items-center justify-center shrink-0 group-hover:bg-gold/10 group-hover:border-gold/40 transition-all">
                  <feature.icon className="h-5 w-5 text-text-muted group-hover:text-gold transition-colors" />
                </div>
                <h3 className="font-heading font-bold text-lg text-text-primary group-hover:text-gold transition-colors uppercase tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed font-sans">
                  {feature.description}
                </p>
                <div className="h-px w-full bg-border-dark group-hover:bg-gold/30 transition-colors mt-auto" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
