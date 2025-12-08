import type { Metadata } from "next";
import Link from "next/link";
import Logo from "@/components/logo";
import SignInForm from "@/components/sign-in-form";
import seo from "@/lib/seo";

export const metadata: Metadata = {
  ...seo("Sign In", "Sign in to your account"),
};

export default function Page() {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Link
          href="/dashboard"
          className="flex h-full w-full items-center justify-center"
        >
          <Logo />
        </Link>
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <SignInForm />
      </div>
    </div>
  );
}
