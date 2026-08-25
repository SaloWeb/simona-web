"use client"

import * as React from "react"
import { track } from "@vercel/analytics"
import {
  CheckCircle2,
  GraduationCap,
  Landmark,
  Send,
  Warehouse,
} from "lucide-react"

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
  const [status, setStatus] = React.useState<"idle" | "sending" | "sent" | "error">("idle")
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus("sending")
    setErrorMessage(null)

    const formData = new FormData(event.currentTarget)
    const payload = Object.fromEntries(formData.entries())

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const data = await response.json().catch(() => null)
        setErrorMessage(data?.error ?? "No se pudo enviar el mensaje. Probá de nuevo.")
        setStatus("error")
        track("Contact form error", {
          segmento: String(payload.segmento ?? ""),
          status: response.status,
        })
        return
      }

      setStatus("sent")
      track("Contact form submitted", {
        segmento: String(payload.segmento ?? ""),
      })
    } catch {
      setErrorMessage("No se pudo conectar con el servidor. Revisá tu conexión e intentá de nuevo.")
      setStatus("error")
      track("Contact form error", { segmento: String(payload.segmento ?? ""), status: "network" })
    }
  }

  return (
    <section id="contacto" className="bg-foreground py-16 text-background lg:py-24">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-4 sm:px-6 lg:px-8">
        <SectionHeading
          tone="inverted"
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
                    <span className="icon-chip flex size-10 shrink-0 items-center justify-center bg-earth/10 text-earth">
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
              <div className="flex flex-col gap-1">
                <CardTitle>Formulario de contacto</CardTitle>
                <CardDescription>
                  Respondemos con especificaciones técnicas y presupuesto de
                  kit.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              {status === "sent" ? (
                <div className="flex flex-col items-start gap-4 rounded-xl border border-primary/30 bg-primary/[0.06] p-6">
                  <span className="icon-chip flex size-11 items-center justify-center bg-primary text-primary-foreground">
                    <CheckCircle2 className="size-6" aria-hidden="true" />
                  </span>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-lg font-medium text-foreground">
                      Consulta enviada
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      Recibimos tus datos y te vamos a responder por mail con
                      especificaciones técnicas y presupuesto del kit.
                    </p>
                  </div>
                  <Button variant="outline" onClick={() => setStatus("idle")}>
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

                    {status === "error" && errorMessage ? (
                      <p
                        role="alert"
                        className="rounded-lg border border-destructive/30 bg-destructive/[0.06] px-3.5 py-2.5 text-sm text-destructive"
                      >
                        {errorMessage}
                      </p>
                    ) : null}

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full sm:w-fit"
                      disabled={status === "sending"}
                    >
                      <Send data-icon="inline-start" />
                      {status === "sending" ? "Enviando..." : "Enviar consulta"}
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
