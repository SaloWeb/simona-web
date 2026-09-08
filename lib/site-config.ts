// URL canónica del sitio, usada por app/layout.tsx (metadata/OG/JSON-LD),
// app/robots.ts y app/sitemap.ts. Centralizada acá porque antes estaba
// duplicada en los 3 archivos — si el dominio cambia (ej. a uno propio),
// alcanza con editar esta línea en vez de buscar las 3 copias.
export const SITE_URL = "https://simona-web.vercel.app"
