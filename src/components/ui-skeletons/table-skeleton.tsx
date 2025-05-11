'use client'
function TableRow() {
  return (
    <tr>
      <td className="whitespace-nowrap px-1 py-4 text-sm text-gray-500 animate-pulse">
        <span className="inline-flex items-center rounded-md h-4 bg-gray-200 w-16"></span>
      </td>
      <td className="whitespace-nowrap px-1 py-4 text-sm text-gray-500 animate-pulse">
        <span className="inline-flex items-center rounded-md h-4 bg-gray-200 w-16"></span>
      </td>
      <td className="whitespace-nowrap px-1 py-4 text-sm text-gray-500 animate-pulse">
        <span className="inline-flex items-center rounded-md h-4 bg-gray-200 w-16"></span>
      </td>
      <td className="whitespace-nowrap px-1 py-4 text-sm text-gray-500 animate-pulse">
        <span className="inline-flex items-center rounded-md h-4 bg-gray-200 w-16"></span>
      </td>
      <td className="whitespace-nowrap px-1 py-4 text-sm text-gray-500 animate-pulse">
        <span className="inline-flex items-center rounded-md h-4 bg-gray-200 w-16"></span>
      </td>
      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0 animate-pulse">
        <span className="inline-flex items-center rounded-md h-4 bg-gray-200 w-16"></span>
      </td>
    </tr>
  )
}

export default function TableSkeleton() {
  return (
    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
      <table className="min-w-full divide-y divide-gray-300">
        <thead>
          <tr>
            <th
              scope="col"
              className="px-1 py-3.5 text-left text-sm font-semibold text-gray-900"
            >
              Title
            </th>
            <th
              scope="col"
              className="px-1 py-3.5 text-left text-sm font-semibold text-gray-900"
            >
              Status
            </th>
            <th
              scope="col"
              className="px-1 py-3.5 text-left text-sm font-semibold text-gray-900"
            >
              Main photo
            </th>
            <th
              scope="col"
              className="px-1 py-3.5 text-left text-sm font-semibold text-gray-900"
            >
              Likes
            </th>
            <th
              scope="col"
              className="px-1 py-3.5 text-left text-sm font-semibold text-gray-900"
            >
              Comments
            </th>
            <th
              scope="col"
              className="relative py-3.5 pl-3 pr-4 sm:pr-0"
            >
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {[...Array(10).keys()].map((item) => (
            <TableRow key={item} />
          ))}
        </tbody>
      </table>
    </div>
  )
}
