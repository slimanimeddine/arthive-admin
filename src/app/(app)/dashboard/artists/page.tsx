import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import type { Metadata } from "next";
import z from "zod";
import Artists from "@/components/artists-table";
import InvalidParams from "@/components/invalid-params";
import { prefetchListUsersQuery } from "@/hooks/endpoints/admin";
import {
  ARTIST_SORT_VALUES,
  ARTWORK_STATUS_VALUES,
  TAGS,
} from "@/lib/constants";
import { verifyAuth } from "@/lib/dal";
import seo from "@/lib/seo";
import { authHeader, parseParams } from "@/lib/utils";

export const metadata: Metadata = {
  ...seo("Artists", "Manage artists."),
};

const searchParamsSchema = z.object({
  tag: z.enum(TAGS).optional(),
  status: z.enum(ARTWORK_STATUS_VALUES).optional(),
  verified: z.boolean().optional(),
  artistSort: z.enum(ARTIST_SORT_VALUES).optional(),
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

  const { tag, status, verified, artistSort, page } = data;

  const queryParams: Record<string, number | string | boolean> = {
    perPage: 10,
    ...(tag && { "filter[tag]": tag }),
    ...(status && { "filter[status]": status }),
    ...(verified && { "filter[verified]": verified }),
    ...(artistSort && { sort: artistSort }),
    ...(page && { page }),
  };

  await prefetchListUsersQuery(queryClient, queryParams, authHeader(token));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Artists />
    </HydrationBoundary>
  );
}
