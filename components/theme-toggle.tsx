"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"

/**
 * Los tokens de dark mode ya estaban definidos en globals.css (.dark {...})
 * pero no había forma de alcanzarlos desde la UI. Este switch lee/escribe
 * la preferencia en localStorage bajo la misma clave ("simona-theme") que
 * ya usa el script anti-flash de layout.tsx, así ambos quedan en sync.
 *
 * Nota: antes el botón se pintaba invisible + disabled hasta que un
 * useEffect confirmaba el tema post-mount. Eso dejaba una ventana real
 * (más larga en equipos lentos) donde un click no hacía nada porque el
 * botón ni siquiera era clickeable. Ahora el estado inicial se lee de
 * forma sincrónica en el primer render (mismo criterio que el script
 * anti-flash: localStorage -> prefers-color-scheme -> clase ya presente
 * en <html>), así el botón es interactivo desde el primer pintado.
 */
function readInitialIsDark(): boolean {
  if (typeof document === "undefined") return false
  try {
    const stored = localStorage.getItem("simona-theme")
    if (stored) return stored === "dark"
  } catch {
    // localStorage puede fallar en modo privado o estar bloqueado por
    // política del equipo — seguimos con el resto de las señales.
  }
  if (document.documentElement.classList.contains("dark")) return true
  try {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
  } catch {
    return false
  }
}

export function ThemeToggle() {
  const [isDark, setIsDark] = React.useState<boolean>(readInitialIsDark)

  // Por si el script anti-flash de layout.tsx decidió algo distinto a lo
  // que este componente calculó en su propio render inicial (mismatch de
  // hidratación), sincronizamos una vez montado sin bloquear el click.
  React.useEffect(() => {
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

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      onClick={toggle}
      aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
    >
      {isDark ? <Moon /> : <Sun />}
    </Button>
  )
}
