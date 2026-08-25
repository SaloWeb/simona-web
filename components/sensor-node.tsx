"use client"

import * as React from "react"
import { useReducedMotion } from "motion/react"

/**
 * Nodo SIMONA — elemento firma de la identidad visual.
 *
 * Reemplaza el mockup de celular genérico del hero por un panel que se
 * parece a lo que el sistema realmente es: una consola de lecturas de
 * sensor. Los valores oscilan dentro de rangos realistas del perfil
 * "Hoja" (Anexo G) para que la demostración sea honesta con el producto,
 * no un dato inventado sin relación con el sistema real.
 *
 * Respeta prefers-reduced-motion: si está activo, los valores quedan
 * fijos (sin intervalo) y el LED no pulsa.
 */

type Reading = {
  label: string
  value: number
  unit: string
  min: number
  max: number
  decimals?: number
}

const BASE_READINGS: Reading[] = [
  { label: "HUM", value: 42, unit: "%", min: 38, max: 48 },
  { label: "TEMP", value: 21, unit: "°C", min: 19, max: 23 },
  { label: "LUZ", value: 610, unit: "", min: 560, max: 660 },
  { label: "pH", value: 6.4, unit: "", min: 6.1, max: 6.7, decimals: 1 },
]

function jitter(reading: Reading): number {
  const span = reading.max - reading.min
  const next = reading.min + Math.random() * span
  return reading.decimals ? Number(next.toFixed(reading.decimals)) : Math.round(next)
}

export function SensorNode() {
  const prefersReducedMotion = useReducedMotion()
  const [readings, setReadings] = React.useState(BASE_READINGS)
  const [pumpActive, setPumpActive] = React.useState(false)

  React.useEffect(() => {
    if (prefersReducedMotion) return

    const interval = setInterval(() => {
      setReadings((prev) => prev.map((r) => ({ ...r, value: jitter(r) })))
      setPumpActive((prev) => (Math.random() > 0.82 ? !prev : prev))
    }, 2200)

    return () => clearInterval(interval)
  }, [prefersReducedMotion])

  return (
    <div
      className="trace-panel relative w-full max-w-[280px] border border-copper/40 bg-console p-5 shadow-xl"
      role="img"
      aria-label="Panel de lecturas en vivo de un nodo SIMONA: humedad, temperatura, luz y pH"
    >
      <div className="trace-texture pointer-events-none absolute inset-0 opacity-40" />

      <div className="relative flex items-center justify-between border-b border-copper/25 pb-3">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-console-foreground/70">
          Nodo #01 · Lechuga
        </span>
        <span className="flex items-center gap-1.5">
          <span
            className={
              "size-2 rounded-full " +
              (pumpActive
                ? "bg-accent shadow-[0_0_6px_2px] shadow-accent/60"
                : "bg-copper/70")
            }
            aria-hidden="true"
          />
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-console-foreground/60">
            {pumpActive ? "Riego activo" : "En espera"}
          </span>
        </span>
      </div>

      <dl className="relative mt-4 grid grid-cols-2 gap-x-4 gap-y-4">
        {readings.map((r) => (
          <div key={r.label} className="flex flex-col gap-0.5">
            <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-console-foreground/55">
              {r.label}
            </dt>
            <dd className="font-readout text-2xl font-semibold text-console-foreground">
              {r.decimals ? r.value.toFixed(r.decimals) : r.value}
              <span className="ml-0.5 text-sm font-normal text-console-foreground/60">
                {r.unit}
              </span>
            </dd>
          </div>
        ))}
      </dl>

      <p className="relative mt-4 border-t border-copper/25 pt-3 font-mono text-[10px] leading-relaxed text-console-foreground/50">
        192.168.4.1 · sin internet
      </p>
    </div>
  )
}
