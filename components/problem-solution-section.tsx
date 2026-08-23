import Image from "next/image"
import { CircleAlert, Sparkles } from "lucide-react"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { SectionHeading } from "@/components/section-heading"

export function ProblemSolutionSection() {
  return (
    <section
      id="problema-solucion"
      className="border-b border-border py-16 lg:py-24"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Problema & Solución"
          title="Del monitoreo a ciegas a la decisión informada."
          align="center"
          className="mx-auto"
        />

        {/*
          Layout invertido a propósito respecto de la sección "Sobre
          nosotros": ahí la foto grande queda en la columna izquierda.
          Acá, en cambio, la card con foto ("El desafío") se reordena a la
          derecha en desktop vía `lg:order-2`, mientras que en el DOM sigue
          apareciendo primero (orden de lectura natural problema→solución
          para lectores de pantalla). Rompe la repetición visual de dos
          secciones seguidas con la misma composición imagen-izquierda.
        */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="border-earth/25 bg-earth/[0.04] shadow-sm lg:order-2">
            <Image
              src="/images/problema-manual.jpg"
              alt="Trabajador realizando tareas manuales en un invernadero, sin sensores ni automatización"
              width={547}
              height={365}
              className="aspect-[16/10] w-full object-cover"
            />
            <CardHeader>
              <span className="icon-chip flex size-10 items-center justify-center bg-earth/10 text-earth">
                <CircleAlert className="size-5" aria-hidden="true" />
              </span>
              <CardTitle className="text-xl">El desafío</CardTitle>
            </CardHeader>
            <CardContent className="text-sm leading-relaxed text-muted-foreground">
              La producción agrícola enfrenta desafíos relacionados con el
              monitoreo constante, la falta de automatización y de
              información en tiempo real, dificultando la toma de decisiones
              precisas y la optimización de los recursos.
            </CardContent>
          </Card>

          <Card className="border-primary/25 bg-primary/[0.04] shadow-sm lg:order-1">
            <CardHeader>
              <span className="icon-chip flex size-10 items-center justify-center bg-primary/10 text-primary">
                <Sparkles className="size-5" aria-hidden="true" />
              </span>
              <CardTitle className="text-xl">Nuestra solución</CardTitle>
            </CardHeader>
            <CardContent className="text-sm leading-relaxed text-muted-foreground">
              Nuestra solución es SIMONA, el sistema que se encarga del
              monitoreo de los cultivos en tiempo real a través de una
              aplicación conectada en la que se registran las necesidades de
              cada cultivo y se muestran recomendaciones concretas para el
              trabajador a cargo de ellos.
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
