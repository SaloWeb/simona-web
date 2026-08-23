import Image from "next/image"
import {
  Cpu,
  Droplet,
  FlaskConical,
  Radio,
  Sun,
  Thermometer,
  Zap,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { SectionHeading } from "@/components/section-heading"

const hardware = [
  {
    icon: Cpu,
    name: "Microcontrolador ESP32",
    spec: "WiFi Access Point · 192.168.4.1",
    description:
      "Cerebro del sistema. Procesa la telemetría y levanta su propia red WiFi local para que la app se conecte sin depender de internet.",
    featured: true,
  },
  {
    icon: Droplet,
    name: "Sensor de Humedad de Suelo",
    spec: "Lectura continua · variable principal de riego",
    description:
      "Determina el contenido de agua del suelo en tiempo real. Es la variable que dispara la lógica de histéresis del riego automático.",
  },
  {
    icon: Thermometer,
    name: "Sensor DHT11",
    spec: "Temperatura + humedad ambiente",
    description:
      "Monitorea las condiciones del aire dentro del invernadero o a cielo abierto para contextualizar el riego.",
  },
  {
    icon: FlaskConical,
    name: "Sensor de pH de Suelo",
    spec: "Medición manual por muestra",
    description:
      "Se usa por muestra (extracto de suelo con agua destilada) en lugar de quedar enterrado de forma continua, para una lectura más precisa y sin desgaste del electrodo. Detecta acidez o alcalinidad fuera de rango para el perfil de cultivo seleccionado.",
  },
  {
    icon: Sun,
    name: "Sensor de Luz LDR",
    spec: "Escala 0 – 950 lux",
    description:
      "Mide la radiación disponible y evita riegos en los picos de insolación donde el agua se evapora sin llegar a la raíz.",
  },
  {
    icon: Zap,
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
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Arquitectura de Hardware"
            title="Kit SIMONA: todo lo que el cultivo necesita medir."
            description="Una sola caja, cinco variables agronómicas y un relé que actúa. Sin servidores, sin suscripciones y sin dependencia de la señal del campo."
          />
          <Badge
            variant="outline"
            className="w-fit shrink-0 gap-1.5 border-accent/30 bg-accent/10 py-1.5 text-accent"
          >
            <Radio className="size-3.5" aria-hidden="true" />
            Próximamente: SIMONA Pro — escalabilidad LoRa
          </Badge>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-border">
          <Image
            src="/images/vivero-plantines.jpg"
            alt="Filas de plantines en un vivero bajo malla media sombra"
            width={678}
            height={452}
            className="aspect-[21/9] w-full object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/70 to-transparent p-4 sm:p-5">
            <p className="max-w-md text-sm leading-relaxed text-primary-foreground">
              Pensado también para viveros: un kit por túnel o sector,
              monitoreando humedad y luz fila por fila.
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {hardware.map((item) =>
            item.featured ? (
              <Card
                key={item.name}
                className="h-full border-primary/30 bg-primary/[0.05] shadow-sm md:col-span-2 lg:col-span-2"
              >
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <span className="icon-chip flex size-12 items-center justify-center bg-primary text-primary-foreground">
                      <item.icon className="size-6" aria-hidden="true" />
                    </span>
                    <Badge
                      variant="outline"
                      className="w-fit gap-1.5 border-primary/40 bg-card text-primary"
                    >
                      Núcleo del sistema
                    </Badge>
                  </div>
                  <CardTitle className="text-balance text-xl">
                    {item.name}
                  </CardTitle>
                  <CardDescription className="font-mono text-[11px] uppercase tracking-wide text-primary">
                    {item.spec}
                  </CardDescription>
                </CardHeader>
                <CardContent className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </CardContent>
              </Card>
            ) : (
              <Card key={item.name} className="h-full shadow-sm">
                <CardHeader>
                  <span className="icon-chip flex size-10 items-center justify-center bg-accent/15 text-accent">
                    <item.icon className="size-5" aria-hidden="true" />
                  </span>
                  <CardTitle className="text-balance">{item.name}</CardTitle>
                  <CardDescription className="font-mono text-[11px] uppercase tracking-wide text-accent">
                    {item.spec}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </CardContent>
              </Card>
            ),
          )}
        </div>
      </div>
    </section>
  )
}
