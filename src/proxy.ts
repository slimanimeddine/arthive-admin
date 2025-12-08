import { type NextRequest, NextResponse } from "next/server";
import { getSession } from "./actions/session";

const protectedRoutes = [
  "/dashboard",
  "/change-photo",
  "/delete-account",
  "/email/verify",
  "/edit-profile",
  "/sign-out",
  "/notifications",
];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some((route) =>
    path.startsWith(route),
  );

  const session = await getSession();

  if (isProtectedRoute && !session?.id && !session?.token) {
    return NextResponse.redirect(new URL("/sign-in", req.nextUrl));
  }

  if (req.nextUrl.pathname === "/sign-in" && session?.id && session?.token) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
