import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { races } from "@/lib/character-data"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight, Globe, User, Target, Book, Zap } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const raza = races.find(r => r.id === id)
  
  if (!raza) return { title: "Raza no encontrada" }

  return {
    title: `${raza.name} | Razas D&D 5e | La Taberna`,
    description: `Descubre los rasgos, habilidades y cultura de la raza ${raza.name} para tu próximo personaje de Dungeons & Dragons.`,
    openGraph: {
      images: [raza.image]
    }
  }
}

export default async function RazaDetailPage({ params }: PageProps) {
  const { id } = await params
  const raza = races.find((r) => r.id === id)

  if (!raza) {
    notFound()
  }

  return (
    <div className="max-w-7xl mx-auto pb-20 space-y-12">
      {/* Breadcrumbs - D&D Beyond Style */}
      <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#242528]/40 pt-8">
        <Link href="/wiki" className="hover:text-[#EE8600] transition-colors">Wiki</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/wiki/razas" className="hover:text-[#EE8600] transition-colors">Razas</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-[#242528]">{raza.name}</span>
      </nav>

      {/* Header Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left: Content */}
        <div className="lg:col-span-8 space-y-12">
          <div className="space-y-6">
            <h1 className="font-heading text-6xl lg:text-8xl font-black uppercase tracking-tighter text-black leading-none">
              {raza.name}
            </h1>
            <div className="h-2 w-32 bg-[#EE8600]" />
            <p className="text-xl text-black font-sans font-bold leading-relaxed italic border-l-8 border-black pl-6 py-2">
              «{raza.description}»
            </p>
          </div>

          {/* Traits Section - Brutalist Table style */}
          <section className="space-y-8 pt-6">
            <div className="flex items-center gap-4">
               <h2 className="font-heading text-4xl font-black uppercase tracking-tighter text-black">
                 Rasgos de {raza.name}
               </h2>
               <div className="h-1 flex-1 bg-black" />
            </div>

            <div className="space-y-6">
              {raza.traits.map((trait) => (
                <div key={trait.name} className="border-l-4 border-black hover:border-[#EE8600] pl-8 py-4 transition-colors group bg-white hover:bg-black/5">
                  <h3 className="font-heading font-black text-2xl text-black group-hover:text-[#EE8600] uppercase tracking-tighter mb-2 transition-colors">
                    {trait.name}
                  </h3>
                  <p className="text-black/70 leading-relaxed font-sans font-medium">
                    {trait.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Details Grid */}
          <div className="grid gap-6 sm:grid-cols-2 pt-10">
            {[
              { title: "Alineamiento", content: raza.alignment, icon: Globe },
              { title: "Edad", content: raza.age, icon: User },
              { title: "Tamaño", content: raza.sizeDescription, icon: Target },
              { title: "Idiomas", content: raza.languages.join(", "), icon: Book },
            ].map((item) => (
              <div key={item.title} className="p-8 border-2 border-black bg-white rounded-none space-y-4 shadow-sm hover:shadow-[4px_4px_0px_0px_rgba(36,37,40,1)] transition-shadow">
                <div className="flex items-center gap-3 text-[#EE8600]">
                  <div className="p-2 bg-black text-white">
                    <item.icon className="h-4 w-4" />
                  </div>
                  <h4 className="font-heading font-black uppercase tracking-[0.1em] text-black text-sm">{item.title}</h4>
                </div>
                <p className="text-sm text-black/70 leading-relaxed font-sans font-bold">
                  {item.content}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Sidebar / Stats */}
        <div className="lg:col-span-4 space-y-8 sticky top-8 animate-in fade-in slide-in-from-right-8 duration-700">
          {/* Main Visual */}
          <div className="relative aspect-[3/4] w-full bg-[#f9f9f9] border-2 border-black overflow-hidden group">
            <Image
              src={raza.image}
              alt={raza.name}
              fill
              priority={true}
              className="object-contain object-top pt-8 transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white via-white/40 to-transparent" />
          </div>

          {/* Stats Box */}
          <div className="border-2 border-black bg-white overflow-hidden shadow-[4px_4px_0px_0px_rgba(36,37,40,1)]">
            <div className="bg-black p-5">
              <h3 className="text-white font-heading font-black uppercase tracking-[0.25em] text-center text-[10px]">
                BONOS DE ATRIBUTO
              </h3>
            </div>
            <div className="p-8 space-y-4">
              {Object.entries(raza.abilityBonuses).map(([ability, bonus]) => (
                <div key={ability} className="flex items-center justify-between border-b border-black/10 pb-4 last:border-none last:pb-0 group">
                  <span className="uppercase font-black text-[10px] tracking-[0.2em] text-black/40 group-hover:text-[#EE8600] transition-colors">{ability}</span>
                  <span className="text-3xl font-heading font-black text-black">+{bonus}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Info Box */}
          <div className="p-8 border-2 border-black bg-black text-white shadow-[4px_4px_0px_0px_rgba(238,134,0,1)]">
            <h4 className="font-heading text-lg font-black uppercase tracking-tight mb-4 flex items-center gap-2 text-[#EE8600]">
              <Zap className="h-4 w-4" /> Datos Clave
            </h4>
            <ul className="space-y-4 text-xs font-sans font-bold text-white/70">
              <li className="flex justify-between border-b border-white/20 pb-2">
                <span className="uppercase tracking-widest">Tamaño</span>
                <span className="text-white">{raza.size}</span>
              </li>
              <li className="flex justify-between border-b border-white/20 pb-2">
                <span className="uppercase tracking-widest">Velocidad</span>
                <span className="text-white">{raza.speed} pies</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
