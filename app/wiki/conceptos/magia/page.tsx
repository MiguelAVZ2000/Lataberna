import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles, Zap, Book, Scroll, Shield, Flame, ArrowRight } from "lucide-react"

export default function MagiaWikiPage() {
  const systems = [
    {
      title: "Espacios de Conjuro",
      description: "Lanzar un conjuro es agotador. Tienes un número limitado de espacios de conjuro por día.",
      icon: Zap
    },
    {
      title: "Niveles de Conjuro",
      description: "Los conjuros van del nivel 0 (Trucos) al nivel 9. Los trucos son gratuitos.",
      icon: Flame
    },
    {
      title: "Atributo Clave",
      description: "Cada clase usa un atributo (INT, SAB o CAR) para determinar su efectividad mágica.",
      icon: Book
    }
  ]

  return (
    <div className="space-y-12 pb-12">
      {/* Header Section */}
      <div className="border-b border-gray-100 pb-8">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm border border-red-200 bg-red-50 text-primary text-[10px] font-bold uppercase tracking-widest">
            Arcanismo y Divinidad
          </div>
          <h1 className="font-heading font-black text-5xl lg:text-6xl uppercase tracking-tighter text-[#242528]">
            La Trama de la Magia
          </h1>
          <div className="max-w-2xl">
            <p className="text-xl text-gray-500 leading-relaxed font-sans mt-4">
              Desde los estudios académicos de los magos hasta el poder innato de los hechiceros, la magia es la fuerza que moldea el multiverso.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        {systems.map((system) => (
          <Card key={system.title} className="border-gray-200 bg-white rounded-sm shadow-sm overflow-hidden">
            <CardHeader className="bg-gray-50 border-b border-gray-100 p-6">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-sm bg-white border border-gray-200 text-primary">
                <system.icon className="h-5 w-5" />
              </div>
              <CardTitle className="font-heading text-xl font-bold uppercase tracking-tighter text-[#242528]">{system.title}</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-sm text-gray-500 leading-relaxed font-sans">
                {system.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <section className="space-y-8">
        <h2 className="font-heading text-3xl font-bold uppercase tracking-tighter text-[#242528] border-b border-gray-100 pb-4">
           Conceptos Avanzados
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-gray-200 bg-white shadow-sm rounded-sm">
            <CardContent className="p-8 space-y-4">
              <h3 className="font-heading text-2xl font-bold flex items-center gap-2 text-[#242528] uppercase tracking-tighter">
                <Sparkles className="h-6 w-6 text-primary" /> Concentración
              </h3>
              <p className="text-gray-500 leading-relaxed font-sans">
                Algunos conjuros requieren que mantengas la concentración para seguir activos. Si recibes daño, debes realizar una tirada de salvación de Constitución. Solo puedes concentrarte en un conjuro a la vez.
              </p>
            </CardContent>
          </Card>
          <Card className="border-gray-200 bg-white shadow-sm rounded-sm">
            <CardContent className="p-8 space-y-4">
              <h3 className="font-heading text-2xl font-bold flex items-center gap-2 text-[#242528] uppercase tracking-tighter">
                <Scroll className="h-6 w-6 text-primary" /> Componentes
              </h3>
              <p className="text-gray-500 leading-relaxed font-sans">
                Los conjuros pueden requerir componentes <span className="font-bold">Verbales</span> (voces), <span className="font-bold">Somáticos</span> (gestos) o <span className="font-bold">Materiales</span> (sustancias). Si no puedes cumplirlos, no hay magia.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <Card className="border-red-100 bg-red-50 shadow-sm rounded-sm overflow-hidden">
        <CardHeader className="bg-white border-b border-red-100 py-4 px-6 text-[#242528]">
          <CardTitle className="font-heading text-xl font-bold uppercase tracking-tighter flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            CD de Salvación y Ataque
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8 text-red-900/70 font-sans space-y-4">
          <p>
            Algunos conjuros requieren una <span className="font-bold">Tirada de Ataque de Conjuro</span> para impactar. Otros obligan al enemigo a realizar una <span className="font-bold">Tirada de Salvación</span>.
          </p>
          <div className="p-4 rounded-sm bg-white border border-red-100 font-heading font-black text-2xl text-primary text-center uppercase tracking-tighter">
            CD = 8 + B. Proficiencia + Mod. Atributo
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

