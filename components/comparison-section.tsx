import { Leaf } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { SectionHeading } from "@/components/section-heading"

const criteria = [
  {
    label: "Enfoque",
    simona: "Quinta, viveros y pymes",
    corporate: "Gran campo de soja",
    domestic: "Hogares y domótica indoor",
    manual: "Tradicional sin sensores",
  },
  {
    label: "Costo",
    simona: "Económico · pago único",
    corporate: "Prohibitivo por hectárea",
    domestic: "Bajo costo inicial",
    manual: "Reactivo / ineficiente",
  },
  {
    label: "Resistencia outdoor",
    simona: "Hardware duradero",
    corporate: "Industrial de alto costo",
    domestic: "Se oxidan y rompen rápido",
    manual: "N/A",
  },
  {
    label: "Conectividad",
    simona: "100% offline (WiFi local)",
    corporate: "Requiere servidor en la nube",
    domestic: "Requiere internet constante",
    manual: "Sin conexión",
  },
  {
    label: "Inteligencia",
    simona: "Histéresis + riego automático",
    corporate: "Solo recomendación / reporte",
    domestic: "Riego ciego por hora fijada",
    manual: "Decisiones con margen de error",
  },
] as const

type CompetitorKey = "simona" | "corporate" | "domestic" | "manual"

// Misma data que alimenta la tabla, reagrupada por competidor — así la
// vista de cards de mobile no duplica contenido, solo lo reordena.
const competitors: { key: CompetitorKey; name: string; highlight?: boolean }[] = [
  { key: "simona", name: "SIMONA AgTech", highlight: true },
  { key: "corporate", name: "AgTech Corporativas" },
  { key: "domestic", name: "Kits Domésticos (Tuya / Sonoff)" },
  { key: "manual", name: "Monitoreo Manual / Reloj Analógico" },
]

export function ComparisonSection() {
  return (
    <section
      id="comparativa"
      className="section-texture border-b border-border bg-secondary/40 py-16 lg:py-24"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Análisis Competitivo"
          title="Matriz comparativa de mercado"
          description="Dónde se para SIMONA frente a las alternativas que hoy tiene el productor argentino."
        />

        {/*
          Mobile (< md): cards apiladas, una por competidor, con SIMONA
          destacada arriba — evita forzar el scroll horizontal de una
          tabla de 5 columnas en la pantalla donde más tráfico entra.
          Desktop (>= md): la tabla original, más apta para comparar
          columna por columna de un vistazo.
        */}
        <div className="flex flex-col gap-4 md:hidden">
          {competitors.map((competitor) => (
            <Card
              key={competitor.key}
              className={
                competitor.highlight
                  ? "border-primary/30 bg-primary/[0.05] shadow-sm"
                  : "shadow-sm"
              }
            >
              <CardHeader className="flex-row items-center justify-between gap-3 space-y-0">
                <CardTitle
                  className={
                    competitor.highlight
                      ? "flex items-center gap-1.5 text-primary"
                      : undefined
                  }
                >
                  {competitor.highlight ? (
                    <Leaf className="size-4 shrink-0" aria-hidden="true" />
                  ) : null}
                  {competitor.name}
                </CardTitle>
                {competitor.highlight ? (
                  <Badge className="shrink-0">SIMONA</Badge>
                ) : null}
              </CardHeader>
              <CardContent>
                <dl className="flex flex-col gap-3">
                  {criteria.map((row) => (
                    <div
                      key={row.label}
                      className="flex flex-col gap-0.5 border-t border-border/70 pt-3 first:border-t-0 first:pt-0"
                    >
                      <dt className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
                        {row.label}
                      </dt>
                      <dd
                        className={
                          competitor.highlight
                            ? "text-sm font-medium text-foreground"
                            : "text-sm text-muted-foreground"
                        }
                      >
                        {row[competitor.key]}
                      </dd>
                    </div>
                  ))}
                </dl>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="hidden overflow-hidden rounded-xl border border-border bg-card md:block">
          <div className="overflow-x-auto">
            <Table className="min-w-[860px]">
              <TableHeader>
                <TableRow className="bg-secondary/60 hover:bg-secondary/60">
                  <TableHead className="w-[180px] font-mono text-[11px] uppercase tracking-wide">
                    Criterio
                  </TableHead>
                  <TableHead className="bg-primary/[0.07] text-foreground">
                    <span className="flex items-center gap-1.5 font-semibold text-primary">
                      <Leaf className="size-4" aria-hidden="true" />
                      SIMONA AgTech
                    </span>
                  </TableHead>
                  <TableHead>AgTech Corporativas</TableHead>
                  <TableHead>Kits Domésticos (Tuya / Sonoff)</TableHead>
                  <TableHead>Monitoreo Manual / Reloj Analógico</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {criteria.map((row) => (
                  <TableRow key={row.label}>
                    <TableCell className="font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
                      {row.label}
                    </TableCell>
                    <TableCell className="bg-primary/[0.07] font-medium text-foreground">
                      {row.simona}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {row.corporate}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {row.domestic}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {row.manual}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <p className="border-t border-border px-4 py-3 font-mono text-xs text-muted-foreground">
            Desplazá la tabla horizontalmente para ver todas las columnas en
            pantallas chicas.
          </p>
        </div>
      </div>
    </section>
  )
}
