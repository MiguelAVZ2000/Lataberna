"use client"

import { useCharacter } from "../character-context"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const alignments = [
  { value: "lg", label: "Legal Bueno" },
  { value: "ng", label: "Neutral Bueno" },
  { value: "cg", label: "Caotico Bueno" },
  { value: "ln", label: "Legal Neutral" },
  { value: "tn", label: "Neutral Verdadero" },
  { value: "cn", label: "Caotico Neutral" },
  { value: "le", label: "Legal Malvado" },
  { value: "ne", label: "Neutral Malvado" },
  { value: "ce", label: "Caotico Malvado" },
]

export function DetailsStep() {
  const { character, updateCharacter } = useCharacter()

  return (
    <div className="space-y-10 pb-10">
      <div className="space-y-4">
        <h2 className="font-heading text-4xl font-bold text-[#242528] uppercase tracking-tight">5. Detalles del Héroe</h2>
        <div className="h-[3px] w-32 bg-[#EE8600]" />
        <p className="text-lg text-[#242528]/60 font-sans italic">
          «Dale nombre, alineamiento y personalidad a tu héroe.»
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Left Column: Core Info */}
        <div className="space-y-6">
           <div className="p-8 border border-[#E1E1E1] bg-white shadow-sm space-y-6">
              <h3 className="font-heading text-xl font-bold uppercase tracking-tight text-[#242528] border-b border-[#E1E1E1] pb-4">Identidad y Progreso</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-[#242528]/40">Nombre del Héroe</Label>
                  <Input
                    value={character.name}
                    onChange={(e) => updateCharacter({ name: e.target.value })}
                    placeholder="Ej: Thorin"
                    className="rounded-none border-[#E1E1E1] focus-visible:ring-[#EE8600] h-12 font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-[#242528]/40">Puntos de Exp. (XP)</Label>
                  <Input
                    type="number"
                    value={character.xp}
                    onChange={(e) => updateCharacter({ xp: parseInt(e.target.value) || 0 })}
                    placeholder="0"
                    className="rounded-none border-[#E1E1E1] focus-visible:ring-[#EE8600] h-12 font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-[#242528]/40">Subclase (Opcional)</Label>
                  <Input
                    value={character.subclass}
                    onChange={(e) => updateCharacter({ subclass: e.target.value })}
                    placeholder="Ej: Berserker"
                    className="rounded-none border-[#E1E1E1] focus-visible:ring-[#EE8600] h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-[#242528]/40">Subespecie / Casta</Label>
                  <Input
                    value={character.subrace}
                    onChange={(e) => updateCharacter({ subrace: e.target.value })}
                    placeholder="Ej: Enano de las montañas"
                    className="rounded-none border-[#E1E1E1] focus-visible:ring-[#EE8600] h-12"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-[#242528]/40">Alineamiento</Label>
                <Select
                  value={character.alignment}
                  onValueChange={(value) => updateCharacter({ alignment: value })}
                >
                  <SelectTrigger className="rounded-none border-[#E1E1E1] h-12 font-medium bg-white">
                    <SelectValue placeholder="Selecciona alineamiento" />
                  </SelectTrigger>
                  <SelectContent className="rounded-none border-[#242528] bg-white">
                    {alignments.map((alignment) => (
                      <SelectItem key={alignment.value} value={alignment.value} className="focus:bg-[#F9F9F9] focus:text-[#EE8600]">
                        {alignment.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
           </div>

           <div className="p-8 border border-[#E1E1E1] bg-white shadow-sm space-y-6">
              <h3 className="font-heading text-xl font-bold uppercase tracking-tight text-[#242528] border-b border-[#E1E1E1] pb-4">Apariencia Física</h3>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-[#242528]/40">Edad</Label>
                  <Input value={character.age} onChange={(e) => updateCharacter({ age: e.target.value })} placeholder="Ej: 25" className="rounded-none border-[#E1E1E1]" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-[#242528]/40">Altura</Label>
                  <Input value={character.height} onChange={(e) => updateCharacter({ height: e.target.value })} placeholder="1.80m" className="rounded-none border-[#E1E1E1]" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-[#242528]/40">Peso</Label>
                  <Input value={character.weight} onChange={(e) => updateCharacter({ weight: e.target.value })} placeholder="80kg" className="rounded-none border-[#E1E1E1]" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-[#242528]/40">Ojos</Label>
                  <Input value={character.eyes} onChange={(e) => updateCharacter({ eyes: e.target.value })} placeholder="Azules" className="rounded-none border-[#E1E1E1]" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-[#242528]/40">Piel</Label>
                  <Input value={character.skin} onChange={(e) => updateCharacter({ skin: e.target.value })} placeholder="Pálida" className="rounded-none border-[#E1E1E1]" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-[#242528]/40">Pelo</Label>
                  <Input value={character.hair} onChange={(e) => updateCharacter({ hair: e.target.value })} placeholder="Rubio" className="rounded-none border-[#E1E1E1]" />
                </div>
              </div>
           </div>
        </div>

        {/* Right Column: Traits & Personality */}
        <div className="space-y-6">
           <div className="p-8 border border-[#242528] bg-[#F9F9F9] shadow-[8px_8px_0px_0px_rgba(36,37,40,1)] space-y-6">
              <h3 className="font-heading text-2xl font-bold uppercase tracking-tight text-[#242528]">Trasfondo del Aventurero</h3>
              
              <div className="space-y-2">
                 <Label className="text-[10px] font-bold uppercase tracking-widest text-[#242528]/40">Rasgos de Personalidad</Label>
                 <Textarea
                   value={character.personalityTraits}
                   onChange={(e) => updateCharacter({ personalityTraits: e.target.value })}
                   placeholder="Rasgos distintivos..."
                   className="rounded-none border-[#E1E1E1] min-h-[80px] bg-white text-sm"
                 />
              </div>

              <div className="space-y-2">
                 <Label className="text-[10px] font-bold uppercase tracking-widest text-[#242528]/40">Ideales</Label>
                 <Textarea
                   value={character.ideals}
                   onChange={(e) => updateCharacter({ ideals: e.target.value })}
                   placeholder="Principios guía..."
                   className="rounded-none border-[#E1E1E1] min-h-[80px] bg-white text-sm"
                 />
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-[#242528]/40">Vínculos</Label>
                <Textarea
                  value={character.bonds}
                  onChange={(e) => updateCharacter({ bonds: e.target.value })}
                  placeholder="Vínculos importantes..."
                  className="rounded-none border-[#E1E1E1] min-h-[80px] bg-white text-sm"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-[#242528]/40">Defectos</Label>
                <Textarea
                  value={character.flaws}
                  onChange={(e) => updateCharacter({ flaws: e.target.value })}
                  placeholder="Tus debilidades..."
                  className="rounded-none border-[#E1E1E1] min-h-[80px] bg-white text-sm"
                />
              </div>
           </div>

           <div className="p-8 border border-[#E1E1E1] bg-white space-y-4">
              <h3 className="font-heading text-xl font-bold uppercase tracking-tight text-[#242528]">Equipo y Rasgos de Clase</h3>
              <div className="space-y-2">
                 <Label className="text-[10px] font-bold uppercase tracking-widest text-[#242528]/40">Idiomas y Competencias</Label>
                 <Textarea
                   value={character.languages}
                   onChange={(e) => updateCharacter({ languages: e.target.value })}
                   placeholder="Idiomas, herramientas..."
                   className="rounded-none border-[#E1E1E1] min-h-[60px]"
                 />
              </div>
              <div className="space-y-2">
                 <Label className="text-[10px] font-bold uppercase tracking-widest text-[#242528]/40">Equipo Inicial</Label>
                 <Textarea
                   value={character.equipment}
                   onChange={(e) => updateCharacter({ equipment: e.target.value })}
                   placeholder="Tus pertenencias..."
                   className="rounded-none border-[#E1E1E1] min-h-[60px]"
                 />
              </div>
           </div>
        </div>
      </div>
    </div>
  )
}
