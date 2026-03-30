export default function HomeLoading() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <main className="py-8">
        <div className="max-w-6xl mx-auto px-4">

          {/* Featured News Section */}
          <div className="mb-8">
            <div className="h-9 w-64 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-3" />
            <div className="w-full h-0.5 bg-red-600 mb-6" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Main featured — 2 cols */}
              <div className="relative h-[400px] md:h-[600px] md:col-span-2 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700 animate-pulse">
                <div className="absolute bottom-0 left-0 right-0 p-6 space-y-3">
                  <div className="h-5 w-24 bg-gray-300 dark:bg-gray-600 rounded" />
                  <div className="h-8 w-full bg-gray-300 dark:bg-gray-600 rounded" />
                  <div className="h-8 w-3/4 bg-gray-300 dark:bg-gray-600 rounded" />
                </div>
              </div>

              {/* Two secondary cards */}
              <div className="flex flex-col gap-6">
                {[0, 1].map((i) => (
                  <div key={i} className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden animate-pulse">
                    <div className="p-4 space-y-2">
                      <div className="h-5 w-full bg-gray-200 dark:bg-gray-700 rounded" />
                      <div className="h-5 w-2/3 bg-gray-200 dark:bg-gray-700 rounded" />
                    </div>
                    <div className="w-full aspect-[16/9] bg-gray-200 dark:bg-gray-700" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Latest News Section */}
          <div className="mt-12">
            <div className="h-9 w-52 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-3" />
            <div className="w-full h-0.5 bg-red-600 mb-6" />

            <div className="space-y-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex flex-col md:flex-row gap-4 bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm animate-pulse">
                  <div className="w-full md:w-64 h-48 bg-gray-200 dark:bg-gray-700 flex-shrink-0" />
                  <div className="flex-1 p-4 flex flex-col justify-center space-y-3">
                    <div className="h-7 w-full bg-gray-200 dark:bg-gray-700 rounded" />
                    <div className="h-7 w-3/4 bg-gray-200 dark:bg-gray-700 rounded" />
                    <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded" />
                    <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-700 rounded" />
                    <div className="h-3 w-32 bg-gray-200 dark:bg-gray-700 rounded mt-2" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mundo Section */}
          <div className="mt-12">
            <div className="h-9 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-3" />
            <div className="w-full h-0.5 bg-red-600 mb-6" />

            {/* Main mundo post */}
            <div className="mb-6 animate-pulse">
              <div className="h-8 w-full bg-gray-200 dark:bg-gray-700 rounded mb-2" />
              <div className="h-8 w-2/3 bg-gray-200 dark:bg-gray-700 rounded mb-4" />
              <div className="w-full md:h-[500px] h-[200px] bg-gray-200 dark:bg-gray-700 rounded-lg" />
              <div className="w-full h-px bg-gray-300 dark:bg-gray-700 mt-4 mb-6" />
            </div>

            {/* 4-col grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm animate-pulse">
                  <div className="w-full h-48 bg-gray-200 dark:bg-gray-700" />
                  <div className="p-4 space-y-2">
                    <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded" />
                    <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tecnología Section */}
          <div className="mt-12">
            <div className="h-9 w-44 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-3" />
            <div className="w-full h-0.5 bg-red-600 mb-6" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm animate-pulse">
                  <div className="w-full h-48 bg-gray-200 dark:bg-gray-700" />
                  <div className="p-4 space-y-2">
                    <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded" />
                    <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded" />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}
