import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import type { Metadata } from "next";
import z from "zod";
import ArtistVerificationRequests from "@/components/artist-verification-requests";
import InvalidParams from "@/components/invalid-params";
import { prefetchListArtistVerificationRequests } from "@/hooks/endpoints/admin";
import { ARTWORK_STATUS_VALUES } from "@/lib/constants";
import { verifyAuth } from "@/lib/dal";
import seo from "@/lib/seo";
import { authHeader, parseParams } from "@/lib/utils";

export const metadata: Metadata = {
  ...seo(
    "Artist verification requests",
    "Manage artist verification requests.",
  ),
};

const searchParamsSchema = z.object({
  status: z.enum(ARTWORK_STATUS_VALUES).optional(),
  page: z.int().default(1),
});

type Props = {
  searchParams: Promise<z.infer<typeof searchParamsSchema>>;
};

export default async function Page({ searchParams }: Props) {
  const { token } = await verifyAuth();
  const queryClient = new QueryClient();

  const { data, success, error } = parseParams(
    await searchParams,
    searchParamsSchema,
  );

  if (!success) {
    const errors = Object.values(z.flattenError(error).fieldErrors).map((err) =>
      err.join(", "),
    );
    return <InvalidParams errors={errors} />;
  }

  const { status, page } = data;

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
