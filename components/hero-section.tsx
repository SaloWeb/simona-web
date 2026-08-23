"use client"

import * as React from "react"
import Image from "next/image"
import { motion } from "motion/react"
import {
  ArrowRight,
  CircuitBoard,
  ImageOff,
  Leaf,
  Plug,
  Send,
  Wallet,
  WifiOff,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const valueBadges = [
  { icon: WifiOff, label: "Operación 100% Local (Sin Internet)" },
  { icon: Wallet, label: "Pago Único sin Cánones por Hectárea" },
  { icon: Plug, label: "Configuración Plug & Play" },
]

const telemetry = [
  { label: "Humedad suelo", value: "38 %", tone: "text-accent" },
  { label: "Temp. ambiente", value: "21.4 °C", tone: "text-earth" },
  { label: "pH suelo", value: "6.4", tone: "text-primary" },
  { label: "Luz", value: "612 lux", tone: "text-earth" },
]

export function HeroSection() {
  // Mientras no exista /public/images/hero-huerta.png (foto real a agregar
  // por el equipo), mostramos un placeholder de marca prolijo en vez de un
  // ícono de imagen rota. Apenas el archivo esté, esto deja de dispararse.
  const [photoMissing, setPhotoMissing] = React.useState(false)

  return (
    <section id="top" className="relative overflow-hidden border-b border-border">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:56px_56px] opacity-40 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]"
      />
      {/* Ambiente verde de marca — presencia real, no un detalle escondido */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[500px] bg-[radial-gradient(ellipse_65%_55%_at_20%_0%,oklch(0.746_0.173_127.8_/_22%),transparent)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-24 size-[420px] rounded-full bg-accent/25 blur-3xl"
      />
      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-8 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-7"
        >
          <Badge
            variant="secondary"
            className="w-fit gap-1.5 border-accent/30 bg-accent/15 text-accent"
          >
            <Leaf className="size-3.5" aria-hidden="true" />
            Tecnología Accesible para el Agro Argentino
          </Badge>

          <div className="flex flex-col gap-5">
            <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-5xl lg:text-6xl">
              Transformamos datos del suelo en{" "}
              <span className="text-primary">decisiones automáticas</span> para
              tu cultivo.
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Ecosistema de monitoreo y automatización Plug &amp; Play. Diseñado
              para pequeños productores, viveros, huertas urbanas y escuelas
              técnicas del cordón periurbano (como La Plata).
            </p>
          </div>

          <ul className="flex flex-wrap gap-2">
            {valueBadges.map((item) => (
              <li key={item.label}>
                <Badge variant="outline" className="gap-1.5 bg-card py-1.5">
                  <item.icon className="size-3.5 text-primary" aria-hidden="true" />
                  {item.label}
                </Badge>
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button size="lg" render={<a href="#solucion" />} nativeButton={false}>
              Conocer SIMONA
              <ArrowRight data-icon="inline-end" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              render={<a href="#contacto" />}
              nativeButton={false}
            >
              <Send data-icon="inline-start" />
              Solicitar Kit SIMONA
            </Button>
          </div>

          <a
            href="#simulador"
            className="inline-flex w-fit items-center gap-1.5 text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            Probá la demo interactiva del nodo IoT
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          {/* Halo verde detrás de la foto — refuerza marca sin tapar la imagen */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] bg-accent/20 blur-2xl"
          />
          <div className="relative overflow-hidden rounded-2xl border border-accent/25 bg-card shadow-xl">
            {photoMissing ? (
              <div className="flex aspect-[4/3] w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-accent/20 via-secondary to-primary/10 text-center">
                <ImageOff className="size-6 text-muted-foreground" aria-hidden="true" />
                <p className="max-w-[220px] text-xs leading-relaxed text-muted-foreground">
                  Falta la foto real de la huerta en{" "}
                  <code className="rounded bg-background/70 px-1 py-0.5 font-mono">
                    /public/images/hero-huerta.png
                  </code>
                </p>
              </div>
            ) : (
              <Image
                src="/images/hero-huerta.png"
                alt="Huerta con cultivos en hilera y el nodo SIMONA monitoreando humedad de suelo"
                width={1200}
                height={900}
                priority
                className="aspect-[4/3] h-full w-full object-cover"
                onError={() => setPhotoMissing(true)}
              />
            )}
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-foreground/70 to-transparent"
            />
            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
              <div className="rounded-xl border border-primary-foreground/15 bg-background/95 p-4 backdrop-blur-sm">
                <div className="flex items-center justify-between gap-3 border-b border-border pb-3">
                  <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                    <CircuitBoard className="size-3.5 text-primary" aria-hidden="true" />
                    ESP32 · 192.168.4.1
                  </span>
                  <span className="flex items-center gap-1.5 font-mono text-[11px] text-primary">
                    <span className="relative flex size-1.5">
                      <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75" />
                      <span className="relative inline-flex size-1.5 rounded-full bg-primary" />
                    </span>
                    ONLINE LOCAL
                  </span>
                </div>
                <dl className="grid grid-cols-2 gap-3 pt-3 sm:grid-cols-4">
                  {telemetry.map((item) => (
                    <div key={item.label} className="flex flex-col gap-0.5">
                      <dt className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
                        {item.label}
                      </dt>
                      <dd className={`font-mono text-base font-semibold ${item.tone}`}>
                        {item.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
