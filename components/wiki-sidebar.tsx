"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Book, Users, Sword, Globe, Scroll, Shield, Zap, Star } from "lucide-react"
import { cn } from "@/lib/utils"

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

export function WikiSidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed top-24 z-30 hidden h-[calc(100vh-6rem)] w-full shrink-0 overflow-y-auto border-r border-neutral-200 md:sticky md:block scrollbar-hide">
      <div className="py-6 pr-6 lg:py-8 space-y-8">
        {wikiNavigation.map((section, idx) => (
          <div key={idx} className="animate-in fade-in slide-in-from-left-4 duration-500" style={{ animationDelay: `${idx * 100}ms` }}>
            <h4 className="mb-3 px-2 font-heading font-black text-[11px] uppercase tracking-widest text-foreground border-b border-border pb-2">
              {section.title}
            </h4>
            <nav className="flex flex-col gap-1">
              {section.items.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "group relative flex items-center gap-3 rounded-sm px-3 py-2 text-sm font-black uppercase tracking-widest transition-all duration-300",
                      isActive 
                        ? "text-black bg-black/5 pl-6" 
                        : "text-zinc-600 hover:text-black hover:pl-4 hover:bg-black/5"
                    )}
                  >
                    {/* Active/Hover Indicator Line */}
                    <span 
                        className={cn(
                            "absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-black transition-all duration-300 rounded-r-sm",
                            isActive ? "h-full" : "group-hover:h-1/2"
                        )} 
                    />
                    
                    <item.icon className={cn("h-4 w-4 shrink-0 transition-colors", isActive ? "text-black" : "text-zinc-600 group-hover:text-black")} />
                    {item.name}
                    
                    {/* Active Glow Effect */}
                    {isActive && (
                        <div className="absolute inset-0 bg-black/5 rounded-sm animate-pulse z-[-1]" />
                    )}
                  </Link>
                )
              })}
            </nav>
          </div>
        ))}
      </div>
    </aside>
  )
}
