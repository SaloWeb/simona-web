import { ArrowLeftRight, Brain, Signal, Wifi } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { SectionHeading } from "@/components/section-heading"

export function AiSection() {
  return (
    <section className="border-b border-border py-16 lg:py-24">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Inteligencia Agronómica"
          title="Diagnóstico con IA sin perder el control local"
          description="Aunque tu celular use datos móviles para consultarle a la IA una recomendación, el riego nunca se corta: la lógica de automatización vive en el ESP32, no en el teléfono. SIMONA combina la telemetría local con diagnósticos agronómicos generados por Gemini 2.0 Flash."
        />

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="border-primary/25 bg-primary/[0.04] shadow-sm">
            <CardHeader>
              <span className="icon-chip flex size-10 items-center justify-center bg-primary text-primary-foreground">
                <Wifi className="size-5" aria-hidden="true" />
              </span>
              <CardTitle>Red 1 — WiFi local</CardTitle>
              <CardDescription className="font-mono text-[11px] uppercase tracking-wide text-primary">
                ESP32 Access Point · 192.168.4.1
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm leading-relaxed text-muted-foreground">
              Lectura de sensores en tiempo real y accionamiento del relé. Si el
              teléfono se queda sin señal, el riego automático sigue funcionando
              igual: la lógica vive en el microcontrolador.
            </CardContent>
          </Card>

          <Card className="border-border shadow-sm">
            <CardHeader>
              <span className="icon-chip flex size-10 items-center justify-center bg-secondary text-primary/70">
                <ArrowLeftRight className="size-5" aria-hidden="true" />
              </span>
              <CardTitle>Puente dual-network</CardTitle>
              <CardDescription className="font-mono text-[11px] uppercase tracking-wide text-primary/70">
                Android Network Binding
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm leading-relaxed text-muted-foreground">
              La app usa las dos redes al mismo tiempo: mantiene la conexión
              con el nodo por WiFi y, en paralelo, sale a internet por datos
              móviles para la consulta de IA. No hace falta desconectarse del
              nodo para pedir una recomendación.
            </CardContent>
          </Card>

          <Card className="border-primary/40 bg-primary/[0.08] shadow-sm">
            <CardHeader>
              <span className="icon-chip flex size-10 items-center justify-center bg-primary/80 text-primary-foreground">
                <Brain className="size-5" aria-hidden="true" />
              </span>
              <CardTitle>Red 2 — Datos móviles</CardTitle>
              <CardDescription className="font-mono text-[11px] uppercase tracking-wide text-primary">
                Gemini 2.0 Flash
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm leading-relaxed text-muted-foreground">
              Envía el snapshot de humedad, temperatura, pH y luz junto al perfil
              del cultivo, y devuelve un diagnóstico agronómico accionable en
              lenguaje claro.
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-wrap items-center gap-3 rounded-xl border border-border bg-secondary/50 p-4">
          <Badge variant="outline" className="gap-1.5 bg-card">
            <Signal className="size-3.5 text-primary" aria-hidden="true" />
            Telemetría local ininterrumpida
          </Badge>
          <Badge variant="outline" className="bg-card">
            Riego autónomo sin la app abierta
          </Badge>
          <Badge variant="outline" className="bg-card">
            IA opcional: si no hay señal, SIMONA no se detiene
          </Badge>
        </div>
      </div>
    </section>
  )
}
