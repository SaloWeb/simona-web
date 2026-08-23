import { Apple, Carrot, Flower2, Leaf, Sprout, Wind } from "lucide-react"

/**
 * Mockups de pantallas reales de la app, hechos en código en vez de
 * capturas de pantalla (que además estaban rotas). Ventaja extra: no
 * dependen de un archivo de imagen, así que nunca se rompen, y quedan
 * 100% en la paleta de marca.
 *
 * Dos variantes para no repetir la misma pantalla en Hero y en Perfiles:
 * - "perfiles": paso 1, elegir el perfil de cultivo (usada en el Hero).
 * - "rangos": paso 2, ajustar los umbrales con sliders (usada en la
 *   sección Perfiles, así cada aparición del teléfono cuenta algo
 *   distinto del producto).
 */
const mockProfiles = [
  { icon: Leaf, name: "Hoja", range: "40–65 %" },
  { icon: Apple, name: "Fruto", range: "35–60 %" },
  { icon: Carrot, name: "Raíz", range: "30–55 %" },
  { icon: Flower2, name: "Flor", range: "40–65 %" },
  { icon: Wind, name: "Aromáticas", range: "25–45 %" },
  { icon: Sprout, name: "Personalizado", range: "A definir" },
]

const mockRanges = [
  { label: "Humedad del suelo", unit: "%", min: 35, max: 60, low: 15, high: 85 },
  { label: "pH del suelo", unit: "", min: 6.0, max: 6.8, low: 30, high: 70 },
  { label: "Luminosidad", unit: " lux", min: 500, max: 850, low: 45, high: 90 },
  { label: "Temperatura", unit: "°C", min: 18, max: 28, low: 25, high: 75 },
]

interface AppMockupProps {
  variant?: "perfiles" | "rangos"
}

export function AppMockup({ variant = "perfiles" }: AppMockupProps) {
  if (variant === "rangos") {
    return (
      <div className="flex h-full w-full flex-col bg-card">
        {/* barra de estado simulada */}
        <div className="flex items-center justify-between px-4 pb-1 pt-2.5 font-mono text-[9px] text-muted-foreground">
          <span>9:41</span>
          <span className="flex items-center gap-1">
            <span className="size-1.5 rounded-full bg-primary" />
            SIMONA
          </span>
        </div>

        {/* encabezado azul, igual criterio que el resto de la marca */}
        <div className="bg-gradient-to-br from-primary to-primary/80 px-4 py-4 text-primary-foreground">
          <p className="text-[15px] font-semibold leading-tight">Ajustá los rangos</p>
          <p className="mt-0.5 text-[11px] opacity-85">Paso 2 de 3 · 🍅 Fruto</p>
        </div>

        <div className="flex flex-col gap-3.5 p-3.5">
          {mockRanges.map((r) => (
            <div key={r.label} className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10.5px] font-medium leading-tight text-foreground">
                  {r.label}
                </span>
                <span className="font-mono text-[10px] text-muted-foreground">
                  {r.min}
                  {r.unit}–{r.max}
                  {r.unit}
                </span>
              </div>
              <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="absolute inset-y-0 rounded-full bg-primary"
                  style={{ left: `${r.low}%`, right: `${100 - r.high}%` }}
                />
                <div
                  className="absolute top-1/2 size-3 -translate-y-1/2 rounded-full border-2 border-primary bg-card shadow-sm"
                  style={{ left: `${r.low}%`, transform: "translate(-50%, -50%)" }}
                />
                <div
                  className="absolute top-1/2 size-3 -translate-y-1/2 rounded-full border-2 border-primary bg-card shadow-sm"
                  style={{ left: `${r.high}%`, transform: "translate(-50%, -50%)" }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-auto p-3">
          <div className="rounded-lg bg-primary py-2.5 text-center text-[12px] font-medium text-primary-foreground">
            Guardar y continuar
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-full w-full flex-col bg-card">
      {/* barra de estado simulada */}
      <div className="flex items-center justify-between px-4 pb-1 pt-2.5 font-mono text-[9px] text-muted-foreground">
        <span>9:41</span>
        <span className="flex items-center gap-1">
          <span className="size-1.5 rounded-full bg-primary" />
          SIMONA
        </span>
      </div>

      {/* encabezado azul, igual criterio que el resto de la marca */}
      <div className="bg-gradient-to-br from-primary to-primary/80 px-4 py-4 text-primary-foreground">
        <p className="text-[15px] font-semibold leading-tight">Elegí un perfil</p>
        <p className="mt-0.5 text-[11px] opacity-85">Paso 1 de 3 · ajustable después</p>
      </div>

      <div className="grid grid-cols-2 gap-2.5 p-3">
        {mockProfiles.map((p) => (
          <div
            key={p.name}
            className="flex flex-col items-center gap-1.5 rounded-xl border border-border bg-background p-3 text-center"
          >
            <span className="flex size-8 items-center justify-center rounded-lg bg-accent/15 text-accent">
              <p.icon className="size-4" aria-hidden="true" />
            </span>
            <span className="text-[11px] font-medium leading-tight text-foreground">
              {p.name}
            </span>
            <span className="font-mono text-[9px] text-muted-foreground">{p.range}</span>
          </div>
        ))}
      </div>

      <div className="mt-auto p-3">
        <div className="rounded-lg bg-primary py-2.5 text-center text-[12px] font-medium text-primary-foreground">
          Usar valores recomendados
        </div>
      </div>
    </div>
  )
}
