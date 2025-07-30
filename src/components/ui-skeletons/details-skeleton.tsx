"use client";

export default function DetailsSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="px-4 sm:px-0">
        <div className="h-4 w-1/3 rounded bg-gray-200" />
        <div className="mt-1 h-4 w-full max-w-2xl rounded bg-gray-200" />
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <div className="h-4 w-1/4 rounded bg-gray-200" />
            <div className="mt-1 h-4 w-full rounded bg-gray-200 sm:col-span-2 sm:mt-0" />
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <div className="h-4 w-1/4 rounded bg-gray-200" />
            <div className="mt-1 h-4 w-full rounded bg-gray-200 sm:col-span-2 sm:mt-0" />
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <div className="h-4 w-1/4 rounded bg-gray-200" />
            <div className="mt-1 h-4 w-full rounded bg-gray-200 sm:col-span-2 sm:mt-0" />
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <div className="h-4 w-1/4 rounded bg-gray-200" />
            <div className="mt-1 h-4 w-full rounded bg-gray-200 sm:col-span-2 sm:mt-0" />
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <div className="h-4 w-1/4 rounded bg-gray-200" />
            <div className="mt-1 h-4 w-full rounded bg-gray-200 sm:col-span-2 sm:mt-0" />
          </div>
        </dl>
      </div>
    </div>
  );
}
