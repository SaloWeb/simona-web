import { NextResponse } from "next/server"

import {
  CONTACT_EMAIL,
  FROM_ADDRESS,
  createRateLimiter,
  escapeHtml,
  getClientIp,
  isValidEmail,
} from "@/lib/mail-utils"

// Mismo propósito que /api/contact, pero para el mini-formulario "Avisame
// cuando salga" de la sección de descarga (components/download-section.tsx).
// Antes ese formulario solo mostraba un mensaje de éxito sin mandar el
// email a ningún lado — se perdía. Cupo de rate limit más generoso que
// contacto porque acá el único dato es un email, no hay mucho más que
// abusar.
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000 // 10 minutos
const RATE_LIMIT_MAX_REQUESTS = 8
const isRateLimited = createRateLimiter(RATE_LIMIT_WINDOW_MS, RATE_LIMIT_MAX_REQUESTS)

interface NotifyPayload {
  email: string
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

  let body: NotifyPayload
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Cuerpo de la solicitud inválido." }, { status: 400 })
  }

  const email = body.email?.trim()
  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ error: "El email no es válido." }, { status: 400 })
  }

  const html = `
    <div style="font-family:sans-serif;max-width:560px;">
      <h2 style="margin:0 0 16px;">Nueva suscripción — Aviso de disponibilidad del APK</h2>
      <p style="font-size:14px;">
        Avisar a <strong>${escapeHtml(email)}</strong> apenas esté publicada
        la primera versión estable del APK de SIMONA.
      </p>
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
        subject: `Nueva suscripción de aviso APK: ${email}`,
        html,
      }),
    })

    if (!resendResponse.ok) {
      const errorBody = await resendResponse.text()
      console.error("Resend respondió con error:", resendResponse.status, errorBody)
      return NextResponse.json(
        { error: "No se pudo registrar tu email. Intentá de nuevo en unos minutos." },
        { status: 502 },
      )
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("Error llamando a Resend:", err)
    return NextResponse.json(
      { error: "No se pudo registrar tu email. Intentá de nuevo en unos minutos." },
      { status: 500 },
    )
  }
}
