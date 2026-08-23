"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"

/**
 * Los tokens de dark mode ya estaban definidos en globals.css (.dark {...})
 * pero no había forma de alcanzarlos desde la UI. Este switch lee/escribe
 * la preferencia en localStorage bajo la misma clave ("simona-theme") que
 * ya usa el script anti-flash de layout.tsx, así ambos quedan en sync.
 */
export function ThemeToggle() {
  const [isDark, setIsDark] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
    setIsDark(document.documentElement.classList.contains("dark"))
  }, [])

  function toggle() {
    const next = !isDark
    setIsDark(next)
    document.documentElement.classList.toggle("dark", next)
    try {
      localStorage.setItem("simona-theme", next ? "dark" : "light")
    } catch {
      // localStorage puede fallar en modo privado — no es crítico, el
      // toggle sigue funcionando para la sesión actual.
    }
  }

  // Evita un ícono "incorrecto" por un instante antes de hidratar: se
  // pinta vacío hasta confirmar el tema real leído del DOM.
  if (!mounted) {
    return (
      <Button
        variant="outline"
        size="icon"
        aria-label="Cambiar tema"
        disabled
        className="opacity-0"
      >
        <Sun />
      </Button>
    )
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggle}
      aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
    >
      {isDark ? <Moon /> : <Sun />}
    </Button>
  )
}
