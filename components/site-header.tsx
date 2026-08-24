"use client"

import * as React from "react"
import Image from "next/image"
import { track } from "@vercel/analytics"
import { Menu, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "#sobre-nosotros", label: "Nosotros" },
  { href: "#problema-solucion", label: "Problema" },
  { href: "#solucion", label: "Hardware" },
  { href: "#perfiles", label: "Perfiles" },
  { href: "#comparativa", label: "Comparativa" },
  { href: "#simulador", label: "Simulador" },
  { href: "#descargar", label: "App" },
  { href: "#faq", label: "FAQ" },
]

export function SiteHeader() {
  const [open, setOpen] = React.useState(false)
  const [activeHref, setActiveHref] = React.useState<string>("")

  // Scroll-spy: resalta en el índice la sección que está visible.
  React.useEffect(() => {
    const sections = navLinks
      .map((link) => document.querySelector(link.href))
      .filter((el): el is Element => el !== null)

    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target.id) {
          setActiveHref(`#${visible.target.id}`)
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <a href="#top" className="flex shrink-0 items-center gap-3">
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
          aria-label="Navegación principal (índice)"
          className="no-scrollbar hidden items-center gap-0.5 overflow-x-auto md:flex"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              aria-current={activeHref === link.href ? "true" : undefined}
              className={cn(
                "shrink-0 rounded-md px-2 py-2 text-[13px] text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground",
                activeHref === link.href && "bg-secondary text-foreground",
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <ThemeToggle />
          <Button
            size="sm"
            className="hidden sm:inline-flex"
            render={<a href="#contacto" />}
            nativeButton={false}
            onClick={() => track("Kit CTA clicked", { location: "header" })}
          >
            Solicitar Kit SIMONA
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="md:hidden"
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
          "overflow-hidden border-t border-border bg-background md:hidden",
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
              aria-current={activeHref === link.href ? "true" : undefined}
              className={cn(
                "rounded-md px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground",
                activeHref === link.href && "bg-secondary text-foreground",
              )}
            >
              {link.label}
            </a>
          ))}
          <Button
            className="mt-2"
            render={<a href="#contacto" />}
            nativeButton={false}
            onClick={() => {
              setOpen(false)
              track("Kit CTA clicked", { location: "header_mobile" })
            }}
          >
            Solicitar Kit SIMONA
          </Button>
        </nav>
      </div>
    </header>
  )
}
