"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { User, ShoppingBag, Sword, Settings, ChevronRight } from "lucide-react"

const navItems = [
  {
    title: "Mis Personajes",
    href: "/perfil/personajes",
    icon: Sword,
  },
  {
    title: "Historial de Compras",
    href: "/perfil/pedidos",
    icon: ShoppingBag,
  },
  {
    title: "Configuración",
    href: "/perfil/configuracion",
    icon: Settings,
  },
]

export function ProfileNav() {
  const pathname = usePathname()

  return (
    <nav className="flex flex-col gap-2">
      {navItems.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center justify-between px-6 py-4 border-2 transition-all group",
              isActive 
                ? "bg-black border-black text-[#EE8600] translate-x-1" 
                : "bg-white border-transparent text-gray-500 hover:border-black hover:text-black hover:translate-x-1"
            )}
          >
            <div className="flex items-center gap-4">
              <item.icon className={cn("h-5 w-5", isActive ? "text-[#EE8600]" : "text-gray-400 group-hover:text-black")} />
              <span className="font-black uppercase tracking-widest text-[11px]">{item.title}</span>
            </div>
            <ChevronRight className={cn("h-4 w-4 transition-transform", isActive ? "translate-x-1" : "opacity-0 group-hover:opacity-100")} />
          </Link>
        )
      })}
    </nav>
  )
}
