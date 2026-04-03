import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'
const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID ?? ''

// ── Rate limiter (5 attempts / IP / day) ─────────────────────────────────────
const DAY_MS = 24 * 60 * 60 * 1000
interface RateEntry { count: number; resetAt: number }
const rateMap = new Map<string, RateEntry>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = rateMap.get(ip)
  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + DAY_MS })
    return false
  }
  if (entry.count >= 5) return true
  entry.count++
  return false
}

setInterval(() => {
  const now = Date.now()
  for (const [ip, entry] of rateMap) {
    if (now > entry.resetAt) rateMap.delete(ip)
  }
}, 60 * 60 * 1000)

// ── Email validation ──────────────────────────────────────────────────────────
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    req.headers.get('x-real-ip') ||
    'unknown'

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Demasiados intentos. Inténtalo más tarde.' },
      { status: 429 }
    )
  }

  let body: { email?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Solicitud inválida.' }, { status: 400 })
  }

  const email = (body.email ?? '').trim().toLowerCase()

  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: 'Por favor ingresa un correo electrónico válido.' },
      { status: 400 }
    )
  }

  // ── Add to Resend Audience ────────────────────────────────────────────────
  if (AUDIENCE_ID) {
    try {
      await resend.contacts.create({
        email,
        audienceId: AUDIENCE_ID,
        unsubscribed: false,
      })
    } catch (err: unknown) {
      // Resend returns 409 if contact already exists — treat as success
      const status = (err as { statusCode?: number })?.statusCode
      if (status !== 409) {
        console.error('[newsletter] contacts.create error:', err)
        return NextResponse.json(
          { error: 'No pudimos procesar tu suscripción. Inténtalo más tarde.' },
          { status: 500 }
        )
      }
      // Already subscribed — still send a friendly response
      return NextResponse.json({ already: true })
    }
  }

  // ── Welcome email ─────────────────────────────────────────────────────────
  await resend.emails.send({
    from: `Loreto Noticias <${FROM_EMAIL}>`,
    to: email,
    subject: '¡Bienvenido a Loreto Noticias!',
    html: `
      <div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto;padding:32px 24px;color:#111">
        <div style="text-align:center;margin-bottom:32px">
          <span style="font-size:2rem;font-weight:800;letter-spacing:-1px">LORETO NOTICIAS</span>
          <div style="width:48px;height:4px;background:#dc2626;margin:12px auto 0"></div>
        </div>
        <h1 style="font-size:1.5rem;font-weight:700;margin:0 0 16px">¡Ya eres parte de nuestra comunidad!</h1>
        <p style="color:#444;line-height:1.7;margin:0 0 16px">
          Gracias por suscribirte al newsletter de <strong>Loreto Noticias</strong>.
          A partir de ahora recibirás las noticias más importantes de Loreto, el Perú y el mundo
          directamente en tu bandeja de entrada.
        </p>
        <p style="color:#444;line-height:1.7;margin:0 0 32px">
          Mientras tanto, visita nuestro portal para estar al día:
        </p>
        <div style="text-align:center;margin-bottom:32px">
          <a href="${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://loretonoticias.com'}"
             style="display:inline-block;background:#dc2626;color:#fff;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:600">
            Ver las últimas noticias
          </a>
        </div>
        <hr style="border:none;border-top:1px solid #eee;margin:0 0 20px"/>
        <p style="font-size:0.75rem;color:#999;text-align:center;margin:0">
          Recibiste este correo por suscribirte en loretonoticias.com.
          Si no fuiste tú, puedes ignorar este mensaje.
        </p>
      </div>
    `,
  })

  return NextResponse.json({ ok: true })
}
