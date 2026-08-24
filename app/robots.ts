import type { MetadataRoute } from "next"

const SITE_URL = "https://simona-web.vercel.app"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // La API de contacto no tiene nada que indexar y no debería
      // aparecer en resultados de búsqueda ni ser rastreada.
      disallow: "/api/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
