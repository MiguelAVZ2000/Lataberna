import { z } from "zod"

/**
 * Esquema de validación para los atributos básicos de un personaje.
 */
export const abilitiesSchema = z.object({
  str: z.number().min(0).max(30),
  dex: z.number().min(0).max(30),
  con: z.number().min(0).max(30),
  int: z.number().min(0).max(30),
  wis: z.number().min(0).max(30),
  cha: z.number().min(0).max(30),
})

/**
 * Esquema de validación para la biografía y trasfondo.
 */
export const biographySchema = z.object({
  alignment: z.string().optional(),
  personalityTraits: z.string().optional(),
  ideals: z.string().optional(),
  bonds: z.string().optional(),
  flaws: z.string().optional(),
  background: z.string().optional(),
})

/**
 * Esquema de validación principal para un personaje de La Taberna.
 * Asegura que los datos guardados en Supabase sigan una estructura coherente.
 */
export const characterSchema = z.object({
  usuario_id: z.string().uuid(),
  nombre: z.string().min(1, "El nombre es obligatorio").max(100),
  raza_id: z.string().min(1, "La raza es obligatoria"),
  clase_id: z.string().min(1, "La clase es obligatoria"),
  nivel: z.number().min(1).max(20),
  estadisticas: z.object({
    abilities: abilitiesSchema,
    skills: z.array(z.string()).optional(),
    spells: z.array(z.string()).optional(),
    hitDie: z.number().optional(),
    speed: z.number().optional(),
  }),
  biografia: biographySchema,
})

export type CharacterInput = z.infer<typeof characterSchema>
