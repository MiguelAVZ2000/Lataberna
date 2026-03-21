import Link from "next/link"
import { Users, Shield, Sword, Scroll, Wand2, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function CtaSection() {
  return (
    <section className="py-24 relative overflow-hidden bg-bg-base">
      <div className="container mx-auto px-4 relative z-10 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Content */}
          <div className="text-left space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm border border-[#EE8600]/20 bg-[#EE8600]/10 text-[#EE8600] text-xs font-black uppercase tracking-[0.2em]">
              <Sparkles className="w-3 h-3" />
              Herramientas de Rol
            </div>
            
            <h2 className="font-heading font-black text-5xl sm:text-6xl lg:text-7xl text-text-primary uppercase leading-[0.8]">
              FORJA TU PROPIA <br/>
              <span className="relative inline-block">
                LEYENDA
                <span className="absolute inset-x-0 -bottom-1 h-2 bg-[#EE8600]" />
              </span>
            </h2>
            
            <p className="text-xl text-text-muted leading-relaxed max-w-xl font-sans font-normal">
              Olvídate de las hojas de papel y los cálculos manuales. Nuestro creador de personajes interactivo te guía en cada paso del camino, desde elegir tu linaje hasta forjar tu destino.
            </p>
            
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-bg-surface text-text-primary hover:bg-bg-raised border border-border-dark rounded-sm font-black uppercase tracking-widest text-xs px-10 h-14 shadow-lg shadow-black/20 transition-all">
                <Link href="/personaje">Comenzar Aventura</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-border-dark text-text-primary hover:bg-bg-raised rounded-sm font-black uppercase tracking-widest text-xs h-14 px-10 border">
                <Link href="/guias">Ver Guía de Juego</Link>
              </Button>
            </div>
          </div>

          {/* Right Visual Card */}
          <div className="relative group">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gold/5 rounded-full blur-[80px] -z-10" />
            
            <div className="relative transform transition-all duration-700 hover:scale-[1.02] hover:-rotate-1">
              <Card className="bg-bg-surface border border-border-dark shadow-2xl overflow-hidden rounded-sm">
                <CardHeader className="border-b border-border-dark p-8 bg-bg-raised relative">
                  <div className="absolute top-0 right-0 p-4">
                    <Shield className="h-10 w-10 text-[#EE8600]/20" />
                  </div>
                  <div className="flex justify-between items-center relative z-10">
                    <div className="space-y-1">
                      <div className="text-[10px] uppercase font-black text-[#EE8600] tracking-[0.3em]">Ficha de Personaje</div>
                      <div className="font-heading font-black text-3xl text-text-primary uppercase">Aerith «La Errante»</div>
                    </div>
                    <Badge className="bg-[#242527] text-[#EE8600] border-[#EE8600]/30 border py-1.5 px-3 rounded-sm font-black text-xs uppercase tracking-widest">NIVEL 5</Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-8 space-y-8">
                  <div className="flex justify-between items-center gap-4 border-b border-border pb-6">
                    <div className="text-right ml-auto">
                      <div className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Clase / Raza</div>
                      <div className="text-sm font-black text-text-primary uppercase tracking-tight">Hechicera Elfa de Sangre</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { label: 'Fuerza', val: 14, icon: Sword },
                      { label: 'Destreza', val: 18, icon: Wand2 },
                      { label: 'Intel.', val: 20, icon: Scroll }
                    ].map((stat) => (
                      <div key={stat.label} className="bg-bg-base rounded-sm p-4 text-center border border-border-dark group-hover:border-[#EE8600]/40 transition-all shadow-sm hover:shadow-md">
                        <div className="text-[9px] uppercase font-black text-text-muted tracking-widest flex items-center justify-center gap-1">
                          <stat.icon className="h-2 w-2 text-[#EE8600]" />
                          {stat.label}
                        </div>
                        <div className="text-3xl font-heading font-black text-text-primary mt-2 group-hover:text-[#EE8600] transition-colors">{stat.val}</div>
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
