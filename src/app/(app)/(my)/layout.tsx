"use client";

import {
  BellIcon,
  CameraIcon,
  TrashIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import SidebarNavigationLayout from "@/components/sidebar-navigation-layout";

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

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function Layout({ children }: Props) {
  return (
    <SidebarNavigationLayout navigation={navigation}>
      {children}
    </SidebarNavigationLayout>
  );
}
