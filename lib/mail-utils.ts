// Utilidades compartidas por los endpoints que mandan mail vía Resend
// (app/api/contact y app/api/notify-apk). Antes esta lógica vivía
// duplicada en app/api/contact/route.ts; se extrajo acá para que los dos
// endpoints no diverjan con el tiempo (mismo validador de email, mismo
// escape de HTML, mismo rate limiter).

// Mail de destino de todas las notificaciones del sitio.
// Se puede sobrescribir con la env var CONTACT_EMAIL en Vercel sin tocar código.
export const CONTACT_EMAIL = process.env.CONTACT_EMAIL || "simona.agtech@gmail.com"

// Resend exige verificar un dominio propio para poder usarlo como "from".
// Mientras no se verifique un dominio (ej. simona-agtech.com), se usa la
// dirección de pruebas de Resend, que solo entrega al mail con el que se
// creó la cuenta de Resend. Si más adelante verifican un dominio, cambiar
// esta constante por algo como "SIMONA <contacto@simona-agtech.com>".
export const FROM_ADDRESS = "SIMONA Web <onboarding@resend.dev>"

export function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

export function getClientIp(request: Request): string {
  // Vercel/proxies estándar: el primer valor de x-forwarded-for es el
  // cliente original. Si no está presente (dev local), agrupamos todo
  // bajo una sola clave — no es ideal pero no rompe nada.
  const forwardedFor = request.headers.get("x-forwarded-for")
  return forwardedFor?.split(",")[0]?.trim() || "unknown"
}

/**
 * Rate limiter en memoria. Cada createRateLimiter() tiene su propio Map
 * — /api/contact y /api/notify-apk no comparten cupo entre sí.
 *
 * No es distribuido (cada instancia serverless tiene su propio Map, y en
 * Vercel una función puede "enfriarse" y perder el estado entre
 * invocaciones), así que no reemplaza un rate limiter real (ej.
 * Upstash/Redis) si el tráfico de abuso crece — pero es gratis, sin
 * dependencias nuevas, y cubre el caso común.
 *
 * A diferencia de la versión original (duplicada antes en
 * app/api/contact/route.ts), acá se barre el Map en cada llamada y se
 * borran las IPs sin timestamps vigentes dentro de la ventana: sin esto,
 * cada IP única que pegó alguna vez al endpoint quedaba para siempre en
 * memoria mientras la instancia estuviera viva (nunca se achicaba el Map).
 */
export function createRateLimiter(windowMs: number, maxRequests: number) {
  const requestLog = new Map<string, number[]>()

  return function isRateLimited(ip: string): boolean {
    const now = Date.now()

    // Barrido oportunista: tirar cualquier IP (menos la actual, que se
    // recalcula abajo) que ya no tenga ningún timestamp dentro de la
    // ventana. El costo es proporcional a IPs únicas recientes, no crece
    // sin límite con el tiempo.
    for (const [key, timestamps] of requestLog) {
      if (key !== ip && !timestamps.some((t) => now - t < windowMs)) {
        requestLog.delete(key)
      }
    }

    const timestamps = (requestLog.get(ip) ?? []).filter(
      (t) => now - t < windowMs,
    )
    timestamps.push(now)
    requestLog.set(ip, timestamps)
    return timestamps.length > maxRequests
  }
}
