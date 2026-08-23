import Image from "next/image"

import { Separator } from "@/components/ui/separator"

const columns = [
  {
    title: "Producto",
    links: [
      { href: "#solucion", label: "Kit SIMONA" },
      { href: "#perfiles", label: "Perfiles agronómicos" },
      { href: "#simulador", label: "Simulador IoT" },
      { href: "#descargar", label: "App Android v4" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { href: "#sobre-nosotros", label: "Sobre nosotros" },
      { href: "#sobre-nosotros", label: "Misión y valores" },
      { href: "#comparativa", label: "Análisis competitivo" },
      { href: "#contacto", label: "Contacto B2B" },
    ],
  },
  {
    title: "Especificaciones",
    links: [
      { href: "#solucion", label: "ESP32 · AP 192.168.4.1" },
      { href: "#solucion", label: "Sensores de suelo" },
      { href: "#solucion", label: "Relé de riego" },
      { href: "#solucion", label: "Roadmap LoRa (Pro)" },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="bg-secondary/60">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_2fr]">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="flex size-9 items-center justify-center">
                <Image
                  src="/images/logo-simona.png"
                  alt="Logo SIMONA"
                  width={36}
                  height={36}
                  className="h-full w-full object-contain"
                />
              </span>
              <span className="text-sm font-semibold tracking-tight text-foreground">
                SIMONA <span className="text-muted-foreground">AgTech</span>
              </span>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              Sistema Inteligente de Monitoreo y Optimización para Negocios
              Agrícolas. Tecnología accesible para democratizar la automatización
              del agro argentino.
            </p>
            <p className="font-mono text-[11px] uppercase tracking-wide text-primary">
              Operación local · Pago único · Plug &amp; Play
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {columns.map((col) => (
              <nav key={col.title} aria-label={col.title} className="flex flex-col gap-3">
                <h3 className="font-mono text-[11px] uppercase tracking-wide text-foreground">
                  {col.title}
                </h3>
                <ul className="flex flex-col gap-2">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-primary"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <Separator />

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            © 2026 SIMONA AgTech. Todos los derechos reservados.
          </p>
          <p className="font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
            La Plata, Buenos Aires
          </p>
        </div>
      </div>
    </footer>
  )
}
