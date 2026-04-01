import { generateSEOMetadata } from '@/lib/metadata'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Política de Privacidad',
  description:
    'Conoce cómo Loreto Noticias recopila, usa y protege tu información personal. Nos comprometemos a respetar tu privacidad.',
  canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/privacidad`,
})

export default function PrivacidadPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <div className="max-w-4xl mx-auto px-4 py-12">

        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-gray-600 dark:text-gray-400">
          <Link href="/" className="hover:text-red-600 transition-colors">Inicio</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 dark:text-gray-200">Política de Privacidad</span>
        </nav>

        <h1 className="text-4xl md:text-5xl font-archivo font-bold text-black dark:text-white mb-4">
          Política de Privacidad
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-10">
          Última actualización: marzo de 2026
        </p>

        <div className="prose dark:prose-invert max-w-none">

          <p>
            En <strong>Loreto Noticias</strong> nos tomamos en serio la privacidad de nuestros
            visitantes. Esta Política de Privacidad explica qué información recopilamos, cómo la
            usamos y qué opciones tienes al respecto. Al usar{' '}
            <em>loretonoticias.com</em>, aceptas las prácticas descritas en esta política.
          </p>

          <h2>1. Información que recopilamos</h2>
          <p>
            No recopilamos datos personales identificables de forma automática. Sin embargo,
            como la mayoría de los sitios web, recopilamos cierta información de manera anónima:
          </p>
          <ul>
            <li>
              <strong>Datos de navegación</strong>: dirección IP anonimizada, tipo de
              navegador, páginas visitadas, tiempo en el sitio y fuente de tráfico. Estos
              datos se recopilan a través de <strong>Google Analytics</strong>.
            </li>
            <li>
              <strong>Cookies de publicidad</strong>: Google AdSense puede colocar cookies de
              terceros para mostrar anuncios personalizados basados en visitas anteriores a
              este y otros sitios.
            </li>
            <li>
              <strong>Formulario de contacto</strong>: cuando envías un mensaje a través de
              nuestro formulario, recopilamos tu nombre, dirección de correo electrónico y el
              contenido de tu mensaje, con el único fin de responderte.
            </li>
          </ul>

          <h2>2. Uso de la información</h2>
          <p>
            La información recopilada se usa para:
          </p>
          <ul>
            <li>Analizar el tráfico y mejorar la experiencia de usuario en el sitio.</li>
            <li>Mostrar publicidad relevante mediante Google AdSense.</li>
            <li>Responder a mensajes enviados a través del formulario de contacto.</li>
            <li>Detectar y prevenir actividades fraudulentas o de abuso.</li>
          </ul>
          <p>
            No vendemos, alquilamos ni compartimos tu información personal con terceros, salvo
            cuando sea requerido por ley o para el funcionamiento de los servicios descritos.
          </p>

          <h2>3. Google Analytics</h2>
          <p>
            Usamos <strong>Google Analytics</strong> para entender cómo los visitantes
            interactúan con nuestro sitio. Google Analytics recopila datos de forma anónima
            mediante cookies. Puedes optar por no participar instalando la extensión de
            inhabilitación de Google Analytics disponible en{' '}
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              target="_blank"
              rel="noopener noreferrer"
            >
              tools.google.com/dlpage/gaoptout
            </a>.
          </p>

          <h2>4. Google AdSense y cookies de publicidad</h2>
          <p>
            Loreto Noticias muestra anuncios a través de <strong>Google AdSense</strong>.
            Google y sus socios pueden usar cookies para mostrar anuncios basados en tus
            visitas previas a este y otros sitios web. Puedes desactivar la publicidad
            personalizada visitando{' '}
            <a
              href="https://www.google.com/settings/ads"
              target="_blank"
              rel="noopener noreferrer"
            >
              Configuración de anuncios de Google
            </a>.
          </p>
          <p>
            Adicionalmente, puedes gestionar las preferencias de cookies de terceros en{' '}
            <a
              href="https://www.aboutads.info/choices/"
              target="_blank"
              rel="noopener noreferrer"
            >
              aboutads.info
            </a>{' '}
            o{' '}
            <a
              href="https://www.youronlinechoices.eu/"
              target="_blank"
              rel="noopener noreferrer"
            >
              youronlinechoices.eu
            </a>.
          </p>

          <h2>5. Cookies</h2>
          <p>
            Las cookies son pequeños archivos de texto almacenados en tu dispositivo. Las
            usamos para:
          </p>
          <ul>
            <li>Recordar tu preferencia de tema (claro/oscuro).</li>
            <li>Medir el tráfico mediante Google Analytics.</li>
            <li>Mostrar publicidad relevante a través de Google AdSense.</li>
          </ul>
          <p>
            Puedes configurar tu navegador para rechazar todas las cookies o para que te
            avise cuando se envíe una. Sin embargo, algunas funcionalidades del sitio pueden
            no estar disponibles sin cookies.
          </p>

          <h2>6. Derechos del usuario</h2>
          <p>
            De acuerdo con la <strong>Ley N.° 29733</strong> (Ley de Protección de Datos
            Personales del Perú) y su reglamento, tienes derecho a:
          </p>
          <ul>
            <li>Acceder a los datos personales que poseemos sobre ti.</li>
            <li>Rectificar datos inexactos o incompletos.</li>
            <li>Solicitar la cancelación de tus datos cuando ya no sean necesarios.</li>
            <li>Oponerte al tratamiento de tus datos en determinadas circunstancias.</li>
          </ul>
          <p>
            Para ejercer cualquiera de estos derechos, escríbenos a{' '}
            <a href="mailto:contacto@loretonoticias.com">contacto@loretonoticias.com</a>.
          </p>

          <h2>7. Seguridad</h2>
          <p>
            Adoptamos medidas técnicas y organizativas razonables para proteger la información
            recopilada frente a accesos no autorizados, pérdida o alteración. No obstante,
            ninguna transmisión de datos por Internet es completamente segura, por lo que no
            podemos garantizar la seguridad absoluta.
          </p>

          <h2>8. Menores de edad</h2>
          <p>
            Loreto Noticias no está dirigido a menores de 13 años y no recopilamos
            intencionalmente información personal de niños. Si crees que un menor nos ha
            proporcionado datos personales, contáctanos para que podamos eliminarlos.
          </p>

          <h2>9. Cambios en esta política</h2>
          <p>
            Podemos actualizar esta Política de Privacidad periódicamente. Te notificaremos
            los cambios significativos actualizando la fecha en la parte superior de esta
            página. El uso continuado del sitio tras la publicación de cambios constituye tu
            aceptación de la política revisada.
          </p>

          <h2>10. Contacto</h2>
          <p>
            Si tienes preguntas o inquietudes sobre esta Política de Privacidad, puedes
            comunicarte con nosotros:
          </p>
          <ul>
            <li>
              Correo electrónico:{' '}
              <a href="mailto:contacto@loretonoticias.com">contacto@loretonoticias.com</a>
            </li>
            <li>
              Formulario web: <Link href="/contacto">loretonoticias.com/contacto</Link>
            </li>
            <li>Dirección: Calle Jaén 454, Iquitos, Loreto, Perú</li>
          </ul>

        </div>
      </div>
    </div>
  )
}
