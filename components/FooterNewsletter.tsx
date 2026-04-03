'use client'

import { useState } from 'react'

type Status = 'idle' | 'loading' | 'success' | 'already' | 'error'
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function FooterNewsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = email.trim()
    if (!EMAIL_RE.test(trimmed)) {
      setErrorMsg('Ingresa un correo válido.')
      return
    }
    setStatus('loading')
    setErrorMsg('')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed }),
      })
      const data = await res.json()
      if (!res.ok) {
        setErrorMsg(data.error ?? 'Ocurrió un error.')
        setStatus('error')
        return
      }
      setStatus(data.already ? 'already' : 'success')
    } catch {
      setErrorMsg('Error de conexión.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="flex items-center gap-3 text-sm text-green-400">
        <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        <span>¡Suscripción confirmada! Revisa tu bandeja de entrada.</span>
      </div>
    )
  }

  if (status === 'already') {
    return (
      <div className="flex items-center gap-3 text-sm text-gray-400">
        <svg className="w-5 h-5 flex-shrink-0 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>Ya estás suscrito con ese correo.</span>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full">
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="flex-1">
          <input
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setErrorMsg('') }}
            placeholder="tu@correo.com"
            aria-label="Correo electrónico para newsletter"
            className={`w-full px-4 py-2.5 rounded-lg bg-gray-800 text-white placeholder-gray-500 text-sm border focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors ${
              errorMsg ? 'border-red-500' : 'border-gray-700'
            }`}
          />
          {errorMsg && (
            <p className="mt-1 text-xs text-red-400">{errorMsg}</p>
          )}
        </div>
        <button
          type="submit"
          disabled={status === 'loading'}
          className="px-5 py-2.5 bg-red-600 hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-colors whitespace-nowrap"
        >
          {status === 'loading' ? 'Enviando…' : 'Suscribirme'}
        </button>
      </div>
    </form>
  )
}
