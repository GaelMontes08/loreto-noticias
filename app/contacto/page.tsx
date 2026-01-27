import { generateSEOMetadata } from '@/lib/metadata'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Contacto',
  description: 'Contáctanos para enviarnos tus noticias, sugerencias o comentarios. Estamos aquí para escucharte.',
  canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/contacto`,
})

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-gray-600 dark:text-gray-400">
          <Link href="/" className="hover:text-red-600 transition">
            Inicio
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 dark:text-gray-200">Contacto</span>
        </nav>

        <h1 className="text-4xl md:text-5xl font-archivo font-bold text-black dark:text-white mb-8">
          Contáctanos
        </h1>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            ¿Tienes una noticia que compartir? ¿Sugerencias para mejorar nuestro servicio? 
            Nos encantaría escucharte.
          </p>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 my-8">
            <h2 className="text-2xl font-archivo font-bold text-black dark:text-white mb-6">
              Información de Contacto
            </h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-black dark:text-white mb-2">Email</h3>
                <a 
                  href="mailto:contacto@loretonoticias.com" 
                  className="text-red-600 hover:underline"
                >
                  contacto@loretonoticias.com
                </a>
              </div>

              <div>
                <h3 className="font-bold text-black dark:text-white mb-2">Redes Sociales</h3>
                <div className="flex gap-4">
                  <a 
                    href="https://facebook.com/loretonoticias" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Facebook
                  </a>
                  <a 
                    href="https://twitter.com/loretonoticias" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-black hover:underline"
                  >
                    X (Twitter)
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
