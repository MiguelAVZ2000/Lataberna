import { Card, CardContent } from "@/components/ui/card"
import { backgrounds } from "@/lib/character-data"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Scroll, BookOpen } from "lucide-react"

export default function TrasfondosPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-12 pb-20">
      {/* Page Header - D&D Beyond Style */}
      <div className="space-y-6 pt-8">
        <h1 className="font-heading font-black text-5xl uppercase tracking-tighter text-black">
          Trasfondos
        </h1>
        <div className="h-2 w-32 bg-[#EE8600]" />
        <p className="text-xl text-black/60 font-sans max-w-3xl leading-relaxed italic border-l-4 border-black pl-6">
          «El trasfondo de tu personaje revela de dónde viene, qué hacía antes de ser aventurero y cómo encaja en el mundo.»
        </p>
      </div>

      {/* Manual Section Header */}
      <div className="flex items-center gap-3 border-b-2 border-black pb-4">
        <div className="bg-black text-white text-[10px] font-black px-2 py-1 rounded-none">PHB</div>
        <h2 className="font-heading font-black text-2xl uppercase tracking-tight text-black flex-1">
          HISTORIAS DE ORIGEN
        </h2>
      </div>

      {/* Backgrounds Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {backgrounds.map((bg) => (
          <Link key={bg.id} href={`/wiki/trasfondos/${bg.id}`} className="group relative flex min-h-[400px] overflow-hidden bg-white shadow-sm hover:shadow-2xl transition-all border-2 border-black rounded-none">
            {/* Decortive Background with Icon */}
            <div className="absolute inset-0 flex items-center justify-end p-8 z-0 bg-muted/5">
               <div className="relative h-full w-[80%] flex items-center justify-center opacity-10 group-hover:opacity-20 transition-opacity duration-700">
                  <Scroll className="h-64 w-64 text-black rotate-12" />
               </div>
            </div>

            {/* Tinted Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent group-hover:via-white/90 transition-all duration-500" />

            {/* Left accent line */}
            <div className="absolute left-0 inset-y-0 w-1.5 bg-[#EE8600] scale-y-0 group-hover:scale-y-100 transition-transform duration-500" />

            {/* Info Box */}
            <div className="relative z-10 w-full p-8 flex flex-col justify-between">
              <div className="max-w-[85%] space-y-6">
                <div className="space-y-2">
                   <div className="flex items-center gap-3">
                      <div className="h-10 w-10 border-2 border-black rounded-none flex items-center justify-center bg-white group-hover:bg-black group-hover:border-black transition-all duration-300">
                        <BookOpen className="h-5 w-5 text-black group-hover:text-white transition-colors" />
                      </div>
                      <h3 className="font-heading text-4xl font-black uppercase text-black group-hover:text-black transition-colors leading-none tracking-tighter">
                        {bg.name}
                      </h3>
                   </div>
                   <p className="text-[10px] font-sans font-black text-black/40 uppercase tracking-[0.3em]">Pasado Notable</p>
                </div>
                
                <div className="h-1 w-16 bg-[#EE8600] group-hover:w-full transition-all duration-700" />

                <p className="text-sm text-black font-sans font-bold leading-relaxed italic">
                  «{bg.description}»
                </p>

                <div className="space-y-3 pt-2">
                   <div className="flex flex-col gap-1.5">
                     <span className="text-[9px] text-black/40 font-black uppercase tracking-widest">Competencias de Habilidad</span>
                     <div className="flex flex-wrap gap-2">
                       {bg.skillProficiencies.map(skill => (
                         <Badge key={skill} variant="outline" className="border-black text-black font-black uppercase text-[9px] rounded-none px-2 py-0.5">{skill}</Badge>
                       ))}
                     </div>
                   </div>
                   <div className="flex flex-col gap-1.5">
                     <span className="text-[9px] text-black/40 font-black uppercase tracking-widest">Rasgo Distintivo</span>
                     <Badge className="bg-black text-white border-none uppercase text-[9px] font-black w-fit rounded-none px-3">{bg.feature}</Badge>
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

      {/* Quick Guide Footer Section */}
      <div className="p-10 border-2 border-black bg-black text-white rounded-none shadow-[4px_4px_0px_0px_rgba(238,134,0,1)]">
        <div className="max-w-4xl space-y-8">
           <h4 className="font-heading text-4xl font-black uppercase tracking-tighter flex items-center gap-3">
             <span className="h-2 w-10 bg-[#EE8600]" /> ¿Qué define un Trasfondo?
           </h4>
           <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-2">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#EE8600]">Competencias</p>
                <p className="text-sm text-white/70 font-sans leading-relaxed">Ganas dominio sobre habilidades y herramientas que reflejan tu vida pasada antes de la aventura.</p>
              </div>
              <div className="space-y-2">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#EE8600]">Equipo Inicial</p>
                <p className="text-sm text-white/70 font-sans leading-relaxed">Cada origen proporciona un conjunto básico de pertenencias y oro para comenzar tu viaje.</p>
              </div>
              <div className="space-y-2">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#EE8600]">Rasgo Distintivo</p>
                <p className="text-sm text-white/70 font-sans leading-relaxed">Una capacidad única que te otorga beneficios específicos al interactuar con el entorno.</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  )
}
