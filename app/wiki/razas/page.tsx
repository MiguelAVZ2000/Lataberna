import { Card, CardContent } from "@/components/ui/card"
import { races } from "@/lib/character-data"
import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Users } from "lucide-react"

export default function RazasWikiPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-12 pb-20">
      {/* Page Header - D&D Beyond Style */}
      <div className="space-y-6 pt-8">
        <h1 className="font-heading font-black text-5xl uppercase tracking-tighter text-black">
          Razas
        </h1>
        <div className="h-2 w-32 bg-[#EE8600]" />
        <p className="text-xl text-black/60 font-sans max-w-3xl leading-relaxed italic border-l-4 border-black pl-6">
          «Un resumen de las razas de personajes para Dungeons & Dragons. Cada raza otorga rasgos únicos y bonificadores para definir tu identidad.»
        </p>
      </div>

      {/* Manual Section Header */}
      <div className="flex items-center gap-3 border-b-2 border-black pb-4">
        <div className="bg-black text-white text-[10px] font-black px-2 py-1 rounded-none">PHB</div>
        <h2 className="font-heading font-black text-2xl uppercase tracking-tight text-black flex-1">
          MANUAL DEL JUGADOR
        </h2>
      </div>

      {/* Species Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {races.map((raza) => (
          <Link key={raza.id} href={`/wiki/razas/${raza.id}`} className="group relative flex min-h-[450px] overflow-hidden bg-white shadow-sm hover:shadow-2xl transition-all border-2 border-black rounded-none">
            {/* Character Image Background */}
            <div className="absolute inset-0 flex items-center justify-end p-4 z-0 bg-muted/10">
               <div className="relative h-full w-[90%]">
                <Image
                  src={raza.image}
                  alt={raza.name}
                  fill
                  className="object-contain object-right pt-4 transition-all duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                />
               </div>
            </div>

            {/* Tinted Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent group-hover:via-white/90 transition-all duration-500" />

            {/* Left accent line */}
            <div className="absolute left-0 inset-y-0 w-1.5 bg-[#EE8600] scale-y-0 group-hover:scale-y-100 transition-transform duration-500" />

            {/* Info Box */}
            <div className="relative z-10 w-full p-8 flex flex-col justify-between">
              <div className="max-w-[80%] space-y-6">
                <div className="space-y-2">
                   <div className="flex items-center gap-3">
                      <div className="h-10 w-10 border-2 border-black rounded-none flex items-center justify-center bg-white group-hover:bg-black group-hover:border-black transition-all duration-300">
                        <Users className="h-5 w-5 text-black group-hover:text-white transition-colors" />
                      </div>
                      <h3 className="font-heading text-4xl font-black uppercase text-black group-hover:text-black transition-colors leading-none tracking-tighter">
                        {raza.name}
                      </h3>
                   </div>
                   <p className="text-[10px] font-sans font-black text-black/40 uppercase tracking-[0.3em]">Linaje Heroico</p>
                </div>
                
                <div className="h-1 w-16 bg-[#EE8600] group-hover:w-full transition-all duration-700" />

                <p className="text-sm text-black font-sans font-bold leading-relaxed italic">
                  «{raza.description}»
                </p>

                <div className="space-y-3 pt-2">
                   <div className="flex flex-col gap-1.5">
                     <span className="text-[9px] text-black/40 font-black uppercase tracking-widest">Bonificadores</span>
                     <div className="flex flex-wrap gap-2">
                       {Object.entries(raza.abilityBonuses).map(([ability, bonus]) => (
                         <Badge key={ability} variant="outline" className="border-black text-black font-black uppercase text-[9px] rounded-none px-2 py-0.5">{ability.toUpperCase()} +{bonus}</Badge>
                       ))}
                     </div>
                   </div>
                   <div className="flex flex-col gap-1.5">
                     <span className="text-[9px] text-black/40 font-black uppercase tracking-widest">Distribución de Tamaño</span>
                     <Badge className="bg-black text-white border-none uppercase text-[9px] font-black w-fit rounded-none px-3">{raza.size}</Badge>
                   </div>
                </div>

              </div>

               {/* Button */}
               <div className="mt-8">
                  <div className="bg-[#EE8600] text-white text-[11px] font-black uppercase tracking-[0.2em] px-8 py-4 rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-none group-hover:translate-x-1 group-hover:translate-y-1 transition-all duration-300 text-center w-full border-2 border-black">
                    Ver Detalles
                  </div>
               </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
