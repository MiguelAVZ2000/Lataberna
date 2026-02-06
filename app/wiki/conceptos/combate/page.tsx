import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Sword, Target, Clock, Zap, Move, ArrowRight } from "lucide-react"

export default function CombateWikiPage() {
  const sections = [
    {
      title: "El Asalto",
      description: "Un asalto de combate representa unos 6 segundos. Cada participante tiene un turno durante el asalto.",
      icon: Clock
    },
    {
      title: "Iniciativa",
      description: "Al comienzo, realizas una prueba de Destreza para determinar quién actúa primero.",
      icon: Zap
    },
    {
      title: "Tu Turno",
      description: "Puedes moverte y realizar una acción (Atacar, Conjurar, Correr, etc.) en cualquier orden.",
      icon: Move
    }
  ]

  return (
    <div className="space-y-12 pb-12">
      {/* Header Section */}
      <div className="border-b border-gray-100 pb-8">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm border border-red-200 bg-red-50 text-primary text-[10px] font-bold uppercase tracking-widest">
            Combate Táctico
          </div>
          <h1 className="font-heading font-black text-5xl lg:text-6xl uppercase tracking-tighter text-[#242528]">
            Sistema de Combate
          </h1>
          <div className="max-w-2xl">
            <p className="text-xl text-gray-500 leading-relaxed font-sans mt-4">
              Domina las reglas del combate táctico para liderar a tu grupo hacia la victoria en los encuentros más peligrosos del multiverso.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        {sections.map((section) => (
          <Card key={section.title} className="border-gray-200 bg-white rounded-sm shadow-sm overflow-hidden">
            <CardHeader className="bg-gray-50 border-b border-gray-100 p-6">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-sm bg-white border border-gray-200 text-primary">
                <section.icon className="h-5 w-5" />
              </div>
              <CardTitle className="font-heading text-xl font-bold uppercase tracking-tighter text-[#242528]">{section.title}</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-sm text-gray-500 leading-relaxed font-sans">
                {section.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <section className="space-y-8">
        <h2 className="font-heading text-3xl font-bold uppercase tracking-tighter text-[#242528] border-b border-gray-100 pb-4 flex items-center gap-3">
           <Sword className="h-6 w-6 text-primary" />
           Acciones en Combate
        </h2>
        <div className="grid gap-4">
          <div className="p-6 rounded-sm border border-gray-200 bg-white shadow-sm flex items-start gap-4">
            <div className="p-3 rounded-sm bg-gray-50 border border-gray-100 shrink-0">
               <Sword className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-xl uppercase tracking-tighter text-[#242528] mb-1">Atacar</h4>
              <p className="text-sm text-gray-500 font-sans">Realizas un ataque cuerpo a cuerpo o a distancia con un arma contra un enemigo.</p>
            </div>
          </div>
          <div className="p-6 rounded-sm border border-gray-200 bg-white shadow-sm flex items-start gap-4">
            <div className="p-3 rounded-sm bg-gray-50 border border-gray-100 shrink-0">
               <Zap className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-xl uppercase tracking-tighter text-[#242528] mb-1">Lanzar un Conjuro</h4>
              <p className="text-sm text-gray-500 font-sans">Utilizas tu magia para atacar, curar o controlar el campo de batalla de forma estratégica.</p>
            </div>
          </div>
          <div className="p-6 rounded-sm border border-gray-200 bg-white shadow-sm flex items-start gap-4">
            <div className="p-3 rounded-sm bg-gray-50 border border-gray-100 shrink-0">
               <Target className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-xl uppercase tracking-tighter text-[#242528] mb-1">Ayudar</h4>
              <p className="text-sm text-gray-500 font-sans">Prestas ayuda a un aliado, otorgándole Ventaja en su próxima prueba de habilidad o ataque.</p>
            </div>
          </div>
        </div>
      </section>

      <Card className="border-red-100 bg-red-50 shadow-sm rounded-sm overflow-hidden">
        <CardHeader className="bg-white border-b border-red-100 py-4 px-6">
          <CardTitle className="font-heading text-xl font-bold uppercase tracking-tighter flex items-center gap-2 text-[#242528]">
            <Shield className="h-5 w-5 text-primary" />
            Clase de Armadura y Daño
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 text-sm text-red-900/70 font-sans space-y-4">
          <p>
            Para impactar a un objetivo, tu tirada de ataque debe igualar o superar su <strong className="text-primary">Clase de Armadura (CA)</strong>. Es una medida de su defensa física y agilidad.
          </p>
          <p>
            Si impactas, lanzas los dados de daño. Si sacas un <span className="font-bold text-primary">20 natural</span> en el dado, consigues un Impacto Crítico y lanzas todos tus dados de daño dos veces.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

