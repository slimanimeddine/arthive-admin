'use client'

export default function DetailsSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="px-4 sm:px-0">
        <div className="h-4 bg-gray-200 rounded w-1/3" />
        <div className="mt-1 max-w-2xl h-4 bg-gray-200 rounded w-full" />
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <div className="h-4 bg-gray-200 rounded w-1/4" />
            <div className="mt-1 h-4 bg-gray-200 rounded w-full sm:col-span-2 sm:mt-0" />
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <div className="h-4 bg-gray-200 rounded w-1/4" />
            <div className="mt-1 h-4 bg-gray-200 rounded w-full sm:col-span-2 sm:mt-0" />
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <div className="h-4 bg-gray-200 rounded w-1/4" />
            <div className="mt-1 h-4 bg-gray-200 rounded w-full sm:col-span-2 sm:mt-0" />
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <div className="h-4 bg-gray-200 rounded w-1/4" />
            <div className="mt-1 h-4 bg-gray-200 rounded w-full sm:col-span-2 sm:mt-0" />
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <div className="h-4 bg-gray-200 rounded w-1/4" />
            <div className="mt-1 h-4 bg-gray-200 rounded w-full sm:col-span-2 sm:mt-0" />
          </div>
        </dl>
      </div>
    </div>
  )
}
