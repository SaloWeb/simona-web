"use client"

import { QRCodeSVG } from "qrcode.react"
import { BellRing, Download, Layers, Map, Smartphone } from "lucide-react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { SectionHeading } from "@/components/section-heading"

const APK_URL = "https://simona-agtech.example/simona-app-v4.apk"
const APK_AVAILABLE = false

const specs = [
  "Kotlin Native",
  "App v4.0",
  "~18 MB",
  "Android 8.0+",
  "WorkManager Background Alerts",
]

const features = [
  {
    icon: Layers,
    title: "Gestión Multi-Huerta",
    description:
      "Administrá varias huertas o invernaderos desde una sola app, cada una con su propio nodo y perfil de cultivo.",
  },
  {
    icon: Map,
    title: "MiniMapaCapasView offline",
    description:
      "Vista de capas del terreno renderizada localmente, sin descargar tiles ni depender de conexión en el campo.",
  },
  {
    icon: BellRing,
    title: "Alertas offline cada 6 horas",
    description:
      "WorkManager despierta la app en segundo plano y notifica desvíos de humedad, pH o temperatura aunque no haya internet.",
  },
]

const steps = [
  {
    value: "paso-1",
    title: "1. Descargar el APK",
    content:
      "Descargá el archivo simona-app-v4.apk desde el botón directo o escaneando el código QR con la cámara del teléfono. El archivo pesa aproximadamente 18 MB.",
  },
  {
    value: "paso-2",
    title: "2. Habilitar instalación de orígenes desconocidos",
    content:
      "En Android 8.0 o superior: Ajustes → Aplicaciones → Acceso especial → Instalar apps desconocidas. Habilitá el permiso para tu navegador o gestor de archivos y abrí el APK descargado.",
  },
  {
    value: "paso-3",
    title: "3. Alimentar el nodo SIMONA",
    content:
      "Conectá el kit a 5V. El LED del ESP32 queda fijo cuando el Access Point ya está publicando la red WiFi local del nodo.",
  },
  {
    value: "paso-4",
    title: "4. Emparejar con el Access Point",
    content:
      "Desde los ajustes WiFi del teléfono conectate a la red SIMONA_AP. Luego abrí la app: la telemetría se sirve desde 192.168.4.1, sin registrar cuentas ni pasar por la nube.",
  },
  {
    value: "paso-5",
    title: "5. Elegir el perfil de cultivo",
    content:
      "Seleccioná el perfil agronómico (lechuga, tomate, frutilla, etc.). SIMONA carga los umbrales de humedad, temperatura, pH y luz, y activa la histéresis del relé de riego automáticamente.",
  },
]

export function DownloadSection() {
  return (
    <section
      id="descargar"
      className="border-b border-border bg-secondary/40 py-16 lg:py-24"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="SIMONA App v4"
          title="Descarga e instalación del APK"
          description="Aplicación Android nativa, liviana y pensada para usarse con las manos sucias y sin señal en el medio del campo."
        />

        <ul className="flex flex-wrap gap-2">
          {specs.map((spec) => (
            <li key={spec}>
              <Badge variant="outline" className="bg-card font-mono text-[11px]">
                {spec}
              </Badge>
            </li>
          ))}
        </ul>

        <div className="grid gap-6 lg:grid-cols-[1fr_1.15fr]">
          <Card className="border-primary/25 bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="size-5 text-primary" aria-hidden="true" />
                Obtené la app
              </CardTitle>
              <CardDescription>
                Descarga directa o escaneo en el campo.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
              {APK_AVAILABLE ? (
                <>
                  <Button
                    size="lg"
                    className="w-full"
                    render={<a href={APK_URL} download />}
                    nativeButton={false}
                  >
                    <Download data-icon="inline-start" />
                    Descargar APK (Directo)
                  </Button>

                  <div className="flex items-center gap-5 rounded-xl border border-border bg-secondary/50 p-4">
                    <div className="rounded-lg border border-border bg-card p-2.5">
                      <QRCodeSVG
                        value={APK_URL}
                        size={104}
                        level="M"
                        bgColor="#ffffff"
                        fgColor="#14532d"
                        aria-label="Código QR para descargar el APK de SIMONA"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-medium text-foreground">
                        Escaneo en el campo
                      </p>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        Apuntá la cámara del teléfono al código para bajar la app sin
                        tipear la URL.
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex flex-col gap-3 rounded-xl border border-dashed border-border bg-secondary/40 p-5">
                  <Badge variant="outline" className="w-fit gap-1.5 bg-card">
                    <Download className="size-3.5" aria-hidden="true" />
                    Disponible próximamente
                  </Badge>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    El APK todavía está en desarrollo. Cuando esté lista la
                    primera versión estable, se va a poder descargar directo
                    desde acá o escaneando un código QR en el campo.
                  </p>
                  <Button size="lg" className="w-full" disabled>
                    <Download data-icon="inline-start" />
                    Descargar APK (Próximamente)
                  </Button>
                </div>
              )}

              <ul className="flex flex-col gap-4 border-t border-border pt-5">
                {features.map((f) => (
                  <li key={f.title} className="flex items-start gap-3">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                      <f.icon className="size-4" aria-hidden="true" />
                    </span>
                    <div className="flex flex-col gap-0.5">
                      <h3 className="text-sm font-medium text-foreground">
                        {f.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {f.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Instalación y emparejamiento paso a paso</CardTitle>
              <CardDescription>
                Del APK al primer riego automático en cinco pasos.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion defaultValue={["paso-1"]}>
                {steps.map((step) => (
                  <AccordionItem key={step.value} value={step.value}>
                    <AccordionTrigger>{step.title}</AccordionTrigger>
                    <AccordionContent className="leading-relaxed text-muted-foreground">
                      {step.content}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
