import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <p className="text-8xl font-archivo font-bold text-red-600 mb-4">404</p>
        <h1 className="text-3xl md:text-4xl font-archivo font-bold text-black dark:text-white mb-4">
          Página no encontrada
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">
          Lo sentimos, la página que buscas no existe o fue eliminada.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
          >
            Volver al inicio
          </Link>
          <Link
            href="/contacto"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 dark:border-gray-600 hover:border-red-600 dark:hover:border-red-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg transition-colors"
          >
            Contacto
          </Link>
        </div>
      </div>
    </div>
  )
}
