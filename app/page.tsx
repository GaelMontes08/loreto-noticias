export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-blue-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold">Loreto Noticias</h1>
          <p className="text-blue-100 mt-2">Tu fuente de información confiable</p>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-blue-500 text-white">
        <div className="container mx-auto px-4">
          <ul className="flex space-x-6 py-3">
            <li><a href="#" className="hover:text-blue-200">Inicio</a></li>
            <li><a href="#" className="hover:text-blue-200">Política</a></li>
            <li><a href="#" className="hover:text-blue-200">Deportes</a></li>
            <li><a href="#" className="hover:text-blue-200">Cultura</a></li>
            <li><a href="#" className="hover:text-blue-200">Economía</a></li>
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Featured News */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-4 border-b-2 border-blue-600 pb-2">
              Noticias Destacadas
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-6">
              <div className="h-64 bg-gray-300 dark:bg-gray-700"></div>
              <div className="p-6">
                <span className="text-sm text-blue-600 font-semibold">ÚLTIMA HORA</span>
                <h3 className="text-2xl font-bold mt-2 mb-3">
                  Título de noticia principal
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Breve descripción de la noticia principal que captura la atención del lector...
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <span>Hace 2 horas</span>
                </div>
              </div>
            </div>

            {/* Secondary News */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                  <div className="h-40 bg-gray-300 dark:bg-gray-700"></div>
                  <div className="p-4">
                    <h4 className="font-bold mb-2">Título de noticia {item}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Breve descripción de la noticia...
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <h2 className="text-2xl font-bold mb-4 border-b-2 border-blue-600 pb-2">
              Más Leídas
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="mb-4 pb-4 border-b last:border-b-0">
                  <h4 className="font-semibold text-sm mb-1">
                    {item}. Noticia popular del día
                  </h4>
                  <span className="text-xs text-gray-500">Hace 3 horas</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-xl font-bold mb-3">Loreto Noticias</h3>
              <p className="text-gray-400">
                Tu fuente confiable de información local y nacional.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-3">Secciones</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Política</a></li>
                <li><a href="#" className="hover:text-white">Deportes</a></li>
                <li><a href="#" className="hover:text-white">Cultura</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3">Contacto</h4>
              <p className="text-gray-400">
                Email: contacto@loretonoticias.com<br />
                Tel: (123) 456-7890
              </p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-6 pt-6 text-center text-gray-400">
            <p>&copy; 2026 Loreto Noticias. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
