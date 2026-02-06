import React from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import Link from "next/link"
import { Book, Users, Sword, Globe, Scroll, Shield, Zap, Star } from "lucide-react"

const wikiNavigation = [
  {
    title: "Empezando",
    items: [
      { name: "Introducción", href: "/wiki", icon: Book },
      { name: "Reglas Básicas", href: "/wiki/conceptos/reglas-basicas", icon: Scroll },
    ]
  },
  {
    title: "Personajes",
    items: [
      { name: "Razas", href: "/wiki/razas", icon: Users },
      { name: "Clases", href: "/wiki/clases", icon: Sword },
      { name: "Trasfondos", href: "/wiki/trasfondos", icon: Scroll },
    ]
  },
  {
    title: "Mecánicas",
    items: [
      { name: "Combate", href: "/wiki/conceptos/combate", icon: Shield },
      { name: "Magia", href: "/wiki/conceptos/magia", icon: Zap },
      { name: "Hechizos", href: "/wiki/conceptos/hechizos", icon: Scroll },
      { name: "Rasgos y Aptitudes", href: "/wiki/conceptos/rasgos", icon: Star },
    ]
  }
]

import { WikiSidebar } from "@/components/wiki-sidebar"

export default function WikiLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader />
      <div className="container mx-auto flex-1 items-start md:grid md:grid-cols-[240px_1fr] md:gap-8 lg:grid-cols-[280px_1fr] lg:gap-12 px-6 py-6">
        <WikiSidebar />
        <main className="relative py-6 lg:py-8 min-h-[80vh]">
          <div className="relative z-10">
            {children}
          </div>
        </main>
      </div>
      <SiteFooter />
    </div>
  )
}

