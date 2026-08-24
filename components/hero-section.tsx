"use client"

import Image from "next/image"
import { motion, useReducedMotion } from "motion/react"
import { track } from "@vercel/analytics"
import { CircleCheck } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AppMockup } from "@/components/app-mockup"

const valueProps = ["Sin internet", "Pago único, sin cánones", "Plug & Play"]

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion()
  const fadeUp = (delay: number) => ({
    initial: prefersReducedMotion ? false : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.55, delay, ease: "easeOut" as const },
  })

  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-border bg-secondary/40"
    >
      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-24">
        <div className="flex flex-col gap-5">
          <motion.span
            {...fadeUp(0)}
            className="font-mono text-xs uppercase tracking-[0.18em] text-primary"
          >
            SIMONA · Morón, GBA Oeste
          </motion.span>

          <motion.h1
            {...fadeUp(0.08)}
            className="font-display max-w-xl text-4xl font-semibold leading-[1.05] tracking-tight text-balance text-foreground sm:text-5xl"
          >
            Riego automático e inteligente para tu huerta o vivero.
          </motion.h1>

          <motion.p
            {...fadeUp(0.16)}
            className="max-w-lg text-base leading-relaxed text-muted-foreground text-pretty"
          >
            SIMONA monitorea humedad, temperatura, luz y pH de tu cultivo y
            acciona el riego solo cuando hace falta. Un kit Plug & Play que
            funciona 100% local, sin depender de internet.
          </motion.p>

          <motion.div
            {...fadeUp(0.24)}
            className="flex flex-wrap items-center gap-3 pt-1"
          >
            <Button
              size="lg"
              render={<a href="#contacto" />}
              nativeButton={false}
              onClick={() => track("Kit CTA clicked", { location: "hero" })}
            >
              Solicitar Kit SIMONA
            </Button>
            <Button
              variant="outline"
              size="lg"
              render={<a href="#simulador" />}
              nativeButton={false}
            >
              Probá la demo interactiva
            </Button>
          </motion.div>

          <motion.ul
            {...fadeUp(0.32)}
            className="flex flex-wrap items-center gap-2 pt-1"
          >
            {valueProps.map((item) => (
              <li key={item}>
                <Badge
                  variant="secondary"
                  className="h-auto gap-1.5 rounded-full border border-accent/25 bg-accent/10 px-3 py-1.5 text-xs font-medium text-accent"
                >
                  <CircleCheck
                    className="size-3.5 shrink-0"
                    aria-hidden="true"
                  />
                  {item}
                </Badge>
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="relative mx-auto flex w-full max-w-sm items-center justify-center lg:mx-0 lg:ml-auto"
        >
          <div className="absolute inset-x-6 top-6 -z-10 aspect-[16/10] overflow-hidden rounded-2xl border border-border shadow-sm lg:inset-x-10">
            <Image
              src="/images/hero-huerta.png"
              alt="Huerta con cultivos regados de forma automática por el sistema SIMONA"
              fill
              priority
              sizes="(min-width: 1024px) 480px, (min-width: 640px) 600px, 100vw"
              className="object-cover"
            />
          </div>
          <div className="relative mt-24 w-[240px] overflow-hidden rounded-[2rem] border border-border bg-card shadow-xl sm:w-[260px]">
            <div className="aspect-[9/19]">
              <AppMockup />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
