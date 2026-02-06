"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, ExternalLink, Skull } from "lucide-react"
import Link from "next/link"
import { formatDistanceToNow } from 'date-fns'
import { es } from 'date-fns/locale'
import { races, classes, backgrounds } from "@/lib/character-data"
import { generateCharacterPDF } from "@/lib/pdf-service"

export function CharactersView({ user, characters }: { user: any, characters: any[] }) {
  const handleDownloadPDF = (char: any) => {
    const race = races.find(r => r.id === char.raza_id)
    const charClass = classes.find(c => c.id === char.clase_id)
    const background = backgrounds.find(b => b.id === char.biografia?.background)

    const fullCharacter = {
        name: char.nombre,
        level: char.nivel,
        race,
        class: charClass,
        background,
        abilities: char.estadisticas.abilities,
        skills: char.estadisticas.skills || [],
        spells: char.estadisticas.spells || [],
        alignment: char.biografia?.alignment,
        personalityTraits: char.biografia?.personalityTraits,
        ideals: char.biografia?.ideals,
        bonds: char.biografia?.bonds,
        flaws: char.biografia?.flaws,
        xp: "0",
        subclass: "",
        subrace: "",
        items: [],
        age: "",
        height: "",
        weight: "",
        eyes: "",
        skin: "",
        hair: "",
        languages: "",
        feats: "",
        equipment: "",
        classFeatures: ""
    }

    generateCharacterPDF(fullCharacter as any, user.email, false)
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex justify-between items-end border-b-2 border-black pb-4">
            <h2 className="text-3xl font-heading font-black uppercase tracking-tight">Mis Personajes</h2>
            <Link href="/personaje">
                <Button className="bg-[#EE8600] hover:bg-black text-white hover:text-[#EE8600] rounded-none font-black uppercase tracking-widest text-[10px] h-12 px-6 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none">
                    <Plus className="mr-2 h-4 w-4" /> Nuevo Personaje
                </Button>
            </Link>
        </div>

        {characters.length === 0 ? (
            <div className="text-center py-24 border-4 border-dashed border-gray-200 bg-gray-50/50">
                <Skull className="h-16 w-16 mx-auto text-gray-300 mb-6" />
                <h3 className="text-xl font-black uppercase">Sin personajes</h3>
                <p className="text-gray-500 mb-8 font-sans">No tienes ningún personaje guardado todavía.</p>
                <Link href="/personaje">
                    <Button variant="outline" className="border-2 border-black rounded-none font-black uppercase tracking-widest text-[10px]">Crear Primero</Button>
                </Link>
            </div>
        ) : (
            <div className="grid gap-6 sm:grid-cols-2">
                {characters.map((char) => {
                    const raceName = races.find(r => r.id === char.raza_id)?.name || char.raza_id
                    const className = classes.find(c => c.id === char.clase_id)?.name || char.clase_id
                    
                    return (
                        <Card key={char.id} className="border-2 border-black rounded-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all overflow-hidden group">
                            <CardHeader className="bg-black text-white p-6">
                                <div className="flex justify-between items-start">
                                    <div className="space-y-1">
                                        <CardTitle className="font-heading text-2xl font-black uppercase tracking-tight text-[#EE8600]">{char.nombre}</CardTitle>
                                        <CardDescription className="text-gray-400 font-black uppercase text-[10px] tracking-widest">
                                            {raceName} {className} • Nivel {char.nivel}
                                        </CardDescription>
                                    </div>
                                    <Badge variant="outline" className="text-[9px] border-[#EE8600] text-[#EE8600] font-black uppercase rounded-none">
                                        {formatDistanceToNow(new Date(char.actualizado_el), { addSuffix: true, locale: es })}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="p-6 text-sm text-gray-600 bg-white min-h-[100px]">
                                <div className="line-clamp-3 italic font-sans leading-relaxed">
                                    «{char.biografia?.personalityTraits || "Un aventurero cuyo destino aún está por escribirse..."}»
                                </div>
                            </CardContent>
                            <CardFooter className="p-0 border-t-2 border-black">
                                <Button 
                                    variant="ghost" 
                                    className="w-full h-12 rounded-none font-black uppercase tracking-widest text-[10px] hover:bg-gray-100 flex items-center justify-center gap-2"
                                    onClick={() => handleDownloadPDF(char)}
                                >
                                    <ExternalLink className="h-4 w-4 text-[#EE8600]" /> Descargar Ficha PDF
                                </Button>
                            </CardFooter>
                        </Card>
                    )
                })}
            </div>
        )}
    </div>
  )
}
