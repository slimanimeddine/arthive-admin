import ArtistVerificationRequestsTable from '@/components/artist-verification-requests-table'
import {
  ListArtistVerificationRequestsParams,
  prefetchListArtistVerificationRequests,
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
  ...seo(
    'Artist verification requests',
    'Manage artist verification requests.'
  ),
}

type SearchParamsValue =
  | string
  | number
  | ListArtistVerificationRequestsParams['filter[status]']
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

  const { status, page } = await searchParams

  const queryParams: Record<string, SearchParamsValue> = {
    perPage: '10',
    ...(status && { 'filter[status]': status }),
    ...(page && { page }),
  }

  await prefetchListArtistVerificationRequests(
    queryClient,
    queryParams,
    authHeader(token)
  )

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ArtistVerificationRequestsTable token={token} />
    </HydrationBoundary>
  )
}
