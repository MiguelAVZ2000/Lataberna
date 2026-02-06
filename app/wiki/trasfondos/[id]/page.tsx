import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { backgrounds } from "@/lib/character-data"
import { Badge } from "@/components/ui/badge"
import { ChevronRight, Sparkles, Scroll, Target, Hammer, MapPin, Globe } from "lucide-react"
import Link from "next/link"

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const bg = backgrounds.find(b => b.id === id)
  
  if (!bg) return { title: "Trasfondo no encontrado" }

  return {
    title: `${bg.name} | Trasfondos D&D 5e | La Taberna`,
    description: `Explora el trasfondo ${bg.name}, sus competencias y rasgos únicos para enriquecer la historia de tu aventurero en La Taberna.`,
  }
}

export default async function TrasfondoDetailPage({ params }: PageProps) {
  const { id } = await params
  const bg = backgrounds.find(b => b.id === id)

  if (!bg) {
    notFound()
  }

  return (
    <div className="max-w-7xl mx-auto pb-20 space-y-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#242528]/40 pt-8">
        <Link href="/wiki" className="hover:text-[#EE8600] transition-colors">Wiki</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/wiki/trasfondos" className="hover:text-[#EE8600] transition-colors">Trasfondos</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-[#242528]">{bg.name}</span>
      </nav>

      {/* Header Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Content */}
        <div className="lg:col-span-8 space-y-12">
          <div className="space-y-6">
            <h1 className="font-heading text-6xl lg:text-8xl font-black uppercase tracking-tighter text-black leading-none">
              {bg.name}
            </h1>
            <div className="h-2 w-32 bg-[#EE8600]" />
            <p className="text-xl text-black font-sans font-bold leading-relaxed italic border-l-8 border-black pl-6 py-2">
              «{bg.description}»
            </p>
          </div>

          {/* Feature Section */}
          <section className="space-y-6 pt-6">
            <div className="flex items-center gap-4">
               <h2 className="font-heading text-4xl font-black uppercase tracking-tighter text-black">
                 Rasgo: {bg.feature}
               </h2>
               <div className="h-1 flex-1 bg-black" />
            </div>
            <div className="p-8 border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(36,37,40,1)]">
              <p className="text-lg text-black/80 leading-relaxed font-sans font-medium">
                {bg.featureDescription}
              </p>
            </div>
          </section>

          {/* Proficiencies Grid */}
          <section className="space-y-8 pt-6">
            <div className="flex items-center gap-4">
               <h2 className="font-heading text-4xl font-black uppercase tracking-tighter text-black">
                 Competencias de Origen
               </h2>
               <div className="h-1 flex-1 bg-black" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Skill Proficiencies */}
              <div className="p-8 border-2 border-black bg-white space-y-6 hover:shadow-[4px_4px_0px_0px_rgba(36,37,40,1)] transition-shadow">
                <div className="flex items-center gap-3 text-[#EE8600]">
                  <div className="bg-black p-2 text-white">
                    <Target className="h-5 w-5" />
                  </div>
                  <h4 className="font-heading font-black uppercase tracking-[0.1em] text-black text-sm">Habilidades</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {bg.skillProficiencies.map(skill => (
                    <Badge key={skill} variant="outline" className="border-black text-black text-[10px] font-black uppercase px-3 py-1 rounded-none bg-white hover:bg-black hover:text-white transition-colors">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Tool Proficiencies */}
              {bg.toolProficiencies && bg.toolProficiencies.length > 0 && (
                <div className="p-8 border-2 border-black bg-white space-y-6 hover:shadow-[4px_4px_0px_0px_rgba(36,37,40,1)] transition-shadow">
                  <div className="flex items-center gap-3 text-[#EE8600]">
                    <div className="bg-black p-2 text-white">
                      <Hammer className="h-5 w-5" />
                    </div>
                    <h4 className="font-heading font-black uppercase tracking-[0.1em] text-black text-sm">Herramientas</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {bg.toolProficiencies.map(tool => (
                      <Badge key={tool} variant="outline" className="border-black text-black text-[10px] font-black uppercase px-3 py-1 rounded-none bg-white hover:bg-black hover:text-white transition-colors">
                        {tool}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-4 space-y-8 sticky top-8 animate-in fade-in slide-in-from-right-8 duration-700">
          {/* Lore Box */}
          <div className="border-2 border-black bg-white p-8 space-y-6 shadow-[4px_4px_0px_0px_rgba(238,134,0,1)]">
             <h4 className="font-heading text-xl font-black uppercase tracking-tight text-black flex items-center gap-2">
               <MapPin className="h-5 w-5 text-[#EE8600]" /> Guía de Trasfondo
             </h4>
             <p className="text-sm text-black/70 leading-relaxed font-sans font-bold">
               Un trasfondo provee no solo beneficios mecánicos, sino una base sólida para tu interpretación (roleplay). 
             </p>
             <div className="space-y-4 pt-6 border-t-2 border-black">
                <div className="flex justify-between items-center group">
                  <span className="text-[10px] font-black uppercase tracking-widest text-black/40 group-hover:text-[#EE8600] transition-colors">Idiomas</span>
                  <span className="text-xs font-black text-black">{bg.languages || "Ninguno"}</span>
                </div>
                <div className="flex justify-between items-center text-xs group">
                  <span className="text-[10px] font-black uppercase tracking-widest text-black/40 group-hover:text-[#EE8600] transition-colors">Equipo Sugerido</span>
                  <span className="text-[#EE8600] font-black">Standard PHB</span>
                </div>
             </div>
          </div>

          {/* D&D Beyond Styled Tip Box */}
          <div className="p-8 border-2 border-black bg-black text-white space-y-4 shadow-[4px_4px_0px_0px_rgba(36,37,40,1)]">
            <h4 className="font-heading text-lg font-black uppercase tracking-tight flex items-center gap-2 text-[#EE8600]">
              <Globe className="h-4 w-4" /> Taberna Tip
            </h4>
            <p className="text-xs font-sans font-bold text-white/70 leading-relaxed">
              Recuerda que los trasfondos son personalizables. Habla con tu Dungeon Master para ajustar las competencias o el equipo a la historia única de tu personaje.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
