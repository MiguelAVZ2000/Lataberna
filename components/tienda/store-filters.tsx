"use client"

import { Dices, BookOpen, Users, Package, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const categories = [
  { id: "all", name: "Todos", icon: Sparkles },
  { id: "dados", name: "Dados", icon: Dices },
  { id: "libros", name: "Libros", icon: BookOpen },
  { id: "miniaturas", name: "Miniaturas", icon: Users },
  { id: "accesorios", name: "Accesorios", icon: Package },
]

interface StoreFiltersProps {
  selectedCategory: string
  onCategoryChange: (category: string) => void
}

export function StoreFilters({ selectedCategory, onCategoryChange }: StoreFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 mb-6">
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={selectedCategory === category.id ? "default" : "outline"}
          size="sm"
          onClick={() => onCategoryChange(category.id)}
          className={cn(
            "font-bold uppercase tracking-wider text-xs rounded-none transition-all border",
            selectedCategory === category.id
              ? "bg-[#242528] text-white border-[#242528]"
              : "bg-white text-[#242528] border-[#E1E1E1] hover:border-[#EE8600] hover:text-[#EE8600]"
          )}
        >
          <category.icon className="mr-2 h-4 w-4" />
          {category.name}
        </Button>
      ))}
    </div>
  )
}
