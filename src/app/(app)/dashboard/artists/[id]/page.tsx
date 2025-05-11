import ArtistDetails from '@/components/artist-details'
import { prefetchShowArtistQuery } from '@/hooks/endpoints/admin'
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
  ...seo('Artist', 'Manage artist.'),
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const id = (await params).id
  const { token } = await verifyAuth()
  const queryClient = new QueryClient()

  await prefetchShowArtistQuery(queryClient, id, authHeader(token))

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ArtistDetails
        id={id}
        token={token}
      />
    </HydrationBoundary>
  )
}
