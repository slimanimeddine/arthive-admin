import type { Metadata } from "next";
import { verifyAuth } from "@/lib/dal";
import seo from "@/lib/seo";

export const metadata: Metadata = {
  ...seo("Welcome", "Welcome to ArtHive Admin Dashboard."),
};

export default async function Page() {
  await verifyAuth();

  return <>welcome to dashboard</>;
}
