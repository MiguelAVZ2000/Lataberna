/**
 * Definición central de tipos para La Taberna.
 */

// --- TIENDA ---
export interface Producto {
  id: string
  Nombre: string
  Descripcion: string | null
  Precio: number
  Imagen_url: string | null
  Categoria: string | null
  Stock: number
  Activo: boolean
  Creado_en: string
}

export interface CartItem extends Producto {
  cantidad: number
}

// --- PERSONAJE ---
export interface AbilityScores {
  str: number
  dex: number
  con: number
  int: number
  wis: number
  cha: number
}

export interface Race {
  id: string
  name: string
  description: string
  image: string
  abilityBonuses: Partial<AbilityScores>
  speed: number
  size?: string
  languages: string[]
  traits?: { name: string; description: string }[]
}

export interface ClassFeature {
  name: string
  level: number
  description: string
}

export interface Class {
  id: string
  name: string
  description: string
  hitDie: number
  primaryAbility: string[]
  image: string
  features: ClassFeature[]
}

export interface Background {
  id: string
  name: string
  description: string
  skillProficiencies: string[]
  toolProficiencies?: string[]
  languages?: string
  feature: string
  featureDescription: string
}

export interface CharacterState {
  name: string
  race: Race | null
  class: Class | null
  background: Background | null
  level: number
  xp: number
  abilities: AbilityScores
  skills: string[]
  alignment: string
  personalityTraits: string
  ideals: string
  bonds: string
  flaws: string
  subrace?: string
  subclass?: string
  age?: string
  height?: string
  weight?: string
  eyes?: string
  skin?: string
  hair?: string
  languages?: string
  equipment?: string
  items?: string[]
  spells?: string[]
}

// --- PERFIL Y USUARIO ---
export interface DBCharacter {
  id: string
  usuario_id: string
  nombre: string
  raza_id: string
  clase_id: string
  nivel: number
  estadisticas: any // JSON de Supabase
  biografia: any    // JSON de Supabase
  actualizado_el: string
  creado_el: string
}
