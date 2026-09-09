import Image from "next/image"

import {
  IconEsp32,
  IconHumedad,
  IconLora,
  IconLuz,
  IconPh,
  IconRele,
  IconTermometro,
} from "@/components/icons/simona-icons"
import { Badge } from "@/components/ui/badge"
import {
  Panel,
  PanelContent,
  PanelDescription,
  PanelHeader,
  PanelTitle,
} from "@/components/panel"
import { SectionHeading } from "@/components/section-heading"

// Íconos propios (components/icons/simona-icons.tsx) en vez de
// lucide-react: dibujados en el mismo lenguaje visual del logo (línea +
// nodo circular), para que esta grilla —la más "de circuito" de toda la
// página— se sienta parte del isotipo en vez de pictogramas neutros.
const hardware = [
  {
    icon: IconEsp32,
    name: "Microcontrolador ESP32",
    spec: "WiFi Access Point · 192.168.4.1",
    description:
      "Cerebro del sistema. Procesa la telemetría y levanta su propia red WiFi local para que la app se conecte sin depender de internet.",
    featured: true,
  },
  {
    icon: IconHumedad,
    name: "Sensor de Humedad de Suelo",
    spec: "Lectura continua · variable principal de riego",
    description:
      "Determina el contenido de agua del suelo en tiempo real. Es la variable que dispara la lógica de histéresis del riego automático.",
  },
  {
    icon: IconTermometro,
    name: "Sensor DHT11",
    spec: "Temperatura + humedad ambiente",
    description:
      "Monitorea las condiciones del aire dentro del invernadero o a cielo abierto para contextualizar el riego.",
  },
  {
    icon: IconPh,
    name: "Sensor de pH de Suelo",
    spec: "Medición manual por muestra",
    description:
      "Se usa por muestra (extracto de suelo con agua destilada) en lugar de quedar enterrado de forma continua, para una lectura más precisa y sin desgaste del electrodo. Detecta acidez o alcalinidad fuera de rango para el perfil de cultivo seleccionado.",
  },
  {
    icon: IconLuz,
    name: "Sensor de Luz LDR",
    spec: "Escala 0 – 950 lux",
    description:
      "Mide la radiación disponible y evita riegos en los picos de insolación donde el agua se evapora sin llegar a la raíz.",
  },
  {
    icon: IconRele,
    name: "Módulo Relé de Riego",
    spec: "Accionamiento electromecánico",
    description:
      "Cierra el circuito de la bomba de agua de forma autónoma cuando la humedad cae por debajo del umbral del perfil.",
  },
]

export function HardwareSection() {
  return (
    <section id="solucion" className="border-b border-border py-16 lg:py-24">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Arquitectura de Hardware"
          title="Kit SIMONA: todo lo que el cultivo necesita medir."
          description="Una sola caja, cuatro sensores agronómicos y un relé que actúa. Sin servidores, sin suscripciones y sin dependencia de la señal del campo."
        />

        {/* trace-panel: mismo recorte de 4 esquinas que el Nodo del hero,
            para que esta sección —el hardware físico en sí— comparta la
            firma visual del panel que lo representa ahí arriba. */}
        <div className="trace-panel relative overflow-hidden border border-trace/30">
          <Image
            src="/images/vivero-plantines.jpg"
            alt="Huerta urbana en macetas y neumáticos reciclados, con lechugas y aromáticas"
            width={678}
            height={452}
            sizes="(min-width: 1024px) 1200px, 100vw"
            loading="lazy"
            className="aspect-[21/9] w-full object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/70 to-transparent p-4 sm:p-5">
            <p className="max-w-md text-sm leading-relaxed text-primary-foreground">
              También pensado para la huerta de patio: un kit por macetero
              o tacho, monitoreando humedad y luz maceta por maceta.
            </p>
          </div>
        </div>

        {/*
          Regla de color del sistema: el turquesa "trace" (leído de los
          nodos de circuito del logo real) se reserva para hardware/
          circuito físico, a diferencia del verde de marca que en el
          resto del sitio representa cultivo/software. Por eso los chips
          de ícono y las etiquetas "spec" de este grid pasan de accent
          (verde) a trace — es la sección que más literalmente es
          "circuito", así que es donde ese acento gana sentido.
        */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {hardware.map((item) =>
            item.featured ? (
              <Panel
                key={item.name}
                tone="console"
                className="md:col-span-2 lg:col-span-2"
              >
                <PanelHeader>
                  <div className="flex items-center gap-3">
                    <span className="icon-chip flex size-12 items-center justify-center bg-trace text-trace-foreground">
                      <item.icon className="size-6" />
                    </span>
                    <Badge
                      variant="outline"
                      className="w-fit gap-1.5 border-trace/40 bg-console text-console-foreground"
                    >
                      Núcleo del sistema
                    </Badge>
                  </div>
                  <PanelTitle className="text-balance text-xl text-console-foreground">
                    {item.name}
                  </PanelTitle>
                  {/* Mismo tratamiento font-readout que la línea
                      "192.168.4.1 · sin internet" del Nodo del hero: es
                      literalmente la misma IP, así que se lee como el
                      mismo instrumento visto de nuevo. */}
                  <PanelDescription className="font-readout text-[11px] uppercase tracking-wide text-trace">
                    {item.spec}
                  </PanelDescription>
                </PanelHeader>
                <PanelContent className="max-w-2xl text-sm leading-relaxed text-console-foreground/70">
                  {item.description}
                </PanelContent>
              </Panel>
            ) : (
              <Panel key={item.name} className="h-full">
                <PanelHeader>
                  <span className="icon-chip flex size-10 items-center justify-center border border-trace/30 bg-trace/10 text-trace">
                    <item.icon className="size-5" />
                  </span>
                  <PanelTitle className="text-balance">{item.name}</PanelTitle>
                  <PanelDescription className="font-mono text-[11px] uppercase tracking-wide text-trace">
                    {item.spec}
                  </PanelDescription>
                </PanelHeader>
                <PanelContent className="text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </PanelContent>
              </Panel>
            ),
          )}

          {/*
            El badge "Próximamente: SIMONA Pro" vivía suelto arriba a la
            derecha del heading, compitiendo visualmente con el título.
            Ahora cierra el grid como una card más (con estilo punteado
            para diferenciarla del hardware actual), donde tiene contexto:
            aparece justo después de todo el kit que sí existe hoy.
            Mantiene el verde de marca (accent) en vez de trace: todavía
            no es hardware real, es roadmap — el color marca esa distinción.
          */}
          <Panel accent="accent" className="h-full border-dashed">
            <PanelHeader>
              <span className="icon-chip flex size-10 items-center justify-center bg-accent/15 text-accent">
                <IconLora className="size-5" />
              </span>
              <Badge
                variant="outline"
                className="w-fit gap-1.5 border-accent/30 bg-card text-accent"
              >
                Próximamente
              </Badge>
              <PanelTitle className="text-balance">SIMONA Pro</PanelTitle>
              <PanelDescription className="font-mono text-[11px] uppercase tracking-wide text-accent">
                Escalabilidad LoRa
              </PanelDescription>
            </PanelHeader>
            <PanelContent className="text-sm leading-relaxed text-muted-foreground">
              Una versión pensada para predios más grandes, con alcance
              extendido entre kits sin depender de WiFi punto a punto.
            </PanelContent>
          </Panel>
        </div>
      </div>
    </section>
  )
}
