'use client'

import { useEffect } from 'react'

interface GlobalErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <html lang="es">
      <body style={{ margin: 0, fontFamily: 'system-ui, sans-serif', background: '#fff' }}>
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            textAlign: 'center',
          }}
        >
          <div style={{ maxWidth: '32rem' }}>
            <p style={{ fontSize: '5rem', fontWeight: 700, color: '#dc2626', margin: '0 0 1rem' }}>
              500
            </p>
            <h1 style={{ fontSize: '1.875rem', fontWeight: 700, margin: '0 0 1rem' }}>
              Error crítico
            </h1>
            <p style={{ color: '#4b5563', fontSize: '1.125rem', margin: '0 0 2rem' }}>
              Ocurrió un error inesperado. Por favor, recarga la página.
            </p>
            <button
              onClick={reset}
              style={{
                padding: '0.75rem 1.5rem',
                background: '#dc2626',
                color: '#fff',
                border: 'none',
                borderRadius: '0.5rem',
                fontSize: '1rem',
                fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              Recargar
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}
