import Image from "next/image"
import { Compass, MapPin, Sprout, Target } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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
// sin internet"): mismas etiquetas font-readout/copper, mismo divisor,
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

        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <Card className="overflow-hidden border-earth/25 bg-earth/[0.06] shadow-sm">
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
              {/* Traza de cobre en el borde inferior de la foto: mismo
                  motivo de "instrumento" que separa el header del cuerpo
                  de la página, en miniatura, para anclar la card al
                  sistema de diseño general. */}
              <div className="absolute inset-x-0 bottom-0 h-[2px] bg-copper/60" />
            </div>
            <CardHeader>
              <Badge
                variant="outline"
                className="w-fit gap-1.5 border-earth/30 bg-card text-earth"
              >
                <MapPin className="size-3.5" aria-hidden="true" />
                Nacido en el Oeste del GBA
              </Badge>
              <CardTitle className="text-2xl">Historia</CardTitle>
              <CardDescription className="leading-relaxed">
                El vínculo con el trabajo rural, que conocimos de cerca junto
                a productores de Morón y el Oeste del GBA, nos permitió
                entender los desafíos cotidianos de quien cultiva la tierra.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 text-sm leading-relaxed text-muted-foreground">
              <p>
                Encontramos en la tecnología una oportunidad para optimizar
                recursos y facilitar la toma de decisiones: esa es la idea
                que dio origen a SIMONA.
              </p>
              <dl className="grid grid-cols-3 gap-4 border-t border-copper/25 pt-4">
                {stats.map((stat) => (
                  <div key={stat.k} className="flex flex-col">
                    <dd className="font-readout text-2xl font-semibold text-earth">
                      {stat.v}
                    </dd>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-copper">
                      {stat.k}
                    </dt>
                  </div>
                ))}
              </dl>
            </CardContent>
          </Card>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {pillars.map((pillar) => (
              <Card key={pillar.title} className="h-full shadow-sm">
                <CardHeader>
                  <span
                    className={`icon-chip flex size-10 items-center justify-center ${toneClasses[pillar.tone]}`}
                  >
                    <pillar.icon className="size-5" aria-hidden="true" />
                  </span>
                  <CardTitle>{pillar.title}</CardTitle>
                  {/* Micro-divisor cobre: repite el gesto del guion bajo el
                      eyebrow de SectionHeading a escala de card individual. */}
                  <span
                    aria-hidden="true"
                    className="mt-1 mb-1.5 block h-px w-6 bg-copper/50"
                  />
                  <CardDescription className="leading-relaxed">
                    {pillar.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
