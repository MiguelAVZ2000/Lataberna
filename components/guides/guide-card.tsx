import Link from "next/link"
import Image from "next/image"
import { Clock, BookOpen, ArrowRight } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
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
    <Link href={`/guias/${guide.slug}`}>
      <Card className="group h-full overflow-hidden border border-gray-200 bg-white hover:border-primary/40 hover:shadow-xl hover:shadow-black/5 transition-all duration-300 rounded-sm">
        {/* Image */}
        <div className="relative aspect-video overflow-hidden bg-gray-100">
          <Image
            src={guide.image || "/placeholder.svg"}
            alt={guide.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <Badge className="absolute top-2 left-2 bg-black/70 text-white font-bold uppercase text-[10px] tracking-widest border-none rounded-sm">
             {guide.category}
          </Badge>
        </div>

        {/* Content */}
        <CardContent className="p-5">
           <h3 className="font-heading font-bold text-xl text-gray-900 group-hover:text-primary transition-colors mb-2">
             {guide.title}
           </h3>
          <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
            {guide.excerpt}
          </p>
        </CardContent>

        {/* Footer */}
        <CardFooter className="px-5 pb-5 pt-0 flex items-center justify-between border-t border-gray-100 mt-auto pt-4">
           <Badge variant="outline" className={`font-bold uppercase text-[10px] tracking-wider border-none px-2 py-1 rounded-sm ${difficultyColors[guide.difficulty]}`}>
              {guide.difficulty}
           </Badge>
           <span className="text-xs font-bold text-primary uppercase tracking-widest flex items-center gap-1 group-hover:gap-2 transition-all">
             Leer <ArrowRight className="h-3 w-3" />
           </span>
        </CardFooter>
      </Card>
    </Link>
  )
}
