import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { GuideCard, Guide } from "@/components/guides/guide-card"
import { BookOpen, Users, Crown, Sparkles } from "lucide-react"

export const metadata: Metadata = {
  title: "Guías DnD | Aprende a Jugar Dungeons & Dragons | La Taberna",
  description: "Guías completas para aprender a jugar Dungeons & Dragons desde cero. Tutoriales para crear personajes, consejos para Dungeon Masters y mucho más.",
  keywords: ["guías DnD", "como jugar DnD", "Dungeons and Dragons tutorial", "crear personaje DnD", "Dungeon Master guía"],
  openGraph: {
    title: "Guías DnD | Aprende Dungeons & Dragons",
    description: "Guías completas para aprender a jugar DnD desde cero.",
  },
}

const guides: Guide[] = [
  {
    slug: "creacion-personaje-2024",
    title: "Guía de Creación de Personajes (Reglas 2024)",
    excerpt: "Aprende a crear tu héroe paso a paso con las reglas básicas de D&D. Elige tu clase, origen y determina tus puntuaciones de característica.",
    image: "/dnd_guide_character_creation_1768855969961.png",
    category: "Personajes",
    readTime: 35,
    difficulty: "principiante",
  },
  {
    slug: "como-jugar-2024",
    title: "Cómo Jugar (Reglas 2024)",
    excerpt: "Aprende los fundamentos de D&D: pruebas de habilidad, combate, magia y exploración. Todo lo que necesitas saber para empezar tu aventura.",
    image: "/dnd_guide_character_creation_1768855969961.png",
    category: "Fundamentos",
    readTime: 45,
    difficulty: "principiante",
  },
]

const categories = [
  { name: "Fundamentos", icon: BookOpen, count: guides.filter(g => g.category === "Fundamentos").length },
  { name: "Personajes", icon: Users, count: guides.filter(g => g.category === "Personajes").length },
  { name: "Dungeon Master", icon: Crown, count: guides.filter(g => g.category === "Dungeon Master").length },
  { name: "Reglas", icon: Sparkles, count: guides.filter(g => g.category === "Reglas" || g.category === "Magia" || g.category === "Roleplay").length },
]

export default function GuiasPage() {
  return (
    <div className="flex min-h-screen flex-col bg-bg-base">
      <SiteHeader />
      <main className="flex-1">

        {/* Hero — estilo D&D Beyond */}
        <section className="bg-bg-base py-16 lg:py-24 border-b-4 border-[#EE8600]">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 border border-[#EE8600]/30 bg-[#EE8600]/10 text-[#EE8600] text-[10px] font-black uppercase tracking-[0.2em]">
                Conocimiento y Sabiduría
              </div>
              <h1 className="font-heading font-black text-5xl lg:text-7xl uppercase tracking-tighter text-white leading-[0.9]">
                Guías para tus <br />
                <span className="text-[#EE8600]">partidas de rol</span>
              </h1>
              <p className="max-w-3xl text-xl text-white/70 leading-relaxed font-sans">
                Domina el arte del rol con nuestras guías completas. Desde tus primeros pasos hasta técnicas avanzadas
                de Dungeon Master, aquí encontrarás todo el conocimiento para forjar leyendas.
              </p>
            </div>

            {/* Category Stats */}
            <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {categories.map((cat) => (
                <div key={cat.name} className="flex items-center gap-4 border-2 border-white/10 bg-white/5 p-5 hover:border-[#EE8600]/40 hover:bg-white/[0.08] transition-all group">
                  <div className="flex h-12 w-12 items-center justify-center border border-white/10 bg-white/5 group-hover:border-[#EE8600]/30 transition-colors">
                    <cat.icon className="h-6 w-6 text-white/70 group-hover:text-[#EE8600] transition-colors" />
                  </div>
                  <div>
                    <div className="font-heading font-black text-base uppercase tracking-tighter text-white">{cat.name}</div>
                    <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{cat.count} guías</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Guides Grid */}
        <section className="py-16 lg:py-24 bg-bg-light">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex items-center gap-3 border-b-2 border-[#242528]/10 pb-6 mb-12">
              <div className="bg-[#242528] text-white text-[10px] font-black px-2 py-1">PHB</div>
              <h2 className="font-heading text-3xl font-black uppercase tracking-tighter text-[#242528] flex-1">
                Últimas Guías Publicadas
              </h2>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {guides.map((guide) => (
                <GuideCard key={guide.slug} guide={guide} />
              ))}
            </div>
          </div>
        </section>

      </main>
      <SiteFooter />
    </div>
  )
}
