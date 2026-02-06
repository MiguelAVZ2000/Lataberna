import { races, classes, backgrounds } from "./character-data"

export interface SearchResult {
  id: string
  name: string
  description: string
  type: "Raza" | "Clase" | "Trasfondo" | "Sección" | "Hechizo"
  href: string
}

export const wikiSections = [
  { name: "Introducción", description: "Bienvenido a La Taberna, tu hub de D&D.", href: "/wiki" },
  { name: "Reglas Básicas", description: "Aprende los fundamentos del juego.", href: "/wiki/conceptos/reglas-basicas" },
  { name: "Razas", description: "Explora las diferentes razas y sus rasgos.", href: "/wiki/razas" },
  { name: "Clases", description: "Elige la senda heroica de tu personaje.", href: "/wiki/clases" },
  { name: "Trasfondos", description: "Define el origen y pasado de tu héroe.", href: "/wiki/trasfondos" },
  { name: "Combate", description: "Reglas de iniciativa, ataques y daño.", href: "/wiki/conceptos/combate" },
  { name: "Magia", description: "Cómo funciona el lanzamiento de conjuros.", href: "/wiki/conceptos/magia" },
  { name: "Hechizos", description: "Listado completo de conjuros arcanos y divinos.", href: "/wiki/conceptos/hechizos" },
  { name: "Rasgos y Aptitudes", description: "Información sobre dotes y rasgos especiales.", href: "/wiki/conceptos/rasgos" },
  { name: "Tienda", description: "Mercado de equipo y objetos mágicos.", href: "/tienda" },
  { name: "Creador de Personajes", description: "Forja tu héroe paso a paso.", href: "/personaje" },
]

export function getStaticSearchResults(query: string): SearchResult[] {
  const q = query.toLowerCase()
  
  const results: SearchResult[] = [
    ...races.map(r => ({ id: r.id, name: r.name, description: r.description, type: "Raza" as const, href: `/wiki/razas/${r.id}` })),
    ...classes.map(c => ({ id: c.id, name: c.name, description: c.description, type: "Clase" as const, href: `/wiki/clases/${c.id}` })),
    ...backgrounds.map(b => ({ id: b.id, name: b.name, description: b.description, type: "Trasfondo" as const, href: `/wiki/trasfondos/${b.id}` })),
    ...wikiSections.map(s => ({ id: s.href, name: s.name, description: s.description, type: "Sección" as const, href: s.href })),
  ]

  if (!q) return []

  return results.filter(item => 
    item.name.toLowerCase().includes(q) || 
    item.description.toLowerCase().includes(q)
  )
}
