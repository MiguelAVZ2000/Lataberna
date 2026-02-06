"use client"

import { ChevronRight } from "lucide-react"
import { SearchResult } from "@/lib/search-utils"

interface SearchSuggestionsProps {
  suggestions: SearchResult[]
  isSearching: boolean
  searchQuery: string
  onSuggestionClick: (href: string) => void
  onViewAllClick: () => void
  className?: string
}

export function SearchSuggestions({
  suggestions,
  isSearching,
  searchQuery,
  onSuggestionClick,
  onViewAllClick,
  className = ""
}: SearchSuggestionsProps) {
  if (suggestions.length === 0) return null

  return (
    <div className={`absolute top-full mt-2 left-0 right-0 bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] z-[100] rounded-none overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top ${className}`}>
      <div className="p-3 bg-black text-white font-heading font-black text-[10px] uppercase tracking-widest flex justify-between items-center">
        <span>Sugerencias Encontradas</span>
        {isSearching && <div className="h-3 w-3 border-2 border-white border-t-transparent animate-spin rounded-full" />}
      </div>
      <div className="max-h-[350px] overflow-y-auto">
        {suggestions.map((result) => (
          <div 
            key={`${result.type}-${result.id}`}
            onMouseDown={(e) => {
              e.preventDefault()
              onSuggestionClick(result.href)
            }}
            className="p-4 border-b-2 border-gray-100 hover:bg-[#EE8600]/10 cursor-pointer group transition-colors flex justify-between items-center"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="bg-[#242528] text-white text-[8px] font-black px-2 py-0.5 uppercase tracking-tighter rounded-none">
                  {result.type}
                </span>
                <span className="font-heading font-black text-sm uppercase text-black group-hover:text-[#EE8600]">
                  {result.name}
                </span>
              </div>
              <p className="text-[10px] text-gray-500 line-clamp-1 italic font-sans font-medium">
                {result.description}
              </p>
            </div>
            <ChevronRight className="h-4 w-4 text-gray-300 group-hover:text-[#EE8600] group-hover:translate-x-1 transition-all" />
          </div>
        ))}
      </div>
      <button 
        onMouseDown={(e) => {
          e.preventDefault()
          onViewAllClick()
        }}
        className="w-full p-4 bg-gray-50 text-[#EE8600] font-heading font-black text-xs uppercase tracking-widest hover:bg-gray-100 transition-colors border-t-2 border-black"
      >
        Ver todos los resultados para &quot;{searchQuery}&quot;
      </button>
    </div>
  )
}
