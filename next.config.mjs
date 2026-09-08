/** @type {import('next').NextConfig} */
const nextConfig = {
  // Antes tenía ignoreBuildErrors: true — eso hacía que `next build`
  // compilara en producción aunque hubiera errores de tipos, ocultando
  // bugs reales. Sacado. IMPORTANTE: antes de deployar este cambio, correr
  // `npx tsc --noEmit` local y arreglar lo que aparezca, porque ahora un
  // error de tipos rompe el build de Vercel.
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          // TODO: pasar a 'Content-Security-Policy' (bloqueo real) cuando
          // se confirme localmente que no rompe nada. Sigue en Report-Only
          // a propósito: la política original (sin script-src explícito)
          // hubiera bloqueado en producción el script inline que evita el
          // flash de tema (app/layout.tsx), los dos <script type="application/
          // ld+json"> de SEO, y el script que inyecta Vercel Analytics —
          // los tres son <script> inline y sin script-src explícito heredan
          // el default-src 'self', que los bloquea. Se agregó script-src y
          // connect-src para cubrir esos tres casos. Antes de pasar a modo
          // real: correr `next build && next start` local, mirar la consola
          // del navegador un rato (los reportes de violación salen ahí) y
          // recién después cambiar la key de abajo.
          {
            key: 'Content-Security-Policy-Report-Only',
            value:
              "default-src 'self'; img-src 'self' data: https:; style-src 'self' 'unsafe-inline'; font-src 'self' data:; connect-src 'self' https://va.vercel-scripts.com https://vitals.vercel-insights.com; script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com",
          },
        ],
      },
    ]
  },
}

export default nextConfig
