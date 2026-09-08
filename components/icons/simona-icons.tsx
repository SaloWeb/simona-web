/**
 * Set de íconos propio de SIMONA — Fase 2 del plan de identidad.
 *
 * No son íconos de una librería genérica (antes: lucide-react en la
 * sección Hardware). Están dibujados a mano en el mismo lenguaje visual
 * que el logo real (logo_simona.png): línea fina de 1.75px con puntas
 * redondeadas + pequeños nodos circulares rellenos en los extremos de
 * cada trazo, igual que los nodos de circuito que rodean la gota del
 * isotipo. La idea es que cualquier ícono de esta sección se sienta
 * "cortado de la misma tela" que la marca, en vez de ser un pictograma
 * neutro con la firma visual pegada encima.
 *
 * No es un port 1:1 de los VectorDrawable de la app Android (ic_sol,
 * ic_gota_full, etc. — no se pudo acceder al contenido del .zip del
 * repo para copiar el pathData exacto), pero comparte el mismo criterio
 * de diseño y puede convivir con esos íconos sin desentonar.
 *
 * Todos aceptan `className` para heredar color (currentColor) y tamaño
 * vía Tailwind, igual que los íconos de lucide-react que reemplazan.
 */

type IconProps = {
  className?: string
}

const NODE_R = 2.1

export function IconEsp32({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <rect
        x="7"
        y="7"
        width="10"
        height="10"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <rect
        x="10"
        y="10"
        width="4"
        height="4"
        rx="0.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      {/* patas del chip, terminadas en nodo — mismo motivo que el
          circuito del logo */}
      {[6, 10, 14, 18].map((pos) => (
        <g key={`h-${pos}`}>
          <line x1="3" y1={pos} x2="7" y2={pos} stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
          <circle cx="2.4" cy={pos} r={NODE_R} fill="currentColor" />
          <line x1="17" y1={pos} x2="21" y2={pos} stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
          <circle cx="21.6" cy={pos} r={NODE_R} fill="currentColor" />
        </g>
      ))}
    </svg>
  )
}

export function IconHumedad({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* misma silueta de gota que el logo, en línea (no relleno) */}
      <path
        d="M12 3.2c2.4 3 5.4 6.9 5.4 10.4a5.4 5.4 0 1 1-10.8 0C6.6 10.1 9.6 6.2 12 3.2Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <line x1="12" y1="15.4" x2="12" y2="19.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="20.9" r={NODE_R} fill="currentColor" />
    </svg>
  )
}

export function IconTermometro({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M13.5 13.6V5.5a1.5 1.5 0 0 0-3 0v8.1a3.5 3.5 0 1 0 3 0Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <line x1="15.5" y1="6" x2="19.5" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="20.6" cy="6" r={NODE_R} fill="currentColor" />
      <line x1="15.5" y1="10" x2="18" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="19" cy="10" r={NODE_R * 0.85} fill="currentColor" />
    </svg>
  )
}

export function IconPh({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* matraz de laboratorio, mismo criterio de línea que el resto */}
      <path
        d="M10.2 3.8h3.6M10.9 3.8v5.2L6.7 16a2 2 0 0 0 1.7 3h7.2a2 2 0 0 0 1.7-3l-4.2-7v-5.2"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line x1="8.1" y1="14" x2="15.9" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="18.2" r={NODE_R} fill="currentColor" />
    </svg>
  )
}

export function IconLuz({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.75" />
      {/* rayos terminados en nodo circular — el mismo gesto que los
          brazos de circuito del logo alrededor de la gota */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
        const rad = (angle * Math.PI) / 180
        const x1 = 12 + Math.cos(rad) * 7.2
        const y1 = 12 + Math.sin(rad) * 7.2
        const x2 = 12 + Math.cos(rad) * 9.6
        const y2 = 12 + Math.sin(rad) * 9.6
        return (
          <g key={angle}>
            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx={x2} cy={y2} r={NODE_R * 0.8} fill="currentColor" />
          </g>
        )
      })}
    </svg>
  )
}

export function IconRele({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <rect
        x="5.5"
        y="6"
        width="13"
        height="12"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <path
        d="M13 9.2 9.8 13h2.6l-1 4.6 4-5.4h-2.7l1-3Z"
        fill="currentColor"
      />
      <line x1="12" y1="3.2" x2="12" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="2.4" r={NODE_R} fill="currentColor" />
    </svg>
  )
}

export function IconLora({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle cx="6" cy="18" r="1.6" fill="currentColor" />
      <path
        d="M9.5 14.5a6 6 0 0 1 0 8.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M13 11a10.5 10.5 0 0 1 0 15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.7"
      />
      <line x1="6" y1="18" x2="6" y2="4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="6" cy="3.2" r={NODE_R} fill="currentColor" />
    </svg>
  )
}
