"use client";
import Image from "next/image";
import Link from "next/link";
import { useListArtworks } from "@/hooks/endpoints/admin";
import { useArtworkSort } from "@/hooks/params/artwork-sort";
import { usePage } from "@/hooks/params/page";
import { useStatus } from "@/hooks/params/status";
import { useTag } from "@/hooks/params/tag";
import { useSession } from "@/hooks/session";
import { authHeader, fileUrl } from "@/lib/utils";
import ErrorUI from "../error-ui";
import Pagination from "../pagination";
import TableSkeleton from "../ui-skeletons/table-skeleton";
import SortFilterArtworks from "./sort-filter-artworks";

export default function ArtworksTable() {
  const { token } = useSession();
  const { page } = usePage();
  const { artworkSort } = useArtworkSort();
  const { tag } = useTag();
  const { status } = useStatus();

  const queryParams: Record<string, string | number> = {
    perPage: 10,
    ...(tag && { "filter[tag]": tag }),
    ...(status && { "filter[status]": status }),
    ...(artworkSort && { sort: artworkSort }),
    ...(page && { page }),
  };

  const { isPending, isError, data, error } = useListArtworks(
    queryParams,
    authHeader(token),
  );

  if (isPending) {
    return <TableSkeleton />;
  }

  if (isError) {
    return <ErrorUI message={error.message} />;
  }

  if (!data || data.data.length === 0) {
    return <div></div>;
  }

  const artworks = data.data.map((artwork) => ({
    id: artwork.id,
    title: artwork.title,
    status: artwork.status,
    photo: fileUrl(artwork.artwork_main_photo_path) as string,
    likes: artwork.artwork_likes_count,
    comments: artwork.artwork_comments_count,
  }));

  const meta = data.meta;
  const links = data.links;
  return (
    <>
      <SortFilterArtworks />
      <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
        <table className="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th
                scope="col"
                className="px-1 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Title
              </th>
              <th
                scope="col"
                className="px-1 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-1 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Main photo
              </th>
              <th
                scope="col"
                className="px-1 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Likes
              </th>
              <th
                scope="col"
                className="px-1 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Comments
              </th>
              <th scope="col" className="relative py-3.5 pr-4 pl-3 sm:pr-0">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {artworks.map((item) => (
              <tr key={item.id}>
                <td className="px-1 py-4 text-sm whitespace-nowrap text-gray-500">
                  {item.title}
                </td>
                <td className="px-1 py-4 text-sm whitespace-nowrap text-gray-500">
                  <span
                    className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
                      item.status === "published"
                        ? "bg-green-50 text-green-700 ring-1 ring-green-600/20 ring-inset"
                        : "bg-yellow-50 text-yellow-800 ring-1 ring-yellow-600/20 ring-inset"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="px-1 py-4 text-sm whitespace-nowrap text-gray-500">
                  <div className="h-16 w-16 shrink-0">
                    <Image
                      className="h-16 w-16 object-cover"
                      src={item.photo}
                      alt=""
                      width={64}
                      height={64}
                    />
                  </div>
                </td>
                <td className="px-1 py-4 text-sm whitespace-nowrap text-gray-500">
                  {item.likes}
                </td>
                <td className="px-1 py-4 text-sm whitespace-nowrap text-gray-500">
                  {item.comments}
                </td>
                <td className="relative py-4 pr-4 pl-3 text-right text-sm font-medium whitespace-nowrap sm:pr-0">
                  <Link
                    prefetch={true}
                    href={`/dashboard/artworks/${item.id}`}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {meta.total > 10 && (
          <div className="mt-2">
            <Pagination meta={meta} links={links} />
          </div>
        )}
      </div>
    </>
  );
}
