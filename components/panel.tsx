import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Panel — reemplaza al Card genérico de shadcn en todo el sitio (Plan de
 * mejora visual, paso 1). Mismo motivo que .icon-chip/.trace-panel/el
 * Nodo del hero: esquina cortada en vez de rounded-lg + sombra gris, para
 * que cada tarjeta de contenido se sienta parte del mismo objeto
 * diseñado, no un widget de kit de UI genérico puesto encima.
 *
 * API de composición idéntica a components/ui/card.tsx a propósito —
 * migrar una sección de Card a Panel es cambiar el nombre del import,
 * no reescribir el JSX de cada sección.
 */

type PanelAccent = "none" | "primary" | "accent" | "earth" | "trace"

const ACCENT_BORDER: Record<PanelAccent, string> = {
  none: "border-border",
  primary: "border-primary/30",
  accent: "border-accent/30",
  earth: "border-earth/30",
  trace: "border-trace/40",
}

const ACCENT_WASH: Record<PanelAccent, string> = {
  none: "",
  primary: "bg-primary/[0.04]",
  accent: "bg-accent/[0.04]",
  earth: "bg-earth/[0.05]",
  trace: "bg-trace/[0.05]",
}

function Panel({
  className,
  corners = "one",
  tone = "default",
  accent = "none",
  size = "default",
  children,
  ...props
}: React.ComponentProps<"div"> & {
  /** "one": corte de esquina liviano, para tarjetas de contenido normales.
   *  "all": corte en las 4 esquinas (como el Nodo) — reservado para
   *  paneles grandes que quieran ese mismo peso visual. */
  corners?: "one" | "all"
  /** "console": fondo oscuro tipo instrumento, igual criterio que
   *  sensor-node.tsx (para paneles que quieran ese mismo peso). */
  tone?: "default" | "console"
  /** Color de marca para borde + wash sutil de fondo. "none" mantiene un
   *  borde neutro, igual de discreto que el Card que reemplaza. */
  accent?: PanelAccent
  size?: "default" | "sm"
}) {
  const isConsole = tone === "console"

  return (
    <div
      data-slot="panel"
      data-size={size}
      data-tone={tone}
      className={cn(
        "group/panel relative flex flex-col gap-(--panel-spacing) border py-(--panel-spacing) text-sm [--panel-spacing:--spacing(4)] has-[>img:first-child]:pt-0 data-[size=sm]:[--panel-spacing:--spacing(3)]",
        corners === "all" ? "trace-panel" : "panel-corner",
        isConsole
          ? "border-trace/40 bg-console text-console-foreground"
          : cn(
              "bg-card text-card-foreground",
              ACCENT_BORDER[accent],
              ACCENT_WASH[accent],
            ),
        className,
      )}
      {...props}
    >
      {isConsole ? (
        <div className="trace-texture pointer-events-none absolute inset-0 opacity-40" />
      ) : null}
      {isConsole ? (
        <div className="relative flex flex-1 flex-col gap-(--panel-spacing)">
          {children}
        </div>
      ) : (
        children
      )}
    </div>
  )
}

function PanelHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="panel-header"
      className={cn(
        "group/panel-header @container/panel-header grid auto-rows-min items-start gap-1 px-(--panel-spacing) has-data-[slot=panel-action]:grid-cols-[1fr_auto] has-data-[slot=panel-description]:grid-rows-[auto_auto]",
        className,
      )}
      {...props}
    />
  )
}

function PanelTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      data-slot="panel-title"
      className={cn(
        "text-base leading-snug font-medium group-data-[size=sm]/panel:text-sm",
        className,
      )}
      {...props}
    />
  )
}

function PanelDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="panel-description"
      className={cn("text-sm text-muted-foreground group-data-[tone=console]/panel:text-console-foreground/70", className)}
      {...props}
    />
  )
}

function PanelAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="panel-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className,
      )}
      {...props}
    />
  )
}

function PanelContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="panel-content"
      className={cn("px-(--panel-spacing)", className)}
      {...props}
    />
  )
}

function PanelFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="panel-footer"
      className={cn(
        "flex items-center border-t border-current/10 px-(--panel-spacing) pt-(--panel-spacing)",
        className,
      )}
      {...props}
    />
  )
}

export {
  Panel,
  PanelHeader,
  PanelFooter,
  PanelTitle,
  PanelAction,
  PanelDescription,
  PanelContent,
}
