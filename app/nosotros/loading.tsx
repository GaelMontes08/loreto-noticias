export default function NosotrosLoading() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <div className="max-w-4xl mx-auto px-4 py-12">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8">
          <div className="h-4 w-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="h-4 w-2 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="h-4 w-28 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        </div>

        {/* Red accent + subtitle */}
        <div className="flex items-center gap-3 mb-4 animate-pulse">
          <div className="w-1 h-10 bg-gray-200 dark:bg-gray-700 rounded-full" />
          <div className="h-4 w-52 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>

        {/* Title */}
        <div className="h-12 w-64 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-4" />

        {/* Subtitle paragraph */}
        <div className="space-y-2 mb-12 animate-pulse">
          <div className="h-5 w-full bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="h-5 w-4/5 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-3 gap-4 mb-16 animate-pulse">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="p-5 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 space-y-2"
            >
              <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded mx-auto" />
              <div className="h-3 w-full bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
          ))}
        </div>

        {/* Section: Historia */}
        <div className="mb-16 animate-pulse">
          <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded mb-6" />
          <div className="space-y-3">
            <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded mt-4" />
            <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded" />
          </div>
        </div>

        {/* Section: Misión box */}
        <div className="mb-16 animate-pulse">
          <div className="bg-gray-200 dark:bg-gray-700 rounded-2xl p-8 md:p-10">
            <div className="h-7 w-40 bg-gray-300 dark:bg-gray-600 rounded mb-4" />
            <div className="space-y-2">
              <div className="h-4 w-full bg-gray-300 dark:bg-gray-600 rounded" />
              <div className="h-4 w-5/6 bg-gray-300 dark:bg-gray-600 rounded" />
            </div>
          </div>
        </div>

        {/* Section: Valores cards */}
        <div className="mb-16 animate-pulse">
          <div className="h-8 w-44 bg-gray-200 dark:bg-gray-700 rounded mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="p-6 rounded-2xl border border-gray-200 dark:border-gray-700 space-y-3"
              >
                <div className="w-11 h-11 rounded-xl bg-gray-200 dark:bg-gray-700" />
                <div className="h-5 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
                <div className="space-y-1.5">
                  <div className="h-3 w-full bg-gray-200 dark:bg-gray-700 rounded" />
                  <div className="h-3 w-4/5 bg-gray-200 dark:bg-gray-700 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section: Equipo */}
        <div className="mb-16 animate-pulse">
          <div className="h-8 w-44 bg-gray-200 dark:bg-gray-700 rounded mb-6" />
          <div className="space-y-2 mb-6">
            <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded" />
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-3 w-full bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-3 w-4/5 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
          </div>
        </div>

        {/* CTA buttons */}
        <div className="flex gap-4 animate-pulse">
          <div className="h-12 w-36 bg-gray-200 dark:bg-gray-700 rounded-lg" />
          <div className="h-12 w-36 bg-gray-200 dark:bg-gray-700 rounded-lg" />
        </div>

      </div>
    </div>
  )
}
