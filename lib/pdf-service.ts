import { CharacterData } from "@/components/character/character-context"
import { calculateModifier, formatModifier } from "@/lib/character-data"
import { toast } from "sonner"

/**
 * Servicio centralizado para la generación de la ficha de personaje en PDF.
 * Maneja la limpieza de campos AcroForms, traducción de etiquetas y personalización de marca.
 */
export const generateCharacterPDF = async (character: CharacterData, userEmail: string | undefined, isEmpty: boolean) => {
  try {
    const { PDFDocument, rgb, StandardFonts, PDFTextField, PDFCheckBox } = await import('pdf-lib')
    
    // 1. Cargar el nuevo PDF oficial (Ficha de Personaje Editable.pdf)
    const existingPdfBytes = await fetch('/Ficha de Personaje Editable.pdf').then(res => {
        if (!res.ok) throw new Error("No se encontró la plantilla /Ficha de Personaje Editable.pdf")
        return res.arrayBuffer()
    })
    
    const pdfDoc = await PDFDocument.load(existingPdfBytes)
    const form = pdfDoc.getForm()
    const fields = form.getFields()
    
    // LIMPIEZA: Vaciar todos los campos para asegurar una hoja limpia
    fields.forEach(field => {
        try {
            if (field instanceof PDFTextField) {
                field.setText('')
            } else if (field instanceof PDFCheckBox) {
                field.uncheck()
            }
        } catch (e) {}
    })

    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold)
    const pages = pdfDoc.getPages()
    
    // 2. Personalización de Marca "LA TABERNA" (Sutil en la cabecera)
    // Tapamos el centro donde dice "FIFTH EDITION" y ponemos nuestra marca
    pages.forEach((page) => {
        page.drawRectangle({
            x: 255, y: 785, width: 90, height: 15, color: rgb(1, 1, 1)
        })
        
        const brandText = "LA TABERNA"
        const brandSize = 10
        const brandWidth = fontBold.widthOfTextAtSize(brandText, brandSize)
        page.drawText(brandText, {
            x: 300 - (brandWidth / 2),
            y: 789,
            size: brandSize,
            font: fontBold,
            color: rgb(0.14, 0.15, 0.16),
        })
    })

    const firstPage = pages[0]

    // 4. Llenado condicionial de datos si no es hoja en blanco
    if (!isEmpty) {
        const racialBonuses = character.race?.abilityBonuses || {}
        
        const setField = (name: string, value: string | number, fontSize: number = 9) => {
            try {
                const field = form.getTextField(name)
                field.setText(String(value))
                
                // Ajuste de tamaños solicitado por el usuario ("vuelvelos al tamaño original")
                if (name === "Name") {
                    field.setFontSize(12)
                } else if (name.includes("SCORE")) {
                    field.setFontSize(14) // Números grandes en los cuadros
                } else if (name.includes("MOD") || name.includes("SAVE") || ["AC", "INIT", "SPEED", "Prof Bonus", "Level"].includes(name)) {
                    field.setFontSize(12) // Números medianos
                } else if (["Max HP", "Current HP", "Temp HP", "MAX HD", "Spent HD"].includes(name)) {
                    field.setFontSize(11)
                } else if (["TRAITS", "FEATS", "CLASS FEATURES 1", "CLASS FEATURES 2", "LANGUAGES", "TOOLS", "EQUIPMENT", "Background", "Subclass", "Species", "Class"].includes(name)) {
                    field.setFontSize(8)
                } else {
                    field.setFontSize(fontSize)
                }
            } catch (e) {
                // Si no es un TextField, probamos con Dropdown
                try {
                    const dropdown = form.getDropdown(name)
                    dropdown.select(String(value))
                } catch (err) {}
            }
        }

        const checkField = (name: string) => {
            try {
                const field = form.getCheckBox(name)
                field.check()
            } catch (e) {}
        }

        // --- IDENTIDAD (Página 1) ---
        setField("Name", character.name || "Héroe")
        setField("Class", character.class?.name || "")
        setField("Level", character.level || "1")
        setField("Species", character.race?.name || "")
        setField("Background", character.background?.name || "")
        setField("Experience Points", character.xp || "0")
        setField("Subclass", character.subclass)
        setField("Subrace", character.subrace)
        
        // --- IDENTIDAD (Página 2) ---
        setField("Alignment", character.alignment)

        // --- ATRIBUTOS (SCORE y MOD) ---
        const stats = {
            STR: character.abilities.str + (racialBonuses.str || 0),
            DEX: character.abilities.dex + (racialBonuses.dex || 0),
            CON: character.abilities.con + (racialBonuses.con || 0),
            INT: character.abilities.int + (racialBonuses.int || 0),
            WIS: character.abilities.wis + (racialBonuses.wis || 0),
            CHA: character.abilities.cha + (racialBonuses.cha || 0),
        }

        Object.entries(stats).forEach(([key, val]) => {
            const mod = calculateModifier(val)
            setField(`${key} SCORE`, val)
            setField(`${key} MOD`, formatModifier(mod))
            setField(`${key} SAVE`, formatModifier(mod))
        })

        // --- VITALES ---
        const dexMod = calculateModifier(stats.DEX)
        const conMod = calculateModifier(stats.CON)
        const profBonus = 2 
        
        setField("AC", 10 + dexMod)
        setField("INIT", formatModifier(dexMod))
        setField("SPEED", character.race?.speed || 30)
        setField("Max HP", (character.class?.hitDie || 8) + conMod)
        setField("Current HP", (character.class?.hitDie || 8) + conMod)
        setField("Prof Bonus", `+${profBonus}`)

        // --- HABILIDADES ---
        const skillFieldMap: Record<string, {field: string, stat: keyof typeof stats}> = {
            'Acrobacias': {field: 'ACROBATICS', stat: 'DEX'},
            'Atletismo': {field: 'ATHLETICS', stat: 'STR'},
            'Engaño': {field: 'DECEPTION', stat: 'CHA'},
            'Historia': {field: 'HISTORY', stat: 'INT'},
            'Percepción': {field: 'PERCEPTION', stat: 'WIS'},
            'Persuasión': {field: 'PERSUASION', stat: 'CHA'},
            'Sigilo': {field: 'STEALTH', stat: 'DEX'},
            'Supervivencia': {field: 'SURVIVAL', stat: 'WIS'},
            'Arcanos': {field: 'ARCANA', stat: 'INT'},
            'Intuición': {field: 'INSIGHT', stat: 'WIS'},
            'Intimidación': {field: 'INTIMIDATION', stat: 'CHA'},
            'Investigación': {field: 'INVESTIGATION', stat: 'INT'},
            'Medicina': {field: 'MEDICINE', stat: 'WIS'},
            'Naturaleza': {field: 'NATURE', stat: 'INT'},
            'Interpretación': {field: 'PERFORMANCE', stat: 'CHA'},
            'Religión': {field: 'RELIGION', stat: 'INT'},
            'Juego de Manos': {field: 'SLEIGHT OF HAND', stat: 'DEX'},
            'Trato con Animales': {field: 'ANIMAL HANDLING', stat: 'WIS'},
            'Atheletics': {field: 'ATHLETICS', stat: 'STR'}, // Fallback común
            'Insight': {field: 'INSIGHT', stat: 'WIS'}
        }

        Object.entries(skillFieldMap).forEach(([skillName, data]) => {
            const isProficient = character.skills.includes(skillName)
            const baseMod = calculateModifier(stats[data.stat])
            const totalMod = isProficient ? baseMod + profBonus : baseMod
            setField(data.field, formatModifier(totalMod), 8)
        })

        // --- RASGOS Y DOTES ---
        // Atributos de Especie
        setField("Size", character.race?.size || "Mediano")
        const hasDarkvision = character.race?.traits.some(t => t.name.toLowerCase().includes("visión"))
        setField("Darkvision", hasDarkvision ? "60 pies" : "No")
        
        // Sumario de Rasgos Raciales
        const racialTraits = character.race?.traits.map(t => `${t.name}: ${t.description}`).join("\n\n") || ""
        setField("TRAITS", racialTraits || character.subrace || "", 8)
        
        // Dotes
        setField("FEATS", character.feats, 8)
        
        // Rasgos de Clase (Cajas centrales)
        const classFeatures = character.class?.features
            ?.filter(f => f.level <= character.level)
            .map(f => `${f.name}: ${f.description}`)
            .join("\n\n") || ""
        setField("CLASS FEATURES 1", character.classFeatures || classFeatures || (character.personalityTraits + "\n\n" + character.ideals), 8)
        setField("CLASS FEATURES 2", character.bonds + "\n\n" + character.flaws, 8)
        
        // Entrenamiento y Competencias (Abajo izquierda)
        const allLangs = [...(character.race?.languages || []), character.languages].filter(Boolean).join(", ")
        setField("LANGUAGES", allLangs, 8)
        setField("TOOLS", character.equipment, 8)

        // --- APARIENCIA ---
        setField("Age", character.age)
        setField("Height", character.height)
        setField("Weight", character.weight)
        setField("Eyes", character.eyes)
        setField("Skin", character.skin)
        setField("Hair", character.hair)

        // --- EQUIPO SELECCIONADO ---
        if (character.items && character.items.length > 0) {
            setField("EQUIPMENT", character.items.join("\n"), 8)
        }
    }

    // Formatear apariencia final
    form.updateFieldAppearances(fontBold)

    const pdfBytes = await pdfDoc.save()
    const blob = new Blob([pdfBytes as any], { type: 'application/pdf' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = isEmpty ? "hoja-vacia-lataberna.pdf" : `hoja-${character.name || "personaje"}.pdf`
    link.click()
    
    toast.success(isEmpty ? "Hoja en blanco generada" : "¡Personaje exportado!", {
        description: "Tu ficha oficial de La Taberna está lista."
    })

  } catch (e: any) {
    toast.error("Error al generar PDF", { description: e.message })
    console.error("PDF Generation Error:", e)
  }
}
