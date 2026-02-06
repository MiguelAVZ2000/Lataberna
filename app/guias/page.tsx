import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { GuideCard, Guide } from "@/components/guides/guide-card"
import { BookOpen, Users, Crown, Sparkles, ArrowRight } from "lucide-react"

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
    <div className="flex min-h-screen flex-col bg-white">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="border-b border-gray-100 bg-gray-50/50 py-16 lg:py-20">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm border border-red-200 bg-red-50 text-primary text-[10px] font-bold uppercase tracking-widest">
                Conocimiento y Sabiduría
              </div>
              <h1 className="font-heading font-black text-5xl lg:text-7xl uppercase tracking-tighter text-[#242528] leading-[0.9]">
                Guías para tus <br /> partidas de rol
              </h1>
              <p className="max-w-3xl text-xl text-gray-500 leading-relaxed font-sans">
                Domina el arte del rol con nuestras guías completas. Desde tus primeros pasos hasta técnicas avanzadas 
                de Dungeon Master, aquí encontrarás todo el conocimiento para forjar leyendas.
              </p>
            </div>
            
            {/* Categories Quick Stats */}
            <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {categories.map((cat) => (
                <div key={cat.name} className="flex items-center gap-4 rounded-sm border border-gray-200 bg-white p-5 shadow-sm transition-all hover:border-primary/40 hover:shadow-md group">
                  <div className="flex h-12 w-12 items-center justify-center rounded-sm bg-gray-50 border border-gray-100 text-primary group-hover:bg-primary/10 transition-colors">
                    <cat.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="font-heading font-bold text-lg uppercase tracking-tighter text-[#242528]">{cat.name}</div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{cat.count} guías</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Guides Grid */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex items-center justify-between mb-12 border-b border-gray-100 pb-6">
               <h2 className="font-heading text-3xl font-bold uppercase tracking-tighter text-[#242528]">Últimas Guías Publicadas</h2>
               <div className="hidden sm:flex items-center text-[10px] font-bold text-primary uppercase tracking-widest gap-1">
                 Ver todas <ArrowRight className="h-4 w-4" />
               </div>
            </div>
            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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

