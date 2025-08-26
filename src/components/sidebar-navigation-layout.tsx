"use client";

import { classNames } from "@/lib/utils";
import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  type ForwardRefExoticComponent,
  type SVGProps,
  type RefAttributes,
} from "react";

type SidebarNavigationLayoutProps = Readonly<{
  children: React.ReactNode;
  navigation: {
    name: string;
    href: string;
    icon: ForwardRefExoticComponent<
      Omit<SVGProps<SVGSVGElement>, "ref"> & {
        title?: string;
        titleId?: string;
      } & RefAttributes<SVGSVGElement>
    >;
  }[];
}>;

export default function SidebarNavigationLayout({
  children,
  navigation,
}: SidebarNavigationLayoutProps) {
  const pathname = usePathname();
  return (
    <div className="mx-auto max-w-7xl lg:flex lg:gap-x-4">
      <h1 className="sr-only">General Settings</h1>

      <aside className="flex overflow-x-auto border-b border-gray-900/5 py-4 lg:block lg:w-64 lg:flex-none lg:border-0 lg:py-10">
        <nav className="flex-none px-4 sm:px-6 lg:px-0">
          <ul className="flex gap-x-3 gap-y-1 whitespace-nowrap lg:flex-col">
            {navigation.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href as Route}
                  className={classNames(
                    item.href === pathname
                      ? "bg-gray-50 text-indigo-600"
                      : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600",
                    "group flex gap-x-3 rounded-md py-2 pr-3 pl-2 text-sm leading-6 font-semibold",
                  )}
                >
                  <item.icon
                    aria-hidden="true"
                    className={classNames(
                      item.href === pathname
                        ? "text-indigo-600"
                        : "text-gray-400 group-hover:text-indigo-600",
                      "h-6 w-6 shrink-0",
                    )}
                  />
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <main className="px-4 py-8 sm:px-6 lg:flex-auto lg:px-0 lg:py-10">
        <div className="mx-auto max-w-2xl space-y-4 lg:mx-0 lg:max-w-none">
          {children}
        </div>
      </main>
    </div>
  );
}
