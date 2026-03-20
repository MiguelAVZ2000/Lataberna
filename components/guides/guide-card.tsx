import Link from "next/link"
import Image from "next/image"
import { Clock, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export interface Guide {
  slug: string
  title: string
  excerpt: string
  image: string
  category: string
  readTime: number
  difficulty: "principiante" | "intermedio" | "avanzado"
}

interface GuideCardProps {
  guide: Guide
}

const difficultyColors = {
  principiante: "bg-green-100 text-green-700",
  intermedio: "bg-yellow-100 text-yellow-700",
  avanzado: "bg-red-100 text-red-700",
}

export function GuideCard({ guide }: GuideCardProps) {
  return (
    <Link href={`/guias/${guide.slug}`} className="group">
      <div className="relative h-full border-2 border-[#242528] bg-white overflow-hidden hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 flex flex-col">
        {/* Top gold accent */}
        <div className="h-1 w-0 bg-[#EE8600] group-hover:w-full transition-all duration-700" />

        {/* Image */}
        <div className="relative aspect-video overflow-hidden bg-gray-100">
          <Image
            src={guide.image || "/placeholder.svg"}
            alt={guide.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-2 left-2 bg-[#242528] text-white font-black uppercase text-[10px] tracking-widest px-2 py-1">
            {guide.category}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-1">
          <h3 className="font-heading font-black text-xl text-[#242528] group-hover:text-[#EE8600] transition-colors mb-3 uppercase tracking-tight leading-tight">
            {guide.title}
          </h3>
          <p className="text-sm text-gray-500 line-clamp-3 leading-relaxed font-sans flex-1">
            {guide.excerpt}
          </p>

          <div className="mt-5 pt-4 border-t border-[#242528]/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Badge variant="outline" className={`font-black uppercase text-[9px] tracking-wider border-none px-2 py-1 rounded ${difficultyColors[guide.difficulty]}`}>
                {guide.difficulty}
              </Badge>
              <span className="text-[10px] text-gray-400 font-bold flex items-center gap-1">
                <Clock className="h-3 w-3" /> {guide.readTime} min
              </span>
            </div>
            <span className="text-[11px] font-black text-[#242528]/40 group-hover:text-[#242528] uppercase tracking-widest flex items-center gap-1 transition-colors">
              Leer <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
