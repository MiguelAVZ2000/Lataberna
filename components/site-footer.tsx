import Link from "next/link"
import { Beer, Facebook, Twitter, Instagram, Youtube, ArrowUpRight } from "lucide-react"

const footerLinks = {
  tienda: [
    { name: "Dados", href: "/tienda?categoria=dados" },
    { name: "Libros", href: "/tienda?categoria=libros" },
    { name: "Miniaturas", href: "/tienda?categoria=miniaturas" },
    { name: "Accesorios", href: "/tienda?categoria=accesorios" },
  ],
  wiki: [
    { name: "Razas", href: "/wiki/razas" },
    { name: "Clases", href: "/wiki/clases" },
    { name: "Hechizos", href: "/wiki/conceptos/hechizos" },
    { name: "Reglas", href: "/wiki/conceptos/reglas-basicas" },
  ],
  comunidad: [
    { name: "Discord", href: "#" },
    { name: "Eventos", href: "#" },
    { name: "Blog", href: "#" },
  ],
}

export function SiteFooter() {
  return (
    <footer className="bg-[var(--color-dark-section)] text-gray-400 py-20 border-t-4 border-[var(--color-accent-gold)] shadow-2xl">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-6 mb-20">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-8">
            <Link href="/" className="flex items-center gap-3">
               <div className="h-12 w-12 bg-[var(--color-primary)] rounded-sm flex items-center justify-center shadow-lg shadow-black/20">
                 <Beer className="h-7 w-7 text-white" />
               </div>
               <span className="font-heading font-black text-3xl tracking-tighter text-white uppercase leading-none">
                LA<span className="text-[var(--color-primary)]">TABERNA</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-sm font-sans text-gray-400">
              La Taberna es el centro de recursos de D&D para la comunidad hispana. 
              Equipa a tus aventureros, consulta el saber arcano y forja tu propia leyenda.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="h-10 w-10 rounded-sm bg-white/5 flex items-center justify-center hover:bg-[var(--color-primary)] hover:text-white transition-all border border-white/5 shadow-sm">
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:col-span-4 gap-8">
            <div>
              <h3 className="mb-6 font-heading font-black text-white uppercase tracking-widest text-[11px] border-b border-[var(--color-accent-gold)] pb-2 inline-block">
                Mercado
              </h3>
              <ul className="space-y-4">
                {footerLinks.tienda.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-xs font-black uppercase tracking-widest hover:text-white transition-colors flex items-center gap-2 group decoration-accent-gold">
                       {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-6 font-heading font-black text-white uppercase tracking-widest text-[11px] border-b border-[var(--color-accent-gold)] pb-2 inline-block">
                Saber Arcano
              </h3>
              <ul className="space-y-4">
                {footerLinks.wiki.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-xs font-black uppercase tracking-widest hover:text-white transition-colors flex items-center gap-2 group decoration-accent-gold">
                       {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-6 font-heading font-black text-white uppercase tracking-widest text-[11px] border-b border-[var(--color-accent-gold)] pb-2 inline-block">
                La Comunidad
              </h3>
              <ul className="space-y-4">
                {footerLinks.comunidad.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-xs font-black uppercase tracking-widest hover:text-white transition-colors flex items-center gap-2 group decoration-accent-gold">
                       {link.name} <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity text-[var(--color-accent-gold)]" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col lg:flex-row items-center justify-between gap-8 text-[10px] font-black uppercase tracking-widest text-gray-500">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <p>
              &copy; {new Date().getFullYear()} LATABERNA.
            </p>
            <div className="flex items-center gap-6">
               <span className="hover:text-white cursor-pointer transition-colors">Privacidad</span>
               <span className="hover:text-white cursor-pointer transition-colors">Términos</span>
               <span className="hover:text-white cursor-pointer transition-colors">Soporte</span>
            </div>
          </div>
          <p className="text-gray-600 max-w-md text-center lg:text-right leading-relaxed font-sans font-normal lowercase italic first-letter:uppercase">
            Dungeons & Dragons y D&D son marcas comerciales de Wizards of the Coast LLC en EE.UU. y otros países.
          </p>
        </div>
      </div>
    </footer>
  )
}


