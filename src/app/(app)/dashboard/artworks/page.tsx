import ArtworksTable from '@/components/artworks-table'
import {
  ListArtworksParams,
  prefetchListArtworksQuery,
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
  ...seo('Artworks', 'Manage artworks.'),
}

type SearchParamsValue =
  | string
  | number
  | ListArtworksParams['sort']
  | ListArtworksParams['filter[status]']
  | undefined

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    [key: string]: SearchParamsValue
  }>
}) {
  const { token } = await verifyAuth()
  const queryClient = new QueryClient()

  const { tag, status, artworkSort, page } = await searchParams

  const queryParams: Record<string, SearchParamsValue> = {
    perPage: '10',
    ...(tag && { 'filter[tag]': tag }),
    ...(status && { 'filter[status]': status }),
    ...(artworkSort && { sort: artworkSort }),
    ...(page && { page }),
  }

  await prefetchListArtworksQuery(queryClient, queryParams, authHeader(token))

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ArtworksTable token={token} />
    </HydrationBoundary>
  )
}
