import Link from "next/link"
import { Users, ArrowRight, Sword, Shield, Scroll, Wand2, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function CtaSection() {
  return (
    <section className="py-24 relative overflow-hidden bg-white border-b border-border">
      
      <div className="container mx-auto px-4 relative z-10 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Content */}
          <div className="text-left space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm border border-accent-gold/20 bg-accent-gold/10 text-accent-gold text-xs font-black uppercase tracking-[0.2em]">
              <Sparkles className="w-3 h-3" />
              Herramientas de Rol
            </div>
            
            <h2 className="font-heading font-black text-5xl sm:text-6xl lg:text-7xl text-[#242528] uppercase leading-[0.8]">
              FORJA TU PROPIA <br/><span className="text-primary drop-shadow-sm">LEYENDA</span>
            </h2>
            
            <p className="text-xl text-gray-500 leading-relaxed max-w-xl font-sans font-normal">
              Olvídate de las hojas de papel y los cálculos manuales. Nuestro creador de personajes interactivo te guía en cada paso del camino, desde elegir tu linaje hasta forjar tu destino.
            </p>
            
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-[#242528] text-white hover:bg-[#242528]/90 rounded-sm font-black uppercase tracking-widest text-xs px-10 h-14 shadow-lg shadow-black/20 transition-all border-none">
                <Link href="/personaje">
                  Comenzar Aventura
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-[#242528] text-[#242528] hover:bg-gray-50 rounded-sm font-black uppercase tracking-widest text-xs h-14 px-10 border-2">
                <Link href="/guias">
                  Ver Guía de Juego
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Column: Visual Mockup */}
          <div className="relative group">
             {/* Decorative Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-accent-gold/5 rounded-full blur-[80px] -z-10 animate-pulse" />
            
            {/* The Floating Card */}
            <div className="relative transform transition-all duration-700 hover:scale-[1.02] hover:-rotate-1">
                <Card className="border-border bg-white shadow-2xl overflow-hidden rounded-sm border-2">
                    <CardHeader className="border-b border-border p-8 bg-gray-50 relative">
                        <div className="absolute top-0 right-0 p-4">
                           <Shield className="h-10 w-10 text-accent-gold/20" />
                        </div>
                        <div className="flex justify-between items-center relative z-10">
                             <div className="space-y-1">
                                <div className="text-[10px] uppercase font-black text-primary tracking-[0.3em]">Ficha de Personaje</div>
                                <div className="font-heading font-black text-3xl text-[#242528] uppercase">Aerith «La Errante»</div>
                             </div>
                             <Badge className="bg-[#242527] text-accent-gold border-accent-gold/30 border py-1.5 px-3 rounded-sm font-black text-xs uppercase tracking-widest">NIVEL 5</Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="p-8 space-y-8">
                        <div className="flex justify-between items-center gap-4 border-b border-border pb-6">
                            <div className="flex -space-x-3">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className={`w-10 h-10 rounded-full border-2 border-white flex items-center justify-center bg-gray-100 z-${10-i} shadow-sm overflow-hidden`}>
                                        <div className="h-full w-full bg-primary/10 flex items-center justify-center">
                                           <Users className="w-5 h-5 text-primary/40" />
                                        </div>
                                    </div>
                                ))}
                                <div className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center bg-accent-gold text-white text-[10px] font-black z-0 shadow-sm">+9</div>
                            </div>
                            <div className="text-right">
                                <div className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Clase / Raza</div>
                                <div className="text-sm font-black text-[#242528] uppercase tracking-tight">Hechicera Elfa de Sangre</div>
                            </div>
                        </div>

                        {/* Ability Scores Mockup */}
                        <div className="grid grid-cols-3 gap-4">
                            {[
                               { label: 'Fuerza', val: 14, icon: Sword },
                               { label: 'Destreza', val: 18, icon: Wand2 },
                               { label: 'Intel.', val: 20, icon: Scroll }
                            ].map((stat, i) => (
                                <div key={stat.label} className="bg-white rounded-sm p-4 text-center border-2 border-border group-hover:border-accent-gold/40 transition-all shadow-sm hover:shadow-md">
                                    <div className="text-[9px] uppercase font-black text-gray-400 tracking-widest flex items-center justify-center gap-1">
                                       <stat.icon className="h-2 w-2 text-accent-gold" />
                                       {stat.label}
                                    </div>
                                    <div className="text-3xl font-heading font-black text-[#242528] mt-2 group-hover:text-primary transition-colors">{stat.val}</div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

