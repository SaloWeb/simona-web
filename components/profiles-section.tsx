import { FileJson, Gauge, SlidersHorizontal } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { SectionHeading } from "@/components/section-heading"
import { AppMockup } from "@/components/app-mockup"

const highlights = [
  {
    icon: Gauge,
    title: "Ajuste automático de histéresis",
    description:
      "Cada perfil define su banda de encendido y apagado, evitando el sobre-encendido de bombas y el desgaste del relé.",
  },
  {
    icon: FileJson,
    title: "Catálogo Multi-Huerta en JSON local",
    description:
      "Los perfiles viajan con la app: se leen desde un JSON embebido, así que funcionan sin conexión a ningún servidor.",
  },
  {
    icon: SlidersHorizontal,
    title: "Personalización completa de rangos",
    description:
      "Cada tipo de planta admite edición manual de humedad, temperatura, pH y luz para adaptarse a tu suelo real.",
  },
]

const profileChips = [
  "Lechuga",
  "Tomate",
  "Frutilla",
  "Albahaca",
  "Pimiento",
  "Vivero ornamental",
]

export function ProfilesSection() {
  return (
    <section id="perfiles" className="border-b border-border py-16 lg:py-24">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="App SIMONA"
          title="Perfiles Agronómicos Integrados"
          description="Elegí el perfil de tu cultivo desde la app y SIMONA regulará automáticamente los umbrales de humedad, temperatura, pH y luz."
        />

        <div className="grid items-center gap-12 lg:grid-cols-[auto_1fr] lg:gap-16">
          <div className="flex justify-center lg:justify-start">
            <div className="aspect-[9/19] w-full max-w-[280px] overflow-hidden rounded-3xl border-4 border-slate-800 bg-slate-100 shadow-xl">
              <AppMockup />
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <ul className="flex flex-col gap-4">
              {highlights.map((item) => (
                <li key={item.title}>
                  <Card>
                    <CardContent className="flex items-start gap-4">
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <item.icon className="size-5" aria-hidden="true" />
                      </span>
                      <div className="flex flex-col gap-1">
                        <h3 className="font-medium leading-snug text-foreground">
                          {item.title}
                        </h3>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </li>
              ))}
            </ul>

            <div className="flex flex-col gap-3 border-t border-border pt-6">
              <span className="font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
                Cultivos precargados dentro de esas categorías
              </span>
              <ul className="flex flex-wrap gap-2">
                {profileChips.map((chip) => (
                  <li key={chip}>
                    <Badge variant="secondary">{chip}</Badge>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
