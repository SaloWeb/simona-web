import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const _inter = Inter({ subsets: ['latin'] })
const _jetbrainsMono = JetBrains_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SIMONA AgTech | Monitoreo y riego automático para el agro argentino',
  description:
    'SIMONA: Sistema Inteligente de Monitoreo y Optimización para Negocios Agrícolas. Kit Plug & Play con ESP32, sensores de suelo y riego automático 100% local, sin internet ni cánones por hectárea.',
  generator: 'v0.app',
  keywords: [
    'AgTech',
    'riego automático',
    'ESP32',
    'sensores de suelo',
    'agricultura de precisión',
    'viveros',
    'huertas urbanas',
    'La Plata',
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
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
