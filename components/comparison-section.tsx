import { Leaf } from "lucide-react"

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
]

export function ComparisonSection() {
  return (
    <section
      id="comparativa"
      className="border-b border-border bg-secondary/40 py-16 lg:py-24"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Análisis Competitivo"
          title="Matriz comparativa de mercado"
          description="Dónde se para SIMONA frente a las alternativas que hoy tiene el productor argentino."
        />

        <div className="overflow-hidden rounded-xl border border-border bg-card">
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
        </div>
        <p className="font-mono text-xs text-muted-foreground">
          Desplazá la tabla horizontalmente para ver todas las columnas en
          pantallas chicas.
        </p>
      </div>
    </section>
  )
}
