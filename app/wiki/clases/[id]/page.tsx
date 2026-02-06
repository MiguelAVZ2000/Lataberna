import React from "react"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { classes } from "@/lib/character-data"
import { Badge } from "@/components/ui/badge"
import { ChevronRight, Shield, Heart, Zap, BookOpen } from "lucide-react"

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const clase = classes.find(c => c.id === id)
  
  if (!clase) return { title: "Clase no encontrada" }

  return {
    title: `${clase.name} | Wiki La Taberna`,
    description: clase.description
  }
}

export default async function ClaseDetailPage({ params }: PageProps) {
  const { id } = await params
  const clase = classes.find(c => c.id === id)

  if (!clase) notFound()

  return (
    <div className="max-w-7xl mx-auto pb-20 space-y-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#242528]/40 pt-8">
        <Link href="/wiki" className="hover:text-[#EE8600] transition-colors">Wiki</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/wiki/clases" className="hover:text-[#EE8600] transition-colors">Clases</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-[#242528]">{clase.name}</span>
      </nav>

      {/* Header Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Content */}
        <div className="lg:col-span-8 space-y-12">
          <div className="space-y-6">
            <h1 className="font-heading text-6xl lg:text-8xl font-black uppercase tracking-tighter text-black leading-none">
              {clase.name}
            </h1>
            <div className="h-2 w-32 bg-[#EE8600]" />
            <p className="text-xl text-black font-sans font-bold leading-relaxed italic border-l-8 border-black pl-6 py-2">
              «{clase.description}»
            </p>
          </div>

          {/* Progression Table - THE CORE FEATURE */}
          <section className="space-y-8 pt-6">
            <div className="flex items-center gap-4">
               <h2 className="font-heading text-4xl font-black uppercase tracking-tighter text-black">
                 Progreso de Clase
               </h2>
               <div className="h-1 flex-1 bg-black" />
            </div>

            <div className="overflow-x-auto border-2 border-black">
              <table className="w-full border-collapse font-sans text-sm">
                <thead>
                  <tr className="bg-black text-white uppercase text-[10px] font-black tracking-widest">
                    <th className="py-3 px-4 text-left border-r border-white/20">Nivel</th>
                    <th className="py-3 px-4 text-left border-r border-white/20">PB</th>
                    <th className="py-3 px-4 text-left border-r border-white/20">Rasgos</th>
                    {clase.tableColumns?.map(col => (
                      <th key={col.key} className="py-3 px-4 text-left border-r border-white/20">{col.label}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/10">
                  {clase.progression?.map((prog) => (
                    <tr key={prog.level} className="hover:bg-[#EE8600]/5 transition-colors">
                      <td className="py-3 px-4 font-black border-r border-black/10">{prog.level}º</td>
                      <td className="py-3 px-4 font-bold text-black/60 border-r border-black/10">+{prog.pb}</td>
                      <td className="py-3 px-4 border-r border-black/10">
                        <div className="flex flex-wrap gap-1">
                          {prog.features.map(f => (
                            <span key={f} className="text-[11px] font-bold text-black hover:text-[#EE8600] cursor-default transition-colors">{f}{prog.features.indexOf(f) < prog.features.length - 1 ? "," : ""}</span>
                          ))}
                        </div>
                      </td>
                      {clase.tableColumns?.map(col => (
                        <td key={col.key} className="py-3 px-4 font-medium border-r border-black/10">
                          {prog.specifics[col.key] || "-"}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Feature Details */}
          <section className="space-y-8">
            <div className="flex items-center gap-4">
               <h2 className="font-heading text-4xl font-black uppercase tracking-tighter text-black">
                 Rasgos de Clase
               </h2>
               <div className="h-1 flex-1 bg-black" />
            </div>

            <div className="space-y-10">
              {clase.features.map((feature, idx) => (
                <div key={idx} className="group border-b-2 border-black/5 pb-10 last:border-0">
                  <div className="flex items-baseline gap-4 mb-4">
                    <span className="font-heading text-4xl font-black text-black/10 group-hover:text-[#EE8600] transition-colors leading-none">
                      {feature.level < 10 ? `0${feature.level}` : feature.level}
                    </span>
                    <h3 className="font-heading text-3xl font-black uppercase text-black tracking-tighter">
                      {feature.name}
                    </h3>
                  </div>
                  <p className="text-black/80 leading-relaxed font-sans font-medium text-base">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-4 space-y-8 sticky top-8 animate-in fade-in slide-in-from-right-8 duration-700">
          {/* Main Visual */}
          <div className="relative aspect-[3/4] w-full bg-[#f9f9f9] border-2 border-black overflow-hidden group">
            <Image
              src={clase.image}
              alt={clase.name}
              fill
              priority={true}
              className="object-contain object-top pt-8 transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white via-white/40 to-transparent" />
          </div>

          {/* Hit Points Box */}
          <div className="border-2 border-black bg-white overflow-hidden shadow-[4px_4px_0px_0px_rgba(36,37,40,1)]">
            <div className="bg-black p-5">
              <h3 className="text-white font-heading font-black uppercase tracking-[0.25em] text-center text-[10px]">
                ESTADÍSTICAS DE VITALIDAD
              </h3>
            </div>
            <div className="p-8 space-y-6 text-center">
              <div className="flex flex-col items-center">
                <Heart className="h-6 w-6 text-[#EE8600] mb-2" />
                <span className="text-5xl font-heading font-bold text-[#242528]">d{clase.hitDie}</span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#242528]/40 mt-1">Dado de Golpe</span>
              </div>
              <div className="h-px bg-[#E1E1E1] w-full" />
              <div className="space-y-2">
                <p className="text-[11px] font-bold text-[#242528] uppercase tracking-tight">PG al Nivel 1:</p>
                <p className="text-sm font-sans text-[#242528]/60 underline decoration-[#EE8600] underline-offset-4 decoration-2">{clase.hitDie} + tu modificador de Constitución</p>
              </div>
            </div>
          </div>

          {/* Proficiencies Sidebar */}
          <div className="space-y-6 p-8 border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(238,134,0,1)]">
             <h4 className="font-heading text-xl font-black uppercase tracking-tight text-black flex items-center gap-2">
               <Shield className="h-5 w-5 text-[#EE8600]" /> COMPETENCIAS
             </h4>
             
             <div className="space-y-6">
                <div className="space-y-2">
                  <span className="text-[9px] font-black uppercase tracking-widest text-black/40">Armaduras</span>
                  <div className="flex flex-wrap gap-2">
                    {clase.proficiencies.armor.map(item => (
                      <Badge key={item} variant="outline" className="bg-white border-black text-black text-[10px] font-black uppercase rounded-none px-3 py-1">{item}</Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-[9px] font-black uppercase tracking-widest text-black/40">Armas</span>
                  <div className="flex flex-wrap gap-2">
                    {clase.proficiencies.weapons.map(item => (
                      <Badge key={item} variant="outline" className="bg-white border-black text-black text-[10px] font-black uppercase rounded-none px-3 py-1">{item}</Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-3 pt-6 border-t-2 border-black">
                   <span className="text-[9px] font-black uppercase tracking-widest text-black/40">Tiradas de Salvación</span>
                   <div className="grid grid-cols-2 gap-3">
                      {clase.savingThrows.map(save => (
                        <div key={save} className="flex items-center gap-3 bg-black text-white px-4 py-3 rounded-none border border-black hover:bg-white hover:text-black transition-colors group/save">
                           <Zap className="h-4 w-4 text-[#EE8600] group-hover/save:scale-110 transition-transform" />
                           <span className="text-[11px] font-black uppercase tracking-widest">{save}</span>
                        </div>
                      ))}
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  )
}
