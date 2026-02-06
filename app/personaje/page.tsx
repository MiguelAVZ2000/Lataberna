import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { CharacterCreatorWizard } from "@/components/character/character-wizard"

export const metadata: Metadata = {
  title: "Crear Personaje DnD | Hoja de Personaje Gratis | Lataberna",
  description: "Crea tu hoja de personaje de Dungeons & Dragons 5e gratis. Wizard paso a paso para elegir raza, clase, atributos y trasfondo. Exporta a PDF.",
  keywords: ["crear personaje DnD", "hoja de personaje DnD", "character sheet DnD", "Dungeons and Dragons personaje", "DnD 5e personaje"],
  openGraph: {
    title: "Crear Personaje DnD | Lataberna",
    description: "Crea tu hoja de personaje de DnD 5e gratis con nuestro wizard interactivo.",
  },
}

export default function PersonajePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 py-8 lg:py-12">
        <div className="container mx-auto px-4">
          <CharacterCreatorWizard />
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
