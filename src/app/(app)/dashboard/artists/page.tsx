import ArtistsTable from '@/components/artists-table'
import {
  ListUsersParams,
  prefetchListUsersQuery,
} from '@/hooks/endpoints/admin'
import { verifyAuth } from '@/lib/dal'
import seo from '@/lib/seo'
import { authHeader } from '@/lib/utils'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import { Metadata } from 'next'

export const metadata: Metadata = {
  ...seo('Artists', 'Manage artists.'),
}

type SearchParamsValue = string | boolean | ListUsersParams['sort'] | undefined

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    [key: string]: SearchParamsValue
  }>
}) {
  const { token } = await verifyAuth()
  const queryClient = new QueryClient()

  const { tag, status, verified, artistSort, page } = await searchParams

  const queryParams: Record<string, SearchParamsValue> = {
    perPage: '10',
    ...(tag && { 'filter[tag]': tag }),
    ...(status && { 'filter[status]': status }),
    ...(verified && { 'filter[verified]': verified }),
    ...(artistSort && { sort: artistSort }),
    ...(page && { page }),
  }

  await prefetchListUsersQuery(queryClient, queryParams, authHeader(token))

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ArtistsTable token={token} />
    </HydrationBoundary>
  )
}
