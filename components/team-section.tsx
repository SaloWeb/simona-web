import { GraduationCap, MapPin } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Panel,
  PanelContent,
  PanelDescription,
  PanelHeader,
  PanelTitle,
} from "@/components/panel"
import { SectionHeading } from "@/components/section-heading"

/**
 * Sección "Equipo" — Fase 3 del plan de identidad ("contenido real, no
 * de landing genérica"). SIMONA es un proyecto escolar real de la
 * Escuela de Educación Técnica N°6 "Chacabuco" (Morón, GBA Oeste), y
 * hasta ahora ese dato no aparecía en ningún lado de la web: la página
 * se leía como landing de producto sin dueño en vez de un proyecto de
 * 4 estudiantes con nombre y apellido. Este es exactamente el tipo de
 * diferenciador que ninguna competencia real (AgTech corporativa) puede
 * mostrar.
 */
// Cada integrante toma uno de los 4 colores de marca (los mismos del
// isotipo: azul, verde, tierra, trace) en vez de repetir un mismo ícono
// genérico de "persona" cuatro veces — la card de Equipo era la más
// genérica de toda la página pese a ser el contenido más humano del sitio.
const team = [
  { name: "Benjamín Rosales", tone: "primary" as const },
  { name: "Melani Quispe", tone: "accent" as const },
  { name: "Santino Wasylow", tone: "earth" as const },
  { name: "Jose Cardozo", tone: "trace" as const },
]

const toneClasses = {
  primary: "bg-primary/10 text-primary",
  accent: "bg-accent/15 text-accent",
  earth: "bg-earth/10 text-earth",
  trace: "bg-trace/10 text-trace",
}

function initials(name: string) {
  return name
    .split(" ")
    .filter((part) => part.length > 0)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()
}

export function TeamSection() {
  return (
    <section
      id="equipo"
      className="border-b border-border py-16 lg:py-24"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Quiénes hacemos SIMONA"
          title="Un proyecto real, de la escuela al campo."
          description="SIMONA nació como proyecto de 7mo año en una escuela técnica del Oeste del GBA, con la misma seriedad de desarrollo, estudio de mercado y análisis financiero que un producto AgTech real."
        />

        <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr] lg:items-start">
          <Panel accent="primary" className="h-full">
            <PanelHeader>
              <span className="icon-chip flex size-10 items-center justify-center bg-primary/10 text-primary">
                <GraduationCap className="size-5" aria-hidden="true" />
              </span>
              <PanelTitle className="text-xl">
                Escuela de Educación Técnica N°6 &quot;Chacabuco&quot;
              </PanelTitle>
              <PanelDescription className="leading-relaxed">
                Orientación Informática · 7mo año, 3ra división · Ciclo
                lectivo 2026
              </PanelDescription>
            </PanelHeader>
            <PanelContent>
              <Badge
                variant="outline"
                className="w-fit gap-1.5 border-earth/30 bg-card text-earth"
              >
                <MapPin className="size-3.5" aria-hidden="true" />
                Morón, Buenos Aires
              </Badge>
            </PanelContent>
          </Panel>

          <div className="grid gap-4 sm:grid-cols-2">
            {team.map((member) => (
              <Panel key={member.name} className="h-full">
                <PanelContent className="flex items-center gap-4">
                  <span
                    className={`icon-chip flex size-11 shrink-0 items-center justify-center font-display text-sm font-semibold ${toneClasses[member.tone]}`}
                    aria-hidden="true"
                  >
                    {initials(member.name)}
                  </span>
                  <span className="font-medium text-foreground">
                    {member.name}
                  </span>
                </PanelContent>
              </Panel>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
