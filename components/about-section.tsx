import Image from "next/image"
import { Compass, MapPin, Sprout, Target } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Panel,
  PanelContent,
  PanelDescription,
  PanelHeader,
  PanelTitle,
} from "@/components/panel"
import { SectionHeading } from "@/components/section-heading"

const pillars = [
  {
    icon: Target,
    title: "Misión",
    tone: "primary" as const,
    description:
      "Ayudar a las pymes agrícolas del Oeste del GBA a producir mejor, cuidando el agua y la energía con una tecnología que cualquiera puede instalar y usar.",
  },
  {
    icon: Compass,
    title: "Visión",
    tone: "earth" as const,
    description:
      "Ser la referencia en monitoreo agrícola inteligente para el agro argentino, empezando por transformar la gestión de los cultivos en nuestra propia zona.",
  },
  {
    icon: Sprout,
    title: "Valores",
    tone: "accent" as const,
    description:
      "Hacemos las cosas simples (Plug & Play), estamos cerca del productor y cuidamos los recursos en cada decisión de diseño que tomamos.",
  },
]

const toneClasses = {
  primary: "bg-primary/10 text-primary",
  earth: "bg-earth/10 text-earth",
  accent: "bg-accent/15 text-accent",
}

// Callback deliberado al footer del Nodo SIMONA del hero ("192.168.4.1 ·
// sin internet"): mismas etiquetas font-readout/trace, mismo divisor,
// para que el bloque de stats se sienta parte del mismo instrumento en
// vez de una tabla de números genérica.
const stats = [
  { k: "Sensores", v: "4" },
  { k: "Internet", v: "0" },
  { k: "Cánones", v: "$0" },
]

export function AboutSection() {
  return (
    <section
      id="sobre-nosotros"
      className="section-texture border-b border-border bg-secondary/40 py-16 lg:py-24"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Sobre SIMONA"
          title="Una necesidad concreta, vista de cerca."
          description="Vimos de cerca un problema que se repite en las quintas y campos del Oeste del GBA: monitorear los cultivos a mano lleva tiempo y margen de error. De ahí nació SIMONA."
        />

        {/*
          Antes lg:items-start: el grid usaba align-items:start, así que
          la columna de pilares (más corta) no estiraba para igualar la
          columna "Historia" (imagen + texto + stats), dejando aire muerto
          al lado. Sin ese override, el grid usa el stretch por defecto y
          la columna de pilares ocupa todo el alto disponible (ver plan de
          mejoras visuales, P3).
        */}
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <Panel accent="earth" className="overflow-hidden">
            <div className="relative">
              <Image
                src="/images/historia-huerta.jpg"
                alt="Persona trabajando de cerca en un cultivo de una huerta"
                width={678}
                height={452}
                sizes="(min-width: 1024px) 560px, 100vw"
                loading="lazy"
                className="aspect-[16/10] w-full object-cover"
              />
              {/* Traza turquesa en el borde inferior de la foto: mismo
                  motivo de "instrumento" que separa el header del cuerpo
                  de la página, en miniatura, para anclar la card al
                  sistema de diseño general. */}
              <div className="absolute inset-x-0 bottom-0 h-[2px] bg-trace/60" />
            </div>
            <PanelHeader>
              <Badge
                variant="outline"
                className="w-fit gap-1.5 border-earth/30 bg-card text-earth"
              >
                <MapPin className="size-3.5" aria-hidden="true" />
                Nacido en el Oeste del GBA
              </Badge>
              <PanelTitle className="text-2xl">Historia</PanelTitle>
              <PanelDescription className="leading-relaxed">
                El vínculo con el trabajo rural, que conocimos de cerca junto
                a productores de Morón y el Oeste del GBA, nos permitió
                entender los desafíos cotidianos de quien cultiva la tierra.
              </PanelDescription>
            </PanelHeader>
            <PanelContent className="flex flex-col gap-4 text-sm leading-relaxed text-muted-foreground">
              <p>
                Encontramos en la tecnología una oportunidad para optimizar
                recursos y facilitar la toma de decisiones: esa es la idea
                que dio origen a SIMONA.
              </p>
              <dl className="grid grid-cols-3 gap-4 border-t border-trace/25 pt-4">
                {stats.map((stat) => (
                  <div key={stat.k} className="flex flex-col">
                    <dd className="font-readout text-2xl font-semibold text-earth">
                      {stat.v}
                    </dd>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-trace">
                      {stat.k}
                    </dt>
                  </div>
                ))}
              </dl>
            </PanelContent>
          </Panel>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {pillars.map((pillar) => (
              <Panel key={pillar.title} className="h-full">
                <PanelHeader>
                  <span
                    className={`icon-chip flex size-10 items-center justify-center ${toneClasses[pillar.tone]}`}
                  >
                    <pillar.icon className="size-5" aria-hidden="true" />
                  </span>
                  <PanelTitle>{pillar.title}</PanelTitle>
                  {/* Micro-divisor trace: repite el gesto del guión bajo el
                      eyebrow de SectionHeading a escala de card individual. */}
                  <span
                    aria-hidden="true"
                    className="mt-1 mb-1.5 block h-px w-6 bg-trace/50"
                  />
                  <PanelDescription className="leading-relaxed">
                    {pillar.description}
                  </PanelDescription>
                </PanelHeader>
              </Panel>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
