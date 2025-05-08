'use client'

import SidebarNavigationLayout from '@/components/sidebar-navigation-layout'
import { UserCircleIcon } from '@heroicons/react/24/outline'

const navigation = [
  {
    name: 'Artist Verification Requests',
    href: '/dashboard/artist-verification-requests',
    icon: UserCircleIcon,
  },
]

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <SidebarNavigationLayout navigation={navigation}>
      {children}
    </SidebarNavigationLayout>
  )
}
