'use client'

import { useState } from 'react'

const SUBJECTS = [
  'Enviar una noticia',
  'Sugerencia o mejora',
  'Error en una noticia',
  'Publicidad',
  'Otro',
]

// Common disposable / throwaway email providers
const DISPOSABLE_DOMAINS = new Set([
  'mailinator.com', 'guerrillamail.com', 'guerrillamail.info', 'guerrillamailblock.com',
  'grr.la', 'sharklasers.com', 'tempmail.com', '10minutemail.com', 'throwaway.email',
  'yopmail.com', 'trashmail.com', 'spam4.me', 'bccto.me', 'dispostable.com',
  'mailnull.com', 'spamgourmet.com', 'maildrop.cc', 'discard.email', 'fakeinbox.com',
  'tempr.email', 'getairmail.com', 'filzmail.com', 'spamfree24.org', 'mailnesia.com',
  'trashmail.at', 'trashmail.io', 'trashmail.me', 'spamgap.com', 'tempinbox.com',
  'mailnull.com', 'owlpic.com', 'dispostable.com',
])

function validateName(value: string): string {
  const words = value.trim().split(/\s+/).filter(Boolean)
  if (!value.trim()) return 'El nombre es obligatorio.'
  if (words.length < 2) return 'Ingresa tu nombre completo (nombre y apellido).'
  return ''
}

function validateEmail(value: string): string {
  const trimmed = value.trim()
  if (!trimmed) return 'El correo electrónico es obligatorio.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed)) return 'Ingresa un correo electrónico válido.'
  const domain = trimmed.split('@')[1].toLowerCase()
  if (DISPOSABLE_DOMAINS.has(domain)) return 'Por favor usa un correo electrónico permanente.'
  return ''
}

type Status = 'idle' | 'loading' | 'success' | 'error'
type FieldErrors = { name: string; email: string }
type Touched = { name: boolean; email: boolean }

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({ name: '', email: '' })
  const [touched, setTouched] = useState<Touched>({ name: false, email: false })

  function handleBlur(field: keyof FieldErrors, value: string) {
    setTouched(t => ({ ...t, [field]: true }))
    const error = field === 'name' ? validateName(value) : validateEmail(value)
    setFieldErrors(e => ({ ...e, [field]: error }))
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const form = e.currentTarget
    const name = (form.elements.namedItem('name') as HTMLInputElement).value
    const email = (form.elements.namedItem('email') as HTMLInputElement).value

    const nameError = validateName(name)
    const emailError = validateEmail(email)
    setFieldErrors({ name: nameError, email: emailError })
    setTouched({ name: true, email: true })
    if (nameError || emailError) return

    setStatus('loading')
    setErrorMsg('')

    const data = {
      name,
      email,
      subject: (form.elements.namedItem('subject') as HTMLSelectElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
      website: (form.elements.namedItem('website') as HTMLInputElement).value,
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json()

      if (!res.ok) {
        setErrorMsg(json.error || 'Error al enviar el mensaje.')
        setStatus('error')
      } else {
        setStatus('success')
        form.reset()
        setTouched({ name: false, email: false })
        setFieldErrors({ name: '', email: '' })
      }
    } catch {
      setErrorMsg('Error de red. Comprueba tu conexión e inténtalo de nuevo.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center gap-4 py-12 text-center">
        <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
          <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-archivo font-bold text-black dark:text-white">
          ¡Mensaje enviado!
        </h3>
        <p className="text-gray-600 dark:text-gray-400 max-w-sm">
          Gracias por escribirnos. Te responderemos a la brevedad posible.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-2 text-sm text-red-600 hover:underline"
        >
          Enviar otro mensaje
        </button>
      </div>
    )
  }

  const isLoading = status === 'loading'

  function inputClass(field?: keyof FieldErrors) {
    const hasError = field && touched[field] && fieldErrors[field]
    return `w-full px-4 py-3 rounded-xl border ${
      hasError
        ? 'border-red-500 dark:border-red-500'
        : 'border-gray-300 dark:border-gray-600'
    } bg-white dark:bg-gray-800 text-black dark:text-white placeholder-gray-400
    focus:outline-none focus:border-red-600 dark:focus:border-red-500 transition-colors`
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Honeypot – invisible to real users, filled by bots */}
      <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none', tabIndex: -1 } as React.CSSProperties}>
        <input name="website" type="text" autoComplete="off" tabIndex={-1} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Nombre <span className="text-red-600">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Tu nombre completo"
            className={inputClass('name')}
            onBlur={e => handleBlur('name', e.target.value)}
          />
          {touched.name && fieldErrors.name && (
            <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">{fieldErrors.name}</p>
          )}
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Correo electrónico <span className="text-red-600">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="tu@correo.com"
            className={inputClass('email')}
            onBlur={e => handleBlur('email', e.target.value)}
          />
          {touched.email && fieldErrors.email && (
            <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">{fieldErrors.email}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          Asunto <span className="text-red-600">*</span>
        </label>
        <select
          id="subject"
          name="subject"
          required
          defaultValue=""
          className={`${inputClass()} cursor-pointer`}
        >
          <option value="" disabled>Selecciona un asunto...</option>
          {SUBJECTS.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          Mensaje <span className="text-red-600">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          placeholder="Escribe tu mensaje aquí..."
          className={`${inputClass()} resize-none`}
        />
      </div>

      {status === 'error' && (
        <div className="flex items-start gap-3 px-4 py-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-sm text-red-700 dark:text-red-400">
          <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {errorMsg}
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-medium rounded-xl transition-colors"
      >
        {isLoading ? (
          <>
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            Enviando...
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            Enviar mensaje
          </>
        )}
      </button>
    </form>
  )
}
