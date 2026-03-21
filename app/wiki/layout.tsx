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
    <div className="flex min-h-screen flex-col bg-bg-base">
      <SiteHeader />
      <div className="flex-1 flex md:grid md:grid-cols-[240px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="bg-bg-surface border-r border-border-dark hidden md:block">
          <WikiSidebar />
        </div>
        <main className="relative py-6 lg:py-8 min-h-[80vh] bg-bg-light text-[#1c1a17] px-6 lg:px-12">
          <div className="relative z-10">
            {children}
          </div>
        </main>
      </div>
      <SiteFooter />
    </div>
  )
}

