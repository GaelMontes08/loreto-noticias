export default function ArticleLoading() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <article className="max-w-4xl mx-auto px-4 py-8">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6">
          <div className="h-4 w-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="h-4 w-2 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        </div>

        {/* Title */}
        <div className="space-y-3 mb-4 animate-pulse">
          <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="h-10 w-2/3 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>

        {/* Meta */}
        <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-200 dark:border-gray-700 animate-pulse">
          <div className="h-4 w-40 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>

        {/* Hero Image */}
        <div className="w-full h-[400px] md:h-[500px] mb-8 rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse" />

        {/* Article body paragraphs */}
        <div className="space-y-4 animate-pulse">
          {[1, 0.9, 1, 0.7, 1, 0.85, 1, 0.6].map((w, i) => (
            <div
              key={i}
              className="h-4 bg-gray-200 dark:bg-gray-700 rounded"
              style={{ width: `${w * 100}%` }}
            />
          ))}

          {/* Paragraph break */}
          <div className="pt-4 space-y-4">
            {[1, 0.95, 1, 0.8, 1, 0.65].map((w, i) => (
              <div
                key={i}
                className="h-4 bg-gray-200 dark:bg-gray-700 rounded"
                style={{ width: `${w * 100}%` }}
              />
            ))}
          </div>

          {/* Subheading */}
          <div className="pt-6">
            <div className="h-7 w-64 bg-gray-200 dark:bg-gray-700 rounded mb-4" />
            <div className="space-y-3">
              {[1, 0.9, 1, 0.75].map((w, i) => (
                <div
                  key={i}
                  className="h-4 bg-gray-200 dark:bg-gray-700 rounded"
                  style={{ width: `${w * 100}%` }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Share section */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 animate-pulse">
          <div className="h-6 w-48 bg-gray-200 dark:bg-gray-700 rounded mb-4" />
          <div className="flex gap-3">
            <div className="h-10 w-28 bg-gray-200 dark:bg-gray-700 rounded-lg" />
            <div className="h-10 w-28 bg-gray-200 dark:bg-gray-700 rounded-lg" />
            <div className="h-10 w-28 bg-gray-200 dark:bg-gray-700 rounded-lg" />
          </div>
        </div>

      </article>
    </div>
  )
}
