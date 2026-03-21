// components/ui/section-divider.tsx

/**
 * Separador ornamental dorado entre secciones del home.
 * Renderiza una línea de 1px con gradiente fade en los extremos,
 * usando el color dorado (#EE8600) como acento central.
 */
export function SectionDivider() {
  return (
    <div
      aria-hidden="true"
      className="w-full h-px"
      style={{
        background: "linear-gradient(to right, transparent, #EE8600 30%, #EE8600 70%, transparent)",
      }}
    />
  )
}
