import { generateSEOMetadata } from '@/lib/metadata'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Términos y Condiciones',
  description:
    'Conoce los términos y condiciones de uso del sitio web de Loreto Noticias. Al acceder a nuestro portal informativo aceptas estas condiciones.',
  canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/terminos`,
})

export default function TerminosPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <div className="max-w-4xl mx-auto px-4 py-12">

        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-gray-600 dark:text-gray-400">
          <Link href="/" className="hover:text-red-600 transition-colors">Inicio</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 dark:text-gray-200">Términos y Condiciones</span>
        </nav>

        <h1 className="text-4xl md:text-5xl font-archivo font-bold text-black dark:text-white mb-4">
          Términos y Condiciones
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-10">
          Última actualización: marzo de 2026
        </p>

        <div className="prose dark:prose-invert max-w-none">

          <p>
            Bienvenido a <strong>Loreto Noticias</strong>. Al acceder y utilizar este sitio web
            (<em>loretonoticias.com</em>), aceptas cumplir con los presentes Términos y Condiciones
            de Uso. Si no estás de acuerdo con alguno de estos términos, te pedimos que no uses
            nuestro sitio.
          </p>

          <h2>1. Uso del sitio web</h2>
          <p>
            Loreto Noticias es un portal informativo de noticias locales, regionales y nacionales
            con sede en Iquitos, Loreto, Perú. El contenido publicado tiene fines
            exclusivamente informativos. El uso del sitio está permitido para personas mayores
            de 13 años.
          </p>
          <p>
            Queda prohibido usar este sitio para:
          </p>
          <ul>
            <li>Difundir información falsa, difamatoria o que incite al odio.</li>
            <li>Realizar scraping masivo o automatizado del contenido sin autorización previa.</li>
            <li>Intentar vulnerar la seguridad o integridad del sitio.</li>
            <li>Cualquier actividad que viole la legislación peruana vigente.</li>
          </ul>

          <h2>2. Propiedad intelectual</h2>
          <p>
            Todo el contenido publicado en Loreto Noticias —textos, fotografías, gráficos,
            logotipos, nombres y marcas— es propiedad de Loreto Noticias o de sus respectivos
            autores y se encuentra protegido por las leyes de propiedad intelectual del Perú y
            tratados internacionales.
          </p>
          <p>
            Se permite compartir nuestros artículos en redes sociales indicando la fuente
            (<em>loretonoticias.com</em>) y enlazando a la nota original. Queda expresamente
            prohibida la reproducción total o parcial del contenido sin autorización escrita.
          </p>

          <h2>3. Contenido de terceros y enlaces externos</h2>
          <p>
            Nuestro sitio puede contener enlaces a sitios web de terceros. Loreto Noticias no
            se responsabiliza por el contenido, exactitud o prácticas de privacidad de dichos
            sitios. La inclusión de un enlace no implica respaldo ni afiliación.
          </p>
          <p>
            Las opiniones expresadas en secciones de comentarios o en contenido patrocinado son
            responsabilidad exclusiva de sus autores y no representan necesariamente la postura
            editorial de Loreto Noticias.
          </p>

          <h2>4. Publicidad</h2>
          <p>
            Loreto Noticias utiliza <strong>Google AdSense</strong> para mostrar anuncios
            publicitarios. Estos anuncios son gestionados por Google y pueden usar cookies para
            mostrar publicidad relevante según tus intereses. Puedes conocer más sobre cómo
            Google usa esta información en{' '}
            <a
              href="https://policies.google.com/technologies/ads"
              target="_blank"
              rel="noopener noreferrer"
            >
              policies.google.com/technologies/ads
            </a>.
          </p>

          <h2>5. Limitación de responsabilidad</h2>
          <p>
            Loreto Noticias realiza sus mejores esfuerzos para ofrecer información veraz y
            actualizada; sin embargo, no garantizamos la exactitud, integridad o vigencia de
            todos los contenidos. El sitio se ofrece «tal cual» y no seremos responsables por
            daños directos o indirectos derivados del uso o imposibilidad de uso del sitio.
          </p>
          <p>
            Nos reservamos el derecho de modificar, suspender o eliminar cualquier contenido
            sin previo aviso.
          </p>

          <h2>6. Cambios en los términos</h2>
          <p>
            Podemos actualizar estos Términos y Condiciones en cualquier momento. Los cambios
            entrarán en vigor en el momento de su publicación en esta página. Te recomendamos
            revisar esta sección periódicamente. El uso continuado del sitio tras la publicación
            de cambios implica tu aceptación.
          </p>

          <h2>7. Ley aplicable</h2>
          <p>
            Estos términos se rigen por las leyes vigentes de la República del Perú. Cualquier
            controversia se someterá a la jurisdicción de los tribunales competentes de la ciudad
            de Iquitos, Loreto.
          </p>

          <h2>8. Contacto</h2>
          <p>
            Si tienes preguntas sobre estos Términos y Condiciones, puedes escribirnos a{' '}
            <a href="mailto:contacto@loretonoticias.com">contacto@loretonoticias.com</a> o
            usar nuestro{' '}
            <Link href="/contacto">formulario de contacto</Link>.
          </p>

        </div>
      </div>
    </div>
  )
}
