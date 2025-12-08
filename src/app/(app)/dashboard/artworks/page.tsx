import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import type { Metadata } from "next";
import z from "zod";
import Artworks from "@/components/artworks-table";
import InvalidParams from "@/components/invalid-params";
import { prefetchListArtworksQuery } from "@/hooks/endpoints/admin";
import {
  ARTWORK_SORT_VALUES,
  ARTWORK_STATUS_VALUES,
  TAGS,
} from "@/lib/constants";
import { verifyAuth } from "@/lib/dal";
import seo from "@/lib/seo";
import { authHeader, parseParams } from "@/lib/utils";

export const metadata: Metadata = {
  ...seo("Artworks", "Manage artworks."),
};

const searchParamsSchema = z.object({
  tag: z.enum(TAGS).optional(),
  status: z.enum(ARTWORK_STATUS_VALUES).optional(),
  artworkSort: z.enum(ARTWORK_SORT_VALUES).optional(),
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

  const { tag, status, artworkSort, page } = data;

  const queryParams: Record<string, number | string> = {
    perPage: 10,
    ...(tag && { "filter[tag]": tag }),
    ...(status && { "filter[status]": status }),
    ...(artworkSort && { sort: artworkSort }),
    ...(page && { page }),
  };

  await prefetchListArtworksQuery(queryClient, queryParams, authHeader(token));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Artworks />
    </HydrationBoundary>
  );
}
