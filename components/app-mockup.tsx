import { Apple, Carrot, Flower2, Leaf, Sprout, Wind } from "lucide-react"

/**
 * Mockup de la pantalla "Elegí un perfil de cultivo" hecho en código real
 * en vez de una captura de pantalla (que además estaba rota). Ventaja
 * extra: no depende de un archivo de imagen, así que nunca se rompe, y
 * queda 100% en la paleta de marca.
 */
const mockProfiles = [
  { icon: Leaf, name: "Hoja", range: "40–65 %" },
  { icon: Apple, name: "Fruto", range: "35–60 %" },
  { icon: Carrot, name: "Raíz", range: "30–55 %" },
  { icon: Flower2, name: "Flor", range: "40–65 %" },
  { icon: Wind, name: "Aromáticas", range: "25–45 %" },
  { icon: Sprout, name: "Personalizado", range: "A definir" },
]

export function AppMockup() {
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
