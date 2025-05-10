import { verifyAuth } from '@/lib/dal'
import seo from '@/lib/seo'
import { Metadata } from 'next'

export const metadata: Metadata = {
  ...seo(
    'Artist Verification Requests',
    'Manage artist verification requests.'
  ),
}

export default async function Page() {
  await verifyAuth()
  return <>artist verification requests</>
}
