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
        <div className="flex justify-between items-end border-b border-border-dark pb-4">
            <h2 className="text-3xl font-heading font-black uppercase tracking-tight text-text-primary">Mis Personajes</h2>
            <Link href="/personaje">
                <Button className="bg-gold hover:bg-gold/90 text-white rounded font-black uppercase tracking-widest text-[10px] h-12 px-6 transition-all">
                    <Plus className="mr-2 h-4 w-4" /> Nuevo Personaje
                </Button>
            </Link>
        </div>

        {characters.length === 0 ? (
            <div className="text-center py-24 border-4 border-dashed border-border-dark bg-bg-raised/50">
                <Skull className="h-16 w-16 mx-auto text-text-muted mb-6" />
                <h3 className="text-xl font-black uppercase text-text-primary">Sin personajes</h3>
                <p className="text-text-muted mb-8 font-sans">No tienes ningún personaje guardado todavía.</p>
                <Link href="/personaje">
                    <Button variant="outline" className="border border-border-dark text-text-primary rounded font-black uppercase tracking-widest text-[10px]">Crear Primero</Button>
                </Link>
            </div>
        ) : (
            <div className="grid gap-6 sm:grid-cols-2">
                {characters.map((char) => {
                    const raceName = races.find(r => r.id === char.raza_id)?.name || char.raza_id
                    const className = classes.find(c => c.id === char.clase_id)?.name || char.clase_id

                    return (
                        <Card key={char.id} className="border border-border-dark rounded overflow-hidden group bg-bg-surface">
                            <CardHeader className="bg-bg-raised p-6">
                                <div className="flex justify-between items-start">
                                    <div className="space-y-1">
                                        <CardTitle className="font-heading text-2xl font-black uppercase tracking-tight text-gold">{char.nombre}</CardTitle>
                                        <CardDescription className="text-text-muted font-black uppercase text-[10px] tracking-widest">
                                            {raceName} {className} • Nivel {char.nivel}
                                        </CardDescription>
                                    </div>
                                    <Badge variant="outline" className="text-[9px] border-gold text-gold font-black uppercase rounded">
                                        {formatDistanceToNow(new Date(char.actualizado_el), { addSuffix: true, locale: es })}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="p-6 text-sm text-text-muted bg-bg-surface min-h-[100px]">
                                <div className="line-clamp-3 italic font-sans leading-relaxed">
                                    «{char.biografia?.personalityTraits || "Un aventurero cuyo destino aún está por escribirse..."}»
                                </div>
                            </CardContent>
                            <CardFooter className="p-0 border-t border-border-dark">
                                <Button
                                    variant="ghost"
                                    className="w-full h-12 rounded font-black uppercase tracking-widest text-[10px] text-text-primary hover:bg-bg-raised flex items-center justify-center gap-2"
                                    onClick={() => handleDownloadPDF(char)}
                                >
                                    <ExternalLink className="h-4 w-4 text-gold" /> Descargar Ficha PDF
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
