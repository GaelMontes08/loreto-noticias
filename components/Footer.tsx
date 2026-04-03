import Link from 'next/link'
import Image from 'next/image'

const navLinks = [
  { name: 'Política', href: '/categoria/politica' },
  { name: 'Economía', href: '/categoria/economia' },
  { name: 'Deportes', href: '/categoria/deportes' },
  { name: 'Perú', href: '/categoria/peru' },
  { name: 'Salud', href: '/categoria/salud' },
  { name: 'Elecciones 2026', href: '/categoria/elecciones-2026' },
]

const legalLinks = [
  { name: 'Sobre Nosotros', href: '/nosotros' },
  { name: 'Contacto', href: '/contacto' },
  { name: 'Términos y Condiciones', href: '/terminos' },
  { name: 'Política de Privacidad', href: '/privacidad' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-black text-white mt-12">
      {/* Red top border */}
      <div className="w-full h-1 bg-red-600" />

      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/img/logo.webp"
                alt="Loreto Noticias"
                width={140}
                height={40}
                className="h-7 w-auto brightness-0 invert"
              />
              <span className="text-lg font-archivo font-bold tracking-wide whitespace-nowrap">
                LORETO NOTICIAS
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Tu fuente confiable de noticias de Loreto, Perú. Mantente informado
              con las últimas noticias locales, eventos y actualidades de la región.
            </p>
            {/* Social links */}
            <div className="flex items-center gap-3 mt-1">
              <a
                href="https://x.com/noticias_loreto"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X / Twitter"
                className="p-2 rounded-lg bg-gray-800 hover:bg-red-600 transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/loretonoticiasiquitos"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="p-2 rounded-lg bg-gray-800 hover:bg-red-600 transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.791-4.697 4.533-4.697 1.312 0 2.686.235 2.686.235v2.97h-1.513c-1.491 0-1.956.93-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://wa.me/51917811803"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="p-2 rounded-lg bg-gray-800 hover:bg-red-600 transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Secciones */}
          <div>
            <h4 className="font-archivo font-bold text-white mb-4 uppercase tracking-wide text-sm">
              Secciones
            </h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-red-500 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="font-archivo font-bold text-white mb-4 uppercase tracking-wide text-sm">
              Contacto
            </h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 mt-0.5 text-red-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:grupoloretonoticias@gmail.com" className="hover:text-red-500 transition-colors">
                  grupoloretonoticias@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 mt-0.5 text-red-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Calle Jaén 454, Iquitos</span>
              </li>
              <li className="mt-4">
                <Link
                  href="/contacto"
                  className="inline-flex items-center gap-2 px-4 py-2 border border-gray-700 hover:border-red-600 hover:text-white rounded-lg text-sm transition-colors"
                >
                  Envíanos un mensaje
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-gray-500 text-sm">
          <p>&copy; 2020&ndash;{year} Loreto Noticias. Todos los derechos reservados.</p>
          <div className="flex items-center gap-4">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-red-500 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
