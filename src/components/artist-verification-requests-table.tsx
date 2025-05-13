'use client'
import { useListArtistVerificationRequests } from '@/hooks/endpoints/admin'
import { authHeader, matchQueryStatus } from '@/lib/utils'
import ErrorUI from './error-ui'
import Pagination from './pagination'
import { useSearchParams } from 'next/navigation'
import TableSkeleton from './ui-skeletons/table-skeleton'
import Link from 'next/link'

export default function ArtistVerificationRequestsTable({
  token,
}: {
  token: string
}) {
  const searchParams = useSearchParams()

  const page = searchParams.get('page')
  const status = searchParams.get('status')

  const queryParams: Record<string, string> = {
    perPage: '10',
    ...(status && { 'filter[status]': status }),
    ...(page && { page }),
  }

  const listArtistVerificationRequestsQuery = useListArtistVerificationRequests(
    queryParams,
    authHeader(token)
  )

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex-auto">
        <h1 className="text-base font-semibold leading-6 text-gray-900">
          Artist verification requests
        </h1>
        <p className="mt-2 text-sm text-gray-700">
          A list of all the artist verification requests. You can approve or
          reject them.
        </p>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          {matchQueryStatus(listArtistVerificationRequestsQuery, {
            Loading: <TableSkeleton />,
            Errored: <ErrorUI />,
            Empty: <></>,
            Success: ({ data }) => {
              const artistVerificationRequests = data.data.map((rq) => ({
                id: rq.id,
                status: rq.status,
                submittedAt: rq.created_at,
              }))

              const meta = data.meta
              const links = data.links
              return (
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                        >
                          Id
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Submitted At
                        </th>
                        <th
                          scope="col"
                          className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                        >
                          <span className="sr-only">Action</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {artistVerificationRequests.map((rq) => (
                        <tr key={rq.id}>
                          <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                            <div className="text-gray-900">{rq.id}</div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                            <span
                              className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium 
                              ${
                                rq.status === 'approved'
                                  ? 'bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20'
                                  : rq.status === 'pending'
                                    ? 'bg-yellow-50 text-yellow-800 ring-1 ring-inset ring-yellow-600/20'
                                    : 'bg-red-50 text-red-800 ring-1 ring-inset ring-red-600/20'
                              }`}
                            >
                              {rq.status}
                            </span>
                          </td>
                          <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                            {
                              <time
                                dateTime={rq.submittedAt}
                                title={new Date(rq.submittedAt).toDateString()}
                              >
                                {new Date(rq.submittedAt).toDateString()}
                              </time>
                            }{' '}
                            at{' '}
                            {
                              <time
                                dateTime={rq.submittedAt}
                                title={new Date(
                                  rq.submittedAt
                                ).toLocaleTimeString()}
                              >
                                {new Date(rq.submittedAt).toLocaleTimeString()}
                              </time>
                            }
                          </td>

                          <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                            <Link
                              href={`/dashboard/artist-verification-requests/${rq.id}`}
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              Details
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {meta.total > 10 && (
                    <div className="mt-2">
                      <Pagination
                        meta={meta}
                        links={links}
                      />
                    </div>
                  )}
                </div>
              )
            },
          })}
        </div>
      </div>
    </div>
  )
}
