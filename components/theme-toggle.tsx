"use client"

import { Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"

/**
 * El ícono NUNCA depende de un booleano calculado en React (ni de
 * useState ni de useEffect). Se renderizan los dos íconos siempre y se
 * muestra uno u otro con la variante `dark:` de Tailwind (ver
 * `@custom-variant dark` en globals.css), que lee la clase "dark" del
 * <html> directamente vía CSS.
 *
 * Por qué: el enfoque anterior calculaba isDark con un useState(() =>
 * ...) que en el server siempre daba "false" (no hay `document`) pero en
 * el cliente podía dar "true" (preferencia del SO o localStorage). Ese
 * mismatch entre el ícono que pinta el servidor y el que recalcula el
 * cliente es un hydration mismatch real de React — en la mayoría de los
 * navegadores se resuelve solo, pero en algunos (WebViews de Android más
 * viejos, Safari en ciertos casos) la reconciliación falla y el botón
 * queda sin click handler activo hasta recargar. Sacando el ícono del
 * árbol de React (resolviéndolo por CSS) el marcado es idéntico en
 * server y cliente, así que no hay nada que hidrate distinto y el
 * botón queda interactivo desde el primer pintado, en cualquier
 * dispositivo.
 *
 * El script anti-flash de layout.tsx ya aplica la clase "dark" al
 * <html> de forma síncrona antes de la primera pintura, así que el CSS
 * ya tiene la clase correcta disponible incluso en el primer frame.
 */
function toggleTheme() {
  const isDark = document.documentElement.classList.toggle("dark")
  try {
    localStorage.setItem("simona-theme", isDark ? "dark" : "light")
  } catch {
    // localStorage puede fallar en modo privado — no es crítico, el
    // toggle sigue funcionando para la sesión actual.
  }
}

export function ThemeToggle() {
  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      aria-label="Cambiar entre modo claro y oscuro"
    >
      <Sun className="dark:hidden" />
      <Moon className="hidden dark:block" />
    </Button>
  )
}
