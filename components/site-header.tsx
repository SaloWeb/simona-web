"use client"

import * as React from "react"
import Image from "next/image"
import { Menu, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "#sobre-nosotros", label: "Sobre Nosotros" },
  { href: "#solucion", label: "Solución & Hardware" },
  { href: "#perfiles", label: "Perfiles" },
  { href: "#comparativa", label: "Tabla Comparativa" },
  { href: "#simulador", label: "Simulador IoT" },
  { href: "#descargar", label: "Descargar App" },
  { href: "#faq", label: "Preguntas Frecuentes" },
]

export function SiteHeader() {
  const [open, setOpen] = React.useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <a href="#top" className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center">
            <Image
              src="/images/logo-simona.png"
              alt="Logo SIMONA"
              width={36}
              height={36}
              className="h-full w-full object-contain"
            />
          </span>
          <span className="text-base font-semibold tracking-tight text-foreground">
            SIMONA
          </span>
        </a>

        <nav
          aria-label="Navegación principal"
          className="hidden items-center gap-1 xl:flex"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button size="sm" className="hidden sm:inline-flex" render={<a href="#contacto" />} nativeButton={false}>
            Solicitar Kit SIMONA
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="xl:hidden"
            aria-expanded={open}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      <div
        className={cn(
          "overflow-hidden border-t border-border bg-background xl:hidden",
          open ? "block" : "hidden",
        )}
      >
        <nav
          aria-label="Navegación móvil"
          className="mx-auto flex w-full max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
          <Button
            className="mt-2"
            render={<a href="#contacto" />}
            nativeButton={false}
            onClick={() => setOpen(false)}
          >
            Solicitar Kit SIMONA
          </Button>
        </nav>
      </div>
    </header>
  )
}
