import Image from "next/image"
import { Compass, Mountain, Sprout, Target } from "lucide-react"

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
      "Mejorar la productividad de las pymes agrícolas mediante tecnología accesible que optimice recursos como el agua y la energía.",
  },
  {
    icon: Compass,
    title: "Visión",
    tone: "earth" as const,
    description:
      "Ser la solución referente en la digitalización del agro argentino, promoviendo una gestión eficiente y sostenible de cada cultivo.",
  },
  {
    icon: Sprout,
    title: "Valores",
    tone: "accent" as const,
    description:
      "Simplicidad operativa (Plug & Play), compromiso real con el productor y eficiencia con sostenibilidad en cada decisión de diseño.",
  },
]

const toneClasses = {
  primary: "bg-primary/10 text-primary",
  earth: "bg-earth/10 text-earth",
  accent: "bg-accent/15 text-accent",
}

export function AboutSection() {
  return (
    <section
      id="sobre-nosotros"
      className="border-b border-border bg-secondary/40 py-16 lg:py-24"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Sobre SIMONA"
          title="Una necesidad concreta, vista de cerca."
          description="Nuestra empresa surge a partir de una experiencia cercana con el sector agrícola y del reconocimiento de una necesidad concreta: mejorar la gestión y el monitoreo de los cultivos."
        />

        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <Card className="border-earth/25 bg-earth/[0.06] shadow-sm">
            <Image
              src="/images/historia-huerta.jpg"
              alt="Persona trabajando de cerca en un cultivo de una huerta"
              width={678}
              height={452}
              sizes="(min-width: 1024px) 560px, 100vw"
              loading="lazy"
              className="aspect-[16/10] w-full object-cover"
            />
            <CardHeader>
              <Badge
                variant="outline"
                className="w-fit gap-1.5 border-earth/30 bg-card text-earth"
              >
                <Mountain className="size-3.5" aria-hidden="true" />
                Inspirado en los campos de Jujuy
              </Badge>
              <CardTitle className="text-2xl">Historia</CardTitle>
              <CardDescription className="leading-relaxed">
                El vínculo con el trabajo rural, transmitido a través de la
                experiencia de un familiar en los campos de Jujuy, nos
                permitió comprender los desafíos cotidianos del productor.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 text-sm leading-relaxed text-muted-foreground">
              <p>
                Encontramos en la tecnología una oportunidad para optimizar
                recursos y facilitar la toma de decisiones: esa es la idea
                que dio origen a SIMONA.
              </p>
              <dl className="grid grid-cols-3 gap-4 border-t border-earth/20 pt-4">
                {[
                  { k: "Sensores", v: "4" },
                  { k: "Internet", v: "0" },
                  { k: "Cánones", v: "$0" },
                ].map((stat) => (
                  <div key={stat.k} className="flex flex-col">
                    <dd className="font-mono text-2xl font-semibold text-earth">
                      {stat.v}
                    </dd>
                    <dt className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
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
