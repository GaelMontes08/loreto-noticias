import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { promises as dns } from 'dns'

const resend = new Resend(process.env.RESEND_API_KEY)

const TO_EMAIL = 'grupoloretonoticias@gmail.com'
// Update FROM once you verify your domain in Resend dashboard.
// Until then, Resend only allows sending from onboarding@resend.dev
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'

// ── In-memory rate limiter ────────────────────────────────────────────────────
// 3 submissions per 24h per IP. Resets automatically via TTL cleanup.
const DAY_MS = 24 * 60 * 60 * 1000
const MAX_PER_DAY = 3

interface RateEntry { count: number; resetAt: number }
const rateMap = new Map<string, RateEntry>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = rateMap.get(ip)

  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + DAY_MS })
    return false
  }
  if (entry.count >= MAX_PER_DAY) return true
  entry.count++
  return false
}

// Periodic cleanup to avoid unbounded Map growth
setInterval(() => {
  const now = Date.now()
  for (const [ip, entry] of rateMap) {
    if (now > entry.resetAt) rateMap.delete(ip)
  }
}, 60 * 60 * 1000) // every hour

// ── Route handler ─────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  // Get real IP (works on Vercel / most proxies)
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    req.headers.get('x-real-ip') ||
    'unknown'

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Has alcanzado el límite de 3 mensajes por día. Inténtalo mañana.' },
      { status: 429 }
    )
  }

  let body: Record<string, string>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Solicitud inválida.' }, { status: 400 })
  }

  const { name, email, subject, message, website } = body

  // ── Honeypot ──────────────────────────────────────────────────────────────
  if (website) {
    // Silently accept so bots don't know they were blocked
    return NextResponse.json({ ok: true })
  }

  // ── Server-side validation ────────────────────────────────────────────────
  if (!name?.trim() || name.trim().length < 2) {
    return NextResponse.json({ error: 'Nombre inválido.' }, { status: 422 })
  }
  if (!email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return NextResponse.json({ error: 'Correo electrónico inválido.' }, { status: 422 })
  }

  // ── MX record check — verify the domain can actually receive email ─────────
  const emailDomain = email.trim().split('@')[1].toLowerCase()
  try {
    const mxRecords = await dns.resolveMx(emailDomain)
    if (!mxRecords || mxRecords.length === 0) {
      return NextResponse.json({ error: 'El dominio del correo no puede recibir emails.' }, { status: 422 })
    }
  } catch {
    return NextResponse.json({ error: 'El correo electrónico no parece válido. Verifica el dominio.' }, { status: 422 })
  }

  if (!subject?.trim()) {
    return NextResponse.json({ error: 'Selecciona un asunto.' }, { status: 422 })
  }
  if (!message?.trim() || message.trim().length < 10) {
    return NextResponse.json({ error: 'El mensaje debe tener al menos 10 caracteres.' }, { status: 422 })
  }
  if (message.trim().length > 5000) {
    return NextResponse.json({ error: 'El mensaje es demasiado largo (máx. 5000 caracteres).' }, { status: 422 })
  }

  // ── Send email ────────────────────────────────────────────────────────────
  try {
    await resend.emails.send({
      from: `Loreto Noticias <${FROM_EMAIL}>`,
      to: TO_EMAIL,
      replyTo: `${name.trim()} <${email.trim()}>`,
      subject: `[Contacto] ${subject.trim()}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; border-radius: 8px; overflow: hidden;">
          <div style="background: #dc2626; padding: 24px 32px;">
            <h1 style="color: white; margin: 0; font-size: 20px; font-weight: 700;">
              Nuevo mensaje de contacto
            </h1>
            <p style="color: rgba(255,255,255,0.8); margin: 6px 0 0; font-size: 14px;">
              Loreto Noticias
            </p>
          </div>
          <div style="padding: 32px; background: white;">
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #6b7280; font-size: 13px; width: 120px;">Nombre</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #111; font-weight: 600;">${name.trim()}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #6b7280; font-size: 13px;">Email</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0;"><a href="mailto:${email.trim()}" style="color: #dc2626;">${email.trim()}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #6b7280; font-size: 13px;">Asunto</td>
                <td style="padding: 10px 0; color: #111;">${subject.trim()}</td>
              </tr>
            </table>
            <h3 style="color: #374151; font-size: 14px; font-weight: 600; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 0.05em;">Mensaje</h3>
            <div style="background: #f9fafb; border-left: 3px solid #dc2626; padding: 16px 20px; border-radius: 4px; color: #374151; line-height: 1.7; white-space: pre-wrap;">${message.trim()}</div>
          </div>
          <div style="padding: 16px 32px; background: #f9f9f9; text-align: center; color: #9ca3af; font-size: 12px;">
            Loreto Noticias · Puedes responder directamente a este correo
          </div>
        </div>
      `,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[contact] resend error:', err)
    return NextResponse.json(
      { error: 'Error al enviar el mensaje. Inténtalo de nuevo.' },
      { status: 500 }
    )
  }
}
