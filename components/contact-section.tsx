"use client"

import * as React from "react"
import { CheckCircle2, GraduationCap, Landmark, Send, Warehouse } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { SectionHeading } from "@/components/section-heading"

const audiences = [
  {
    icon: Warehouse,
    title: "Invernaderos y viveros",
    description: "Producción intensiva bajo cubierta con riego programado.",
  },
  {
    icon: GraduationCap,
    title: "Escuelas técnicas",
    description: "Kits didácticos de IoT y agronomía para el aula y la huerta.",
  },
  {
    icon: Landmark,
    title: "Proyectos de agricultura municipal",
    description: "Huertas comunitarias y programas de soberanía alimentaria.",
  },
]

export function ContactSection() {
  const [sent, setSent] = React.useState(false)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSent(true)
  }

  return (
    <section id="contacto" className="border-b border-border py-16 lg:py-24">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Contacto B2B"
          title="Solicitá tu Kit SIMONA"
          description="Contanos sobre tu producción y armamos una propuesta con la cantidad de nodos y perfiles que necesitás. Sin cánones ni cargos por hectárea."
        />

        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <ul className="flex flex-col gap-4">
            {audiences.map((a) => (
              <li key={a.title}>
                <Card className="h-full border-earth/25 bg-earth/[0.05]">
                  <CardContent className="flex items-start gap-4">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-earth/10 text-earth">
                      <a.icon className="size-5" aria-hidden="true" />
                    </span>
                    <div className="flex flex-col gap-1">
                      <h3 className="font-medium text-foreground">{a.title}</h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {a.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>

          <Card>
            <CardHeader>
              <CardTitle>Formulario de contacto</CardTitle>
              <CardDescription>
                Respondemos con especificaciones técnicas y presupuesto de kit.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {sent ? (
                <div className="flex flex-col items-start gap-4 rounded-xl border border-primary/30 bg-primary/[0.06] p-6">
                  <span className="icon-chip flex size-11 items-center justify-center bg-primary text-primary-foreground">
                    <CheckCircle2 className="size-6" aria-hidden="true" />
                  </span>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-lg font-medium text-foreground">
                      Consulta registrada
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      Gracias por tu interés en SIMONA. Vamos a contactarte con la
                      especificación del kit y los tiempos de entrega.
                    </p>
                  </div>
                  <Button variant="outline" onClick={() => setSent(false)}>
                    Enviar otra consulta
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <FieldGroup>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field>
                        <FieldLabel htmlFor="nombre">
                          Nombre y apellido
                        </FieldLabel>
                        <Input
                          id="nombre"
                          name="nombre"
                          autoComplete="name"
                          placeholder="Ej. María González"
                          required
                        />
                      </Field>
                      <Field>
                        <FieldLabel htmlFor="organizacion">
                          Organización
                        </FieldLabel>
                        <Input
                          id="organizacion"
                          name="organizacion"
                          autoComplete="organization"
                          placeholder="Ej. Vivero Los Hornos"
                        />
                      </Field>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field>
                        <FieldLabel htmlFor="email">Email</FieldLabel>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          placeholder="nombre@ejemplo.com.ar"
                          required
                        />
                      </Field>
                      <Field>
                        <FieldLabel htmlFor="telefono">Teléfono</FieldLabel>
                        <Input
                          id="telefono"
                          name="telefono"
                          type="tel"
                          autoComplete="tel"
                          placeholder="+54 11 0000 0000"
                        />
                      </Field>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field>
                        <FieldLabel htmlFor="segmento">Segmento</FieldLabel>
                        <Select name="segmento" defaultValue="invernadero">
                          <SelectTrigger id="segmento">
                            <SelectValue placeholder="Elegí un segmento" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="invernadero">
                                Invernadero / vivero
                              </SelectItem>
                              <SelectItem value="quinta">
                                Quinta o pyme agrícola
                              </SelectItem>
                              <SelectItem value="escuela">
                                Escuela técnica
                              </SelectItem>
                              <SelectItem value="municipal">
                                Proyecto municipal
                              </SelectItem>
                              <SelectItem value="urbana">
                                Huerta urbana
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </Field>
                      <Field>
                        <FieldLabel htmlFor="nodos">
                          Cantidad de nodos estimada
                        </FieldLabel>
                        <Input
                          id="nodos"
                          name="nodos"
                          type="number"
                          min={1}
                          max={500}
                          defaultValue={1}
                        />
                      </Field>
                    </div>

                    <Field>
                      <FieldLabel htmlFor="mensaje">
                        Contanos sobre tu producción
                      </FieldLabel>
                      <Textarea
                        id="mensaje"
                        name="mensaje"
                        rows={4}
                        placeholder="Superficie, tipo de cultivo, si ya tenés bomba de riego instalada..."
                      />
                      <FieldDescription>
                        Cuanto más detalle nos des, más precisa es la
                        especificación del kit.
                      </FieldDescription>
                    </Field>

                    <Button type="submit" size="lg" className="w-full sm:w-fit">
                      <Send data-icon="inline-start" />
                      Enviar consulta
                    </Button>
                  </FieldGroup>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
