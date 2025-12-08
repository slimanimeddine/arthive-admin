import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import type { Metadata } from "next";
import z from "zod";
import ArtworkDetails from "@/components/artwork-details";
import InvalidParams from "@/components/invalid-params";
import { prefetchShowArtworkQuery } from "@/hooks/endpoints/admin";
import { verifyAuth } from "@/lib/dal";
import seo from "@/lib/seo";
import { authHeader, parseParams } from "@/lib/utils";

export const metadata: Metadata = {
  ...seo("Artwork", "Manage artwork."),
};

const paramsSchema = z.object({
  id: z.uuid(),
});

type Props = {
  params: Promise<z.infer<typeof paramsSchema>>;
};

export default async function Page({ params }: Props) {
  const { data, success, error } = parseParams(await params, paramsSchema);

  if (!success) {
    const errors = Object.values(z.flattenError(error).fieldErrors).map((err) =>
      err.join(", "),
    );
    return <InvalidParams errors={errors} />;
  }

  const { id } = data;

  const { token } = await verifyAuth();
  const queryClient = new QueryClient();

  await prefetchShowArtworkQuery(queryClient, id, authHeader(token));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ArtworkDetails />
    </HydrationBoundary>
  );
}
