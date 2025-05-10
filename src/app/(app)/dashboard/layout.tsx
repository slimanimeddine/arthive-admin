'use client'

import SidebarNavigationLayout from '@/components/sidebar-navigation-layout'
import {
  BriefcaseIcon,
  CheckBadgeIcon,
  TableCellsIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline'

const navigation = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: TableCellsIcon,
  },
  {
    name: 'Artists',
    href: '/dashboard/artists',
    icon: UserCircleIcon,
  },
  {
    name: 'Artworks',
    href: '/dashboard/artworks',
    icon: BriefcaseIcon,
  },
  {
    name: 'Artist Verification Requests',
    href: '/dashboard/artist-verification-requests',
    icon: CheckBadgeIcon,
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
