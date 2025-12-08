import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import type { Metadata } from "next";
import z from "zod";
import ArtistVerificationRequestDetails from "@/components/artist-verification-request-details";
import InvalidParams from "@/components/invalid-params";
import { prefetchShowArtistVerificationRequestQuery } from "@/hooks/endpoints/admin";
import { verifyAuth } from "@/lib/dal";
import seo from "@/lib/seo";
import { authHeader, parseParams } from "@/lib/utils";

export const metadata: Metadata = {
  ...seo("Artist verification request", "Manage artist verification request."),
};

const paramsSchema = z.object({
  id: z.uuid(),
});

type Props = {
  params: Promise<z.infer<typeof paramsSchema>>;
};

export default async function Page({ params }: Props) {
  const { token } = await verifyAuth();
  const queryClient = new QueryClient();

  const { data, success, error } = parseParams(await params, paramsSchema);

  if (!success) {
    const errors = Object.values(z.flattenError(error).fieldErrors).map((err) =>
      err.join(", "),
    );
    return <InvalidParams errors={errors} />;
  }

  const { id } = data;

  await prefetchShowArtistVerificationRequestQuery(
    queryClient,
    id,
    authHeader(token),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ArtistVerificationRequestDetails />
    </HydrationBoundary>
  );
}
