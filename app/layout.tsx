import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono, Space_Grotesk } from 'next/font/google'
import './globals.css'

const _inter = Inter({ subsets: ['latin'] })
const _jetbrainsMono = JetBrains_Mono({ subsets: ['latin'] })
// Fuente display para h1/h2 — geométrica y técnica, no la Inter del cuerpo.
// Ver nota en globals.css (--font-display).
const _spaceGrotesk = Space_Grotesk({ subsets: ['latin'], weight: ['500', '600', '700'] })

const SITE_URL = 'https://simona-web.vercel.app'
const SITE_TITLE = 'SIMONA AgTech | Monitoreo y riego automático para el agro argentino'
const SITE_DESCRIPTION =
  'SIMONA: Sistema Inteligente de Monitoreo y Optimización para Negocios Agrícolas. Kit Plug & Play con ESP32, sensores de suelo y riego automático 100% local, sin internet ni cánones por hectárea.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  generator: 'v0.app',
  keywords: [
    'AgTech',
    'riego automático',
    'ESP32',
    'sensores de suelo',
    'agricultura de precisión',
    'viveros',
    'huertas urbanas',
    'Morón',
    'GBA Oeste',
  ],
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: SITE_URL,
    siteName: 'SIMONA AgTech',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'SIMONA AgTech — Monitoreo y riego automático para tu cultivo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ['/og-image.png'],
  },
}

// JSON-LD — LocalBusiness: ayuda a posicionar en búsquedas locales tipo
// "riego automático Morón" / "riego automático GBA Oeste". Los campos de
// redes sociales (sameAs) quedan vacíos por ahora; agregarlos apenas estén
// definidos (Instagram, WhatsApp Business, etc.) para reforzar la señal de
// identidad de marca.
const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'SIMONA AgTech',
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  image: `${SITE_URL}/images/logo-simona.png`,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Morón',
    addressRegion: 'Buenos Aires',
    addressCountry: 'AR',
  },
  areaServed: {
    '@type': 'AdministrativeArea',
    name: 'Buenos Aires, Argentina',
  },
  sameAs: [],
}

// JSON-LD — FAQPage: contenido long-tail real para las preguntas que más
// hace un productor antes de comprar. Si el copy de estas respuestas
// cambia en el futuro, mantenerlo alineado con lo que dice la página.
const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿SIMONA necesita internet para funcionar?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. El ESP32 levanta su propia red WiFi local (Access Point en 192.168.4.1) y toda la lógica de riego automático corre en el propio dispositivo. Internet solo se usa, de forma opcional, para pedirle un diagnóstico agronómico a la IA.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cuánto cuesta el Kit SIMONA?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'SIMONA es un pago único por kit, sin cánones ni cobros por hectárea. El precio final depende de la cantidad de nodos y el segmento (huerta urbana, vivero, escuela técnica o proyecto municipal); se cotiza a medida desde el formulario de contacto.',
      },
    },
    {
      '@type': 'Question',
      name: '¿SIMONA funciona en Morón y el oeste del conurbano bonaerense?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. SIMONA nació recorriendo quintas y huertas de Morón y la zona oeste del Gran Buenos Aires, y está pensado específicamente para las condiciones del cordón periurbano bonaerense.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué variables mide el kit?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Humedad de suelo, temperatura y humedad ambiente, pH de suelo (por muestra manual) y luminosidad, además de un relé que acciona automáticamente la bomba de riego según el perfil de cultivo elegido.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Puedo manejar más de una huerta o invernadero con la misma app?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí, la app Android de SIMONA permite gestión multi-huerta: cada huerta se administra por separado, con su propio nodo ESP32 y su propio perfil de cultivo.',
      },
    },
  ],
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#1A75B3',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="bg-background">
      <body className="antialiased font-sans">
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
