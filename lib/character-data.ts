// DnD 5e Character Creation Data - SRD 5.1 Official English/Spanish
export interface RaceTrait {
  name: string
  description: string
}

export interface Race {
  id: string
  name: string
  description: string
  image: string
  age: string
  alignment: string
  size: string
  sizeDescription: string
  speed: number
  languages: string[]
  abilityBonuses: Record<string, number>
  traits: RaceTrait[]
}

export interface ProgressionColumn {
  label: string
  key: string
}

export interface LevelProgression {
  level: number
  pb: number
  features: string[]
  specifics: Record<string, string>
}

export interface ClassFeature {
  level: number
  name: string
  description: string
}

export interface CharacterClass {
  id: string
  name: string
  description: string
  image: string
  hitDie: number
  primaryAbility: string[]
  savingThrows: string[]
  proficiencies: {
    armor: string[]
    weapons: string[]
    tools: string[]
  }
  skills: string[]
  skillChoices: number
  features: ClassFeature[]
  tableColumns?: ProgressionColumn[]
  progression?: LevelProgression[]
}

export interface Background {
  id: string
  name: string
  description: string
  skillProficiencies: string[]
  toolProficiencies?: string[]
  languages?: number
  feature: string
  featureDescription: string
}

export const races: Race[] = [
  {
    id: "human",
    name: "Humano",
    description: "Los humanos son la más común de las razas en la mayoría de los mundos, con vidas más cortas que otras razas, lo que les impulsa a lograr mucho en el tiempo que tienen.",
    image: "/images/wiki/razas/humano.png",
    age: "Alcanzan la adultez al final de la adolescencia y viven menos de un siglo.",
    alignment: "Los humanos no tienden a ningún alineamiento particular. Lo mejor y lo peor se encuentran entre ellos.",
    size: "Mediano",
    sizeDescription: "Los humanos varían mucho en altura y constitución, desde apenas 5 pies hasta más de 6 pies de altura.",
    speed: 30,
    languages: ["Común", "Uno a tu elección"],
    abilityBonuses: { str: 1, dex: 1, con: 1, int: 1, wis: 1, cha: 1 },
    traits: [
      { name: "Versatilidad", description: "Ganas +1 a todas tus puntuaciones de característica." }
    ],
  },
  {
    id: "elf",
    name: "Elfo",
    description: "Los elfos son un pueblo mágico con una gracia sobrenatural. Son conocidos por su poesía, baile, canto, sabiduría y artes mágicas.",
    image: "/images/wiki/razas/elfo.png",
    age: "Alcanzan la madurez física a los 20 años, pero la adultez definitiva a los 100. Pueden vivir más de 750 años.",
    alignment: "Tienden al caos y al bien, valorando la libertad y la expresión personal.",
    size: "Mediano",
    sizeDescription: "Los elfos miden entre 5 y 6 pies de altura y poseen complexiones esbeltas.",
    speed: 30,
    languages: ["Común", "Élfico"],
    abilityBonuses: { dex: 2 },
    traits: [
      { name: "Visión en la Oscuridad", description: "Puedes ver en luz tenue como si fuera luz brillante, y en oscuridad como si fuera luz tenue a 60 pies." },
      { name: "Sentidos Agudos", description: "Tienes competencia en la habilidad de Percepción." },
      { name: "Ascendencia Feérica", description: "Ventaja en tiradas de salvación contra ser encantado, y la magia no puede dormirte." },
      { name: "Trance", description: "No necesitas dormir. Meditas profundamente durante 4 horas al día." }
    ],
  },
  {
    id: "dwarf",
    name: "Enano",
    description: "Resistentes y tradicionales, los enanos son maestros artesanos y valientes guerreros de las profundidades de la tierra.",
    image: "/images/wiki/razas/enano.png",
    age: "Alcanzan la madurez a los 50 años y pueden vivir hasta los 350 años.",
    alignment: "Tienden a ser legales, con un fuerte sentido del deber y la justicia.",
    size: "Mediano",
    sizeDescription: "Miden entre 4 y 5 pies de altura y pesan alrededor de 150 libras.",
    speed: 25,
    languages: ["Común", "Enano"],
    abilityBonuses: { con: 2 },
    traits: [
      { name: "Visión en la Oscuridad", description: "Visión superior en condiciones de oscuridad a 60 pies." },
      { name: "Resistencia Enana", description: "Ventaja en salvaciones contra veneno y resistencia al daño por veneno." },
      { name: "Entrenamiento de Combate Enano", description: "Competencia con hachas de batalla, hachas de mano, martillos ligeros y de guerra." },
      { name: "Afinidad con la Piedra", description: "Bonificador doble en pruebas de Historia relacionadas con trabajos de piedra." }
    ],
  },
  {
    id: "halfling",
    name: "Mediano",
    description: "Los medianos son gente pequeña con una gran capacidad de supervivencia, amantes de la paz, la comida y el hogar.",
    image: "/images/wiki/razas/mediano.png",
    age: "Alcanzan la madurez a los 20 años y viven hasta los 150.",
    alignment: "Tienden a ser legales buenos. Son bondadosos, amables y odian la opresión.",
    size: "Pequeño",
    sizeDescription: "Miden alrededor de 3 pies y pesan unas 40 libras.",
    speed: 25,
    languages: ["Común", "Mediano"],
    abilityBonuses: { dex: 2 },
    traits: [
      { name: "Suertudo", description: "Cuando sacas un 1 en un d20, puedes volver a tirar el dado." },
      { name: "Valiente", description: "Ventaja en salvaciones contra ser asustado." },
      { name: "Agilidad Mediana", description: "Puedes moverte a través del espacio de cualquier criatura que sea de un tamaño mayor al tuyo." }
    ],
  },
  {
    id: "dragonborn",
    name: "Dracónido",
    description: "Descendientes de dragones, orgullosos guerreros con aliento elemental.",
    image: "/images/wiki/razas/draconido.png",
    age: "Crecen rápido. Caminan a las horas de nacer, alcanzan la madurez a los 15 y viven hasta los 80.",
    alignment: "Tienden a los extremos extremos del bien y el mal. Rara vez son neutrales.",
    size: "Mediano",
    sizeDescription: "Son altos y robustos, superando a menudo los 6 pies y pesando más de 250 libras.",
    speed: 30,
    languages: ["Común", "Dracónico"],
    abilityBonuses: { str: 2, cha: 1 },
    traits: [
      { name: "Ascendencia Dracónica", description: "Tienes un color de dragón que determina tu arma de aliento y tu resistencia." },
      { name: "Arma de Aliento", description: "Exhalas energía destructiva basada en tu ascendencia (60 pies, salvación de DES/CON)." },
      { name: "Resistencia al Daño", description: "Resistencia al tipo de daño asociado a tu color de dragón." }
    ],
  },
  {
    id: "gnome",
    name: "Gnomo",
    description: "Los gnomos son conocidos por su curiosidad insaciable y su ingenio inventivo.",
    image: "/images/wiki/razas/gnomo.png",
    age: "Viven entre 350 y 500 años. Alcanzan la adultez a los 40 años.",
    alignment: "Suelen ser buenos. Los que tienden a la ley son sabios; los que tienden al caos son juglares.",
    size: "Pequeño",
    sizeDescription: "Miden entre 3 y 4 pies y pesan unas 40 libras.",
    speed: 25,
    languages: ["Común", "Gnomo"],
    abilityBonuses: { int: 2 },
    traits: [
      { name: "Visión en la Oscuridad", description: "Puedes ver en la oscuridad a 60 pies." },
      { name: "Astucia Gnómica", description: "Ventaja en salvaciones de Inteligencia, Sabiduría y Carisma contra magia." }
    ],
  },
  {
    id: "half-elf",
    name: "Semielfo",
    description: "Combinan la gracia de los elfos con la ambición de los humanos.",
    image: "/images/wiki/razas/semielfo.png",
    age: "Viven más de 180 años. Maduran a la misma velocidad que los humanos.",
    alignment: "Valoran la libertad personal y la expresión creativa, herencia de sus padres elfos.",
    size: "Mediano",
    sizeDescription: "Son casi del mismo tamaño que los humanos.",
    speed: 30,
    languages: ["Común", "Élfico", "Uno a tu elección"],
    abilityBonuses: { cha: 2, dex: 1, con: 1 },
    traits: [
      { name: "Visión en la Oscuridad", description: "Puedes ver en la oscuridad a 60 pies." },
      { name: "Ascendencia Feérica", description: "Ventaja contra ser encantado y no puedes dormir por magia." },
      { name: "Versatilidad de Habilidad", description: "Ganas competencia en dos habilidades de tu elección." }
    ],
  },
  {
    id: "half-orc",
    name: "Semiorco",
    description: "Heredan la fuerza y ferocidad de los orcos con la adaptabilidad humana.",
    image: "/images/wiki/razas/semiorco.png",
    age: "Maduran a los 14 años y rara vez viven más de 75.",
    alignment: "Tienden hacia el caos y no están muy inclinados hacia el bien.",
    size: "Mediano",
    sizeDescription: "Son algo más grandes y corpulentos que los humanos.",
    speed: 30,
    languages: ["Común", "Orco"],
    abilityBonuses: { str: 2, con: 1 },
    traits: [
      { name: "Visión en la Oscuridad", description: "Puedes ver en la oscuridad a 60 pies." },
      { name: "Amenazador", description: "Competencia en la habilidad Intimidación." },
      { name: "Resistencia Implacable", description: "Si tus PG bajan a 0 pero no mueres, te quedas con 1 PG (requiere descanso prolongado)." },
      { name: "Ataques Salvajes", description: "En un crítico cuerpo a cuerpo, tiras un dado de daño extra del arma." }
    ],
  },
  {
    id: "tiefling",
    name: "Tiefling",
    description: "Marcados por un linaje infernal, los tieflings son a menudo recibidos con desconfianza pero poseen poderes oscuros innatos.",
    image: "/images/wiki/razas/tiefling.png",
    age: "Maduran al mismo ritmo que los humanos, pero viven unos años más.",
    alignment: "Tienden al caos debido a su naturaleza independiente y al trato que reciben de la sociedad.",
    size: "Mediano",
    sizeDescription: "Tienen un tamaño similar al de los humanos.",
    speed: 30,
    languages: ["Común", "Infernal"],
    abilityBonuses: { int: 1, cha: 2 },
    traits: [
      { name: "Visión en la Oscuridad", description: "Puedes ver en la oscuridad a 60 pies." },
      { name: "Resistencia Infernal", description: "Tienes resistencia al daño por fuego." },
      { name: "Legado Infernal", description: "Conoces el truco de Taumaturgia. A nivel 3 lanzas Reprensión Infernal y a nivel 5 Oscuridad." }
    ],
  }
]

export const classes: CharacterClass[] = [
  {
    id: "barbarian",
    name: "Bárbaro",
    description: "Un guerrero feroz de trasfondo primitivo que puede entrar en una furia de batalla.",
    image: "/images/wiki/clases/barbaro.png",
    hitDie: 12,
    primaryAbility: ["str"],
    savingThrows: ["str", "con"],
    proficiencies: {
      armor: ["Ligeras", "Medias", "Escudos"],
      weapons: ["Sencillas", "Marciales"],
      tools: ["Ninguna"]
    },
    skills: ["Atletismo", "Intimidación", "Naturaleza", "Percepción", "Supervivencia", "Trato con animales"],
    skillChoices: 2,
    tableColumns: [
      { label: "Furias", key: "rages" },
      { label: "Daño de Furia", key: "rageDamage" }
    ],
    progression: [
      { level: 1, pb: 2, features: ["Furia", "Defensa sin Armadura"], specifics: { rages: "2", rageDamage: "+2" } },
      { level: 2, pb: 2, features: ["Ataque Temerario", "Sentido del Peligro"], specifics: { rages: "2", rageDamage: "+2" } },
      { level: 3, pb: 2, features: ["Senda Primitiva"], specifics: { rages: "3", rageDamage: "+2" } },
      { level: 4, pb: 2, features: ["Mejora de Característica"], specifics: { rages: "3", rageDamage: "+2" } },
      { level: 5, pb: 3, features: ["Ataque Extra", "Movimiento Rápido"], specifics: { rages: "3", rageDamage: "+2" } },
      { level: 6, pb: 3, features: ["Rasgo de Senda"], specifics: { rages: "4", rageDamage: "+2" } },
      { level: 7, pb: 3, features: ["Instinto Salvaje"], specifics: { rages: "4", rageDamage: "+2" } },
      { level: 8, pb: 3, features: ["Mejora de Característica"], specifics: { rages: "4", rageDamage: "+2" } },
      { level: 9, pb: 4, features: ["Crítico Brutal (1 dado)"], specifics: { rages: "4", rageDamage: "+3" } },
      { level: 10, pb: 4, features: ["Rasgo de Senda"], specifics: { rages: "4", rageDamage: "+3" } },
      { level: 11, pb: 4, features: ["Furia Implacable"], specifics: { rages: "4", rageDamage: "+3" } },
      { level: 12, pb: 4, features: ["Mejora de Característica"], specifics: { rages: "5", rageDamage: "+3" } },
      { level: 13, pb: 5, features: ["Crítico Brutal (2 dados)"], specifics: { rages: "5", rageDamage: "+3" } },
      { level: 14, pb: 5, features: ["Rasgo de Senda"], specifics: { rages: "5", rageDamage: "+3" } },
      { level: 15, pb: 5, features: ["Furia Persistente"], specifics: { rages: "5", rageDamage: "+3" } },
      { level: 16, pb: 5, features: ["Mejora de Característica"], specifics: { rages: "5", rageDamage: "+4" } },
      { level: 17, pb: 6, features: ["Crítico Brutal (3 dados)"], specifics: { rages: "6", rageDamage: "+4" } },
      { level: 18, pb: 6, features: ["Fuerza Indómita"], specifics: { rages: "6", rageDamage: "+4" } },
      { level: 19, pb: 6, features: ["Mejora de Característica"], specifics: { rages: "6", rageDamage: "+4" } },
      { level: 20, pb: 6, features: ["Campeón Primitivo"], specifics: { rages: "Ilimitado", rageDamage: "+4" } }
    ],
    features: [
      { level: 1, name: "Furia", description: "En combate, luchas con una ferocidad primitiva. En tu turno, puedes entrar en furia como acción adicional. Tienes ventaja en pruebas y tiradas de salvación de Fuerza. Si usas ataque cuerpo a cuerpo usando Fuerza, ganas un bono al daño especificado en la columna Daño de Furia. Tienes resistencia al daño contundente, perforante y cortante." },
      { level: 1, name: "Defensa sin Armadura", description: "Mientras no lleves armadura, tu Clase de Armadura es igual a 10 + tu modificador de Destreza + tu modificador de Constitución. Puedes usar un escudo y seguir beneficiándote de este rasgo." },
      { level: 2, name: "Ataque Temerario", description: "Puedes abandonar toda preocupación por tu defensa para atacar con desesperación feroz. Tienes ventaja en ataques cuerpo a cuerpo con Fuerza, pero los ataques contra ti tienen ventaja." },
      { level: 2, name: "Sentido del Peligro", description: "Tienes ventaja en tiradas de salvación de Destreza contra efectos que puedas ver, como trampas y hechizos." },
      { level: 3, name: "Senda Primitiva", description: "Eliges una senda que da forma a la naturaleza de tu furia (Berserker o Guerrero Totémico). Otorga rasgos a nivel 3, 6, 10 y 14." },
      { level: 4, name: "Mejora de Característica", description: "Puedes aumentar una puntuación de característica en 2, o dos puntuaciones de característica en 1 (máximo 20)." },
      { level: 5, name: "Ataque Extra", description: "Puedes atacar dos veces, en lugar de una sola, siempre que realices la acción de Atacar en tu turno." },
      { level: 5, name: "Movimiento Rápido", description: "Tu velocidad aumenta en 10 pies mientras no lleves armadura pesada." },
      { level: 7, name: "Instinto Salvaje", description: "Tus instintos son tan agudos que tienes ventaja en las tiradas de iniciativa." },
      { level: 9, name: "Crítico Brutal", description: "Puedes tirar un dado de daño de arma adicional cuando determinas el daño extra de un golpe crítico con un ataque cuerpo a cuerpo." },
      { level: 11, name: "Furia Implacable", description: "Si tus puntos de golpe se reducen a 0 mientras estás enfurecido y no mueres directamente, puedes hacer una tirada de salvación de Constitución CD 10. Si tienes éxito, te quedas con 1 punto de golpe." },
      { level: 15, name: "Furia Persistente", description: "Tu furia es tan feroz que termina solo si caes inconsciente o si decides terminarla." },
      { level: 18, name: "Fuerza Indómita", description: "Si el total de una prueba de Fuerza es menor que tu puntuación de Fuerza, puedes usar esa puntuación en lugar del total." },
      { level: 20, name: "Campeón Primitivo", description: "Encarnas el poder de los wilds. Tus puntuaciones de Fuerza y Constitución aumentan en 4. Tu máximo para esas puntuaciones es ahora 24." }
    ],
  },
  {
    id: "bard",
    name: "Bardo",
    description: "Un maestro de la música y la palabra que imbuye sus discursos con poder mágico.",
    image: "/images/wiki/clases/bardo.png",
    hitDie: 8,
    primaryAbility: ["cha"],
    savingThrows: ["dex", "cha"],
    proficiencies: {
      armor: ["Ligera"],
      weapons: ["Sencillas", "Ballestas de mano", "Espadas cortas", "Espadas largas", "Estoques"],
      tools: ["Tres instrumentos musicales"]
    },
    skills: ["Todas las habilidades"],
    skillChoices: 3,
    tableColumns: [
      { label: "Trucos", key: "cantrips" },
      { label: "Conjuros", key: "spells" },
      { label: "1º", key: "s1" },
      { label: "2º", key: "s2" },
      { label: "3º", key: "s3" },
      { label: "4º", key: "s4" },
      { label: "5º", key: "s5" },
      { label: "6º", key: "s6" },
      { label: "7º", key: "s7" },
      { label: "8º", key: "s8" },
      { label: "9º", key: "s9" }
    ],
    progression: [
      { level: 1, pb: 2, features: ["Inspiración Bárdica (d6)", "Lanzamiento de Conjuros"], specifics: { cantrips: "2", spells: "4", s1: "2", s2: "-", s3: "-", s4: "-", s5: "-", s6: "-", s7: "-", s8: "-", s9: "-" } },
      { level: 2, pb: 2, features: ["Aprendiz de Todo", "Canción de Descanso (d6)"], specifics: { cantrips: "2", spells: "5", s1: "3", s2: "-", s3: "-", s4: "-", s5: "-", s6: "-", s7: "-", s8: "-", s9: "-" } },
      { level: 3, pb: 2, features: ["Colegio Bárdico", "Pericia"], specifics: { cantrips: "2", spells: "6", s1: "4", s2: "2", s3: "-", s4: "-", s5: "-", s6: "-", s7: "-", s8: "-", s9: "-" } },
      { level: 4, pb: 2, features: ["Mejora de Característica"], specifics: { cantrips: "3", spells: "7", s1: "4", s2: "3", s3: "-", s4: "-", s5: "-", s6: "-", s7: "-", s8: "-", s9: "-" } },
      { level: 5, pb: 3, features: ["Inspiración Bárdica (d8)", "Fuente de Inspiración"], specifics: { cantrips: "3", spells: "8", s1: "4", s2: "3", s3: "2", s4: "-", s5: "-", s6: "-", s7: "-", s8: "-", s9: "-" } },
      { level: 6, pb: 3, features: ["Contraencanto", "Rasgo de Colegio Bárdico"], specifics: { cantrips: "3", spells: "9", s1: "4", s2: "3", s3: "3", s4: "-", s5: "-", s6: "-", s7: "-", s8: "-", s9: "-" } },
      { level: 7, pb: 3, features: ["-"], specifics: { cantrips: "3", spells: "10", s1: "4", s2: "3", s3: "3", s4: "1", s5: "-", s6: "-", s7: "-", s8: "-", s9: "-" } },
      { level: 8, pb: 3, features: ["Mejora de Característica"], specifics: { cantrips: "3", spells: "11", s1: "4", s2: "3", s3: "3", s4: "2", s5: "-", s6: "-", s7: "-", s8: "-", s9: "-" } },
      { level: 9, pb: 4, features: ["Canción de Descanso (d8)"], specifics: { cantrips: "3", spells: "12", s1: "4", s2: "3", s3: "3", s4: "3", s5: "1", s6: "-", s7: "-", s8: "-", s9: "-" } },
      { level: 10, pb: 4, features: ["Inspiración Bárdica (d10)", "Pericia", "Secretos Mágicos"], specifics: { cantrips: "4", spells: "14", s1: "4", s2: "3", s3: "3", s4: "3", s5: "2", s6: "-", s7: "-", s8: "-", s9: "-" } },
      { level: 11, pb: 4, features: ["-"], specifics: { cantrips: "4", spells: "15", s1: "4", s2: "3", s3: "3", s4: "3", s5: "2", s6: "1", s7: "-", s8: "-", s9: "-" } },
      { level: 12, pb: 4, features: ["Mejora de Característica"], specifics: { cantrips: "4", spells: "15", s1: "4", s2: "3", s3: "3", s4: "3", s5: "2", s6: "1", s7: "-", s8: "-", s9: "-" } },
      { level: 13, pb: 5, features: ["Canción de Descanso (d10)"], specifics: { cantrips: "4", spells: "16", s1: "4", s2: "3", s3: "3", s4: "3", s5: "2", s6: "1", s7: "1", s8: "-", s9: "-" } },
      { level: 14, pb: 5, features: ["Secretos Mágicos", "Rasgo de Colegio Bárdico"], specifics: { cantrips: "4", spells: "18", s1: "4", s2: "3", s3: "3", s4: "3", s5: "2", s6: "1", s7: "1", s8: "-", s9: "-" } },
      { level: 15, pb: 5, features: ["Inspiración Bárdica (d12)"], specifics: { cantrips: "4", spells: "19", s1: "4", s2: "3", s3: "3", s4: "3", s5: "2", s6: "1", s7: "1", s8: "1", s9: "-" } },
      { level: 16, pb: 5, features: ["Mejora de Característica"], specifics: { cantrips: "4", spells: "19", s1: "4", s2: "3", s3: "3", s4: "3", s5: "2", s6: "1", s7: "1", s8: "1", s9: "-" } },
      { level: 17, pb: 6, features: ["Canción de Descanso (d12)"], specifics: { cantrips: "4", spells: "20", s1: "4", s2: "3", s3: "3", s4: "3", s5: "2", s6: "1", s7: "1", s8: "1", s9: "1" } },
      { level: 18, pb: 6, features: ["Secretos Mágicos"], specifics: { cantrips: "4", spells: "22", s1: "4", s2: "3", s3: "3", s4: "3", s5: "3", s6: "1", s7: "1", s8: "1", s9: "1" } },
      { level: 19, pb: 6, features: ["Mejora de Característica"], specifics: { cantrips: "4", spells: "22", s1: "4", s2: "3", s3: "3", s4: "3", s5: "3", s6: "2", s7: "1", s8: "1", s9: "1" } },
      { level: 20, pb: 6, features: ["Inspiración Superior"], specifics: { cantrips: "4", spells: "22", s1: "4", s2: "3", s3: "3", s4: "3", s5: "3", s6: "2", s7: "2", s8: "1", s9: "1" } }
    ],
    features: [
      { level: 1, name: "Inspiración Bárdica", description: "Puedes inspirar a otros con música o palabras. Como acción adicional, elige una criatura que no seas tú a 60 pies que pueda oírte. Esa criatura gana un dado de Inspiración Bárdica (d6). Puedes hacerlo un número de veces igual a tu modificador de Carisma (mínimo 1)." },
      { level: 1, name: "Lanzamiento de Conjuros", description: "Usas Carisma como característica de lanzamiento. Conoces 4 trucos y 4 conjuros de nivel 1. Tienes 2 espacios de conjuro de nivel 1." },
      { level: 2, name: "Aprendiz de Todo", description: "Puedes añadir la mitad de tu bono de competencia (redondeado hacia abajo) a cualquier chequeo de característica que hagas que no incluya ya tu bono de competencia." },
      { level: 2, name: "Canción de Descanso", description: "Puedes usar música o oración relajante para ayudar a revitalizar a tus aliados heridos durante un descanso corto. Los aliados que te escuchen recuperan 1d6 puntos de golpe adicionales al gastar Dados de Golpe." },
      { level: 3, name: "Colegio Bárdico", description: "Eliges un colegio que moldea tu estilo: Colegio del Conocimiento o Colegio del Valor. Tu elección te otorga rasgos en los niveles 3, 6 y 14." },
      { level: 3, name: "Pericia", description: "Elige dos de tus competencias de habilidad. Tu bono de competencia se duplica para cualquier chequeo de característica que hagas que use cualquiera de las competencias elegidas." },
      { level: 4, name: "Mejora de Característica", description: "Puedes aumentar una puntuación de característica en 2, o dos puntuaciones de característica en 1. No puedes aumentar una característica por encima de 20 usando este rasgo." },
      { level: 5, name: "Fuente de Inspiración", description: "Recuperas todos los usos gastados de Inspiración Bárdica cuando terminas un descanso corto o largo." },
      { level: 6, name: "Contraencanto", description: "Como acción, puedes empezar una actuación que dura hasta el final de tu próximo turno. Durante ese tiempo, tú y cualquier criatura amistosa a 30 pies tenéis ventaja en tiradas de salvación contra ser asustado o encantado." },
      { level: 10, name: "Secretos Mágicos", description: "Has saqueado conocimiento mágico de un amplio espectro de disciplinas. Elige dos conjuros de cualquier clase. Cuentan como conjuros de bardo para ti." },
      { level: 20, name: "Inspiración Superior", description: "Cuando tiras iniciativa y no te quedan usos de Inspiración Bárdica, recuperas un uso." }
    ],
  },
  {
    id: "cleric",
    name: "Clérigo",
    description: "Un intermediario entre el mundo mortal y los planos divinos, imbuido de magia sagrada.",
    image: "/images/wiki/clases/clerigo.png",
    hitDie: 8,
    primaryAbility: ["wis"],
    savingThrows: ["wis", "cha"],
    proficiencies: {
      armor: ["Ligeras", "Medias", "Escudos"],
      weapons: ["Sencillas"],
      tools: ["Ninguna"]
    },
    skills: ["Historia", "Intuición", "Medicina", "Persuasión", "Religión"],
    skillChoices: 2,
    tableColumns: [
      { label: "Trucos", key: "cantrips" },
      { label: "1º", key: "s1" },
      { label: "2º", key: "s2" },
      { label: "3º", key: "s3" },
      { label: "4º", key: "s4" },
      { label: "5º", key: "s5" },
      { label: "6º", key: "s6" },
      { label: "7º", key: "s7" },
      { label: "8º", key: "s8" },
      { label: "9º", key: "s9" }
    ],
    progression: [
      { level: 1, pb: 2, features: ["Lanzamiento de Conjuros", "Dominio Divino"], specifics: { cantrips: "3", s1: "2", s2: "-", s3: "-", s4: "-", s5: "-", s6: "-", s7: "-", s8: "-", s9: "-" } },
      { level: 2, pb: 2, features: ["Canalizar Divinidad (1/descanso)", "Rasgo de Dominio Divino"], specifics: { cantrips: "3", s1: "3", s2: "-", s3: "-", s4: "-", s5: "-", s6: "-", s7: "-", s8: "-", s9: "-" } },
      { level: 3, pb: 2, features: ["-"], specifics: { cantrips: "3", s1: "4", s2: "2", s3: "-", s4: "-", s5: "-", s6: "-", s7: "-", s8: "-", s9: "-" } },
      { level: 4, pb: 2, features: ["Mejora de Característica"], specifics: { cantrips: "4", s1: "4", s2: "3", s3: "-", s4: "-", s5: "-", s6: "-", s7: "-", s8: "-", s9: "-" } },
      { level: 5, pb: 3, features: ["Destruir Muertos Vivientes (CR 1/2)"], specifics: { cantrips: "4", s1: "4", s2: "3", s3: "2", s4: "-", s5: "-", s6: "-", s7: "-", s8: "-", s9: "-" } },
      { level: 6, pb: 3, features: ["Canalizar Divinidad (2/descanso)", "Rasgo de Dominio Divino"], specifics: { cantrips: "4", s1: "4", s2: "3", s3: "3", s4: "-", s5: "-", s6: "-", s7: "-", s8: "-", s9: "-" } },
      { level: 7, pb: 3, features: ["-"], specifics: { cantrips: "4", s1: "4", s2: "3", s3: "3", s4: "1", s5: "-", s6: "-", s7: "-", s8: "-", s9: "-" } },
      { level: 8, pb: 3, features: ["Mejora de Característica", "Destruir Muertos Vivientes (CR 1)", "Rasgo de Dominio Divino"], specifics: { cantrips: "4", s1: "4", s2: "3", s3: "3", s4: "2", s5: "-", s6: "-", s7: "-", s8: "-", s9: "-" } },
      { level: 9, pb: 4, features: ["-"], specifics: { cantrips: "4", s1: "4", s2: "3", s3: "3", s4: "3", s5: "1", s6: "-", s7: "-", s8: "-", s9: "-" } },
      { level: 10, pb: 4, features: ["Intervención Divina"], specifics: { cantrips: "5", s1: "4", s2: "3", s3: "3", s4: "3", s5: "2", s6: "-", s7: "-", s8: "-", s9: "-" } },
      { level: 11, pb: 4, features: ["Destruir Muertos Vivientes (CR 2)"], specifics: { cantrips: "5", s1: "4", s2: "3", s3: "3", s4: "3", s5: "2", s6: "1", s7: "-", s8: "-", s9: "-" } },
      { level: 12, pb: 4, features: ["Mejora de Característica"], specifics: { cantrips: "5", s1: "4", s2: "3", s3: "3", s4: "3", s5: "2", s6: "1", s7: "-", s8: "-", s9: "-" } },
      { level: 13, pb: 5, features: ["-"], specifics: { cantrips: "5", s1: "4", s2: "3", s3: "3", s4: "3", s5: "2", s6: "1", s7: "1", s8: "-", s9: "-" } },
      { level: 14, pb: 5, features: ["Destruir Muertos Vivientes (CR 3)"], specifics: { cantrips: "5", s1: "4", s2: "3", s3: "3", s4: "3", s5: "2", s6: "1", s7: "1", s8: "-", s9: "-" } },
      { level: 15, pb: 5, features: ["-"], specifics: { cantrips: "5", s1: "4", s2: "3", s3: "3", s4: "3", s5: "2", s6: "1", s7: "1", s8: "1", s9: "-" } },
      { level: 16, pb: 5, features: ["Mejora de Característica"], specifics: { cantrips: "5", s1: "4", s2: "3", s3: "3", s4: "3", s5: "2", s6: "1", s7: "1", s8: "1", s9: "-" } },
      { level: 17, pb: 6, features: ["Destruir Muertos Vivientes (CR 4)", "Rasgo de Dominio Divino"], specifics: { cantrips: "5", s1: "4", s2: "3", s3: "3", s4: "3", s5: "2", s6: "1", s7: "1", s8: "1", s9: "1" } },
      { level: 18, pb: 6, features: ["Canalizar Divinidad (3/descanso)"], specifics: { cantrips: "5", s1: "4", s2: "3", s3: "3", s4: "3", s5: "3", s6: "1", s7: "1", s8: "1", s9: "1" } },
      { level: 19, pb: 6, features: ["Mejora de Característica"], specifics: { cantrips: "5", s1: "4", s2: "3", s3: "3", s4: "3", s5: "3", s6: "2", s7: "1", s8: "1", s9: "1" } },
      { level: 20, pb: 6, features: ["Intervención Divina Mejorada"], specifics: { cantrips: "5", s1: "4", s2: "3", s3: "3", s4: "3", s5: "3", s6: "2", s7: "2", s8: "1", s9: "1" } }
    ],
    features: [
      { level: 1, name: "Lanzamiento de Conjuros", description: "Usas Sabiduría como característica de lanzamiento. Preparas conjuros de la lista de clérigo. Conoces 3 trucos y puedes preparar un número de conjuros igual a tu modificador de Sabiduría + tu nivel de clérigo." },
      { level: 1, name: "Dominio Divino", description: "Eliges un dominio relacionado con tu deidad: Conocimiento, Engaño, Guerra, Luz, Naturaleza, Tempestad o Vida. Tu elección te otorga conjuros de dominio y rasgos en los niveles 1, 2, 6, 8 y 17." },
      { level: 2, name: "Canalizar Divinidad", description: "Ganas la capacidad de canalizar energía divina directamente de tu deidad. Comienzas con dos efectos: Expulsar Muertos Vivientes y un efecto determinado por tu dominio. Puedes usar esta característica una vez por descanso corto o largo." },
      { level: 4, name: "Mejora de Característica", description: "Puedes aumentar una puntuación de característica en 2, o dos puntuaciones de característica en 1. No puedes aumentar una característica por encima de 20 usando este rasgo." },
      { level: 5, name: "Destruir Muertos Vivientes", description: "Cuando un muerto viviente falla su tirada de salvación contra tu Expulsar Muertos Vivientes, la criatura es destruida instantáneamente si su nivel de desafío es igual o menor al umbral para tu nivel." },
      { level: 10, name: "Intervención Divina", description: "Puedes implorar a tu deidad para que intervenga en tu favor. Como acción, describe la asistencia que buscas y tira d100. Si sacas un número igual o menor a tu nivel de clérigo, tu deidad interviene." },
      { level: 20, name: "Intervención Divina Mejorada", description: "Tu llamada a la intervención divina tiene éxito automáticamente, sin necesidad de tirar dados." }
    ],
  },
  {
    id: "druid",
    name: "Druida",
    description: "Un guardián de la naturaleza que puede tomar forma de bestia y controla fuerzas elementales.",
    image: "/images/wiki/clases/druida.png",
    hitDie: 8,
    primaryAbility: ["wis"],
    savingThrows: ["int", "wis"],
    proficiencies: {
      armor: ["Ligeras", "Medias", "Escudos (sin metal)"],
      weapons: ["Bastones", "Cimitarras", "Clavas", "Dagas", "Dardos", "Hoces", "Hondas", "Jabalinas", "Lanzas", "Mazas"],
      tools: ["Kit de herboristería"]
    },
    skills: ["Arcana", "Intuición", "Medicina", "Naturaleza", "Percepción", "Religión", "Supervivencia", "Trato con animales"],
    skillChoices: 2,
    tableColumns: [
      { label: "Trucos", key: "cantrips" },
      { label: "1º", key: "s1" },
      { label: "2º", key: "s2" },
      { label: "3º", key: "s3" },
      { label: "4º", key: "s4" },
      { label: "5º", key: "s5" },
      { label: "6º", key: "s6" },
      { label: "7º", key: "s7" },
      { label: "8º", key: "s8" },
      { label: "9º", key: "s9" }
    ],
    progression: [
      { level: 1, pb: 2, features: ["Druídico", "Lanzamiento de Conjuros"], specifics: { cantrips: "2", s1: "2", s2: "-", s3: "-", s4: "-", s5: "-", s6: "-", s7: "-", s8: "-", s9: "-" } },
      { level: 2, pb: 2, features: ["Forma Salvaje", "Círculo Druídico"], specifics: { cantrips: "2", s1: "3", s2: "-", s3: "-", s4: "-", s5: "-", s6: "-", s7: "-", s8: "-", s9: "-" } },
      { level: 3, pb: 2, features: ["-"], specifics: { cantrips: "2", s1: "4", s2: "2", s3: "-", s4: "-", s5: "-", s6: "-", s7: "-", s8: "-", s9: "-" } },
      { level: 4, pb: 2, features: ["Forma Salvaje (mejora)", "Mejora de Característica"], specifics: { cantrips: "3", s1: "4", s2: "3", s3: "-", s4: "-", s5: "-", s6: "-", s7: "-", s8: "-", s9: "-" } },
      { level: 5, pb: 3, features: ["-"], specifics: { cantrips: "3", s1: "4", s2: "3", s3: "2", s4: "-", s5: "-", s6: "-", s7: "-", s8: "-", s9: "-" } },
      { level: 6, pb: 3, features: ["Rasgo de Círculo Druídico"], specifics: { cantrips: "3", s1: "4", s2: "3", s3: "3", s4: "-", s5: "-", s6: "-", s7: "-", s8: "-", s9: "-" } },
      { level: 7, pb: 3, features: ["-"], specifics: { cantrips: "3", s1: "4", s2: "3", s3: "3", s4: "1", s5: "-", s6: "-", s7: "-", s8: "-", s9: "-" } },
      { level: 8, pb: 3, features: ["Forma Salvaje (mejora)", "Mejora de Característica"], specifics: { cantrips: "3", s1: "4", s2: "3", s3: "3", s4: "2", s5: "-", s6: "-", s7: "-", s8: "-", s9: "-" } },
      { level: 9, pb: 4, features: ["-"], specifics: { cantrips: "3", s1: "4", s2: "3", s3: "3", s4: "3", s5: "1", s6: "-", s7: "-", s8: "-", s9: "-" } },
      { level: 10, pb: 4, features: ["Rasgo de Círculo Druídico"], specifics: { cantrips: "4", s1: "4", s2: "3", s3: "3", s4: "3", s5: "2", s6: "-", s7: "-", s8: "-", s9: "-" } },
      { level: 11, pb: 4, features: ["-"], specifics: { cantrips: "4", s1: "4", s2: "3", s3: "3", s4: "3", s5: "2", s6: "1", s7: "-", s8: "-", s9: "-" } },
      { level: 12, pb: 4, features: ["Mejora de Característica"], specifics: { cantrips: "4", s1: "4", s2: "3", s3: "3", s4: "3", s5: "2", s6: "1", s7: "-", s8: "-", s9: "-" } },
      { level: 13, pb: 5, features: ["-"], specifics: { cantrips: "4", s1: "4", s2: "3", s3: "3", s4: "3", s5: "2", s6: "1", s7: "1", s8: "-", s9: "-" } },
      { level: 14, pb: 5, features: ["Rasgo de Círculo Druídico"], specifics: { cantrips: "4", s1: "4", s2: "3", s3: "3", s4: "3", s5: "2", s6: "1", s7: "1", s8: "-", s9: "-" } },
      { level: 15, pb: 5, features: ["-"], specifics: { cantrips: "4", s1: "4", s2: "3", s3: "3", s4: "3", s5: "2", s6: "1", s7: "1", s8: "1", s9: "-" } },
      { level: 16, pb: 5, features: ["Mejora de Característica"], specifics: { cantrips: "4", s1: "4", s2: "3", s3: "3", s4: "3", s5: "2", s6: "1", s7: "1", s8: "1", s9: "-" } },
      { level: 17, pb: 6, features: ["-"], specifics: { cantrips: "4", s1: "4", s2: "3", s3: "3", s4: "3", s5: "2", s6: "1", s7: "1", s8: "1", s9: "1" } },
      { level: 18, pb: 6, features: ["Cuerpo Atemporal", "Magia de la Naturaleza (Forma de Bestia)"], specifics: { cantrips: "4", s1: "4", s2: "3", s3: "3", s4: "3", s5: "3", s6: "1", s7: "1", s8: "1", s9: "1" } },
      { level: 19, pb: 6, features: ["Mejora de Característica"], specifics: { cantrips: "4", s1: "4", s2: "3", s3: "3", s4: "3", s5: "3", s6: "2", s7: "1", s8: "1", s9: "1" } },
      { level: 20, pb: 6, features: ["Archidruida"], specifics: { cantrips: "4", s1: "4", s2: "3", s3: "3", s4: "3", s5: "3", s6: "2", s7: "2", s8: "1", s9: "1" } }
    ],
    features: [
      { level: 1, name: "Druídico", description: "Conoces el Druídico, el lenguaje secreto de los druidas. Puedes hablar el idioma y usarlo para dejar mensajes ocultos." },
      { level: 1, name: "Lanzamiento de Conjuros", description: "Usas Sabiduría como característica de lanzamiento. Conoces 2 trucos y preparas conjuros de la lista de druida. Puedes preparar un número de conjuros igual a tu modificador de Sabiduría + tu nivel de druida." },
      { level: 2, name: "Forma Salvaje", description: "Puedes transformarte mágicamente en una bestia que hayas visto antes. Puedes usar esta característica dos veces por descanso corto o largo." },
      { level: 2, name: "Círculo Druídico", description: "Eliges identificarte con un círculo de druidas: Círculo de la Luna o Círculo de la Tierra. Tu elección te otorga rasgos en los niveles 2, 6, 10 y 14." },
      { level: 4, name: "Mejora de Característica", description: "Puedes aumentar una puntuación de característica en 2, o dos puntuaciones de característica en 1. No puedes aumentar una característica por encima de 20 usando este rasgo." },
      { level: 4, name: "Mejora de Forma Salvaje", description: "Puedes usar tu acción para gastar un espacio de conjuro y recuperar 1d8 puntos de golpe por cada nivel del espacio de conjuro gastado mientras estás en Forma Salvaje." },
      { level: 18, name: "Cuerpo Atemporal", description: "La magia primaria que manejas hace que envejezcas más lentamente. Por cada 10 años que pasen, tu cuerpo envejece solo 1 año." },
      { level: 18, name: "Magia de la Naturaleza", description: "Puedes lanzar muchos de tus conjuros de druida en cualquier forma que asumas usando Forma Salvaje." },
      { level: 20, name: "Archidruida", description: "Puedes usar tu Forma Salvaje un número ilimitado de veces." }
    ],
  },
  {
    id: "fighter",
    name: "Guerrero",
    description: "Un maestro del combate marcial, experto con una gran variedad de armas y armaduras.",
    image: "/images/wiki/clases/guerrero.png",
    hitDie: 10,
    primaryAbility: ["str", "dex"],
    savingThrows: ["str", "con"],
    proficiencies: {
      armor: ["Todas las armaduras", "Escudos"],
      weapons: ["Sencillas", "Marciales"],
      tools: ["Ninguna"]
    },
    skills: ["Acrobacias", "Atletismo", "Historia", "Intimidación", "Intuición", "Percepción", "Supervivencia", "Trato con animales"],
    skillChoices: 2,
    tableColumns: [
    ],
    progression: [
      { level: 1, pb: 2, features: ["Estilo de Combate", "Recuperar Aliento"], specifics: {} },
      { level: 2, pb: 2, features: ["Oleada de Acción (1 uso)"], specifics: {} },
      { level: 3, pb: 2, features: ["Arquetipo Marcial"], specifics: {} },
      { level: 4, pb: 2, features: ["Mejora de Característica"], specifics: {} },
      { level: 5, pb: 3, features: ["Ataque Extra"], specifics: {} },
      { level: 6, pb: 3, features: ["Mejora de Característica"], specifics: {} },
      { level: 7, pb: 3, features: ["Rasgo de Arquetipo Marcial"], specifics: {} },
      { level: 8, pb: 3, features: ["Mejora de Característica"], specifics: {} },
      { level: 9, pb: 4, features: ["Indomable (1 uso)"], specifics: {} },
      { level: 10, pb: 4, features: ["Rasgo de Arquetipo Marcial"], specifics: {} },
      { level: 11, pb: 4, features: ["Ataque Extra (2)"], specifics: {} },
      { level: 12, pb: 4, features: ["Mejora de Característica"], specifics: {} },
      { level: 13, pb: 5, features: ["Indomable (2 usos)"], specifics: {} },
      { level: 14, pb: 5, features: ["Mejora de Característica"], specifics: {} },
      { level: 15, pb: 5, features: ["Rasgo de Arquetipo Marcial"], specifics: {} },
      { level: 16, pb: 5, features: ["Mejora de Característica"], specifics: {} },
      { level: 17, pb: 6, features: ["Oleada de Acción (2 usos)", "Indomable (3 usos)"], specifics: {} },
      { level: 18, pb: 6, features: ["Rasgo de Arquetipo Marcial"], specifics: {} },
      { level: 19, pb: 6, features: ["Mejora de Característica"], specifics: {} },
      { level: 20, pb: 6, features: ["Ataque Extra (3)"], specifics: {} }
    ],
    features: [
      { level: 1, name: "Estilo de Combate", description: "Adoptas un estilo particular de combate como especialidad: Arquería, Defensa, Duelo, Combate con Armas a Dos Manos, Protección o Combate con Dos Armas." },
      { level: 1, name: "Recuperar Aliento", description: "Puedes usar una acción adicional para recuperar puntos de golpe iguales a 1d10 + tu nivel de guerrero. Una vez que uses esta característica, debes terminar un descanso corto o largo antes de poder usarla de nuevo." },
      { level: 2, name: "Oleada de Acción", description: "Puedes esforzarte más allá de tus límites normales por un momento. En tu turno, puedes realizar una acción adicional además de tu acción normal y posible acción adicional. Puedes usar esta característica una vez por descanso corto o largo." },
      { level: 3, name: "Arquetipo Marcial", description: "Eliges un arquetipo que te esfuerzas por emular: Campeón, Maestro de Batalla o Caballero Arcano. Tu elección te otorga rasgos en los niveles 3, 7, 10, 15 y 18." },
      { level: 4, name: "Mejora de Característica", description: "Puedes aumentar una puntuación de característica en 2, o dos puntuaciones de característica en 1. No puedes aumentar una característica por encima de 20 usando este rasgo." },
      { level: 5, name: "Ataque Extra", description: "Puedes atacar dos veces, en lugar de una, cuando realizas la acción de Ataque en tu turno." },
      { level: 6, name: "Mejora de Característica", description: "Puedes aumentar una puntuación de característica en 2, o dos puntuaciones de característica en 1. No puedes aumentar una característica por encima de 20." },
      { level: 7, name: "Rasgo de Arquetipo Marcial", description: "Ganas un rasgo dependiente de tu arquetipo marcial seleccionado." },
      { level: 8, name: "Mejora de Característica", description: "Puedes aumentar una puntuación de característica en 2, o dos puntuaciones de característica en 1." },
      { level: 9, name: "Indomable", description: "Puedes repetir una tirada de salvación que falles. Debes usar la nueva tirada. No puedes usar esta característica de nuevo hasta terminar un descanso largo." },
      { level: 10, name: "Rasgo de Arquetipo Marcial", description: "Ganas un rasgo dependiente de tu arquetipo marcial seleccionado." },
      { level: 11, name: "Ataque Extra (2)", description: "Puedes atacar tres veces, en lugar de dos, cuando realizas la acción de Ataque en tu turno." },
      { level: 12, name: "Mejora de Característica", description: "Puedes aumentar una puntuación de característica en 2, o dos puntuaciones de característica en 1." },
      { level: 13, name: "Indomable (2 usos)", description: "Puedes usar tu rasgo Indomable dos veces entre descansos largos." },
      { level: 14, name: "Mejora de Característica", description: "Puedes aumentar una puntuación de característica en 2, o dos puntuaciones de característica en 1." },
      { level: 15, name: "Rasgo de Arquetipo Marcial", description: "Ganas un rasgo dependiente de tu arquetipo marcial seleccionado." },
      { level: 16, name: "Mejora de Característica", description: "Puedes aumentar una puntuación de característica en 2, o dos puntuaciones de característica en 1." },
      { level: 17, name: "Oleada de Acción (2 usos)", description: "Puedes usar Oleada de Acción dos veces antes de un descanso, pero solo una vez por turno." },
      { level: 17, name: "Indomable (3 usos)", description: "Puedes usar tu rasgo Indomable tres veces entre descansos largos." },
      { level: 18, name: "Rasgo de Arquetipo Marcial", description: "Ganas un rasgo dependiente de tu arquetipo marcial seleccionado." },
      { level: 19, name: "Mejora de Característica", description: "Puedes aumentar una puntuación de característica en 2, o dos puntuaciones de característica en 1." },
      { level: 20, name: "Ataque Extra (3)", description: "Puedes atacar cuatro veces, en lugar de tres, cuando realizas la acción de Ataque en tu turno." }
    ],
  },
  {
    id: "monk",
    name: "Monje",
    description: "Un maestro de las artes marciales que utiliza la energía Ki para potenciar su cuerpo.",
    image: "/images/wiki/clases/monje.png",
    hitDie: 8,
    primaryAbility: ["dex", "wis"],
    savingThrows: ["str", "dex"],
    proficiencies: {
      armor: ["Ninguna"],
      weapons: ["Sencillas", "Espadas cortas"],
      tools: ["Un tipo de herramienta de artesano o instrumento"]
    },
    skills: ["Acrobacias", "Atletismo", "Historia", "Intuición", "Religión", "Sigilo"],
    skillChoices: 2,
    tableColumns: [
      { label: "Artes Marciales", key: "martialArts" },
      { label: "Puntos de Ki", key: "ki" },
      { label: "Movimiento", key: "movement" }
    ],
    progression: [
      { level: 1, pb: 2, features: ["Defensa sin Armadura", "Artes Marciales"], specifics: { martialArts: "1d4", ki: "-", movement: "-" } },
      { level: 2, pb: 2, features: ["Ki", "Movimiento sin Armadura"], specifics: { martialArts: "1d4", ki: "2", movement: "+10 pies" } },
      { level: 3, pb: 2, features: ["Tradición Monástica", "Desviar Proyectiles"], specifics: { martialArts: "1d4", ki: "3", movement: "+10 pies" } },
      { level: 4, pb: 2, features: ["Mejora de Característica", "Caída Lenta"], specifics: { martialArts: "1d4", ki: "4", movement: "+10 pies" } },
      { level: 5, pb: 3, features: ["Ataque Extra", "Golpe Aturdidor"], specifics: { martialArts: "1d6", ki: "5", movement: "+10 pies" } },
      { level: 6, pb: 3, features: ["Golpes Potenciados por Ki", "Rasgo de Tradición Monástica"], specifics: { martialArts: "1d6", ki: "6", movement: "+15 pies" } },
      { level: 7, pb: 3, features: ["Evasión", "Quietud de la Mente"], specifics: { martialArts: "1d6", ki: "7", movement: "+15 pies" } },
      { level: 8, pb: 3, features: ["Mejora de Característica"], specifics: { martialArts: "1d6", ki: "8", movement: "+15 pies" } },
      { level: 9, pb: 4, features: ["Mejora de Movimiento sin Armadura"], specifics: { martialArts: "1d6", ki: "9", movement: "+15 pies" } },
      { level: 10, pb: 4, features: ["Pureza del Cuerpo"], specifics: { martialArts: "1d6", ki: "10", movement: "+20 pies" } },
      { level: 11, pb: 4, features: ["Rasgo de Tradición Monástica"], specifics: { martialArts: "1d8", ki: "11", movement: "+20 pies" } },
      { level: 12, pb: 4, features: ["Mejora de Característica"], specifics: { martialArts: "1d8", ki: "12", movement: "+20 pies" } },
      { level: 13, pb: 5, features: ["Lengua del Sol y la Luna"], specifics: { martialArts: "1d8", ki: "13", movement: "+20 pies" } },
      { level: 14, pb: 5, features: ["Alma de Diamante"], specifics: { martialArts: "1d8", ki: "14", movement: "+25 pies" } },
      { level: 15, pb: 5, features: ["Cuerpo Atemporal"], specifics: { martialArts: "1d8", ki: "15", movement: "+25 pies" } },
      { level: 16, pb: 5, features: ["Mejora de Característica"], specifics: { martialArts: "1d8", ki: "16", movement: "+25 pies" } },
      { level: 17, pb: 6, features: ["Rasgo de Tradición Monástica"], specifics: { martialArts: "1d10", ki: "17", movement: "+25 pies" } },
      { level: 18, pb: 6, features: ["Cuerpo Vacío"], specifics: { martialArts: "1d10", ki: "18", movement: "+30 pies" } },
      { level: 19, pb: 6, features: ["Mejora de Característica"], specifics: { martialArts: "1d10", ki: "19", movement: "+30 pies" } },
      { level: 20, pb: 6, features: ["Perfección del Alma"], specifics: { martialArts: "1d10", ki: "20", movement: "+30 pies" } }
    ],
    features: [
      { level: 1, name: "Defensa sin Armadura", description: "Mientras no lleves armadura ni escudo, tu Clase de Armadura es igual a 10 + modificador de Destreza + modificador de Sabiduría." },
      { level: 1, name: "Artes Marciales", description: "Ganas beneficios al usar ataques sin armas o armas de monje. Puedes usar Destreza en lugar de Fuerza, y tirar un d4 en lugar del daño normal. Puedes hacer un ataque sin armas como acción adicional." },
      { level: 2, name: "Ki", description: "Tienes 2 puntos de Ki para usar poderes especiales: Ráfaga de Golpes, Defensa Paciente y Paso del Viento. Recuperas puntos gastados tras un descanso corto o largo." },
      { level: 2, name: "Movimiento sin Armadura", description: "Tu velocidad aumenta en 10 pies mientras no lleves armadura ni escudo." },
      { level: 3, name: "Tradición Monástica", description: "Te comprometes con una tradición monástica: Camino de la Mano Abierta, Camino de la Sombra o Camino de los Cuatro Elementos." },
      { level: 3, name: "Desviar Proyectiles", description: "Puedes usar tu reacción para desviar o atrapar el proyectil cuando eres golpeado por un ataque de arma a distancia." },
      { level: 4, name: "Mejora de Característica", description: "Puedes aumentar una puntuación de característica en 2, o dos puntuaciones de característica en 1. No puedes aumentar una característica por encima de 20 usando este rasgo." },
      { level: 4, name: "Caída Lenta", description: "Puedes usar tu reacción cuando caes para reducir el daño de caída en una cantidad igual a 5 veces tu nivel de monje." },
      { level: 5, name: "Ataque Extra", description: "Puedes atacar dos veces, en lugar de una, cuando realizas la acción de Ataque en tu turno." },
      { level: 5, name: "Golpe Aturdidor", description: "Puedes interferir con el flujo de ki en el cuerpo de un oponente. Cuando golpeas a otra criatura con un ataque de arma cuerpo a cuerpo, puedes gastar 1 punto de ki para intentar aturdir al objetivo." },
      { level: 6, name: "Golpes Potenciados por Ki", description: "Tus ataques sin armas cuentan como mágicos para superar resistencias e inmunidades." },
      { level: 7, name: "Evasión", description: "Cuando te sometes a un efecto que te permite hacer una tirada de salvación de Destreza para recibir solo la mitad del daño, en su lugar no recibes daño si tienes éxito, y solo la mitad si fallas." },
      { level: 7, name: "Quietud de la Mente", description: "Puedes usar tu acción para terminar un efecto en ti mismo que te esté causando estar encantado o asustado." },
      { level: 10, name: "Pureza del Cuerpo", description: "Tu maestría del ki te hace inmune a enfermedades y veneno." },
      { level: 13, name: "Lengua del Sol y la Luna", description: "Entiendes todos los idiomas hablados. Además, cualquier criatura que pueda entender un idioma puede entender lo que dices." },
      { level: 14, name: "Alma de Diamante", description: "Tu maestría del ki te otorga competencia en todas las tiradas de salvación." },
      { level: 15, name: "Cuerpo Atemporal", description: "No sufres ninguna de las debilidades de la vejez, y no puedes ser envejecido mágicamente. Sin embargo, aún puedes morir de viejo." },
      { level: 18, name: "Cuerpo Vacío", description: "Puedes usar tu acción y 4 puntos de ki para volverte invisible durante 1 minuto. Tienes resistencia a todo el daño excepto daño de fuerza." },
      { level: 20, name: "Perfección del Alma", description: "Cuando tiras iniciativa y no te quedan puntos de ki, recuperas 4 puntos de ki." }
    ],
  },
  {
    id: "paladin",
    name: "Paladín",
    description: "Un guerrero sagrado ligado a un juramento inquebrantable.",
    image: "/images/wiki/clases/paladin.png",
    hitDie: 10,
    primaryAbility: ["str", "cha"],
    savingThrows: ["wis", "cha"],
    proficiencies: {
      armor: ["Todas", "Escudos"],
      weapons: ["Sencillas", "Marciales"],
      tools: ["Ninguna"]
    },
    skills: ["Atletismo", "Intimidación", "Medicina", "Persuasión", "Intuición", "Religión"],
    skillChoices: 2,
    tableColumns: [
      { label: "1º", key: "s1" },
      { label: "2º", key: "s2" },
      { label: "3º", key: "s3" },
      { label: "4º", key: "s4" },
      { label: "5º", key: "s5" }
    ],
    progression: [
      { level: 1, pb: 2, features: ["Sentido Divino", "Imponer Manos"], specifics: { s1: "-", s2: "-", s3: "-", s4: "-", s5: "-" } },
      { level: 2, pb: 2, features: ["Estilo de Combate", "Lanzamiento de Conjuros", "Castigo Divino"], specifics: { s1: "2", s2: "-", s3: "-", s4: "-", s5: "-" } },
      { level: 3, pb: 2, features: ["Salud Divina", "Juramento Sagrado"], specifics: { s1: "3", s2: "-", s3: "-", s4: "-", s5: "-" } },
      { level: 4, pb: 2, features: ["Mejora de Característica"], specifics: { s1: "3", s2: "-", s3: "-", s4: "-", s5: "-" } },
      { level: 5, pb: 3, features: ["Ataque Extra"], specifics: { s1: "4", s2: "2", s3: "-", s4: "-", s5: "-" } },
      { level: 6, pb: 3, features: ["Aura de Protección"], specifics: { s1: "4", s2: "2", s3: "-", s4: "-", s5: "-" } },
      { level: 7, pb: 3, features: ["Rasgo de Juramento Sagrado"], specifics: { s1: "4", s2: "3", s3: "-", s4: "-", s5: "-" } },
      { level: 8, pb: 3, features: ["Mejora de Característica"], specifics: { s1: "4", s2: "3", s3: "-", s4: "-", s5: "-" } },
      { level: 9, pb: 4, features: ["-"], specifics: { s1: "4", s2: "3", s3: "2", s4: "-", s5: "-" } },
      { level: 10, pb: 4, features: ["Aura de Coraje"], specifics: { s1: "4", s2: "3", s3: "2", s4: "-", s5: "-" } },
      { level: 11, pb: 4, features: ["Castigo Divino Mejorado"], specifics: { s1: "4", s2: "3", s3: "3", s4: "-", s5: "-" } },
      { level: 12, pb: 4, features: ["Mejora de Característica"], specifics: { s1: "4", s2: "3", s3: "3", s4: "-", s5: "-" } },
      { level: 13, pb: 5, features: ["-"], specifics: { s1: "4", s2: "3", s3: "3", s4: "1", s5: "-" } },
      { level: 14, pb: 5, features: ["Toque Purificador"], specifics: { s1: "4", s2: "3", s3: "3", s4: "1", s5: "-" } },
      { level: 15, pb: 5, features: ["Rasgo de Juramento Sagrado"], specifics: { s1: "4", s2: "3", s3: "3", s4: "2", s5: "-" } },
      { level: 16, pb: 5, features: ["Mejora de Característica"], specifics: { s1: "4", s2: "3", s3: "3", s4: "2", s5: "-" } },
      { level: 17, pb: 6, features: ["-"], specifics: { s1: "4", s2: "3", s3: "3", s4: "3", s5: "1" } },
      { level: 18, pb: 6, features: ["Mejoras de Aura"], specifics: { s1: "4", s2: "3", s3: "3", s4: "3", s5: "1" } },
      { level: 19, pb: 6, features: ["Mejora de Característica"], specifics: { s1: "4", s2: "3", s3: "3", s4: "3", s5: "2" } },
      { level: 20, pb: 6, features: ["Rasgo de Juramento Sagrado"], specifics: { s1: "4", s2: "3", s3: "3", s4: "3", s5: "2" } }
    ],
    features: [
      { level: 1, name: "Sentido Divino", description: "La presencia de fuerte maldad se registra en tus sentidos como un olor nocivo, y el bien poderoso suena como música celestial. Como acción, puedes detectar tales fuerzas." },
      { level: 1, name: "Imponer Manos", description: "Tienes una reserva de poder curativo que se reabastece cuando tomas un descanso largo. Con esa reserva, puedes restaurar un total de puntos de golpe igual a tu nivel de paladín x 5." },
      { level: 2, name: "Estilo de Combate", description: "Adoptas un estilo particular de combate como especialidad: Defensa, Duelo, Combate con Armas a Dos Manos o Protección." },
      { level: 2, name: "Lanzamiento de Conjuros", description: "Usas Carisma como característica de lanzamiento. Preparas conjuros de la lista de paladín." },
      { level: 2, name: "Castigo Divino", description: "Cuando golpeas a una criatura con un ataque de arma cuerpo a cuerpo, puedes gastar un espacio de conjuro para infligir daño radiante al objetivo, además del daño del arma." },
      { level: 3, name: "Salud Divina", description: "La magia divina que fluye a través de ti te hace inmune a enfermedades." },
      { level: 3, name: "Juramento Sagrado", description: "Haces un juramento que te vincula como paladín para siempre: Juramento de Devoción, Juramento de los Antiguos o Juramento de Venganza." },
      { level: 4, name: "Mejora de Característica", description: "Puedes aumentar una puntuación de característica en 2, o dos puntuaciones de característica en 1. No puedes aumentar una característica por encima de 20 usando este rasgo." },
      { level: 5, name: "Ataque Extra", description: "Puedes atacar dos veces, en lugar de una, cuando realizas la acción de Ataque en tu turno." },
      { level: 6, name: "Aura de Protección", description: "Siempre que tú o una criatura amistosa a 10 pies de ti debáis hacer una tirada de salvación, la criatura gana un bonificador a la tirada igual a tu modificador de Carisma." },
      { level: 10, name: "Aura de Coraje", description: "Tú y las criaturas amistosas a 10 pies de ti no podéis ser asustados mientras estés consciente." },
      { level: 11, name: "Castigo Divino Mejorado", description: "Estás tan imbuido de rectitud que todos tus ataques cuerpo a cuerpo portan poder divino. Tus ataques con armas cuerpo a cuerpo infligen 1d8 de daño radiante adicional." },
      { level: 14, name: "Toque Purificador", description: "Puedes usar tu acción para terminar un conjuro en ti mismo o en una criatura dispuesta que toques. Puedes usar este rasgo un número de veces igual a tu modificador de Carisma." }
    ],
  },
  {
    id: "ranger",
    name: "Explorador",
    description: "Un cazador experto y rastreador que protege las fronteras de la civilización.",
    image: "/images/wiki/clases/explorador.png",
    hitDie: 10,
    primaryAbility: ["dex", "wis"],
    savingThrows: ["str", "dex"],
    proficiencies: {
      armor: ["Ligeras", "Medias", "Escudos"],
      weapons: ["Sencillas", "Marciales"],
      tools: ["Ninguna"]
    },
    skills: ["Atletismo", "Investigación", "Naturaleza", "Percepción", "Intuición", "Sigilo", "Supervivencia", "Trato con animales"],
    skillChoices: 3,
    tableColumns: [
      { label: "Conjuros", key: "spells" },
      { label: "1º", key: "s1" },
      { label: "2º", key: "s2" },
      { label: "3º", key: "s3" },
      { label: "4º", key: "s4" },
      { label: "5º", key: "s5" }
    ],
    progression: [
      { level: 1, pb: 2, features: ["Enemigo Predilecto", "Explorador Natural"], specifics: { spells: "-", s1: "-", s2: "-", s3: "-", s4: "-", s5: "-" } },
      { level: 2, pb: 2, features: ["Estilo de Combate", "Lanzamiento de Conjuros"], specifics: { spells: "2", s1: "2", s2: "-", s3: "-", s4: "-", s5: "-" } },
      { level: 3, pb: 2, features: ["Arquetipo de Explorador", "Consciencia Primitiva"], specifics: { spells: "3", s1: "3", s2: "-", s3: "-", s4: "-", s5: "-" } },
      { level: 4, pb: 2, features: ["Mejora de Característica"], specifics: { spells: "3", s1: "3", s2: "-", s3: "-", s4: "-", s5: "-" } },
      { level: 5, pb: 3, features: ["Ataque Extra"], specifics: { spells: "4", s1: "4", s2: "2", s3: "-", s4: "-", s5: "-" } },
      { level: 6, pb: 3, features: ["Mejora de Enemigo Predilecto", "Mejora de Explorador Natural"], specifics: { spells: "4", s1: "4", s2: "2", s3: "-", s4: "-", s5: "-" } },
      { level: 7, pb: 3, features: ["Rasgo de Arquetipo de Explorador"], specifics: { spells: "5", s1: "4", s2: "3", s3: "-", s4: "-", s5: "-" } },
      { level: 8, pb: 3, features: ["Mejora de Característica", "Paso de la Tierra"], specifics: { spells: "5", s1: "4", s2: "3", s3: "-", s4: "-", s5: "-" } },
      { level: 9, pb: 4, features: ["-"], specifics: { spells: "6", s1: "4", s2: "3", s3: "2", s4: "-", s5: "-" } },
      { level: 10, pb: 4, features: ["Mejora de Explorador Natural", "Esconderse a Plena Vista"], specifics: { spells: "6", s1: "4", s2: "3", s3: "2", s4: "-", s5: "-" } },
      { level: 11, pb: 4, features: ["Rasgo de Arquetipo de Explorador"], specifics: { spells: "7", s1: "4", s2: "3", s3: "3", s4: "-", s5: "-" } },
      { level: 12, pb: 4, features: ["Mejora de Característica"], specifics: { spells: "7", s1: "4", s2: "3", s3: "3", s4: "-", s5: "-" } },
      { level: 13, pb: 5, features: ["-"], specifics: { spells: "8", s1: "4", s2: "3", s3: "3", s4: "1", s5: "-" } },
      { level: 14, pb: 5, features: ["Mejora de Enemigo Predilecto", "Desaparecer"], specifics: { spells: "8", s1: "4", s2: "3", s3: "3", s4: "1", s5: "-" } },
      { level: 15, pb: 5, features: ["Rasgo de Arquetipo de Explorador"], specifics: { spells: "9", s1: "4", s2: "3", s3: "3", s4: "2", s5: "-" } },
      { level: 16, pb: 5, features: ["Mejora de Característica"], specifics: { spells: "9", s1: "4", s2: "3", s3: "3", s4: "2", s5: "-" } },
      { level: 17, pb: 6, features: ["-"], specifics: { spells: "10", s1: "4", s2: "3", s3: "3", s4: "3", s5: "1" } },
      { level: 18, pb: 6, features: ["Sentidos Salvajes"], specifics: { spells: "10", s1: "4", s2: "3", s3: "3", s4: "3", s5: "1" } },
      { level: 19, pb: 6, features: ["Mejora de Característica"], specifics: { spells: "11", s1: "4", s2: "3", s3: "3", s4: "3", s5: "2" } },
      { level: 20, pb: 6, features: ["Cazador de Enemigos"], specifics: { spells: "11", s1: "4", s2: "3", s3: "3", s4: "3", s5: "2" } }
    ],
    features: [
      { level: 1, name: "Enemigo Predilecto", description: "Tienes ventaja en chequeos de Sabiduría (Supervivencia) para rastrear a tus enemigos predilectos, así como en chequeos de Inteligencia para recordar información sobre ellos." },
      { level: 1, name: "Explorador Natural", description: "Eres particularmente familiar con un tipo de entorno natural y eres hábil en viajar y sobrevivir en tales regiones. Eliges un tipo de terreno predilecto: ártico, costa, desierto, bosque, pradera, montaña, pantano o Infraoscuridad." },
      { level: 2, name: "Estilo de Combate", description: "Adoptas un estilo particular de combate como especialidad: Arquería, Defensa, Duelo o Combate con Dos Armas." },
      { level: 2, name: "Lanzamiento de Conjuros", description: "Aprendes a usar la esencia mágica de la naturaleza para lanzar conjuros. Usas Sabiduría como característica de lanzamiento. Conoces 2 conjuros de nivel 1 de la lista de explorador." },
      { level: 3, name: "Arquetipo de Explorador", description: "Eliges un arquetipo que te esfuerzas por emular: Cazador o Maestro de Bestias. Tu elección te otorga rasgos en los niveles 3, 7, 11 y 15." },
      { level: 3, name: "Consciencia Primitiva", description: "Puedes usar tu acción y gastar un espacio de conjuro de explorador para enfocar tu consciencia en la región que te rodea. Detectas tipos de criaturas a 1 milla." },
      { level: 4, name: "Mejora de Característica", description: "Puedes aumentar una puntuación de característica en 2, o dos puntuaciones de característica en 1. No puedes aumentar una característica por encima de 20 usando este rasgo." },
      { level: 5, name: "Ataque Extra", description: "Puedes atacar dos veces, en lugar de una, cuando realizas la acción de Ataque en tu turno." },
      { level: 8, name: "Paso de la Tierra", description: "Moverte a través de terreno difícil no mágico no te cuesta movimiento extra. También puedes pasar a través de plantas no mágicas sin ser frenado o tomar daño si tienen espinas." },
      { level: 10, name: "Esconderse a Plena Vista", description: "Puedes pasar 1 minuto creando camuflaje para ti mismo. Tienes +10 a Sigilo siempre y cuando permanezcas quieto." },
      { level: 14, name: "Desaparecer", description: "Puedes usar la acción de Esconderse como acción adicional en tu turno. Además, no puedes ser rastreado por medios no mágicos." },
      { level: 18, name: "Sentidos Salvajes", description: "Ganas sentidos preternaturales que te ayudan a luchar contra criaturas que no puedes ver. Cuando atacas a una criatura que no puedes ver, tu incapacidad para verla no te impone desventaja en tus tiradas de ataque contra ella." },
      { level: 20, name: "Cazador de Enemigos", description: "Te conviertes en un cazador sin igual de tus enemigos. Una vez en cada uno de tus turnos, puedes añadir tu modificador de Sabiduría a la tirada de ataque o daño de un ataque que hagas contra uno de tus enemigos predilectos." }
    ],
  },
  {
    id: "rogue",
    name: "Pícaro",
    description: "Un especialista ingenioso que usa el sigilo y la astucia para superar obstáculos y enemigos.",
    image: "/images/wiki/clases/picaro.png",
    hitDie: 8,
    primaryAbility: ["dex"],
    savingThrows: ["dex", "int"],
    proficiencies: {
      armor: ["Ligeras"],
      weapons: ["Sencillas", "Ballestas de mano", "Espadas largas", "Roperas", "Espadas cortas"],
      tools: ["Herramientas de ladrón"]
    },
    skills: ["Acrobacias", "Atletismo", "Engaño", "Intimidación", "Intuición", "Investigación", "Percepción", "Persuasión", "Prestidigitación", "Sigilo", "Interpretación"],
    skillChoices: 4,
    tableColumns: [
      { label: "Ataque Furtivo", key: "sneakAttack" }
    ],
    progression: [
      { level: 1, pb: 2, features: ["Pericia", "Ataque Furtivo", "Jerga de Ladrones"], specifics: { sneakAttack: "1d6" } },
      { level: 2, pb: 2, features: ["Acción Astuta"], specifics: { sneakAttack: "1d6" } },
      { level: 3, pb: 2, features: ["Arquetipo de Pícaro"], specifics: { sneakAttack: "2d6" } },
      { level: 4, pb: 2, features: ["Mejora de Característica"], specifics: { sneakAttack: "2d6" } },
      { level: 5, pb: 3, features: ["Esquiva Asombrosa"], specifics: { sneakAttack: "3d6" } },
      { level: 6, pb: 3, features: ["Pericia"], specifics: { sneakAttack: "3d6" } },
      { level: 7, pb: 3, features: ["Evasión"], specifics: { sneakAttack: "4d6" } },
      { level: 8, pb: 3, features: ["Mejora de Característica"], specifics: { sneakAttack: "4d6" } },
      { level: 9, pb: 4, features: ["Rasgo de Arquetipo de Pícaro"], specifics: { sneakAttack: "5d6" } },
      { level: 10, pb: 4, features: ["Mejora de Característica"], specifics: { sneakAttack: "5d6" } },
      { level: 11, pb: 4, features: ["Talento Confiable"], specifics: { sneakAttack: "6d6" } },
      { level: 12, pb: 4, features: ["Mejora de Característica"], specifics: { sneakAttack: "6d6" } },
      { level: 13, pb: 5, features: ["Rasgo de Arquetipo de Pícaro"], specifics: { sneakAttack: "7d6" } },
      { level: 14, pb: 5, features: ["Sentido Ciego"], specifics: { sneakAttack: "7d6" } },
      { level: 15, pb: 5, features: ["Mente Escurridiza"], specifics: { sneakAttack: "8d6" } },
      { level: 16, pb: 5, features: ["Mejora de Característica"], specifics: { sneakAttack: "8d6" } },
      { level: 17, pb: 6, features: ["Rasgo de Arquetipo de Pícaro"], specifics: { sneakAttack: "9d6" } },
      { level: 18, pb: 6, features: ["Escurridizo"], specifics: { sneakAttack: "9d6" } },
      { level: 19, pb: 6, features: ["Mejora de Característica"], specifics: { sneakAttack: "10d6" } },
      { level: 20, pb: 6, features: ["Golpe de Suerte"], specifics: { sneakAttack: "10d6" } }
    ],
    features: [
      { level: 1, name: "Pericia", description: "Elige dos de tus competencias de habilidad, o una de tus competencias de habilidad y tu competencia con herramientas de ladrón. Tu bono de competencia se duplica para cualquier chequeo de característica que hagas que use cualquiera de las competencias elegidas." },
      { level: 1, name: "Ataque Furtivo", description: "Sabes cómo golpear sutilmente y explotar la distracción de un enemigo. Una vez por turno, puedes infligir 1d6 de daño extra a una criatura que golpees con un ataque si tienes ventaja en la tirada de ataque. El ataque debe usar un arma de sutileza o a distancia." },
      { level: 1, name: "Jerga de Ladrones", description: "Conoces la jerga de ladrones, una mezcla secreta de dialecto, jerga y código que te permite ocultar mensajes en conversaciones aparentemente normales." },
      { level: 2, name: "Acción Astuta", description: "Tu pensamiento rápido y agilidad te permiten moverte y actuar rápidamente. Puedes realizar una acción adicional en cada uno de tus turnos en combate. Esta acción puede usarse solo para Correr, Desengancharse o Esconderse." },
      { level: 3, name: "Arquetipo de Pícaro", description: "Eliges un arquetipo que emulas en el ejercicio de tus habilidades de pícaro: Ladrón, Asesino o Embaucador Arcano. Tu elección te otorga rasgos en los niveles 3, 9, 13 y 17." },
      { level: 4, name: "Mejora de Característica", description: "Puedes aumentar una puntuación de característica en 2, o dos puntuaciones de característica en 1. No puedes aumentar una característica por encima de 20 usando este rasgo." },
      { level: 5, name: "Esquiva Asombrosa", description: "Cuando un atacante que puedes ver te golpea con un ataque, puedes usar tu reacción para reducir a la mitad el daño del ataque contra ti." },
      { level: 7, name: "Evasión", description: "Cuando te sometes a un efecto que te permite hacer una tirada de salvación de Destreza para recibir solo la mitad del daño, en su lugar no recibes daño si tienes éxito, y solo la mitad si fallas." },
      { level: 11, name: "Talento Confiable", description: "Has refinado tus habilidades elegidas hasta casi la perfección. Cada vez que hagas un chequeo de característica que te permita añadir tu bono de competencia, puedes tratar un d20 de 9 o menos como un 10." },
      { level: 14, name: "Sentido Ciego", description: "Si puedes oír, eres consciente de la ubicación de cualquier criatura escondida o invisible a 10 pies de ti." },
      { level: 15, name: "Mente Escurridiza", description: "Has adquirido una fuerza mental mayor. Ganas competencia en tiradas de salvación de Sabiduría." },
      { level: 18, name: "Escurridizo", description: "Eres tan evasivo que a los atacantes raramente les da tiempo a golpear. Ninguna tirada de ataque tiene ventaja contra ti mientras no estés incapacitado." },
      { level: 20, name: "Golpe de Suerte", description: "Tienes un don asombroso para tener éxito cuando lo necesitas. Si tu ataque falla un objetivo dentro del alcance, puedes convertir el fallo en un golpe. Alternativamente, si fallas un chequeo de característica, puedes tratar el d20 como un 20." }
    ],
  },
  {
    id: "sorcerer",
    name: "Hechicero",
    description: "Un usuario de magia con un talento innato conferido por un linaje exótico.",
    image: "/images/wiki/clases/hechicero.png",
    hitDie: 6,
    primaryAbility: ["cha"],
    savingThrows: ["con", "cha"],
    proficiencies: {
      armor: ["Ninguna"],
      weapons: ["Dagas", "Dardos", "Hondas", "Bastones", "Ballestas ligeras"],
      tools: ["Ninguna"]
    },
    skills: ["Arcana", "Engaño", "Intimidación", "Intuición", "Persuasión", "Religión"],
    skillChoices: 2,
    tableColumns: [
      { label: "Trucos", key: "cantrips" },
      { label: "Conjuros", key: "spells" },
      { label: "Pts Hechicería", key: "sorceryPoints" },
      { label: "1º", key: "s1" },
      { label: "2º", key: "s2" },
      { label: "3º", key: "s3" },
      { label: "4º", key: "s4" },
      { label: "5º", key: "s5" },
      { label: "6º", key: "s6" },
      { label: "7º", key: "s7" },
      { label: "8º", key: "s8" },
      { label: "9º", key: "s9" }
    ],
    progression: [
      { level: 1, pb: 2, features: ["Lanzamiento de Conjuros", "Origen Sortílego"], specifics: { cantrips: "4", spells: "2", sorceryPoints: "-", s1: "2", s2: "-", s3: "-", s4: "-", s5: "-", s6: "-", s7: "-", s8: "-", s9: "-" } },
      { level: 2, pb: 2, features: ["Fuente de Magia"], specifics: { cantrips: "4", spells: "3", sorceryPoints: "2", s1: "3", s2: "-", s3: "-", s4: "-", s5: "-", s6: "-", s7: "-", s8: "-", s9: "-" } },
      { level: 3, pb: 2, features: ["Metamagia"], specifics: { cantrips: "4", spells: "4", sorceryPoints: "3", s1: "4", s2: "2", s3: "-", s4: "-", s5: "-", s6: "-", s7: "-", s8: "-", s9: "-" } },
      { level: 4, pb: 2, features: ["Mejora de Característica"], specifics: { cantrips: "5", spells: "5", sorceryPoints: "4", s1: "4", s2: "3", s3: "-", s4: "-", s5: "-", s6: "-", s7: "-", s8: "-", s9: "-" } },
      { level: 5, pb: 3, features: ["-"], specifics: { cantrips: "5", spells: "6", sorceryPoints: "5", s1: "4", s2: "3", s3: "2", s4: "-", s5: "-", s6: "-", s7: "-", s8: "-", s9: "-" } },
      { level: 6, pb: 3, features: ["Rasgo de Origen Sortílego"], specifics: { cantrips: "5", spells: "7", sorceryPoints: "6", s1: "4", s2: "3", s3: "3", s4: "-", s5: "-", s6: "-", s7: "-", s8: "-", s9: "-" } },
      { level: 7, pb: 3, features: ["-"], specifics: { cantrips: "5", spells: "8", sorceryPoints: "7", s1: "4", s2: "3", s3: "3", s4: "1", s5: "-", s6: "-", s7: "-", s8: "-", s9: "-" } },
      { level: 8, pb: 3, features: ["Mejora de Característica"], specifics: { cantrips: "5", spells: "9", sorceryPoints: "8", s1: "4", s2: "3", s3: "3", s4: "2", s5: "-", s6: "-", s7: "-", s8: "-", s9: "-" } },
      { level: 9, pb: 4, features: ["-"], specifics: { cantrips: "5", spells: "10", sorceryPoints: "9", s1: "4", s2: "3", s3: "3", s4: "3", s5: "1", s6: "-", s7: "-", s8: "-", s9: "-" } },
      { level: 10, pb: 4, features: ["Metamagia"], specifics: { cantrips: "6", spells: "11", sorceryPoints: "10", s1: "4", s2: "3", s3: "3", s4: "3", s5: "2", s6: "-", s7: "-", s8: "-", s9: "-" } },
      { level: 11, pb: 4, features: ["-"], specifics: { cantrips: "6", spells: "12", sorceryPoints: "11", s1: "4", s2: "3", s3: "3", s4: "3", s5: "2", s6: "1", s7: "-", s8: "-", s9: "-" } },
      { level: 12, pb: 4, features: ["Mejora de Característica"], specifics: { cantrips: "6", spells: "12", sorceryPoints: "12", s1: "4", s2: "3", s3: "3", s4: "3", s5: "2", s6: "1", s7: "-", s8: "-", s9: "-" } },
      { level: 13, pb: 5, features: ["-"], specifics: { cantrips: "6", spells: "13", sorceryPoints: "13", s1: "4", s2: "3", s3: "3", s4: "3", s5: "2", s6: "1", s7: "1", s8: "-", s9: "-" } },
      { level: 14, pb: 5, features: ["Rasgo de Origen Sortílego"], specifics: { cantrips: "6", spells: "13", sorceryPoints: "14", s1: "4", s2: "3", s3: "3", s4: "3", s5: "2", s6: "1", s7: "1", s8: "-", s9: "-" } },
      { level: 15, pb: 5, features: ["-"], specifics: { cantrips: "6", spells: "14", sorceryPoints: "15", s1: "4", s2: "3", s3: "3", s4: "3", s5: "2", s6: "1", s7: "1", s8: "1", s9: "-" } },
      { level: 16, pb: 5, features: ["Mejora de Característica"], specifics: { cantrips: "6", spells: "14", sorceryPoints: "16", s1: "4", s2: "3", s3: "3", s4: "3", s5: "2", s6: "1", s7: "1", s8: "1", s9: "-" } },
      { level: 17, pb: 6, features: ["Metamagia"], specifics: { cantrips: "6", spells: "15", sorceryPoints: "17", s1: "4", s2: "3", s3: "3", s4: "3", s5: "2", s6: "1", s7: "1", s8: "1", s9: "1" } },
      { level: 18, pb: 6, features: ["Rasgo de Origen Sortílego"], specifics: { cantrips: "6", spells: "15", sorceryPoints: "18", s1: "4", s2: "3", s3: "3", s4: "3", s5: "3", s6: "1", s7: "1", s8: "1", s9: "1" } },
      { level: 19, pb: 6, features: ["Mejora de Característica"], specifics: { cantrips: "6", spells: "15", sorceryPoints: "19", s1: "4", s2: "3", s3: "3", s4: "3", s5: "3", s6: "2", s7: "1", s8: "1", s9: "1" } },
      { level: 20, pb: 6, features: ["Restauración Sortílega"], specifics: { cantrips: "6", spells: "15", sorceryPoints: "20", s1: "4", s2: "3", s3: "3", s4: "3", s5: "3", s6: "2", s7: "2", s8: "1", s9: "1" } }
    ],
    features: [
      { level: 1, name: "Origen Sortílego", description: "Eliges un origen sortílego que explica la fuente de tu poder mágico innato: Linaje Dracónico o Magia Salvaje. Tu elección te otorga rasgos en los niveles 1, 6, 14 y 18." },
      { level: 1, name: "Lanzamiento de Conjuros", description: "Usas Carisma como característica de lanzamiento. Conoces 4 trucos y 2 conjuros de nivel 1. Tienes 2 espacios de conjuro de nivel 1." },
      { level: 2, name: "Fuente de Magia", description: "Tienes 2 puntos de hechicería, una representación de tu poder mágico innato. Puedes transformar puntos de hechicería en espacios de conjuro y viceversa." },
      { level: 3, name: "Metamagia", description: "Ganas la capacidad de torcer tus conjuros para adaptarlos a tus necesidades. Ganas dos opciones de Metamagia de tu elección: Conjuro Cuidadoso, Conjuro Distante, Conjuro Potenciado, Conjuro Extendido, Conjuro Acelerado, Conjuro Sutil o Conjuro Gemelo." },
      { level: 4, name: "Mejora de Característica", description: "Puedes aumentar una puntuación de característica en 2, o dos puntuaciones de característica en 1. No puedes aumentar una característica por encima de 20 usando este rasgo." },
      { level: 20, name: "Restauración Sortílega", description: "Recuperas 4 puntos de hechicería gastados cuando terminas un descanso corto." }
    ],
  },
  {
    id: "warlock",
    name: "Brujo",
    description: "Un buscador de conocimiento que hace un pacto con un ser de poder sobrenatural.",
    image: "/images/wiki/clases/brujo.png",
    hitDie: 8,
    primaryAbility: ["cha"],
    savingThrows: ["wis", "cha"],
    proficiencies: {
      armor: ["Ligera"],
      weapons: ["Sencillas"],
      tools: ["Ninguna"]
    },
    skills: ["Arcana", "Engaño", "Historia", "Intimidación", "Investigación", "Naturaleza", "Religión"],
    skillChoices: 2,
    tableColumns: [
      { label: "Trucos", key: "cantrips" },
      { label: "Conjuros", key: "spells" },
      { label: "Espacios", key: "slots" },
      { label: "Nivel Espacio", key: "slotLevel" },
      { label: "Invocaciones", key: "invocations" }
    ],
    progression: [
      { level: 1, pb: 2, features: ["Patrón de Otro Mundo", "Magia de Pacto"], specifics: { cantrips: "2", spells: "2", slots: "1", slotLevel: "1º", invocations: "-" } },
      { level: 2, pb: 2, features: ["Invocaciones Místicas"], specifics: { cantrips: "2", spells: "3", slots: "2", slotLevel: "1º", invocations: "2" } },
      { level: 3, pb: 2, features: ["Don del Pacto"], specifics: { cantrips: "2", spells: "4", slots: "2", slotLevel: "2º", invocations: "2" } },
      { level: 4, pb: 2, features: ["Mejora de Característica"], specifics: { cantrips: "3", spells: "5", slots: "2", slotLevel: "2º", invocations: "2" } },
      { level: 5, pb: 3, features: ["-"], specifics: { cantrips: "3", spells: "6", slots: "2", slotLevel: "3º", invocations: "3" } },
      { level: 6, pb: 3, features: ["Rasgo de Patrón de Otro Mundo"], specifics: { cantrips: "3", spells: "7", slots: "2", slotLevel: "3º", invocations: "3" } },
      { level: 7, pb: 3, features: ["-"], specifics: { cantrips: "3", spells: "8", slots: "2", slotLevel: "4º", invocations: "4" } },
      { level: 8, pb: 3, features: ["Mejora de Característica"], specifics: { cantrips: "3", spells: "9", slots: "2", slotLevel: "4º", invocations: "4" } },
      { level: 9, pb: 4, features: ["-"], specifics: { cantrips: "3", spells: "10", slots: "2", slotLevel: "5º", invocations: "5" } },
      { level: 10, pb: 4, features: ["Rasgo de Patrón de Otro Mundo"], specifics: { cantrips: "4", spells: "10", slots: "2", slotLevel: "5º", invocations: "5" } },
      { level: 11, pb: 4, features: ["Arcanum Místico (nivel 6)"], specifics: { cantrips: "4", spells: "11", slots: "3", slotLevel: "5º", invocations: "5" } },
      { level: 12, pb: 4, features: ["Mejora de Característica"], specifics: { cantrips: "4", spells: "11", slots: "3", slotLevel: "5º", invocations: "6" } },
      { level: 13, pb: 5, features: ["Arcanum Místico (nivel 7)"], specifics: { cantrips: "4", spells: "12", slots: "3", slotLevel: "5º", invocations: "6" } },
      { level: 14, pb: 5, features: ["Rasgo de Patrón de Otro Mundo"], specifics: { cantrips: "4", spells: "12", slots: "3", slotLevel: "5º", invocations: "6" } },
      { level: 15, pb: 5, features: ["Arcanum Místico (nivel 8)"], specifics: { cantrips: "4", spells: "13", slots: "3", slotLevel: "5º", invocations: "7" } },
      { level: 16, pb: 5, features: ["Mejora de Característica"], specifics: { cantrips: "4", spells: "13", slots: "3", slotLevel: "5º", invocations: "7" } },
      { level: 17, pb: 6, features: ["Arcanum Místico (nivel 9)"], specifics: { cantrips: "4", spells: "14", slots: "4", slotLevel: "5º", invocations: "7" } },
      { level: 18, pb: 6, features: ["-"], specifics: { cantrips: "4", spells: "14", slots: "4", slotLevel: "5º", invocations: "8" } },
      { level: 19, pb: 6, features: ["Mejora de Característica"], specifics: { cantrips: "4", spells: "15", slots: "4", slotLevel: "5º", invocations: "8" } },
      { level: 20, pb: 6, features: ["Maestro del Saber Sobrenatural"], specifics: { cantrips: "4", spells: "15", slots: "4", slotLevel: "5º", invocations: "8" } }
    ],
    features: [
      { level: 1, name: "Patrón de Otro Mundo", description: "Has hecho un pacto con un ser de otro mundo de tu elección: el Archidemonio, el Archihada o el Gran Antiguo. Tu elección te otorga rasgos en los niveles 1, 6, 10 y 14." },
      { level: 1, name: "Magia de Pacto", description: "Tu investigación arcana y la magia otorgada por tu patrón te han dado facilidad con los conjuros. Usas Carisma como característica de lanzamiento. Conoces 2 trucos y 2 conjuros de nivel 1. Tienes 1 espacio de conjuro de nivel 1 que se recupera en descanso corto." },
      { level: 2, name: "Invocaciones Místicas", description: "En tu estudio del conocimiento oculto, has desenterrado invocaciones místicas, fragmentos de conocimiento prohibido que te infunden con habilidad mágica permanente. Ganas dos invocaciones místicas de tu elección." },
      { level: 3, name: "Don del Pacto", description: "Tu patrón de otro mundo te otorga un regalo por tu leal servicio. Ganas uno de los siguientes rasgos de tu elección: Pacto de la Cadena, Pacto de la Hoja o Pacto del Tomo." },
      { level: 4, name: "Mejora de Característica", description: "Puedes aumentar una puntuación de característica en 2, o dos puntuaciones de característica en 1. No puedes aumentar una característica por encima de 20 usando este rasgo." },
      { level: 11, name: "Arcanum Místico", description: "Tu patrón te otorga un secreto mágico llamado arcanum. Elige un conjuro de brujo de nivel 6. Puedes lanzar tu conjuro de arcanum una vez sin gastar un espacio de conjuro. Debes terminar un descanso largo antes de poder hacerlo de nuevo. Ganas arcanums adicionales en niveles superiores." },
      { level: 20, name: "Maestro del Saber Sobrenatural", description: "Puedes implorar a tu patrón para recuperar espacios de conjuro gastados. Puedes pasar 1 minuto implorando para recuperar todos tus espacios de conjuro de Magia de Pacto." }
    ],
  },
  {
    id: "wizard",
    name: "Mago",
    description: "Un usuario de magia erudito que manipula las estructuras de la realidad.",
    image: "/images/wiki/clases/mago.png",
    hitDie: 6,
    primaryAbility: ["int"],
    savingThrows: ["int", "wis"],
    proficiencies: {
      armor: ["Ninguna"],
      weapons: ["Dagas", "Dardos", "Hondas", "Bastones", "Ballestas ligeras"],
      tools: ["Ninguna"]
    },
    skills: ["Arcana", "Historia", "Intuición", "Investigación", "Medicina", "Religión"],
    skillChoices: 2,
    tableColumns: [
      { label: "Trucos", key: "cantrips" },
      { label: "1º", key: "s1" },
      { label: "2º", key: "s2" },
      { label: "3º", key: "s3" },
      { label: "4º", key: "s4" },
      { label: "5º", key: "s5" },
      { label: "6º", key: "s6" },
      { label: "7º", key: "s7" },
      { label: "8º", key: "s8" },
      { label: "9º", key: "s9" }
    ],
    progression: [
      { level: 1, pb: 2, features: ["Lanzamiento de Conjuros", "Recuperación Arcana"], specifics: { cantrips: "3", s1: "2", s2: "-", s3: "-", s4: "-", s5: "-", s6: "-", s7: "-", s8: "-", s9: "-" } },
      { level: 2, pb: 2, features: ["Tradición Arcana"], specifics: { cantrips: "3", s1: "3", s2: "-", s3: "-", s4: "-", s5: "-", s6: "-", s7: "-", s8: "-", s9: "-" } },
      { level: 3, pb: 2, features: ["-"], specifics: { cantrips: "3", s1: "4", s2: "2", s3: "-", s4: "-", s5: "-", s6: "-", s7: "-", s8: "-", s9: "-" } },
      { level: 4, pb: 2, features: ["Mejora de Característica"], specifics: { cantrips: "4", s1: "4", s2: "3", s3: "-", s4: "-", s5: "-", s6: "-", s7: "-", s8: "-", s9: "-" } },
      { level: 5, pb: 3, features: ["-"], specifics: { cantrips: "4", s1: "4", s2: "3", s3: "2", s4: "-", s5: "-", s6: "-", s7: "-", s8: "-", s9: "-" } },
      { level: 6, pb: 3, features: ["Rasgo de Tradición Arcana"], specifics: { cantrips: "4", s1: "4", s2: "3", s3: "3", s4: "-", s5: "-", s6: "-", s7: "-", s8: "-", s9: "-" } },
      { level: 7, pb: 3, features: ["-"], specifics: { cantrips: "4", s1: "4", s2: "3", s3: "3", s4: "1", s5: "-", s6: "-", s7: "-", s8: "-", s9: "-" } },
      { level: 8, pb: 3, features: ["Mejora de Característica"], specifics: { cantrips: "4", s1: "4", s2: "3", s3: "3", s4: "2", s5: "-", s6: "-", s7: "-", s8: "-", s9: "-" } },
      { level: 9, pb: 4, features: ["-"], specifics: { cantrips: "4", s1: "4", s2: "3", s3: "3", s4: "3", s5: "1", s6: "-", s7: "-", s8: "-", s9: "-" } },
      { level: 10, pb: 4, features: ["Rasgo de Tradición Arcana"], specifics: { cantrips: "5", s1: "4", s2: "3", s3: "3", s4: "3", s5: "2", s6: "-", s7: "-", s8: "-", s9: "-" } },
      { level: 11, pb: 4, features: ["-"], specifics: { cantrips: "5", s1: "4", s2: "3", s3: "3", s4: "3", s5: "2", s6: "1", s7: "-", s8: "-", s9: "-" } },
      { level: 12, pb: 4, features: ["Mejora de Característica"], specifics: { cantrips: "5", s1: "4", s2: "3", s3: "3", s4: "3", s5: "2", s6: "1", s7: "-", s8: "-", s9: "-" } },
      { level: 13, pb: 5, features: ["-"], specifics: { cantrips: "5", s1: "4", s2: "3", s3: "3", s4: "3", s5: "2", s6: "1", s7: "1", s8: "-", s9: "-" } },
      { level: 14, pb: 5, features: ["Rasgo de Tradición Arcana"], specifics: { cantrips: "5", s1: "4", s2: "3", s3: "3", s4: "3", s5: "2", s6: "1", s7: "1", s8: "-", s9: "-" } },
      { level: 15, pb: 5, features: ["-"], specifics: { cantrips: "5", s1: "4", s2: "3", s3: "3", s4: "3", s5: "2", s6: "1", s7: "1", s8: "1", s9: "-" } },
      { level: 16, pb: 5, features: ["Mejora de Característica"], specifics: { cantrips: "5", s1: "4", s2: "3", s3: "3", s4: "3", s5: "2", s6: "1", s7: "1", s8: "1", s9: "-" } },
      { level: 17, pb: 6, features: ["-"], specifics: { cantrips: "5", s1: "4", s2: "3", s3: "3", s4: "3", s5: "2", s6: "1", s7: "1", s8: "1", s9: "1" } },
      { level: 18, pb: 6, features: ["Dominio de Conjuros"], specifics: { cantrips: "5", s1: "4", s2: "3", s3: "3", s4: "3", s5: "3", s6: "1", s7: "1", s8: "1", s9: "1" } },
      { level: 19, pb: 6, features: ["Mejora de Característica"], specifics: { cantrips: "5", s1: "4", s2: "3", s3: "3", s4: "3", s5: "3", s6: "2", s7: "1", s8: "1", s9: "1" } },
      { level: 20, pb: 6, features: ["Conjuros Signatura"], specifics: { cantrips: "5", s1: "4", s2: "3", s3: "3", s4: "3", s5: "3", s6: "2", s7: "2", s8: "1", s9: "1" } }
    ],
    features: [
      { level: 1, name: "Lanzamiento de Conjuros", description: "Tienes un libro de conjuros que contiene conjuros que muestran los primeros destellos de tu verdadero poder. Usas Inteligencia como característica de lanzamiento. Preparas conjuros de tu libro." },
      { level: 1, name: "Recuperación Arcana", description: "Has aprendido a recuperar algo de tu energía mágica estudiando tu libro de conjuros. Una vez por día cuando terminas un descanso corto, puedes elegir espacios de conjuro gastados para recuperar." },
      { level: 2, name: "Tradición Arcana", description: "Eliges una tradición arcana: Escuela de Abjuración, Escuela de Conjuración, Escuela de Adivinación, Escuela de Encantamiento, Escuela de Evocación, Escuela de Ilusión, Escuela de Nigromancia o Escuela de Transmutación. Tu elección te otorga rasgos en los niveles 2, 6, 10 y 14." },
      { level: 4, name: "Mejora de Característica", description: "Puedes aumentar una puntuación de característica en 2, o dos puntuaciones de característica en 1. No puedes aumentar una característica por encima de 20 usando este rasgo." },
      { level: 18, name: "Dominio de Conjuros", description: "Has alcanzado tal maestría sobre ciertos conjuros que puedes lanzarlos a voluntad. Elige un conjuro de nivel 1 y uno de nivel 2. Puedes lanzarlos en su nivel más bajo sin gastar un espacio de conjuro." },
      { level: 20, name: "Conjuros Signatura", description: "Ganas maestría sobre dos poderosos conjuros y puedes lanzarlos con poco esfuerzo. Elige dos conjuros de nivel 3 como tus conjuros signatura. Siempre los tienes preparados y puedes lanzarlos una vez cada uno en nivel 3 sin gastar un espacio de conjuro." }
    ],
  },
]

export const backgrounds: Background[] = [
  {
    id: "acolyte",
    name: "Acólito",
    description: "Serviste en un templo como intermediario entre lo mortal y lo divino.",
    skillProficiencies: ["Intuición", "Religión"],
    languages: 2,
    feature: "Refugio de los fieles",
    featureDescription: "Tú y tus compañeros podéis recibir curación y cuidado gratuito en templos de vuestra fe."
  },
  {
    id: "charlatan",
    name: "Charlatán",
    description: "Sabes cómo manipular a la gente y deleitarla, ocultando tus verdaderas intenciones.",
    skillProficiencies: ["Engaño", "Juego de Manos"],
    toolProficiencies: ["Kit de disfraz", "Kit de falsificación"],
    feature: "Identidad Falsa",
    featureDescription: "Tienes una segunda identidad establecida, incluyendo documentación, conocidos y disfraces."
  },
  {
    id: "criminal",
    name: "Criminal",
    description: "Tienes un historial de actividades ilegales y contactos en el bajo mundo.",
    skillProficiencies: ["Engaño", "Sigilo"],
    toolProficiencies: ["Herramientas de ladrón", "Un tipo de juego"],
    feature: "Contacto criminal",
    featureDescription: "Tienes un contacto fiable que actúa como enlace con una red de criminales."
  },
  {
    id: "entertainer",
    name: "Animador",
    description: "Prosperas frente a una audiencia con tu talento para el espectáculo.",
    skillProficiencies: ["Acrobacias", "Interpretación"],
    toolProficiencies: ["Kit de disfraz", "Un instrumento musical"],
    feature: "Por demanda popular",
    featureDescription: "Siempre puedes encontrar un lugar para actuar, usualmente en una taberna o circo, donde recibirás comida y alojamiento gratis."
  },
  {
    id: "folk-hero",
    name: "Héroe del pueblo",
    description: "Eres un campeón del pueblo común, surgido de la gente humilde.",
    skillProficiencies: ["Supervivencia", "Trato con animales"],
    toolProficiencies: ["Herramientas de artesano", "Vehículos terrestres"],
    feature: "Hospitalidad rústica",
    featureDescription: "Puedes encontrar refugio y ayuda entre la gente común, quienes te protegerán de las autoridades."
  },
  {
    id: "guild-artisan",
    name: "Artesano Gremial",
    description: "Eres miembro de un gremio de artesanos, hábil en la creación de objetos de valor.",
    skillProficiencies: ["Intuición", "Persuasión"],
    toolProficiencies: ["Herramientas de artesano"],
    languages: 1,
    feature: "Membresía Gremial",
    featureDescription: "El gremio te apoya, ofreciendo alojamiento y comida si es necesario, y defensa legal si se requiere."
  },
  {
    id: "hermit",
    name: "Ermitaño",
    description: "Viviste en reclusión, ya sea en una comunidad protegida o completamente solo.",
    skillProficiencies: ["Medicina", "Religión"],
    toolProficiencies: ["Kit de herboristería"],
    languages: 1,
    feature: "Descubrimiento",
    featureDescription: "El tiempo en soledad te dio acceso a un descubrimiento único y poderoso o una gran verdad."
  },
  {
    id: "noble",
    name: "Noble",
    description: "Naciste en una familia de riqueza, poder e influencia.",
    skillProficiencies: ["Historia", "Persuasión"],
    toolProficiencies: ["Un tipo de juego"],
    languages: 1,
    feature: "Posición de privilegio",
    featureDescription: "Gracias a tu linaje, eres bienvenido en la alta sociedad y la gente asume que tienes derecho a estar donde estés."
  },
  {
    id: "outlander",
    name: "Forastero",
    description: "Creciste lejos de la civilización, en tierras salvajes.",
    skillProficiencies: ["Atletismo", "Supervivencia"],
    toolProficiencies: ["Un instrumento musical"],
    languages: 1,
    feature: "Vagabundo",
    featureDescription: "Tienes un excelente mapa mental y puedes encontrar comida y agua fresca para ti y otras cinco personas cada día."
  },
  {
    id: "sage",
    name: "Sabio",
    description: "Pasaste años estudiando el conocimiento del multiverso.",
    skillProficiencies: ["Arcana", "Historia"],
    languages: 2,
    feature: "Investigador",
    featureDescription: "Cuando intentas aprender o recordar algo de información, si no lo sabes, a menudo sabes dónde encontrarlo."
  },
  {
    id: "sailor",
    name: "Marinero",
    description: "Navegaste por años en un barco de altura, enfrentando tormentas y monstruos.",
    skillProficiencies: ["Atletismo", "Percepción"],
    toolProficiencies: ["Herramientas de navegante", "Vehículos acuáticos"],
    feature: "Pasaje de Barco",
    featureDescription: "Puedes asegurar pasaje gratuito en un barco para ti y tus compañeros a cambio de trabajo."
  },
  {
    id: "soldier",
    name: "Soldado",
    description: "Fuiste parte de una fuerza militar, entrenado para la guerra.",
    skillProficiencies: ["Atletismo", "Intimidación"],
    toolProficiencies: ["Un tipo de juego", "Vehículos terrestres"],
    feature: "Rango militar",
    featureDescription: "Tienes el respeto de los soldados y puedes usar tu rango para influir en militares y requisar equipo básico."
  },
  {
    id: "urchin",
    name: "Huérfano",
    description: "Creciste en las calles, solo, pobre y huérfano.",
    skillProficiencies: ["Juego de Manos", "Sigilo"],
    toolProficiencies: ["Kit de disfraz", "Herramientas de ladrón"],
    feature: "Secretos de la Ciudad",
    featureDescription: "Conoces los patrones secretos y el flujo de las ciudades y puedes encontrar pasajes que otros perderían."
  },
]

export const abilities = [
  { id: "str", name: "Fuerza", shortName: "FUE", description: "Poder físico y capacidad atlética" },
  { id: "dex", name: "Destreza", shortName: "DES", description: "Agilidad, reflejos y equilibrio" },
  { id: "con", name: "Constitución", shortName: "CON", description: "Salud, resistencia y vitalidad" },
  { id: "int", name: "Inteligencia", shortName: "INT", description: "Razonamiento y memoria" },
  { id: "wis", name: "Sabiduría", shortName: "SAB", description: "Percepción e intuición" },
  { id: "cha", name: "Carisma", shortName: "CAR", description: "Fuerza de personalidad" },
]

export function calculateModifier(score: number): number {
  return Math.floor((score - 10) / 2)
}

export function formatModifier(mod: number): string {
  return mod >= 0 ? `+${mod}` : `${mod}`
}
