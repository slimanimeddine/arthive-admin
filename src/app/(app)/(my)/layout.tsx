"use client";

import SidebarNavigationLayout from "@/components/sidebar-navigation-layout";
import {
  BellIcon,
  CameraIcon,
  TrashIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

const navigation = [
  {
    name: "Edit Profile",
    href: "/edit-profile",
    icon: UserCircleIcon,
  },
  { name: "Notifications", href: "/notifications", icon: BellIcon },
  {
    name: "Change Photo",
    href: "/change-photo",
    icon: CameraIcon,
  },
  {
    name: "Delete Account",
    href: "/delete-account",
    icon: TrashIcon,
  },
];

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarNavigationLayout navigation={navigation}>
      {children}
    </SidebarNavigationLayout>
  );
}
