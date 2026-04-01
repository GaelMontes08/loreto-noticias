'use client'

import { useState, useEffect } from 'react'
import Script from 'next/script'
import Link from 'next/link'

export const CONSENT_KEY = 'loreto-cookie-consent'
const GA_ID = 'G-4P0LNM09Q5'
const ADSENSE_ID = 'ca-pub-1777939455626900'

export type ConsentValue = 'all' | 'necessary'

export function getStoredConsent(): ConsentValue | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(CONSENT_KEY) as ConsentValue | null
}

export default function CookieBanner() {
  const [consent, setConsent] = useState<ConsentValue | null>(null)
  const [visible, setVisible] = useState(false)
  const [show, setShow] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY) as ConsentValue | null
    if (stored) {
      setConsent(stored)
    } else {
      setVisible(true)
      // Double rAF so the element is painted before the transition fires
      requestAnimationFrame(() => requestAnimationFrame(() => setShow(true)))
    }
  }, [])

  const accept = () => {
    localStorage.setItem(CONSENT_KEY, 'all')
    setConsent('all')
    setShow(false)
    setTimeout(() => setVisible(false), 300)
    window.dispatchEvent(new Event('loreto-consent-accepted'))
  }

  const reject = () => {
    localStorage.setItem(CONSENT_KEY, 'necessary')
    setConsent('necessary')
    setShow(false)
    setTimeout(() => setVisible(false), 300)
  }

  return (
    <>
      {/* Only load tracking scripts after explicit consent */}
      {consent === 'all' && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
          </Script>
          <Script
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`}
            strategy="lazyOnload"
            crossOrigin="anonymous"
          />
        </>
      )}

      {/* Cookie consent banner */}
      {visible && (
        <div
          className={`fixed bottom-0 left-0 right-0 z-[60] transition-transform duration-300 ${
            show ? 'translate-y-0' : 'translate-y-full'
          }`}
        >
          <div className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-2xl">
            <div className="max-w-6xl mx-auto px-4 py-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <p className="flex-1 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                Usamos cookies propias y de terceros (Google Analytics, Google AdSense) para
                analizar el tráfico y mostrarte publicidad relevante. Consulta nuestra{' '}
                <Link
                  href="/privacidad"
                  className="underline hover:text-red-600 transition-colors"
                >
                  Política de Privacidad
                </Link>{' '}
                para más información.
              </p>
              <div className="flex items-center gap-3 flex-shrink-0">
                <button
                  onClick={reject}
                  className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:border-gray-500 dark:hover:border-gray-400 transition-colors"
                >
                  Solo necesarias
                </button>
                <button
                  onClick={accept}
                  className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                >
                  Aceptar todo
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
