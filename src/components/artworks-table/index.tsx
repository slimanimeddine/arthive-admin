'use client'
import { useListArtworks } from '@/hooks/endpoints/admin'
import { authHeader, fileUrl, matchQueryStatus } from '@/lib/utils'
import Image from 'next/image'
import ErrorUI from '../error-ui'
import Pagination from '../pagination'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import TableSkeleton from '../ui-skeletons/table-skeleton'
import SortFilterArtworks from './sort-filter-artworks'

export default function ArtworksTable({ token }: { token: string }) {
  const searchParams = useSearchParams()

  const page = searchParams.get('page')
  const artworkSort = searchParams.get('artworkSort')
  const tag = searchParams.get('tag')
  const status = searchParams.get('status')

  const queryParams: Record<string, string> = {
    perPage: '10',
    ...(tag && { 'filter[tag]': tag }),
    ...(status && { 'filter[status]': status }),
    ...(artworkSort && { sort: artworkSort }),
    ...(page && { page }),
  }

  const listArtworksQuery = useListArtworks(queryParams, authHeader(token))

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Artworks
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the artworks submitted by artists.
          </p>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          {matchQueryStatus(listArtworksQuery, {
            Loading: <TableSkeleton />,
            Errored: <ErrorUI />,
            Empty: <></>,
            Success: ({ data }) => {
              const artworks = data.data.map((artwork) => ({
                id: artwork.id,
                title: artwork.title,
                status: artwork.status,
                photo: fileUrl(artwork.artwork_main_photo_path)!,
                likes: artwork.artwork_likes_count,
                comments: artwork.artwork_comments_count,
              }))

              const meta = data.meta
              const links = data.links
              return (
                <>
                  <SortFilterArtworks />
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
                        {artworks.map((item) => (
                          <tr key={item.id}>
                            <td className="whitespace-nowrap px-1 py-4 text-sm text-gray-500">
                              {item.title}
                            </td>
                            <td className="whitespace-nowrap px-1 py-4 text-sm text-gray-500">
                              <span
                                className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium 
                              ${
                                item.status === 'published'
                                  ? 'bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20'
                                  : 'bg-yellow-50 text-yellow-800 ring-1 ring-inset ring-yellow-600/20'
                              }`}
                              >
                                {item.status}
                              </span>
                            </td>
                            <td className="whitespace-nowrap px-1 py-4 text-sm text-gray-500">
                              <div className="h-16 w-16 flex-shrink-0">
                                <Image
                                  className="h-16 w-16 object-cover"
                                  src={item.photo}
                                  alt=""
                                  width={64}
                                  height={64}
                                />
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-1 py-4 text-sm text-gray-500">
                              {item.likes}
                            </td>
                            <td className="whitespace-nowrap px-1 py-4 text-sm text-gray-500">
                              {item.comments}
                            </td>
                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                              <Link
                                prefetch={true}
                                href={`/dashboard/artworks/${item.id}`}
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
                </>
              )
            },
          })}
        </div>
      </div>
    </div>
  )
}
