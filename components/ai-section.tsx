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

/**
 * Diagrama de las 2 redes que usa el teléfono al mismo tiempo (sección
 * "Puente dual-network" más abajo). Antes esto solo se explicaba en
 * prosa dentro de las 3 cards; un vistazo al dibujo comunica la idea
 * de "un teléfono, dos redes simultáneas" más rápido que el texto.
 */
function DualNetworkDiagram() {
  return (
    <svg
      viewBox="0 0 600 170"
      className="mx-auto w-full max-w-xl"
      role="img"
      aria-labelledby="dual-network-title"
    >
      <title id="dual-network-title">
        El teléfono se conecta al mismo tiempo por WiFi local al ESP32 para
        el riego, y por datos móviles a internet para la IA.
      </title>

      {/* línea izquierda: teléfono → ESP32 (WiFi local) */}
      <line
        x1="255"
        y1="85"
        x2="115"
        y2="85"
        className="stroke-primary"
        strokeWidth="2"
        strokeDasharray="5 5"
      />
      <polygon points="105,85 118,79 118,91" className="fill-primary" />

      {/* línea derecha: teléfono → IA / internet (datos móviles) */}
      <line
        x1="345"
        y1="85"
        x2="485"
        y2="85"
        className="stroke-primary/70"
        strokeWidth="2"
        strokeDasharray="5 5"
      />
      <polygon
        points="495,85 482,79 482,91"
        className="fill-primary/70"
      />

      {/* nodo izquierdo: ESP32 / riego */}
      <g>
        <circle cx="70" cy="85" r="44" className="fill-primary/10 stroke-primary/30" strokeWidth="1.5" />
        <text
          x="70"
          y="79"
          textAnchor="middle"
          className="fill-primary font-sans text-[13px] font-semibold"
        >
          ESP32
        </text>
        <text
          x="70"
          y="96"
          textAnchor="middle"
          className="fill-muted-foreground font-mono text-[9px] uppercase"
        >
          Riego
        </text>
      </g>

      {/* nodo central: teléfono */}
      <g>
        <rect
          x="255"
          y="45"
          width="90"
          height="80"
          rx="16"
          className="fill-card stroke-foreground/25"
          strokeWidth="1.5"
        />
        <rect x="270" y="58" width="60" height="42" rx="4" className="fill-secondary" />
        <circle cx="300" cy="111" r="4" className="fill-foreground/40" />
        <text
          x="300"
          y="140"
          textAnchor="middle"
          className="fill-foreground font-sans text-[12px] font-semibold"
        >
          App SIMONA
        </text>
      </g>

      {/* nodo derecho: IA / internet */}
      <g>
        <circle cx="530" cy="85" r="44" className="fill-primary/10 stroke-primary/30" strokeWidth="1.5" />
        <text
          x="530"
          y="79"
          textAnchor="middle"
          className="fill-primary font-sans text-[13px] font-semibold"
        >
          IA
        </text>
        <text
          x="530"
          y="96"
          textAnchor="middle"
          className="fill-muted-foreground font-mono text-[9px] uppercase"
        >
          Internet
        </text>
      </g>

      {/* etiquetas de las redes, sobre cada línea */}
      <text
        x="185"
        y="70"
        textAnchor="middle"
        className="fill-primary font-mono text-[9px] font-medium uppercase tracking-wide"
      >
        WiFi local
      </text>
      <text
        x="415"
        y="70"
        textAnchor="middle"
        className="fill-primary/70 font-mono text-[9px] font-medium uppercase tracking-wide"
      >
        Datos móviles
      </text>
    </svg>
  )
}

export function AiSection() {
  return (
    /*
      Sección de acento de marca (fondo primary + texto claro), a
      propósito distinta del patrón bg-secondary/40 ⇄ sin-fondo que se
      repite en el resto del sitio. Cae después de 7 secciones seguidas
      con fondos claros, así que funciona como un punto de énfasis visual
      a mitad del recorrido de scroll en vez de una alternancia más del
      mismo patrón.
    */
    <section className="border-b border-primary-foreground/10 bg-gradient-to-br from-primary to-primary/85 py-16 lg:py-24">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-4 sm:px-6 lg:px-8">
        <SectionHeading
          tone="inverted"
          eyebrow="Inteligencia Agronómica"
          title="Diagnóstico con IA sin perder el control local"
          description="Aunque tu celular use datos móviles para consultarle a la IA una recomendación, el riego nunca se corta: la lógica de automatización vive en el ESP32, no en el teléfono. SIMONA combina la telemetría local con diagnósticos agronómicos generados por Gemini 2.0 Flash."
        />

        <div className="rounded-2xl border border-border bg-card px-4 py-8 shadow-sm sm:px-8">
          <DualNetworkDiagram />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="border-primary/25 bg-card shadow-md">
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

          <Card className="border-border bg-card shadow-md">
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

          <Card className="border-primary/40 bg-card shadow-md">
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

        <div className="flex flex-wrap items-center gap-3 rounded-xl border border-border bg-card p-4 shadow-sm">
          <Badge variant="outline" className="gap-1.5 bg-secondary/60">
            <Signal className="size-3.5 text-primary" aria-hidden="true" />
            Telemetría local ininterrumpida
          </Badge>
          <Badge variant="outline" className="bg-secondary/60">
            Riego autónomo sin la app abierta
          </Badge>
          <Badge variant="outline" className="bg-secondary/60">
            IA opcional: si no hay señal, SIMONA no se detiene
          </Badge>
        </div>
      </div>
    </section>
  )
}
