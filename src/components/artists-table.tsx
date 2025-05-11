'use client'
import { useListUsers } from '@/hooks/endpoints/admin'
import { authHeader, fileUrl, matchQueryStatus } from '@/lib/utils'
import Image from 'next/image'
import ErrorUI from './error-ui'
import Pagination from './pagination'
import { useSearchParams } from 'next/navigation'
import TableSkeleton from './ui-skeletons/table-skeleton'
import AvatarPlaceholder from './avatar-placeholder'
import Link from 'next/link'

export default function ArtistsTable({ token }: { token: string }) {
  const searchParams = useSearchParams()

  const page = searchParams.get('page')
  const artistSort = searchParams.get('artistSort')
  const tag = searchParams.get('tag')
  const status = searchParams.get('status')
  const verified = searchParams.get('verified')

  const queryParams: Record<string, string> = {
    perPage: '10',
    ...(tag && { 'filter[tag]': tag }),
    ...(status && { 'filter[status]': status }),
    ...(verified && { 'filter[verified]': verified }),
    ...(artistSort && { sort: artistSort }),
    ...(page && { page }),
  }

  const listUsersQuery = useListUsers(queryParams, authHeader(token))

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex-auto">
        <h1 className="text-base font-semibold leading-6 text-gray-900">
          Users
        </h1>
        <p className="mt-2 text-sm text-gray-700">
          A list of all the users in ArtHive.
        </p>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          {matchQueryStatus(listUsersQuery, {
            Loading: <TableSkeleton />,
            Errored: <ErrorUI />,
            Empty: <></>,
            Success: ({ data }) => {
              const artists = data.data.map((artist) => ({
                id: artist.id,
                fullName: `${artist.first_name} ${artist.last_name}`,
                email: artist.email,
                username: artist.username,
                country: artist.country,
                verified: artist.artist_verified_at ? 'Yes' : 'No',
                photo: fileUrl(artist.photo),
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
                          Name
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Username
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Country
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Verified
                        </th>
                        <th
                          scope="col"
                          className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                        >
                          <span className="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {artists.map((artist) => (
                        <tr key={artist.id}>
                          <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                            <div className="flex items-center">
                              <div className="h-11 w-11 flex-shrink-0">
                                {artist.photo ? (
                                  <Image
                                    alt=""
                                    src={artist.photo}
                                    className="h-11 w-11 rounded-full"
                                    width={44}
                                    height={44}
                                  />
                                ) : (
                                  <AvatarPlaceholder size={12} />
                                )}
                              </div>
                              <div className="ml-4">
                                <div className="font-medium text-gray-900">
                                  {artist.fullName}
                                </div>
                                <div className="mt-1 text-gray-500">
                                  {artist.email}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                            <div className="text-gray-900">
                              {artist.username}
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                            {artist.country}
                          </td>

                          <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                            <span
                              className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium 
                              ${
                                artist.verified === 'Yes'
                                  ? 'bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20'
                                  : 'bg-red-50 text-red-800 ring-1 ring-inset ring-red-600/20'
                              }`}
                            >
                              {artist.verified}
                            </span>
                          </td>
                          <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                            <Link
                              href={`/dashboard/artists/${artist.id}`}
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              Details
                              <span className="sr-only">
                                , {artist.fullName}
                              </span>
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
