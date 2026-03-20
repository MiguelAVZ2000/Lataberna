import { Shield, Users, Star, BookOpen, Sparkles, Zap } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function RasgosWikiPage() {
  const categories = [
    {
      title: "Rasgos Raciales",
      desc: "Habilidades innatas que provienen de tu linaje. Incluyen visión en la oscuridad, resistencias naturales y aptitudes mágicas básicas.",
      icon: Users,
      tag: "Innato",
    },
    {
      title: "Rasgos de Clase",
      desc: "Poderes que obtienes a través del entrenamiento y la experiencia. Un guerrero aprende estilos de combate, mientras que un bardo aprende a inspirar a otros.",
      icon: Shield,
      tag: "Entrenado",
    },
    {
      title: "Dotes (Feats)",
      desc: "Talentos especializados que puedes elegir en lugar de mejorar tus atributos. Permiten una personalización profunda de tu estilo de juego.",
      icon: Star,
      tag: "Opcional",
    },
  ]

  return (
    <div className="max-w-7xl mx-auto space-y-12 pb-20">

      {/* Page Header */}
      <div className="space-y-6 pt-8">
        <h1 className="font-heading font-black text-5xl uppercase tracking-tighter text-[#242528]">
          Rasgos y Aptitudes
        </h1>
        <div className="h-2 w-32 bg-[#EE8600]" />
        <p className="text-xl text-[#242528]/60 font-sans max-w-3xl leading-relaxed italic border-l-4 border-[#242528] pl-6">
          «Los rasgos son las características especiales que definen lo que tu personaje puede hacer más allá de sus atributos básicos.»
        </p>
      </div>

      {/* Manual Section Header */}
      <div className="flex items-center gap-3 border-b-2 border-[#242528]/20 pb-4">
        <div className="bg-[#242528] text-white text-[10px] font-black px-2 py-1 rounded">PHB</div>
        <h2 className="font-heading font-black text-2xl uppercase tracking-tight text-[#242528] flex-1">
          MANUAL DEL JUGADOR
        </h2>
      </div>

      {/* Category Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        {categories.map((cat) => (
          <div key={cat.title} className="group relative border-2 border-[#242528] bg-white overflow-hidden">
            {/* Top gold accent */}
            <div className="h-1 w-0 bg-[#EE8600] group-hover:w-full transition-all duration-700" />
            <div className="p-8 space-y-4">
              <div className="flex items-start justify-between">
                <div className="h-12 w-12 border-2 border-[#242528] flex items-center justify-center bg-white">
                  <cat.icon className="h-6 w-6 text-[#242528]" />
                </div>
                <span className="text-[9px] font-black uppercase tracking-widest text-[#242528]/40 border border-[#242528]/20 px-2 py-1">
                  {cat.tag}
                </span>
              </div>
              <h3 className="font-heading font-black text-xl uppercase text-[#242528] tracking-tight">
                {cat.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed font-sans">
                {cat.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* How do traits work */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 border-b-2 border-[#242528]/20 pb-4">
          <Sparkles className="h-5 w-5 text-[#EE8600]" />
          <h2 className="font-heading font-black text-2xl uppercase tracking-tight text-[#242528]">
            ¿Cómo Funcionan los Rasgos?
          </h2>
        </div>
        <p className="text-gray-600 font-sans leading-relaxed max-w-3xl">
          Los rasgos suelen proporcionar ventajas mecánicas pasivas o activar acciones especiales bajo ciertas condiciones.
        </p>
        <div className="space-y-3">
          {[
            { label: "Condicionales", desc: "Algunos rasgos solo se activan cuando tienes poca vida o cuando atacas a un enemigo específico." },
            { label: "Recursos", desc: "Ciertos rasgos poderosos tienen un número limitado de usos (ej: por Descanso Corto o Largo)." },
          ].map((item) => (
            <div key={item.label} className="border-2 border-[#242528]/10 bg-gray-50 p-5 flex gap-4 items-start">
              <div className="h-2 w-2 mt-2 bg-[#EE8600] shrink-0" />
              <p className="text-sm text-gray-700 font-sans leading-relaxed">
                <span className="font-black text-[#242528] uppercase tracking-tight">{item.label}: </span>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Trasfondo card */}
      <div className="border-2 border-[#242528] bg-[#242528] text-white p-8 shadow-[4px_4px_0px_0px_rgba(238,134,0,1)]">
        <div className="flex gap-4 items-start">
          <BookOpen className="h-6 w-6 text-[#EE8600] shrink-0 mt-1" />
          <div className="space-y-2">
            <h4 className="font-heading font-black text-xl uppercase tracking-tight text-white">
              Rasgos de Trasfondo
            </h4>
            <p className="text-white/70 text-sm font-sans leading-relaxed">
              No olvides que tu trasfondo también te otorga un rasgo único que suele estar relacionado con tu vida antes de ser aventurero, como contactos en el bajo mundo o conocimientos de leyes locales.
            </p>
          </div>
        </div>
      </div>

    </div>
  )
}
