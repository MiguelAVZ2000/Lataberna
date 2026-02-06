"use client"

import { 
  Shield, 
  Eye, 
  Droplets,
  Search,
  Skull,
  Move,
  Flame,
  Sparkles,
  Ghost,
  Clock,
  Target,
  Zap,
  ChevronDown,
  ArrowUpDown,
  ArrowUp,
  ArrowDown
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

import { type Spell } from "@/lib/spells-data"
import { supabase } from "@/lib/supabase"
import { cn } from "@/lib/utils"

const ITEMS_PER_PAGE = 10

export default function HechizosWikiPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedLevel, setSelectedLevel] = useState<string>("all")
  const [selectedSchool, setSelectedSchool] = useState<string>("all")
  
  const [fetchedSpells, setFetchedSpells] = useState<Spell[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Paginación y Ordenamiento
  const [currentPage, setCurrentPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const [sortColumn, setSortColumn] = useState<string>("nombre")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  const schools = ["Abjuración", "Adivinación", "Conjuración", "Encantamiento", "Evocación", "Ilusión", "Nigromancia", "Transmutación"]
  const levels = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]

  // Reiniciar a página 1 cuando cambian los filtros
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, selectedLevel, selectedSchool])

  useEffect(() => {
    async function loadSpells() {
      setIsLoading(true)
      setError(null)
      try {
        let query = supabase
          .from('hechizos')
          .select('*', { count: 'exact' })
          
        // Aplicar ordenamiento
        query = query.order(sortColumn, { ascending: sortDirection === 'asc' })

        // Aplicar filtros
        if (searchTerm) {
          query = query.ilike('nombre', `%${searchTerm}%`)
        }
        if (selectedLevel !== "all") {
          query = query.eq('nivel', selectedLevel)
        }
        if (selectedSchool !== "all") {
          query = query.eq('escuela', selectedSchool)
        }

        // Aplicar paginación
        const from = (currentPage - 1) * ITEMS_PER_PAGE
        const to = from + ITEMS_PER_PAGE - 1
        query = query.range(from, to)

        const { data, count, error } = await query
        
        if (error) {
          console.error('Error cargando hechizos:', JSON.stringify(error, null, 2))
          setError('No se pudieron cargar los hechizos. Por favor intenta de nuevo.')
        } else {
          setFetchedSpells(data as unknown as Spell[] || [])
          setTotalCount(count || 0)
        }
      } catch (e) {
        console.error('Excepción cargando hechizos:', e)
        setError('Ocurrió un error inesperado cargando el grimorio.')
      } finally {
        setIsLoading(false)
      }
    }
    
    // Debounce para búsqueda
    const timeoutId = setTimeout(() => {
      loadSpells()
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [searchTerm, selectedLevel, selectedSchool, currentPage, sortColumn, sortDirection])

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE)

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  const toggleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(prev => prev === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const SortIcon = ({ column }: { column: string }) => {
    if (sortColumn !== column) return <ArrowUpDown className="h-3 w-3 ml-2 opacity-30" />
    return sortDirection === "asc" 
      ? <ArrowUp className="h-3 w-3 ml-2 text-[#EE8600]" /> 
      : <ArrowDown className="h-3 w-3 ml-2 text-[#EE8600]" />
  }

  return (
    <div className="max-w-7xl mx-auto space-y-12 pb-20">
      {/* Header Section */}
      <div className="space-y-6 pt-8">
        <h1 className="font-heading font-bold text-5xl uppercase tracking-tight text-[#242528]">
          Hechizos
        </h1>
        <div className="h-[3px] w-48 bg-[#EE8600]" />
        <p className="text-xl text-[#242528] font-sans max-w-3xl leading-relaxed">
          Un catálogo completo de conjuros arcanos y divinos. Utiliza los filtros para encontrar la magia que necesitas.
        </p>
      </div>

      {/* Advanced Filters Bar - D&D Beyond Style */}
      <div className="bg-white border border-[#E1E1E1] p-6 space-y-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Search */}
          <div className="md:col-span-2 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#242528]/40" />
            <Input 
              placeholder="Buscar por nombre..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-[#E1E1E1] focus-visible:ring-[#EE8600] rounded-none h-12 text-sm font-medium"
            />
          </div>

          {/* School Filter */}
          <div className="relative">
            <select 
              value={selectedSchool}
              onChange={(e) => setSelectedSchool(e.target.value)}
              className="w-full h-12 pl-4 pr-10 border border-[#E1E1E1] bg-white text-sm font-bold uppercase tracking-widest text-[#242528] appearance-none focus:outline-none focus:ring-1 focus:ring-[#EE8600]"
            >
              <option value="all">Todas las Escuelas</option>
              {schools.map(school => (
                <option key={school} value={school}>{school}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#242528]/40 pointer-events-none" />
          </div>

          {/* Level Filter */}
          <div className="relative">
            <select 
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="w-full h-12 pl-4 pr-10 border border-[#E1E1E1] bg-white text-sm font-bold uppercase tracking-widest text-[#242528] appearance-none focus:outline-none focus:ring-1 focus:ring-[#EE8600]"
            >
              <option value="all">Cualquier Nivel</option>
              {levels.map((level) => (
                <option key={level} value={level}>
                  {level === "0" ? "Trucos" : `Nivel ${level}`}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#242528]/40 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Main Spells Table */}
      <div className="border border-[#E1E1E1] bg-white overflow-hidden shadow-sm flex flex-col">
        <div className="overflow-x-auto">
            <Table className="min-w-[1000px] table-fixed">
            <TableHeader className="bg-[#242528]">
                <TableRow className="hover:bg-transparent border-none">
                <TableHead onClick={() => toggleSort('nombre')} className="text-white font-bold uppercase text-[10px] tracking-[0.2em] py-4 pl-8 w-[25%] cursor-pointer hover:bg-white/5 transition-colors group">
                    <div className="flex items-center">Hechizo <SortIcon column="nombre" /></div>
                </TableHead>
                <TableHead onClick={() => toggleSort('nivel')} className="text-white font-bold uppercase text-[10px] tracking-[0.2em] py-4 w-[10%] cursor-pointer hover:bg-white/5 transition-colors group">
                    <div className="flex items-center">Nivel <SortIcon column="nivel" /></div>
                </TableHead>
                <TableHead className="text-white font-bold uppercase text-[10px] tracking-[0.2em] py-4 w-[20%]">Escuela</TableHead>
                <TableHead className="text-white font-bold uppercase text-[10px] tracking-[0.2em] py-4 w-[20%]">Detalles</TableHead>
                <TableHead className="text-white font-bold uppercase text-[10px] tracking-[0.2em] py-4 w-[25%]">Componentes</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {fetchedSpells.length > 0 ? (
                fetchedSpells.map((spell, i) => (
                    <TableRow key={i} className="group hover:bg-[#F9F9F9] border-[#E1E1E1] transition-colors">
                    <TableCell className="py-4 pl-8 align-top">
                        <div className="space-y-2">
                        <p className="font-heading font-bold text-lg uppercase tracking-tight text-[#242528] group-hover:text-[#EE8600] transition-colors cursor-pointer leading-tight">
                            {spell.nombre}
                        </p>
                        <p className="text-xs text-[#242528]/60 italic font-sans leading-relaxed whitespace-normal break-words max-w-[95%]">{spell.descripcion}</p>
                        <p className="text-[9px] font-black uppercase tracking-widest text-[#EE8600] Pt-1">{spell.fuente}</p>
                        </div>
                    </TableCell>
                    <TableCell className="py-4 align-top">
                        <Badge variant="outline" className="border-[#E1E1E1] text-[#242528] text-[9px] font-bold uppercase rounded-none px-2 whitespace-nowrap">
                        {spell.nivel === "0" ? "Truco" : `Lvl ${spell.nivel}`}
                        </Badge>
                    </TableCell>
                    <TableCell className="py-4 align-top">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#242528]/60 flex flex-wrap items-center gap-2">
                        {spell.escuela === "Evocación" && <Flame className="h-3 w-3 text-[#EE8600]" />}
                        {spell.escuela === "Abjuración" && <Shield className="h-3 w-3 text-[#EE8600]" />}
                        {spell.escuela === "Ilusión" && <Ghost className="h-3 w-3 text-[#EE8600]" />}
                        {spell.escuela === "Adivinación" && <Eye className="h-3 w-3 text-[#EE8600]" />}
                        {spell.escuela === "Conjuración" && <Droplets className="h-3 w-3 text-[#EE8600]" />}
                        {spell.escuela === "Encantamiento" && <Sparkles className="h-3 w-3 text-[#EE8600]" />}
                        {spell.escuela === "Nigromancia" && <Skull className="h-3 w-3 text-[#EE8600]" />}
                        {spell.escuela === "Transmutación" && <Move className="h-3 w-3 text-[#EE8600]" />}
                        {spell.escuela}
                        </span>
                    </TableCell>
                    <TableCell className="py-4 align-top">
                        <div className="space-y-2 text-[10px] font-bold uppercase tracking-[0.1em] text-[#242528]/50">
                        <div className="flex items-start gap-2"><Clock className="h-3 w-3 shrink-0 mt-0.5" /> <span className="leading-tight">{spell.tiempo_lanzamiento}</span></div>
                        <div className="flex items-start gap-2"><Target className="h-3 w-3 shrink-0 mt-0.5" /> <span className="leading-tight">{spell.alcance}</span></div>
                        </div>
                    </TableCell>
                    <TableCell className="py-4 align-top">
                        <div className="flex flex-wrap gap-1.5 items-start content-start">
                        {spell.componentes.split(", ").map(c => (
                            <div key={c} className="min-w-[24px] px-2 min-h-[24px] h-auto py-1 flex items-center justify-center border border-[#E1E1E1] bg-[#F9F9F9] text-[10px] font-bold text-[#242528]/60 text-center leading-tight whitespace-normal break-words">
                            {c}
                            </div>
                        ))}
                        </div>
                    </TableCell>
                    </TableRow>
                ))
                ) : (
                <TableRow>
                    <TableCell colSpan={5} className="py-20 text-center space-y-4">
                    {isLoading ? (
                        <div className="flex flex-col items-center gap-2">
                            <Zap className="h-12 w-12 text-[#EE8600] animate-pulse" />
                            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#242528]/40">Cargando grimorio...</p>
                        </div>
                    ) : error ? (
                        <div className="flex flex-col items-center gap-2">
                            <Skull className="h-12 w-12 text-red-500" />
                            <p className="text-xs font-bold text-red-500 max-w-md mx-auto">{error}</p>
                            <p className="text-[10px] text-zinc-500">Intenta recargar la página.</p>
                        </div>
                    ) : (
                        <>
                            <Zap className="h-12 w-12 text-[#E1E1E1] mx-auto" />
                            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#242528]/40">No se encontraron hechizos maestros con estos criterios</p>
                        </>
                    )}
                    </TableCell>
                </TableRow>
                )}
            </TableBody>
            </Table>
        </div>
        
        {/* Pagination Controls */}
        {totalPages > 1 && (
            <div className="py-6 border-t border-[#E1E1E1]">
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious 
                                href="#" 
                                onClick={(e) => { e.preventDefault(); handlePageChange(currentPage - 1) }}
                                className={currentPage <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                            />
                        </PaginationItem>
                        
                        {/* Simple page indication for now */}
                        <div className="px-4 text-xs font-bold uppercase tracking-widest text-[#242528]/60 flex items-center">
                            Página {currentPage} de {totalPages}
                        </div>

                        <PaginationItem>
                            <PaginationNext 
                                href="#"
                                onClick={(e) => { e.preventDefault(); handlePageChange(currentPage + 1) }}
                                className={currentPage >= totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        )}
      </div>

      {/* Rules Footer Section */}
      <div className="p-10 border-t-4 border-[#EE8600] bg-[#242528] text-white">
        <div className="max-w-4xl space-y-8">
           <h4 className="font-heading text-2xl font-bold uppercase tracking-tight flex items-center gap-3">
             <span className="h-2 w-10 bg-[#EE8600]" /> El Arte de Conjurar
           </h4>
           <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#EE8600]">Componentes</p>
                <p className="text-xs text-white/70 font-sans leading-relaxed">V (Verbal), S (Somático), M (Material). La base física de toda magia arcana.</p>
              </div>
              <div className="space-y-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#EE8600]">Rituales (R)</p>
                <p className="text-xs text-white/70 font-sans leading-relaxed">Conjuros que pueden lanzarse sin gastar ranuras si se invierte tiempo extra.</p>
              </div>
              <div className="space-y-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#EE8600]">Concentración (C)</p>
                <p className="text-xs text-white/70 font-sans leading-relaxed">Requiere foco constante; recibir daño puede interrumpir el efecto mágicamente.</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  )
}
