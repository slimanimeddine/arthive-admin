import Footer from '@/components/footer'
import Header from '@/components/header'
import { prefetchCheckIfUnreadNotificationsExist } from '@/hooks/endpoints/notifications'
import { prefetchShowAuthenticatedUser } from '@/hooks/endpoints/users'
import { getAuth } from '@/lib/dal'
import { authHeader } from '@/lib/utils'
import { QueryClient } from '@tanstack/react-query'

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { token } = await getAuth()
  const authConfig = authHeader(token!)

  const queryClient = new QueryClient()

  await prefetchCheckIfUnreadNotificationsExist(queryClient, authConfig)

  await prefetchShowAuthenticatedUser(queryClient, authConfig)

  return (
    <div className="min-h-full">
      <Header token={token!} />
      {children}
      <Footer />
    </div>
  )
}
