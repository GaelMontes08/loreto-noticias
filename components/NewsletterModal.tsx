'use client'

import { useState, useEffect, useRef } from 'react'

interface NewsletterModalProps {
  isOpen: boolean
  onClose: () => void
}

type Status = 'idle' | 'loading' | 'success' | 'already' | 'error'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function NewsletterModal({ isOpen, onClose }: NewsletterModalProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  // Focus + scroll lock
  useEffect(() => {
    if (isOpen) {
      setEmail('')
      setStatus('idle')
      setErrorMsg('')
      setTimeout(() => inputRef.current?.focus(), 50)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // Escape to close
  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = email.trim()

    if (!EMAIL_RE.test(trimmed)) {
      setErrorMsg('Por favor ingresa un correo válido.')
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
        setErrorMsg(data.error ?? 'Ocurrió un error. Inténtalo de nuevo.')
        setStatus('error')
        return
      }
      setStatus(data.already ? 'already' : 'success')
    } catch {
      setErrorMsg('Error de conexión. Inténtalo de nuevo.')
      setStatus('error')
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Suscribirse al newsletter"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden">
        {/* Red top accent */}
        <div className="h-1 w-full bg-red-600" />

        <div className="p-8">
          {/* Close */}
          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="absolute top-5 right-5 p-1.5 rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Icon */}
          <div className="w-12 h-12 rounded-xl bg-red-50 dark:bg-red-900/30 text-red-600 flex items-center justify-center mb-5">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </div>

          {status === 'success' ? (
            <div className="text-center py-2">
              <div className="w-14 h-14 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-xl font-archivo font-bold text-black dark:text-white mb-2">
                ¡Suscripción confirmada!
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
                Te enviamos un correo de bienvenida a <strong>{email}</strong>.
                Revisa también tu carpeta de spam.
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors text-sm"
              >
                Listo
              </button>
            </div>
          ) : status === 'already' ? (
            <div className="text-center py-2">
              <h2 className="text-xl font-archivo font-bold text-black dark:text-white mb-2">
                Ya estás suscrito
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
                Este correo ya forma parte de nuestra lista. ¡Gracias por tu interés!
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors text-sm"
              >
                Cerrar
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-archivo font-bold text-black dark:text-white mb-2">
                Suscríbete al newsletter
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 leading-relaxed">
                Recibe las noticias más importantes de Loreto, el Perú y el mundo
                directamente en tu correo. Sin spam.
              </p>

              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-4">
                  <label
                    htmlFor="newsletter-email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                  >
                    Correo electrónico
                  </label>
                  <input
                    ref={inputRef}
                    id="newsletter-email"
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setErrorMsg('') }}
                    placeholder="tu@correo.com"
                    className={`w-full px-4 py-3 rounded-lg border text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors ${
                      errorMsg
                        ? 'border-red-500'
                        : 'border-gray-300 dark:border-gray-600'
                    }`}
                  />
                  {errorMsg && (
                    <p className="mt-1.5 text-xs text-red-600">{errorMsg}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-3 bg-red-600 hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors text-sm"
                >
                  {status === 'loading' ? 'Suscribiendo…' : 'Suscribirme'}
                </button>
              </form>

              <p className="mt-4 text-xs text-center text-gray-400 dark:text-gray-500">
                Puedes darte de baja en cualquier momento.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
