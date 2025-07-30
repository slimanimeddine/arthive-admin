"use client";
function TableRow() {
  return (
    <tr>
      <td className="animate-pulse px-1 py-4 text-sm whitespace-nowrap text-gray-500">
        <span className="inline-flex h-4 w-16 items-center rounded-md bg-gray-200"></span>
      </td>
      <td className="animate-pulse px-1 py-4 text-sm whitespace-nowrap text-gray-500">
        <span className="inline-flex h-4 w-16 items-center rounded-md bg-gray-200"></span>
      </td>
      <td className="animate-pulse px-1 py-4 text-sm whitespace-nowrap text-gray-500">
        <span className="inline-flex h-4 w-16 items-center rounded-md bg-gray-200"></span>
      </td>
      <td className="animate-pulse px-1 py-4 text-sm whitespace-nowrap text-gray-500">
        <span className="inline-flex h-4 w-16 items-center rounded-md bg-gray-200"></span>
      </td>
      <td className="animate-pulse px-1 py-4 text-sm whitespace-nowrap text-gray-500">
        <span className="inline-flex h-4 w-16 items-center rounded-md bg-gray-200"></span>
      </td>
      <td className="relative animate-pulse py-4 pr-4 pl-3 text-right text-sm font-medium whitespace-nowrap sm:pr-0">
        <span className="inline-flex h-4 w-16 items-center rounded-md bg-gray-200"></span>
      </td>
    </tr>
  );
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
            <th scope="col" className="relative py-3.5 pr-4 pl-3 sm:pr-0">
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
  );
}
