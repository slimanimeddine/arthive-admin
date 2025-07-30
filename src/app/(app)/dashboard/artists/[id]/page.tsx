import ArtistDetails from "@/components/artist-details";
import { prefetchShowArtistQuery } from "@/hooks/endpoints/admin";
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
  ...seo("Artist", "Manage artist."),
};

type Props = {
  params: Promise<{ id: string }>;
};

const paramsSchema = z.object({
  id: z.uuid(),
});

export default async function Page({ params }: Props) {
  const { id } = parseData(await params, paramsSchema);
  const { token } = await verifyAuth();
  const queryClient = new QueryClient();

  await prefetchShowArtistQuery(queryClient, id, authHeader(token));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ArtistDetails />
    </HydrationBoundary>
  );
}
