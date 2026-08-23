"use client"

import { motion } from "motion/react"

/**
 * Ilustración de marca del Hero — reemplaza la foto de stock rota.
 * En vez de bajar una foto genérica de campo (con problemas de derechos
 * y que no sería realmente "nuestra"), armamos una escena propia: filas
 * de cultivo en los dos verdes de marca, el nodo SIMONA con sus ondas de
 * WiFi local, y una gota de riego. 100% controlado en paleta -> resuelve
 * también el "no veo mucho verde" del feedback.
 */
export function HeroIllustration() {
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-b from-sky-100 via-secondary to-earth/10">
      <svg
        viewBox="0 0 400 300"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMax slice"
        role="img"
        aria-label="Ilustración de una huerta con el nodo SIMONA monitoreando filas de cultivo"
      >
        {/* Sol */}
        <circle cx="330" cy="55" r="34" fill="oklch(0.87 0.14 85)" opacity="0.55" />

        {/* Loma de fondo */}
        <path d="M0 165 Q100 130 200 155 T400 145 V300 H0 Z" fill="oklch(0.6 0.1 145)" opacity="0.35" />

        {/* Suelo */}
        <path d="M0 210 Q120 185 220 205 T400 195 V300 H0 Z" fill="var(--earth)" opacity="0.9" />

        {/* Filas de cultivo (dos verdes de marca alternados) */}
        {Array.from({ length: 6 }).map((_, row) => {
          const y = 222 + row * 13
          const colors = ["oklch(0.55 0.173 127.8)", "oklch(0.746 0.173 127.8)"]
          return (
            <g key={row}>
              {Array.from({ length: 9 }).map((_, i) => (
                <ellipse
                  key={i}
                  cx={18 + i * 44}
                  cy={y}
                  rx="11"
                  ry="7"
                  fill={colors[(row + i) % 2]}
                  opacity={0.9 - row * 0.06}
                />
              ))}
            </g>
          )
        })}

        {/* Estaca + nodo SIMONA */}
        <g transform="translate(200 90)">
          <line x1="0" y1="18" x2="0" y2="95" stroke="var(--earth)" strokeWidth="4" strokeLinecap="round" />
          {/* ondas WiFi (pulso) */}
          {[16, 26, 36].map((r, idx) => (
            <motion.circle
              key={r}
              cx="0"
              cy="0"
              r={r}
              fill="none"
              stroke="var(--primary)"
              strokeWidth="2.5"
              initial={{ opacity: 0.6, scale: 0.85 }}
              animate={{ opacity: 0, scale: 1.15 }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                delay: idx * 0.35,
                ease: "easeOut",
              }}
            />
          ))}
          <rect x="-13" y="-13" width="26" height="26" rx="7" fill="var(--primary)" />
          <circle cx="0" cy="0" r="4" fill="var(--primary-foreground)" />
        </g>

        {/* Gota de riego */}
        <motion.path
          d="M172 128 c0 7 -6 12 -6 19 a6 6 0 0 0 12 0 c0 -7 -6 -12 -6 -19 Z"
          fill="var(--primary)"
          initial={{ y: -4, opacity: 0.4 }}
          animate={{ y: 6, opacity: 0.9 }}
          transition={{ duration: 1.6, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        />
      </svg>

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:28px_28px] opacity-[0.15]"
      />
    </div>
  )
}
