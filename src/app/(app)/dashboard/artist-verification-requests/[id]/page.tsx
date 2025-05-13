import ArtistVerificationRequestDetails from '@/components/artist-verification-request-details'
import { prefetchShowArtistVerificationRequestQuery } from '@/hooks/endpoints/admin'
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
  ...seo('Artist verification request', 'Manage artist verification request.'),
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const id = (await params).id
  const { token } = await verifyAuth()
  const queryClient = new QueryClient()

  await prefetchShowArtistVerificationRequestQuery(
    queryClient,
    id,
    authHeader(token)
  )

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ArtistVerificationRequestDetails
        id={id}
        token={token}
      />
    </HydrationBoundary>
  )
}
