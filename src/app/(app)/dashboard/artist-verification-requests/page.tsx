import ArtistVerificationRequests from "@/components/artist-verification-requests";
import { prefetchListArtistVerificationRequests } from "@/hooks/endpoints/admin";
import { ARTWORK_STATUS_VALUES } from "@/lib/constants";
import { verifyAuth } from "@/lib/dal";
import seo from "@/lib/seo";
import { authHeader, parseData } from "@/lib/utils";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { type Metadata } from "next";
import z from "zod";

export const metadata: Metadata = {
  ...seo(
    "Artist verification requests",
    "Manage artist verification requests.",
  ),
};

type Props = {
  searchParams: Promise<{
    status?: string;
    page: number;
  }>;
};

const searchParamsSchema = z.object({
  status: z.enum(ARTWORK_STATUS_VALUES).optional(),
  page: z.int().default(1),
});

export default async function Page({ searchParams }: Props) {
  const { token } = await verifyAuth();
  const queryClient = new QueryClient();

  const { status, page } = parseData(await searchParams, searchParamsSchema);

  const queryParams: Record<string, number | string> = {
    perPage: 10,
    ...(status && { "filter[status]": status }),
    ...(page && { page }),
  };

  await prefetchListArtistVerificationRequests(
    queryClient,
    queryParams,
    authHeader(token),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ArtistVerificationRequests />
    </HydrationBoundary>
  );
}
