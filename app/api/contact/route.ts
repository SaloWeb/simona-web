import { NextResponse } from "next/server"

import {
  CONTACT_EMAIL,
  FROM_ADDRESS,
  createRateLimiter,
  escapeHtml,
  getClientIp,
  isValidEmail,
} from "@/lib/mail-utils"

interface ContactPayload {
  nombre: string
  organizacion?: string
  email: string
  telefono?: string
  segmento: string
  nodos?: string
  mensaje?: string
  // Honeypot: campo invisible para humanos (ver contact-section.tsx).
  // Si viene con contenido, es casi seguro un bot rellenando todos los
  // inputs del form sin renderizar el CSS que lo oculta.
  sitio_web?: string
}

// Rate limiting en memoria — implementación compartida en lib/mail-utils.ts
// (ver ahí el porqué de los límites elegidos).
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000 // 10 minutos
const RATE_LIMIT_MAX_REQUESTS = 5
const isRateLimited = createRateLimiter(RATE_LIMIT_WINDOW_MS, RATE_LIMIT_MAX_REQUESTS)

const SEGMENTO_LABELS: Record<string, string> = {
  invernadero: "Invernadero / vivero",
  quinta: "Quinta o pyme agrícola",
  escuela: "Escuela técnica",
  municipal: "Proyecto municipal",
  urbana: "Huerta urbana",
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error("RESEND_API_KEY no está configurada")
    return NextResponse.json(
      { error: "El servidor no tiene el envío de mails configurado todavía." },
      { status: 500 },
    )
  }

  const clientIp = getClientIp(request)
  if (isRateLimited(clientIp)) {
    return NextResponse.json(
      { error: "Demasiadas solicitudes. Probá de nuevo en unos minutos." },
      { status: 429 },
    )
  }

  let body: ContactPayload
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Cuerpo de la solicitud inválido." }, { status: 400 })
  }

  // Honeypot: un humano nunca completa este campo porque el CSS lo oculta.
  // Respondemos 200 "falso positivo" en vez de 400 para no darle al bot
  // una señal clara de que fue detectado (así no ajusta y reintenta).
  if (body.sitio_web) {
    return NextResponse.json({ ok: true })
  }

  const nombre = body.nombre?.trim()
  const email = body.email?.trim()
  const segmento = body.segmento?.trim()

  if (!nombre || !email || !segmento) {
    return NextResponse.json(
      { error: "Faltan campos obligatorios (nombre, email o segmento)." },
      { status: 400 },
    )
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "El email no es válido." }, { status: 400 })
  }

  const segmentoLabel = SEGMENTO_LABELS[segmento] ?? segmento

  const rows: [string, string][] = [
    ["Nombre y apellido", nombre],
    ["Organización", body.organizacion?.trim() || "—"],
    ["Email", email],
    ["Teléfono", body.telefono?.trim() || "—"],
    ["Segmento", segmentoLabel],
    ["Cantidad de nodos estimada", body.nodos?.trim() || "—"],
  ]

  const htmlRows = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:4px 12px 4px 0;color:#555;font-family:monospace;font-size:12px;text-transform:uppercase;white-space:nowrap;">${escapeHtml(label)}</td><td style="padding:4px 0;font-size:14px;">${escapeHtml(value)}</td></tr>`,
    )
    .join("")

  const mensaje = body.mensaje?.trim()

  const html = `
    <div style="font-family:sans-serif;max-width:560px;">
      <h2 style="margin:0 0 16px;">Nueva consulta — SIMONA Web</h2>
      <table>${htmlRows}</table>
      ${
        mensaje
          ? `<div style="margin-top:16px;"><p style="font-family:monospace;font-size:12px;text-transform:uppercase;color:#555;margin:0 0 4px;">Mensaje</p><p style="font-size:14px;white-space:pre-wrap;">${escapeHtml(mensaje)}</p></div>`
          : ""
      }
    </div>
  `

  try {
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_ADDRESS,
        to: [CONTACT_EMAIL],
        reply_to: email,
        subject: `Nueva consulta de ${nombre} (${segmentoLabel})`,
        html,
      }),
    })

    if (!resendResponse.ok) {
      const errorBody = await resendResponse.text()
      console.error("Resend respondió con error:", resendResponse.status, errorBody)
      return NextResponse.json(
        { error: "No se pudo enviar el mensaje. Intentá de nuevo en unos minutos." },
        { status: 502 },
      )
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("Error llamando a Resend:", err)
    return NextResponse.json(
      { error: "No se pudo enviar el mensaje. Intentá de nuevo en unos minutos." },
      { status: 500 },
    )
  }
}
