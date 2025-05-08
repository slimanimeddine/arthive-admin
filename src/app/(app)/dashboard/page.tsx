import { verifyAuth } from '@/lib/dal'
import seo from '@/lib/seo'
import { Metadata } from 'next'

export const metadata: Metadata = {
  ...seo('Welcome', 'Welcome to ArtHive Admin Dashboard.'),
}

export default async function Page() {
  // const { token } = await verifyAuth()

  return <>welcome to dashboard</>
}
