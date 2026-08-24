"use client"

import * as React from "react"
import { motion } from "motion/react"
import { track } from "@vercel/analytics"
import {
  ArrowRight,
  Droplet,
  FlaskConical,
  Minus,
  MoveDown,
  Plus,
  PowerOff,
  RotateCcw,
  Sun,
  Thermometer,
  Waves,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { SectionHeading } from "@/components/section-heading"
import { cn } from "@/lib/utils"

const DEFAULTS = { moisture: 62, temperature: 22, ph: 6.4, light: 480 }

/** Umbrales del perfil activo (Lechuga) */
const PROFILE = {
  name: "Lechuga",
  moistureMin: 45,
  moistureMax: 72,
  tempMin: 12,
  tempMax: 26,
  phMin: 6,
  phMax: 6.8,
  lightMin: 180,
  lightMax: 780,
}

type Reading = {
  key: string
  label: string
  icon: typeof Droplet
  value: number
  unit: string
  min: number
  max: number
  step: number
  okMin: number
  okMax: number
  format: (v: number) => string
}

export function IotSimulator() {
  const [moisture, setMoisture] = React.useState(DEFAULTS.moisture)
  const [temperature, setTemperature] = React.useState(DEFAULTS.temperature)
  const [ph, setPh] = React.useState(DEFAULTS.ph)
  const [light, setLight] = React.useState(DEFAULTS.light)

  // Un solo evento por sesión (no uno por cada tick del slider, que sería
  // ruido): marca que la persona efectivamente tocó el simulador, más allá
  // de haber llegado hasta la sección con el scroll.
  const hasTrackedInteraction = React.useRef(false)
  function trackFirstInteraction() {
    if (hasTrackedInteraction.current) return
    hasTrackedInteraction.current = true
    track("Simulator interacted")
  }

  // Histéresis: la bomba arranca por debajo del mínimo y corta al alcanzar el máximo.
  const [pumpOn, setPumpOn] = React.useState(false)
  React.useEffect(() => {
    setPumpOn((prev) => {
      if (moisture < PROFILE.moistureMin) return true
      if (moisture >= PROFILE.moistureMax) return false
      return prev
    })
  }, [moisture])

  const readings: Reading[] = [
    {
      key: "moisture",
      label: "Humedad de suelo",
      icon: Droplet,
      value: moisture,
      unit: "%",
      min: 0,
      max: 100,
      step: 1,
      okMin: PROFILE.moistureMin,
      okMax: PROFILE.moistureMax,
      format: (v) => `${v.toFixed(0)} %`,
    },
    {
      key: "temperature",
      label: "Temperatura ambiente",
      icon: Thermometer,
      value: temperature,
      unit: "°C",
      min: -5,
      max: 45,
      step: 0.5,
      okMin: PROFILE.tempMin,
      okMax: PROFILE.tempMax,
      format: (v) => `${v.toFixed(1)} °C`,
    },
    {
      key: "ph",
      label: "pH del suelo",
      icon: FlaskConical,
      value: ph,
      unit: "pH",
      min: 3,
      max: 10,
      step: 0.1,
      okMin: PROFILE.phMin,
      okMax: PROFILE.phMax,
      format: (v) => v.toFixed(1),
    },
    {
      key: "light",
      label: "Luz (LDR)",
      icon: Sun,
      value: light,
      unit: "lux",
      min: 0,
      max: 950,
      step: 10,
      okMin: PROFILE.lightMin,
      okMax: PROFILE.lightMax,
      format: (v) => `${v.toFixed(0)} lux`,
    },
  ]

  const setters: Record<string, (v: number) => void> = {
    moisture: setMoisture,
    temperature: setTemperature,
    ph: setPh,
    light: setLight,
  }

  const alerts = readings.filter(
    (r) => r.value < r.okMin || r.value > r.okMax,
  )

  function reset() {
    setMoisture(DEFAULTS.moisture)
    setTemperature(DEFAULTS.temperature)
    setPh(DEFAULTS.ph)
    setLight(DEFAULTS.light)
    setPumpOn(false)
    track("Simulator reset")
  }

  return (
    <section
      id="simulador"
      className="section-texture border-b border-border bg-secondary/40 py-16 lg:py-24"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Demo en Vivo"
            title="Simulador interactivo del nodo IoT"
            description="Movés los sensores, SIMONA decide. Cuando la humedad cae por debajo del mínimo del perfil, el relé acciona la bomba y no corta hasta alcanzar el máximo. El pH se ajusta con +/- en vez de arrastre, porque en la práctica se mide por muestra manual, no de forma continua."
          />
          <Button variant="outline" onClick={reset} className="w-fit shrink-0">
            <RotateCcw data-icon="inline-start" />
            Restablecer valores
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.3fr_auto_1fr]">
          <Card>
            <CardHeader>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-col gap-1">
                  <CardTitle>Entradas de sensores</CardTitle>
                  <CardDescription>
                    Perfil activo: {PROFILE.name} · umbrales cargados desde JSON
                    local
                  </CardDescription>
                </div>
                <Badge variant="outline" className="font-mono text-[10px]">
                  ESP32 · AP 192.168.4.1
                </Badge>
              </div>
              <p className="flex items-center gap-1.5 text-xs font-medium text-accent">
                <MoveDown className="size-3.5 shrink-0" aria-hidden="true" />
                Arrastrá "Humedad de suelo" por debajo de{" "}
                {PROFILE.moistureMin}% y mirá reaccionar la bomba →
              </p>
            </CardHeader>
            <CardContent className="flex flex-col gap-7">
              {readings.map((r) => {
                const outOfRange = r.value < r.okMin || r.value > r.okMax
                return (
                  <div key={r.key} className="flex flex-col gap-3">
                    <div className="flex items-center justify-between gap-3">
                      <label
                        htmlFor={`sim-${r.key}`}
                        className="flex items-center gap-2 text-sm font-medium text-foreground"
                      >
                        <r.icon
                          className="size-4 text-muted-foreground"
                          aria-hidden="true"
                        />
                        {r.label}
                        {r.key === "ph" ? (
                          <Badge
                            variant="outline"
                            className="h-4 gap-1 px-1.5 py-0 text-[9px] font-normal"
                          >
                            Muestra manual
                          </Badge>
                        ) : null}
                        {r.key === "moisture" ? (
                          <Badge
                            variant="outline"
                            className="h-4 gap-1 border-accent/30 bg-accent/10 px-1.5 py-0 text-[9px] font-normal text-accent"
                          >
                            <ArrowRight className="size-2.5" aria-hidden="true" />
                            Acciona la bomba
                          </Badge>
                        ) : null}
                      </label>
                      <span
                        className={cn(
                          "font-mono text-sm font-semibold tabular-nums",
                          outOfRange ? "text-destructive" : "text-primary",
                        )}
                      >
                        {r.format(r.value)}
                      </span>
                    </div>
                    {r.key === "ph" ? (
                      // El pH no es continuo como los demás sensores: en la
                      // práctica se mide por muestra manual (badge de
                      // arriba). Un stepper +/- refuerza esa diferencia en
                      // vez de solo aclararla en texto, a diferencia del
                      // slider de arrastre que usan el resto de las lecturas.
                      <div className="flex items-center gap-3">
                        <Button
                          variant="outline"
                          size="icon-sm"
                          className="size-11 sm:size-7"
                          disabled={r.value <= r.min}
                          onClick={() => {
                            trackFirstInteraction()
                            setPh((v) =>
                              Math.max(r.min, Math.round((v - r.step) * 10) / 10),
                            )
                          }}
                          aria-label={`Bajar ${r.label}`}
                        >
                          <Minus className="size-3.5" aria-hidden="true" />
                        </Button>
                        <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                          <div
                            className={cn(
                              "h-full rounded-full transition-[width] duration-200",
                              outOfRange ? "bg-destructive" : "bg-primary",
                            )}
                            style={{
                              width: `${((r.value - r.min) / (r.max - r.min)) * 100}%`,
                            }}
                          />
                        </div>
                        <Button
                          variant="outline"
                          size="icon-sm"
                          className="size-11 sm:size-7"
                          disabled={r.value >= r.max}
                          onClick={() => {
                            trackFirstInteraction()
                            setPh((v) =>
                              Math.min(r.max, Math.round((v + r.step) * 10) / 10),
                            )
                          }}
                          aria-label={`Subir ${r.label}`}
                        >
                          <Plus className="size-3.5" aria-hidden="true" />
                        </Button>
                      </div>
                    ) : (
                      <Slider
                        id={`sim-${r.key}`}
                        value={r.value}
                        min={r.min}
                        max={r.max}
                        step={r.step}
                        aria-label={r.label}
                        onValueChange={(v) => {
                          trackFirstInteraction()
                          setters[r.key](Array.isArray(v) ? v[0] : (v as number))
                        }}
                      />
                    )}
                    <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
                      <span>
                        {r.min}
                        {r.unit === "pH" ? "" : ` ${r.unit}`}
                      </span>
                      <span
                        className={cn(
                          outOfRange ? "text-destructive" : "text-primary",
                        )}
                      >
                        Rango óptimo {r.okMin}–{r.okMax}
                      </span>
                      <span>
                        {r.max}
                        {r.unit === "pH" ? "" : ` ${r.unit}`}
                      </span>
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>

          {/*
            Conector visual entre "Humedad de suelo" y el relé: en un
            grid de dos columnas quedaban un poco separados a pesar de
            que uno causa el otro. Esta columna angosta (solo visible en
            desktop) hace explícito ese vínculo con una flecha que se
            enciende cuando la bomba está activa.
          */}
          <div className="hidden flex-col items-center justify-center gap-1.5 lg:flex">
            <span className="h-10 w-px bg-border" aria-hidden="true" />
            <motion.span
              animate={pumpOn ? { x: [0, 4, 0] } : { x: 0 }}
              transition={
                pumpOn
                  ? { duration: 1, repeat: Infinity, ease: "easeInOut" }
                  : { duration: 0.2 }
              }
              className={cn(
                "flex size-7 shrink-0 items-center justify-center rounded-full border",
                pumpOn
                  ? "border-accent/40 bg-accent/15 text-accent"
                  : "border-border bg-muted text-muted-foreground",
              )}
            >
              <ArrowRight className="size-3.5" aria-hidden="true" />
            </motion.span>
            <span className="h-10 w-px bg-border" aria-hidden="true" />
          </div>

          <div className="flex flex-col gap-6">
            <Card
              className={cn(
                "overflow-hidden transition-colors",
                pumpOn
                  ? "border-accent/40 bg-accent/[0.07]"
                  : "border-border bg-card",
              )}
            >
              <CardHeader>
                <div className="flex items-center justify-between gap-3">
                  <CardTitle className="text-base">Módulo Relé de Riego</CardTitle>
                  <span className="flex items-center gap-2">
                    <span className="relative flex size-2.5">
                      {pumpOn ? (
                        <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-75" />
                      ) : null}
                      <span
                        className={cn(
                          "relative inline-flex size-2.5 rounded-full",
                          pumpOn ? "bg-accent" : "bg-muted-foreground/40",
                        )}
                      />
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
                      LED
                    </span>
                  </span>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <motion.span
                    animate={
                      pumpOn
                        ? { scale: [1, 1.08, 1] }
                        : { scale: 1 }
                    }
                    transition={
                      pumpOn
                        ? { duration: 1.2, repeat: Infinity, ease: "easeInOut" }
                        : { duration: 0.2 }
                    }
                    className={cn(
                      "flex size-14 shrink-0 items-center justify-center rounded-xl",
                      pumpOn
                        ? "bg-accent text-accent-foreground"
                        : "bg-muted text-muted-foreground",
                    )}
                  >
                    {pumpOn ? (
                      <Waves className="size-7" aria-hidden="true" />
                    ) : (
                      <PowerOff className="size-7" aria-hidden="true" />
                    )}
                  </motion.span>
                  <div className="flex flex-col gap-1">
                    <p
                      aria-live="polite"
                      className={cn(
                        "font-mono text-lg font-semibold tracking-tight",
                        pumpOn ? "text-accent" : "text-muted-foreground",
                      )}
                    >
                      {pumpOn ? "BOMBA ACTIVADA" : "BOMBA EN REPOSO"}
                    </p>
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      {pumpOn
                        ? `Riego en curso. Corta automáticamente al llegar a ${PROFILE.moistureMax}% de humedad.`
                        : `Arranca automáticamente si la humedad baja de ${PROFILE.moistureMin}%.`}
                    </p>
                  </div>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <motion.div
                    className={cn(
                      "h-full rounded-full",
                      pumpOn ? "bg-accent" : "bg-primary",
                    )}
                    animate={{ width: `${Math.min(100, Math.max(0, moisture))}%` }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                  />
                </div>
                <p className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
                  Histéresis {PROFILE.moistureMin}% → {PROFILE.moistureMax}%
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Diagnóstico del nodo</CardTitle>
                <CardDescription aria-live="polite">
                  {alerts.length === 0
                    ? "Todas las variables dentro del rango del perfil."
                    : `${alerts.length} variable(s) fuera de rango.`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {alerts.length === 0 ? (
                  <p className="font-mono text-xs text-primary">
                    OK · cultivo estable
                  </p>
                ) : (
                  <ul className="flex flex-col gap-2">
                    {alerts.map((a) => (
                      <li
                        key={a.key}
                        className="flex items-center justify-between gap-3 font-mono text-xs"
                      >
                        <span className="text-muted-foreground">{a.label}</span>
                        <span className="text-destructive">
                          {a.value < a.okMin ? "BAJO" : "ALTO"} ·{" "}
                          {a.format(a.value)}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
