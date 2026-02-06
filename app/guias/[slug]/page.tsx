import React from "react"
import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { 
  ArrowLeft, 
  BookOpen, 
  Users, 
  ShoppingCart, 
  ChevronRight,
  Dices,
  Swords,
  Brain,
  Heart,
  Eye,
  MessageSquare,
  Move,
  Shield,
  Zap,
  Skull,
  Scroll
} from "lucide-react"

// Guide content data
const guidesContent: Record<string, {
  title: string
  description: string
  image: string
  category: string
  difficulty: string
  content: React.ReactNode
}> = {
  "creacion-personaje-2024": {
    title: "Creación de Personaje (Reglas 2024)",
    description: "Guía completa y literal paso a paso para crear tu personaje de D&D usando las reglas de 2024, incluyendo Multiclase y Avance.",
    image: "/dnd_guide_character_creation_1768855969961.png",
    category: "Personajes",
    difficulty: "Principiante",
    content: (
      <>
        <section className="prose-section">
          <h2 className="font-serif text-3xl font-bold text-primary flex items-center gap-3">
            <Users className="h-8 w-8" /> Creando un Personaje
          </h2>
          <p className="text-muted-foreground leading-relaxed mt-4">
            Tu primer paso al jugar un aventurero en el juego Dungeons & Dragons es imaginar y crear un personaje propio. Tu personaje es una combinación de estadísticas de juego, ganchos para el juego de rol y tu imaginación. Tú eliges una clase (como luchador o mago), un trasfondo (como marinero o acólito) y una especie (como humano o elfo). También inventas la personalidad y apariencia de tu personaje. Una vez completado, tu personaje sirve como tu representante en el juego, tu avatar en el multiverso de D&D.
          </p>
        </section>

        <section className="prose-section mt-10">
          <h2 id="preparate" className="font-serif text-2xl font-bold text-foreground">Prepárate</h2>
          <p className="mt-4 text-muted-foreground">
            Antes de sumergirte en la creación del personaje, hay algunas cosas que hacer para prepararte.
          </p>
          <div className="mt-6 space-y-4">
             <div className="p-4 rounded-xl border border-white/10 bg-white/5">
              <h4 className="font-semibold text-foreground">Habla con tu DM</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Comienza hablando con tu Dungeon Master sobre el tipo de juego de D&D que jugarán. Si el DM extrae inspiración de la mitología griega, podrías querer jugar un personaje diferente a si el DM está planeando una campaña de intriga política.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-white/10 bg-white/5">
              <h4 className="font-semibold text-foreground">Elige una Hoja de Personaje</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Necesitarás una hoja de personaje para registrar todos los detalles de tu personaje. Puedes usar una hoja oficial, una digital como D&D Beyond o simplemente papel y lápiz.
              </p>
            </div>
          </div>
        </section>

        <section className="prose-section mt-10">
          <h2 id="paso-1" className="font-serif text-2xl font-bold text-foreground">Paso 1: Elige una Clase</h2>
          <p className="mt-4 text-muted-foreground">
            Elige una clase y escríbela en tu hoja de personaje. La clase define en términos generales la vocación de tu personaje, qué talentos especiales posee y las tácticas que es más probable que emplee.
          </p>
          
          <h3 className="text-lg font-semibold text-foreground mt-6">Un Grupo Equilibrado</h3>
          <p className="text-sm text-muted-foreground mt-2">
            El grupo clásico de D&D comprende un Clérigo, un Guerrero, un Pícaro y un Mago. Esas cuatro clases aportan una mezcla equilibrada de capacidades. Puedes usar esa configuración o modificarla:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-muted-foreground text-sm">
             <li><strong>Clérigo:</strong> Reemplazar con Bardo o Druida</li>
             <li><strong>Guerrero:</strong> Reemplazar con Bárbaro, Monje, Paladín o Explorador</li>
             <li><strong>Pícaro:</strong> Reemplazar con Bardo o Explorador</li>
             <li><strong>Mago:</strong> Reemplazar con Bardo, Hechicero o Brujo</li>
          </ul>

          <h3 className="text-lg font-semibold text-foreground mt-6">Escribe tu Nivel</h3>
          <p className="text-sm text-muted-foreground mt-2">
             Típicamente, un personaje comienza en nivel 1 y avanza ganando Puntos de Experiencia (XP). Un personaje de nivel 1 tiene 0 XP. Si tu DM te inicia en un nivel superior (nivel 3+), escribe también tu subclase.
          </p>

          <h3 className="text-lg font-semibold text-foreground mt-6">Anota el Entrenamiento con Armaduras</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Tu clase puede darte entrenamiento con ciertas categorías de armadura. Anótalo en tu hoja. El entrenamiento significa que puedes usar esa armadura eficazmente y ganar sus bonos defensivos.
          </p>
        </section>

        <section className="prose-section mt-10">
          <h2 id="paso-2" className="font-serif text-2xl font-bold text-foreground">Paso 2: Determina el Origen</h2>
          <p className="mt-4 text-muted-foreground">
             Determinar el origen de tu personaje implica elegir un trasfondo, una especie y dos idiomas.
          </p>

          <div className="mt-6 p-6 rounded-xl bg-primary/5 border border-primary/20">
             <h3 className="font-bold text-lg text-primary mb-2">Elige un Trasfondo (Background)</h3>
             <p className="text-sm text-muted-foreground mb-4">
               El trasfondo representa el lugar y la ocupación que fueron más formativos para el personaje. Tu elección influye en el Paso 3 (Puntuaciones de Característica).
             </p>
             <ul className="space-y-2 text-sm text-muted-foreground">
               <li><strong>Registra tu Dote de Origen:</strong> Un trasfondo siempre te da una dote específica.</li>
               <li><strong>Anota Competencias:</strong> Tu trasfondo te da competencia en dos habilidades y con una herramienta.</li>
               <li><strong>Bono de Competencia:</strong> El bono es +2 para un personaje de nivel 1. Anótalo.</li>
             </ul>
          </div>

          <div className="mt-6 space-y-4">
             <h3 className="font-bold text-lg text-foreground">Elige Equipo Inicial</h3>
             <p className="text-sm text-muted-foreground">
               Tu trasfondo y clase te proporcionan equipo inicial. Además, puedes tener una baratija sin costo (un objeto pequeño con un toque de misterio). Registra tu equipo en la hoja.
             </p>

             <h3 className="font-bold text-lg text-foreground">Elige una Especie</h3>
             <p className="text-sm text-muted-foreground">
               Tu especie es tu ascendencia biológica (Humano, Elfo, orco, etc.). Te otorga rasgos especiales como visión en la oscuridad, resistencia a daños o hechizos innatos y velocidad.
             </p>
             
             <h3 className="font-bold text-lg text-foreground">Elige Idiomas</h3>
             <p className="text-sm text-muted-foreground">
               Tu personaje conoce Común más otros dos idiomas (o más si el DM lo permite o tu trasfondo lo indica). Standard: Común, Élfico, Enano, Gigante, Gnomo, Goblin, Halfling, Orco. Exóticos: Abismal, Celestial, Dracónico, Habla Profunda (Deep Speech), Infernal, Primordial, Silvano, Infracomún.
             </p>
          </div>
        </section>

        <section className="prose-section mt-10">
          <h2 id="paso-3" className="font-serif text-2xl font-bold text-foreground">Paso 3: Determina Puntuaciones de Característica</h2>
          <p className="mt-4 text-muted-foreground">
             Genera un conjunto de seis números usando uno de estos métodos y asígnalos a Fuerza, Destreza, Constitución, Inteligencia, Sabiduría y Carisma.
          </p>
          
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
             <Card className="bg-white/5 border-white/10">
                <CardContent className="p-4">
                   <h4 className="font-bold text-foreground text-sm">Matriz Estándar</h4>
                   <p className="text-muted-foreground text-xs mt-1">15, 14, 13, 12, 10, 8.</p>
                </CardContent>
             </Card>
             <Card className="bg-white/5 border-white/10">
                <CardContent className="p-4">
                   <h4 className="font-bold text-foreground text-sm">Generación Aleatoria</h4>
                   <p className="text-muted-foreground text-xs mt-1">Tira 4d6, descarta el más bajo, suma los 3 restantes. Hazlo 6 veces.</p>
                </CardContent>
             </Card>
             <Card className="bg-white/5 border-white/10">
                <CardContent className="p-4">
                   <h4 className="font-bold text-foreground text-sm">Compra de Puntos</h4>
                   <p className="text-muted-foreground text-xs mt-1">Tienes 27 puntos para «comprar» puntuaciones (costo variable).</p>
                </CardContent>
             </Card>
          </div>

          <div className="mt-6 overflow-hidden rounded-xl border border-white/10">
             <table className="w-full text-xs text-left">
               <thead className="bg-white/10 text-foreground font-bold">
                 <tr>
                   <th className="p-3">Puntuación</th><th className="p-3">Costo</th>
                   <th className="p-3">Puntuación</th><th className="p-3">Costo</th>
                 </tr>
               </thead>
               <tbody className="bg-white/5 text-muted-foreground">
                 <tr className="border-t border-white/5"><td className="p-3">8</td><td className="p-3">0</td><td className="p-3">12</td><td className="p-3">4</td></tr>
                 <tr className="border-t border-white/5"><td className="p-3">9</td><td className="p-3">1</td><td className="p-3">13</td><td className="p-3">5</td></tr>
                 <tr className="border-t border-white/5"><td className="p-3">10</td><td className="p-3">2</td><td className="p-3">14</td><td className="p-3">7</td></tr>
                 <tr className="border-t border-white/5"><td className="p-3">11</td><td className="p-3">3</td><td className="p-3">15</td><td className="p-3">9</td></tr>
               </tbody>
             </table>
          </div>

          <h3 className="text-lg font-semibold text-foreground mt-6">Ajusta tus Puntuaciones</h3>
          <p className="text-sm text-muted-foreground mt-2">
             Después de asignar los números, ajústalos según tu Trasfondo. Tu trasfondo lista 3 habilidades posibles; incrementa una en +2 y otra en +1, o incrementa las tres en +1. El máximo es 20.
          </p>

          <h3 className="text-lg font-semibold text-foreground mt-6">Determina Modificadores</h3>
          <ul className="text-xs text-muted-foreground mt-2 grid grid-cols-2 gap-2 p-4 bg-white/5 rounded-lg border border-white/10">
             <li>8-9: <strong>-1</strong></li>
             <li>10-11: <strong>+0</strong></li>
             <li>12-13: <strong>+1</strong></li>
             <li>14-15: <strong>+2</strong></li>
             <li>16-17: <strong>+3</strong></li>
             <li>18-19: <strong>+4</strong></li>
             <li>20: <strong>+5</strong></li>
             <li>22-23: <strong>+6</strong></li>
             <li>24-25: <strong>+7</strong></li>
             <li>30: <strong>+10</strong></li>
          </ul>
        </section>

        <section className="prose-section mt-10">
          <h2 id="paso-4" className="font-serif text-2xl font-bold text-foreground">Paso 4: Elige un Alineamiento</h2>
          <p className="mt-4 text-muted-foreground">
             Elige el alineamiento de tu personaje. D&D asume que los PJ no son malvados (consulta con tu DM).
          </p>
          <ul className="grid gap-4 mt-4 grid-cols-1 md:grid-cols-2 text-sm text-muted-foreground">
            <li className="p-3 border border-white/5 rounded-lg"><strong>Legal Bueno (LG):</strong> Hace lo correcto según la sociedad.</li>
            <li className="p-3 border border-white/5 rounded-lg"><strong>Neutral Bueno (NG):</strong> Hace lo mejor que puede dentro de las normas.</li>
            <li className="p-3 border border-white/5 rounded-lg"><strong>Caótico Bueno (CG):</strong> Actúa según conciencia, rebelde benévolo.</li>
            <li className="p-3 border border-white/5 rounded-lg"><strong>Legal Neutral (LN):</strong> Actúa según ley, tradición o código.</li>
            <li className="p-3 border border-white/5 rounded-lg"><strong>Neutral (N):</strong> Evita cuestiones morales, prefiere no tomar bandos.</li>
            <li className="p-3 border border-white/5 rounded-lg"><strong>Caótico Neutral (CN):</strong> Sigue sus caprichos, valora la libertad.</li>
            <li className="p-3 border border-white/5 rounded-lg"><strong>Legal Maligno (LE):</strong> Toma lo que quiere metódicamente (código/tradición).</li>
            <li className="p-3 border border-white/5 rounded-lg"><strong>Neutral Maligno (NE):</strong> Hace lo que quiere sin remordimientos.</li>
            <li className="p-3 border border-white/5 rounded-lg"><strong>Caótico Maligno (CE):</strong> Violencia arbitraria, odio o sed de sangre.</li>
          </ul>
        </section>

        <section className="prose-section mt-10">
          <h2 id="paso-5" className="font-serif text-2xl font-bold text-foreground">Paso 5: Completa los Detalles</h2>
          
          <h3 className="font-bold text-lg text-foreground mt-6">Rellena los Números</h3>
          <ul className="mt-4 space-y-4 text-sm text-muted-foreground">
             <li className="p-4 rounded-xl bg-white/5 border border-white/10">
                <strong className="text-foreground block mb-1">Tiradas de Salvación y Habilidades:</strong>
                <p>Si competente: Modificador + Bono Competencia.<br/>
                Si no competente: Solo Modificador.</p>
             </li>
             <li className="p-4 rounded-xl bg-white/5 border border-white/10">
                <strong className="text-foreground block mb-1">Percepción Pasiva:</strong>
                10 + Modificador de Sabiduría (Percepción).
             </li>
             <li className="p-4 rounded-xl bg-white/5 border border-white/10">
                <strong className="text-foreground block mb-1">Puntos de Golpe (HP) a Nivel 1:</strong>
                <table className="w-full text-xs text-left mt-2">
                  <thead className="text-primary op-70"><tr><th>Clase</th><th>HP (Nivel 1)</th></tr></thead>
                  <tbody>
                    <tr className="border-t border-white/5"><td>Bárbaro</td><td>12 + Mod. CON</td></tr>
                    <tr className="border-t border-white/5"><td>Guerrero, Paladín, Explorador</td><td>10 + Mod. CON</td></tr>
                    <tr className="border-t border-white/5"><td>Bardo, Clérigo, Druida, Monje, Pícaro, Brujo</td><td>8 + Mod. CON</td></tr>
                    <tr className="border-t border-white/5"><td>Hechicero, Mago</td><td>6 + Mod. CON</td></tr>
                  </tbody>
                </table>
             </li>
             <li className="p-4 rounded-xl bg-white/5 border border-white/10">
                <strong className="text-foreground block mb-1">Dados de Golpe:</strong>
                A nivel 1 tienes 1 Dado de Golpe. Se usan para recuperar vida en descansos cortos.
             </li>
             <li className="p-4 rounded-xl bg-white/5 border border-white/10">
                <strong className="text-foreground block mb-1">Iniciativa:</strong>
                Igual a tu modificador de Destreza.
             </li>
             <li className="p-4 rounded-xl bg-white/5 border border-white/10">
                <strong className="text-foreground block mb-1">Clase de Armadura (AC):</strong>
                Base AC = 10 + Modificador de Destreza (si no llevas armadura).
             </li>
             <li className="p-4 rounded-xl bg-white/5 border border-white/10">
                <strong className="text-foreground block mb-1">Ataques y Conjuros:</strong>
                Ataque Cuerpo a Cuerpo = Fuerza + Competencia.<br/>
                Ataque a Distancia = Destreza + Competencia.<br/>
                CD de Salvación de Conjuro = 8 + Mod. Aptitud Mágica + Competencia.<br/>
                Ataque de Conjuro = Mod. Aptitud Mágica + Competencia.
             </li>
          </ul>
        </section>

        <section className="prose-section mt-12 pt-8 border-t border-white/10">
          <h2 className="font-serif text-2xl font-bold text-foreground">Avance de Nivel</h2>
          <p className="mt-4 text-muted-foreground">Cuando ganas un nivel:</p>
          <ol className="list-decimal pl-5 mt-4 space-y-2 text-sm text-muted-foreground">
             <li><strong>Elige Clase:</strong> La misma o una nueva (Multiclase).</li>
             <li><strong>Ajusta HP y Dados de Golpe:</strong> Ganas 1 DG. Tu HP max aumenta en 1d(Clase) + CON (o usa valor fijo).</li>
             <li><strong>Registra Nuevos Rasgos:</strong> Según tabla de clase.</li>
             <li><strong>Ajusta Bono de Competencia:</strong> Aumenta según nivel total.</li>
             <li><strong>Ajusta Modificadores:</strong> Si una característica sube (por ASI o Dote), recalcula todo. Si sube CON, tu HP sube retroactivamente (+1 por nivel).</li>
          </ol>
          
           <h3 className="font-bold text-lg text-foreground mt-6">Tabla de Avance de Personaje</h3>
           <div className="mt-4 overflow-x-auto rounded-xl border border-white/10">
             <table className="w-full text-xs text-left min-w-[300px]">
               <thead className="bg-white/10 text-foreground">
                 <tr><th className="p-2">XP Total</th><th className="p-2">Nivel</th><th className="p-2">Bono Comp.</th></tr>
               </thead>
               <tbody className="bg-white/5 text-muted-foreground">
                 <tr className="border-t border-white/5"><td>0</td><td>1</td><td>+2</td></tr>
                 <tr className="border-t border-white/5"><td>300</td><td>2</td><td>+2</td></tr>
                 <tr className="border-t border-white/5"><td>900</td><td>3</td><td>+2</td></tr>
                 <tr className="border-t border-white/5"><td>2,700</td><td>4</td><td>+2</td></tr>
                 <tr className="border-t border-white/5"><td>6,500</td><td>5</td><td>+3</td></tr>
                 <tr className="border-t border-white/5"><td>14,000</td><td>6</td><td>+3</td></tr>
                 <tr className="border-t border-white/5"><td>23,000</td><td>7</td><td>+3</td></tr>
                 <tr className="border-t border-white/5"><td>34,000</td><td>8</td><td>+3</td></tr>
                 <tr className="border-t border-white/5"><td>48,000</td><td>9</td><td>+4</td></tr>
                 <tr className="border-t border-white/5"><td>64,000</td><td>10</td><td>+4</td></tr>
                 <tr className="border-t border-white/5"><td>85,000</td><td>11</td><td>+4</td></tr>
                 <tr className="border-t border-white/5"><td>100,000</td><td>12</td><td>+4</td></tr>
                 <tr className="border-t border-white/5"><td>120,000</td><td>13</td><td>+5</td></tr>
                 <tr className="border-t border-white/5"><td>140,000</td><td>14</td><td>+5</td></tr>
                 <tr className="border-t border-white/5"><td>165,000</td><td>15</td><td>+5</td></tr>
                 <tr className="border-t border-white/5"><td>195,000</td><td>16</td><td>+5</td></tr>
                 <tr className="border-t border-white/5"><td>225,000</td><td>17</td><td>+6</td></tr>
                 <tr className="border-t border-white/5"><td>265,000</td><td>18</td><td>+6</td></tr>
                 <tr className="border-t border-white/5"><td>305,000</td><td>19</td><td>+6</td></tr>
                 <tr className="border-t border-white/5"><td>355,000</td><td>20</td><td>+6</td></tr>
               </tbody>
             </table>
           </div>
        </section>

        <section className="prose-section mt-12 pt-8 border-t border-white/10">
           <h2 className="font-serif text-2xl font-bold text-foreground">Multiclase</h2>
           <p className="mt-4 text-muted-foreground text-sm">
             Permite ganar niveles en múltiples clases. Requiere tener puntuación de 13 o más en la característica principal de tu clase actual Y la nueva.
           </p>

           <h3 className="font-bold text-lg text-foreground mt-4">Puntos de Experiencia y Competencia</h3>
           <p className="text-sm text-muted-foreground">Tu costo de XP y Bono de Competencia se basan en tu <strong>Nivel Total de Personaje</strong> (suma de todas las clases).</p>

           <h3 className="font-bold text-lg text-foreground mt-4">Puntos de Golpe</h3>
           <p className="text-sm text-muted-foreground">Ganas HP por la nueva clase normalmente (dado o fijo). Solo ganas el «máximo al nivel 1» si es tu primer nivel de personaje real.</p>

           <h3 className="font-bold text-lg text-foreground mt-4">Rasgos de Clase: Reglas Especiales</h3>
           <ul className="mt-2 list-disc pl-5 text-sm text-muted-foreground space-y-2">
             <li><strong>Canalizar Divinidad:</strong> Si lo tienes de varias clases, ganas los efectos pero no usos extra.</li>
             <li><strong>Ataque Extra:</strong> No se apila. (Tenerlo de 2 clases no da 3 ataques).</li>
             <li><strong>Defensa Sin Armadura:</strong> Si ya tienes una forma de calcular AC (ej: Monje), no puedes ganar otra (ej: Bárbaro).</li>
             <li><strong>Magia de Pacto (Brujo):</strong> Sus espacios se suman aparte o se usan indistintamente para conjuros preparados.</li>
           </ul>

           <h3 className="font-bold text-lg text-foreground mt-6">Lanzamiento de Conjuros Multiclase</h3>
           <p className="text-sm text-muted-foreground mt-2">
             Calcula tus espacios de conjuro sumando:
           </p>
           <ul className="mt-2 list-disc pl-5 text-sm text-muted-foreground">
             <li>Niveles de Bardo, Clérigo, Druida, Hechicero, Mago.</li>
             <li>Mitad de niveles (redondeando hacia arriba) de Paladín y Explorador.</li>
             <li>Un tercio de niveles (redondeando hacia abajo) de Caballero Arcano o Embaucador Arcano.</li>
           </ul>
           <p className="text-sm text-muted-foreground mt-2">Usa el total en la tabla de Multiclase para ver tus espacios.</p>
           
           <div className="mt-4 overflow-x-auto rounded-xl border border-white/10">
             <table className="w-full text-xs text-center min-w-[400px]">
               <thead className="bg-white/10 text-foreground">
                 <tr>
                   <th className="p-2 text-left">Nivel</th><th>1º</th><th>2º</th><th>3º</th><th>4º</th><th>5º</th><th>6º</th><th>7º</th><th>8º</th><th>9º</th>
                 </tr>
               </thead>
               <tbody className="bg-white/5 text-muted-foreground">
                 <tr className="border-t border-white/5"><td className="text-left p-2">1</td><td>2</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>
                 <tr className="border-t border-white/5"><td className="text-left p-2">2</td><td>3</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>
                 <tr className="border-t border-white/5"><td className="text-left p-2">3</td><td>4</td><td>2</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>
                 <tr className="border-t border-white/5"><td className="text-left p-2">4</td><td>4</td><td>3</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>
                 <tr className="border-t border-white/5"><td className="text-left p-2">5</td><td>4</td><td>3</td><td>2</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>
               </tbody>
             </table>
             <p className="p-2 text-xs text-muted-foreground bg-white/5 italic">Nota: La tabla continúa hasta nivel 20 siguiendo la progresión estándar completa.</p>
           </div>
        </section>

        <section className="prose-section mt-12 pt-8 border-t border-white/10">
          <h2 className="font-serif text-2xl font-bold text-foreground">Comenzar a Niveles Superiores</h2>
          <p className="mt-4 text-muted-foreground text-sm">
            Si tu DM te inicia en nivel alto (ej: nivel 10), comienzas con el XP mínimo de ese nivel (ej: 64,000 XP).
          </p>
          <h3 className="font-bold text-lg text-foreground mt-4">Equipo Inicial</h3>
          <p className="text-sm text-muted-foreground">
            El DM decide tu equipo extra y objetos mágicos.
          </p>
        </section>
      </>
    ),
  },
  "como-jugar-2024": {
    title: "Cómo Jugar (Reglas 2024)",
    description: "Referencia completa de las reglas 2024: Pruebas, Combate, Daño y Exploración.",
    image: "/dnd_guide_character_creation_1768855969961.png",
    category: "Reglas Básicas",
    difficulty: "Principiante",
    content: (
      <>
        <section className="prose-section">
          <h2 className="font-serif text-3xl font-bold text-primary flex items-center gap-3">
            <Dices className="h-8 w-8" /> Jugando el Juego
          </h2>
          <p className="text-muted-foreground leading-relaxed mt-4">
            Cuando el resultado de una acción es incierto, el juego usa una tirada de d20 para determinar el éxito o el fracaso. Estas tiradas se llaman <strong>Pruebas de D20 (D20 Tests)</strong> y vienen en tres tipos: pruebas de habilidad, tiradas de salvación y tiradas de ataque. Siguen estos pasos:
          </p>
          <ol className="mt-6 space-y-4 list-decimal pl-5 text-sm text-muted-foreground">
             <li><strong>Tira 1d20.</strong> Siempre quieres sacar alto. Si la tirada tiene <strong>Ventaja</strong> o <strong>Desventaja</strong> (descrita más adelante), tira dos d20s, pero usa solo uno (el mayor para Ventaja, el menor para Desventaja).</li>
             <li><strong>Suma Modificadores.</strong> Suma el <strong>Modificador de Característica Relevante</strong> (Fuerza, Destreza, etc.) y tu <strong>Bono de Competencia</strong> (si es relevante, por ejemplo si tienes competencia en la habilidad usada). También suma bonos circunstanciales de conjuros o rasgos.</li>
             <li><strong>Compara el Total con el Número Objetivo.</strong> Si el total iguala o excede el objetivo, la prueba es un éxito. De lo contrario, falla.
               <ul className="list-disc pl-5 mt-2 opacity-80">
                 <li>Para pruebas de habilidad y salvaciones, el objetivo es la <strong>Clase de Dificultad (CD)</strong>.</li>
                 <li>Para ataques, el objetivo es la <strong>Clase de Armadura (AC)</strong>.</li>
               </ul>
             </li>
          </ol>
        </section>

        <section className="prose-section mt-10">
          <h2 className="font-serif text-2xl font-bold text-foreground">Las Seis Características</h2>
          <p className="mt-4 text-muted-foreground">
            Todas las criaturas tienen seis características. Cada una tiene una <strong>Puntuación</strong> (de 1 a 20+) y un <strong>Modificador</strong> derivado de ella (Puntuación-10)/2.
          </p>
           <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
             <Card className="bg-white/5 border-white/10">
                <CardContent className="p-4 flex flex-col gap-2">
                   <div className="flex items-center gap-2 text-red-400 font-bold"><Swords className="h-4 w-4"/> Fuerza (STR)</div>
                   <p className="text-xs text-muted-foreground">Atletismo, potencia física.</p>
                </CardContent>
             </Card>
             <Card className="bg-white/5 border-white/10">
                <CardContent className="p-4 flex flex-col gap-2">
                   <div className="flex items-center gap-2 text-green-400 font-bold"><Move className="h-4 w-4"/> Destreza (DEX)</div>
                   <p className="text-xs text-muted-foreground">Acróbacias, Sigilo, Juego de Manos.</p>
                </CardContent>
             </Card>
             <Card className="bg-white/5 border-white/10">
                <CardContent className="p-4 flex flex-col gap-2">
                   <div className="flex items-center gap-2 text-orange-400 font-bold"><Heart className="h-4 w-4"/> Constitución (CON)</div>
                   <p className="text-xs text-muted-foreground">Salud, aguante (sin habilidades asociadas).</p>
                </CardContent>
             </Card>
             <Card className="bg-white/5 border-white/10">
                <CardContent className="p-4 flex flex-col gap-2">
                   <div className="flex items-center gap-2 text-blue-400 font-bold"><Brain className="h-4 w-4"/> Inteligencia (INT)</div>
                   <p className="text-xs text-muted-foreground">Arcanos, Historia, Investigación, Naturaleza, Religión.</p>
                </CardContent>
             </Card>
             <Card className="bg-white/5 border-white/10">
                <CardContent className="p-4 flex flex-col gap-2">
                   <div className="flex items-center gap-2 text-purple-400 font-bold"><Eye className="h-4 w-4"/> Sabiduría (WIS)</div>
                   <p className="text-xs text-muted-foreground">Trato con Animales, Perspicacia, Medicina, Percepción, Supervivencia.</p>
                </CardContent>
             </Card>
             <Card className="bg-white/5 border-white/10">
                <CardContent className="p-4 flex flex-col gap-2">
                   <div className="flex items-center gap-2 text-yellow-400 font-bold"><MessageSquare className="h-4 w-4"/> Carisma (CHA)</div>
                   <p className="text-xs text-muted-foreground">Engaño, Intimidación, Interpretación, Persuasión.</p>
                </CardContent>
             </Card>
          </div>
        </section>

        <section className="prose-section mt-10">
           <h2 className="font-serif text-2xl font-bold text-foreground">Competencia (Proficiency)</h2>
           <p className="mt-4 text-muted-foreground">
             Todas las criaturas tienen un <strong>Bono de Competencia</strong>, que refleja entrenamiento. Este bono se añade a una Prueba de D20 solo si la criatura tiene competencia en:
           </p>
           <ul className="list-disc pl-5 mt-2 text-sm text-muted-foreground">
             <li>Una Habilidad (Skill).</li>
             <li>Una Tirada de Salvación.</li>
             <li>Un objeto usado para la prueba (armas, herramientas).</li>
             <li>Ataques de hechizo y CD de salvación de hechizos.</li>
           </ul>
           <p className="mt-2 text-sm text-muted-foreground">
             El bono no se apila (no puedes sumarlo dos veces a la misma tirada).
           </p>
        </section>

        <section className="prose-section mt-10">
          <h2 className="font-serif text-2xl font-bold text-foreground">Acciones (Actions)</h2>
          <p className="mt-4 text-muted-foreground">
             Cuando haces algo más que moverte o hablar, típicamente tomas una acción. Las acciones principales son:
          </p>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
             <div className="p-3 bg-white/5 rounded border border-white/10"><strong>Atacar (Attack):</strong> Realizar un ataque cuerpo a cuerpo o a distancia.</div>
             <div className="p-3 bg-white/5 rounded border border-white/10"><strong>Lanzar Conjuro (Magic):</strong> Lanzar un hechizo que tiene tiempo de lanzamiento de 1 acción.</div>
             <div className="p-3 bg-white/5 rounded border border-white/10"><strong>Correr (Dash):</strong> Obtienes movimiento extra igual a tu Velocidad.</div>
             <div className="p-3 bg-white/5 rounded border border-white/10"><strong>Destrabarse (Disengage):</strong> Tu movimiento no provoca Ataques de Oportunidad este turno.</div>
             <div className="p-3 bg-white/5 rounded border border-white/10"><strong>Esquivar (Dodge):</strong> Hasta tu próximo turno, ataques contra ti tienen Desventaja y tus salvaciones de DEX tienen Ventaja.</div>
             <div className="p-3 bg-white/5 rounded border border-white/10"><strong>Ayudar (Help):</strong> Das Ventaja a un aliado en su próxima prueba o ataque.</div>
             <div className="p-3 bg-white/5 rounded border border-white/10"><strong>Esconderse (Hide):</strong> Haces una prueba de Sigilo (Stealth) para obtener la condición Invisible/Escondido.</div>
             <div className="p-3 bg-white/5 rounded border border-white/10"><strong>Buscar (Search):</strong> Haces una prueba de Sabiduría (Percepción) o Inteligencia (Investigación).</div>
             <div className="p-3 bg-white/5 rounded border border-white/10"><strong>Influenciar (Influence):</strong> Intentas alterar la actitud de un NPC (Social).</div>
             <div className="p-3 bg-white/5 rounded border border-white/10"><strong>Estudiar (Study):</strong> Haces una prueba de Inteligencia para recordar o deducir información.</div>
             <div className="p-3 bg-white/5 rounded border border-white/10"><strong>Utilizar (Utilize):</strong> Usas un objeto que requiere manipularlo (abrir puerta, palanca).</div>
          </div>
        </section>

        <section className="prose-section mt-10 border-t border-white/10 pt-8">
           <div className="flex items-center gap-3 mb-6">
             <Swords className="h-8 w-8 text-red-500" />
             <h2 className="font-serif text-3xl font-bold text-foreground">Combate</h2>
           </div>
           
           <h3 className="text-xl font-bold text-foreground mb-3">Orden de Combate</h3>
           <ol className="list-decimal pl-5 space-y-3 text-sm text-muted-foreground">
             <li><strong>Establecer Posiciones:</strong> El DM determina dónde está cada uno.</li>
             <li><strong>Tirar Iniciativa:</strong> Todos tiran Destreza (Iniciativa). El orden va de mayor a menor. Los empates los decide el DM (o los jugadores entre sí).</li>
             <li><strong>Tomar Turnos:</strong> Cada participante toma su turno.</li>
             <li><strong>Comenzar Nueva Ronda:</strong> Cuando todos terminan, comienza la siguiente ronda.</li>
             <li><strong>Sorpresa:</strong> Si un combatiente es sorprendido, tiene Desventaja en su Iniciativa.</li>
           </ol>

           <h3 className="text-xl font-bold text-foreground mt-8 mb-3">Tu Turno</h3>
           <p className="text-sm text-muted-foreground">
             En tu turno puedes moverte una distancia hasta tu <strong>Velocidad</strong> y tomar una <strong>Acción</strong>.
           </p>
           <ul className="mt-3 list-disc pl-5 text-sm text-muted-foreground space-y-2">
             <li><strong>Comunicación:</strong> Puedes decir frases breves sin usar acciones.</li>
             <li><strong>Interacción con Objetos:</strong> Puedes interactuar con 1 objeto gratis durante tu movimiento o acción (ej: abrir puerta). Un segundo objeto requiere la acción <strong>Utilizar</strong>.</li>
             <li><strong>Romper Movimiento:</strong> Puedes moverte antes y después de tu acción (ej: mover 10 pies, atacar, mover 20 pies).</li>
             <li><strong>Terreno Difícil:</strong> Cuesta 1 pie extra por cada pie movido.</li>
             <li><strong>Tirarse al Suelo (Prone):</strong> Puedes tirarte al suelo sin costo. Levantarte cuesta la mitad de tu velocidad.</li>
           </ul>

           <h3 className="text-xl font-bold text-foreground mt-8 mb-3">Realizando un Ataque</h3>
           <div className="space-y-4 text-sm text-muted-foreground">
             <div className="p-4 bg-white/5 rounded-lg">
                <strong className="text-foreground block mb-1">Ataques a Distancia (Ranged)</strong>
                <ul className="list-disc pl-5">
                   <li><strong>Rango:</strong> Tienen rango Normal y Largo (ej: 30/120). Atacar más allá del normal impone Desventaja. No puedes atacar más allá del largo.</li>
                   <li><strong>En Combate Cerrado:</strong> Tienes Desventaja si estás a 5 pies de un enemigo que te ve y no está incapacitado.</li>
                </ul>
             </div>
             <div className="p-4 bg-white/5 rounded-lg">
                <strong className="text-foreground block mb-1">Ataques Cuerpo a Cuerpo (Melee)</strong>
                <ul className="list-disc pl-5">
                   <li><strong>Alcance (Reach):</strong> Típicamente 5 pies.</li>
                   <li><strong>Ataques de Oportunidad:</strong> Si una criatura sale de tu alcance, puedes usar tu Reacción para golpearla. (Evitable con Destrabarse).</li>
                   <li><strong>Desarmado (Unarmed Strike):</strong> Puedes golpear, o intentar Agarrar (Grapple) o Empujar (Shove).</li>
                </ul>
             </div>
             <div className="p-4 bg-white/5 rounded-lg">
                <strong className="text-foreground block mb-1">Combate Montado</strong>
                <ul className="list-disc pl-5">
                   <li>Montar cuesta mitad de velocidad.</li>
                   <li>Montura Controlada: Comparte tu iniciativa. Solo puede Correr, Destrabarse o Esquivar.</li>
                   <li>Si te mueven contra tu voluntad o la montura cae Prone, salvación de DEX DC 10 o caes.</li>
                </ul>
             </div>
             <div className="p-4 bg-white/5 rounded-lg">
                 <strong className="text-foreground block mb-1">Combate Bajo el Agua</strong>
                 <ul className="list-disc pl-5">
                    <li>Melee tiene Desventaja (salvo daga, jabalina, tridente, lanza, espada corta, o si tienes velocidad de nado).</li>
                    <li>Rango falla automáticamente más allá del alcance normal. Dentro del normal tiene Desventaja (salvo ballesta, red, o arma arrojadiza como jabalina).</li>
                    <li>Resistencia al Fuego para todo lo sumergido.</li>
                 </ul>
             </div>
           </div>

           <h3 className="text-xl font-bold text-foreground mt-8 mb-3">Cobertura (Cover)</h3>
           <ul className="text-sm text-muted-foreground space-y-2">
             <li><strong>Media Cobertura (1/2):</strong> +2 a AC y Salvaciones de DEX.</li>
             <li><strong>Tres Cuartos (3/4):</strong> +5 a AC y Salvaciones de DEX.</li>
             <li><strong>Cobertura Total:</strong> No puedes ser objetivo directo de ataques o hechizos.</li>
           </ul>
        </section>

        <section className="prose-section mt-10 border-t border-white/10 pt-8">
           <div className="flex items-center gap-3 mb-6">
             <Skull className="h-8 w-8 text-neutral-400" />
             <h2 className="font-serif text-3xl font-bold text-foreground">Daño y Curación</h2>
           </div>
           
           <h3 className="text-lg font-bold text-foreground">Reglas de Daño</h3>
           <ul className="mt-2 list-disc pl-5 text-sm text-muted-foreground space-y-1">
             <li><strong>Críticos:</strong> Un 20 natural en ataque dobla los dados de daño.</li>
             <li><strong>Resistencia:</strong> Reduce el daño a la mitad.</li>
             <li><strong>Vulnerabilidad:</strong> Dobla el daño.</li>
             <li><strong>Orden:</strong> 1. Modificadores (+/-) &rarr; 2. Resistencia &rarr; 3. Vulnerabilidad.</li>
           </ul>

           <h3 className="text-lg font-bold text-foreground mt-6">Cayendo a 0 Puntos de Golpe</h3>
           <div className="mt-2 space-y-3 text-sm text-muted-foreground">
             <p>Si caes a 0 HP y no mueres al instante (Daño masivo &ge; HP max), caes <strong>Inconsciente</strong> y haces <strong>Tiradas de Salvación de Muerte</strong> al inicio de tu turno.</p>
             <ul className="list-disc pl-5">
                <li><strong>Salvación de Muerte:</strong> Tira 1d20. 10+ es éxito. Menos de 10 es fallo.</li>
                <li><strong>3 Éxitos:</strong> Te estabilizas (sigues 0 HP pero dejas de tirar).</li>
                <li><strong>3 Fallos:</strong> Mueres.</li>
                <li><strong>Natural 1:</strong> Cuenta como 2 fallos.</li>
                <li><strong>Natural 20:</strong> Recuperas 1 HP y estás consciente.</li>
                <li><strong>Daño a 0 HP:</strong> Un fallo automático. Si es crítico, 2 fallos.</li>
             </ul>
             <p><strong>Estabilizar:</strong> Acción de Ayuda (Medicina DC 10) estabiliza a una criatura.</p>
           </div>
        </section>

        <section className="prose-section mt-10 border-t border-white/10 pt-8">
           <h2 className="font-serif text-2xl font-bold text-foreground">Exploración</h2>
           
           <h3 className="font-bold text-lg text-foreground mt-4">Ritmo de Viaje</h3>
           <ul className="mt-2 text-sm text-muted-foreground">
             <li><strong>Rápido:</strong> Desventaja en Percepción (Survival/Preception).</li>
             <li><strong>Normal:</strong> Desventaja en Sigilo.</li>
             <li><strong>Lento:</strong> Ventaja en Percepción.</li>
           </ul>

           <h3 className="font-bold text-lg text-foreground mt-4">Visión y Luz</h3>
           <ul className="mt-2 text-sm text-muted-foreground">
             <li><strong>Luz Brillante:</strong> Visión normal.</li>
             <li><strong>Luz Tenue (Dim):</strong> Área <em>Ligeramente Oscurecida</em>. Desventaja en Percepción (vista).</li>
             <li><strong>Oscuridad:</strong> Área <em>Fuertemente Oscurecida</em>. Condición <strong>Cegado</strong> para ver ahí.</li>
           </ul>
        </section>
        
        <section className="prose-section mt-10 border-t border-white/10 pt-8">
          <h2 className="font-serif text-2xl font-bold text-foreground">Condiciones</h2>
          <p className="mt-2 text-muted-foreground text-sm">
            Estados temporales definidos en el Glosario de Reglas:
          </p>
          <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-2 text-xs font-mono text-primary/80">
             <span>Blinded (Cegado)</span>
             <span>Charmed (Hechizado)</span>
             <span>Deafened (Ensordecido)</span>
             <span>Exhaustion (Exhausto)</span>
             <span>Frightened (Asustado)</span>
             <span>Grappled (Agarrado)</span>
             <span>Incapacitated (Incapacitado)</span>
             <span>Invisible</span>
             <span>Paralyzed (Paralizado)</span>
             <span>Petrified (Petrificado)</span>
             <span>Poisoned (Envenenado)</span>
             <span>Prone (Derribado)</span>
             <span>Restrained (Apresado)</span>
             <span>Stunned (Aturdido)</span>
             <span>Unconscious (Inconsciente)</span>
          </div>
        </section>
      </>
    )
  }
}

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const guide = guidesContent[slug]
  
  if (!guide) {
    return {
      title: "Guía no encontrada | Lataberna",
    }
  }

  return {
    title: `${guide.title} | Lataberna`,
    description: guide.description,
    keywords: ["DnD", "Dungeons and Dragons", guide.category, "guia", "tutorial"],
    openGraph: {
      title: guide.title,
      description: guide.description,
      type: "article",
      images: [guide.image],
    },
  }
}

export default async function GuidePage({ params }: PageProps) {
  const { slug } = await params
  const guide = guidesContent[slug]

  if (!guide) {
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative">
          <div className="absolute inset-0 h-[400px] overflow-hidden">
            <Image
              src={guide.image || "/placeholder.svg"}
              alt={guide.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
          </div>
          
          <div className="relative container mx-auto px-4 pt-8 pb-12">
            {/* Breadcrumb */}
            <nav className="mb-8">
              <ol className="flex items-center gap-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/" className="hover:text-foreground transition-colors">Inicio</Link>
                </li>
                <ChevronRight className="h-4 w-4" />
                <li>
                  <Link href="/guias" className="hover:text-foreground transition-colors">Guias</Link>
                </li>
                <ChevronRight className="h-4 w-4" />
                <li className="text-foreground">{guide.category}</li>
              </ol>
            </nav>

            <div className="flex items-center gap-3 mb-4">
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                {guide.category}
              </Badge>
              <Badge variant="outline" className="border-border">
                {guide.difficulty}
              </Badge>
            </div>

            <h1 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl max-w-4xl text-balance">
              {guide.title}
            </h1>

            <p className="mt-4 text-lg text-muted-foreground max-w-3xl">
              {guide.description}
            </p>

            <div className="mt-6 flex items-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Actualizado 2024
              </span>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid gap-12 lg:grid-cols-[1fr_300px]">
              {/* Main Content */}
              <article className="max-w-none">
                {guide.content}
              </article>

              {/* Sidebar */}
              <aside className="space-y-6">
                {/* CTA Card */}
                <Card className="border-border bg-card sticky top-24">
                  <CardContent className="p-6">
                    <h3 className="font-serif text-lg font-semibold text-foreground">
                      ¿Listo para comenzar?
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Crea tu primer personaje con nuestra herramienta interactiva paso a paso.
                    </p>
                    <Button asChild className="mt-4 w-full bg-primary text-primary-foreground hover:bg-primary/90">
                      <Link href="/personaje">
                        <Users className="mr-2 h-4 w-4" />
                        Crear Personaje
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="mt-2 w-full border-border bg-transparent">
                      <Link href="/tienda">
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Ver Tienda
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </aside>
            </div>
          </div>
        </section>

        {/* Back Link */}
        <section className="border-t border-border py-8">
          <div className="container mx-auto px-4">
            <Button asChild variant="ghost" className="text-muted-foreground hover:text-foreground">
              <Link href="/guias">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver a Guías
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
