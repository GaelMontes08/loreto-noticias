import { generateSEOMetadata } from '@/lib/metadata'
import type { Metadata } from 'next'
import Link from 'next/link'
import ContactForm from '@/components/ContactForm'

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

        <div className="prose dark:prose-invert max-w-none">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            ¿Tienes una noticia que compartir? ¿Sugerencias para mejorar nuestro servicio? 
            Nos encantaría escucharte.
          </p>

          {/* Contact Form */}
          <div className="mt-10">
            <h2 className="text-2xl font-archivo font-bold text-black dark:text-white mb-6">
              Envíanos un mensaje
            </h2>
            <ContactForm />
          </div>

          <div className="mt-10 pt-8 border-t border-gray-200 dark:border-gray-700">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-500 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
