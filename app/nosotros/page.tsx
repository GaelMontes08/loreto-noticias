import { generateSEOMetadata } from '@/lib/metadata'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Sobre Nosotros',
  description:
    'Conoce la historia de Loreto Noticias, el portal informativo fundado en 2020 para combatir la desinformación en Loreto, Perú. Información transparente y verídica.',
  canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/nosotros`,
})

const values = [
  {
    title: 'Respeto',
    description:
      'Tratamos cada hecho, cada fuente y cada lector con la consideración que merece.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    title: 'Honestidad',
    description:
      'Publicamos únicamente lo que podemos verificar. Corregimos nuestros errores cuando los cometemos.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: 'Responsabilidad',
    description:
      'Somos conscientes del impacto que tiene la información y asumimos con seriedad ese compromiso.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
      </svg>
    ),
  },
]

const stats = [
  { value: '2020', label: 'Año de fundación' },
  { value: '3', label: 'Cobertura: Local, Nacional e Internacional' },
  { value: '24/7', label: 'Información actualizada' },
]

export default function NosotrosPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <div className="max-w-4xl mx-auto px-4 py-12">

        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-gray-600 dark:text-gray-400">
          <Link href="/" className="hover:text-red-600 transition-colors">Inicio</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 dark:text-gray-200">Sobre Nosotros</span>
        </nav>

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-10 bg-red-600 rounded-full" />
            <p className="text-red-600 font-medium text-sm uppercase tracking-widest">
              Fundado el 23 de marzo de 2020
            </p>
          </div>
          <h1 className="text-4xl md:text-5xl font-archivo font-bold text-black dark:text-white mb-6">
            Sobre Nosotros
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
            Somos un portal informativo nacido en Iquitos para brindar información
            transparente y verídica sobre cada hecho que ocurra — en Loreto, en el Perú
            y en el mundo.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-16">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center p-5 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700"
            >
              <p className="text-2xl md:text-3xl font-archivo font-bold text-red-600 mb-1">
                {stat.value}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-tight">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Our story */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-archivo font-bold text-black dark:text-white mb-6">
            Nuestra historia
          </h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
            <p>
              Loreto Noticias nació el <strong>23 de marzo de 2020</strong>, en plena pandemia
              del COVID-19. En ese momento crítico, la desinformación se propagaba con más
              rapidez que el propio virus, dejando a miles de familias loretanas confundidas,
              asustadas e incapaces de tomar decisiones informadas sobre su salud y la de sus
              seres queridos.
            </p>
            <p>
              Ante ese panorama, decidimos actuar. Creamos este espacio con un objetivo
              claro: <strong>ser una fuente confiable</strong> que verificara los hechos antes
              de publicarlos y que pusiera la verdad por encima del clickbait o la especulación.
            </p>
            <p>
              Lo que comenzó como una respuesta de emergencia a la crisis sanitaria se convirtió
              en un proyecto periodístico permanente. Hoy cubrimos no solo la actualidad de
              Loreto e Iquitos, sino también las noticias más relevantes del país y del mundo
              que impactan a nuestra región.
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="mb-16">
          <div className="bg-red-600 rounded-2xl p-8 md:p-10 text-white">
            <h2 className="text-2xl md:text-3xl font-archivo font-bold mb-4">
              Nuestra misión
            </h2>
            <p className="text-red-100 text-lg leading-relaxed">
              Brindar información de la manera más profesional posible y llegar a todos
              los hogares de Loreto y más allá. Creemos que el acceso a información
              veraz no es un privilegio — es un derecho.
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-archivo font-bold text-black dark:text-white mb-8">
            Nuestros valores
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((value) => (
              <div
                key={value.title}
                className="p-6 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-red-300 dark:hover:border-red-800 transition-colors"
              >
                <div className="w-11 h-11 rounded-xl bg-red-50 dark:bg-red-900/30 text-red-600 flex items-center justify-center mb-4">
                  {value.icon}
                </div>
                <h3 className="font-archivo font-bold text-black dark:text-white text-lg mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-archivo font-bold text-black dark:text-white mb-6">
            Nuestro equipo
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            Loreto Noticias es hoy un equipo pequeño pero comprometido. Contamos con
            dos personas dedicadas: una encargada de la redacción y publicación de
            noticias, y otra responsable del sitio web y las redes sociales. Juntos
            trabajamos cada día para que la información llegue a tiempo y con la
            calidad que nuestros lectores merecen.
          </p>
          <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/40 text-red-600 flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Nuestro equipo está en pleno crecimiento. Si tienes vocación periodística
              o habilidades digitales y deseas sumarte al proyecto, escríbenos a{' '}
              <a
                href="mailto:grupoloretonoticias@gmail.com"
                className="text-red-600 hover:underline"
              >
                grupoloretonoticias@gmail.com
              </a>.
            </p>
          </div>
        </section>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/contacto"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
          >
            Contáctanos
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 dark:border-gray-600 hover:border-red-600 dark:hover:border-red-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg transition-colors"
          >
            Ver las noticias
          </Link>
        </div>

      </div>
    </div>
  )
}
