import { verifyAuth } from '@/lib/dal'
import seo from '@/lib/seo'
import { Metadata } from 'next'

export const metadata: Metadata = {
  ...seo('Artists', 'Manage artists.'),
}

export default async function Page() {
  await verifyAuth()
  return <>artists</>
}
