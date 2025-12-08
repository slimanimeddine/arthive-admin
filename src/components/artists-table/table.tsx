"use client";
import Image from "next/image";
import Link from "next/link";
import { useListUsers } from "@/hooks/endpoints/admin";
import { useArtistSort } from "@/hooks/params/artist-sort";
import { usePage } from "@/hooks/params/page";
import { useTag } from "@/hooks/params/tag";
import { useVerified } from "@/hooks/params/verified";
import { useSession } from "@/hooks/session";
import { authHeader, fileUrl } from "@/lib/utils";
import AvatarPlaceholder from "../avatar-placeholder";
import ErrorUI from "../error-ui";
import Pagination from "../pagination";
import TableSkeleton from "../ui-skeletons/table-skeleton";
import SortFilterArtists from "./sort-filter-artists";

export default function ArtistsTable() {
  const { token } = useSession();
  const { page } = usePage();
  const { artistSort } = useArtistSort();
  const { tag } = useTag();
  const { verified } = useVerified();

  const queryParams: Record<string, string | number | boolean> = {
    perPage: 10,
    ...(tag && { "filter[tag]": tag }),
    ...(verified && { "filter[verified]": verified }),
    ...(artistSort && { sort: artistSort }),
    ...(page && { page }),
  };

  const { isPending, isError, data, error } = useListUsers(
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

  const artists = data.data.map((artist) => ({
    id: artist.id,
    fullName: `${artist.first_name} ${artist.last_name}`,
    email: artist.email,
    username: artist.username,
    country: artist.country,
    verified: artist.artist_verified_at ? "Yes" : "No",
    photo: fileUrl(artist.photo),
  }));

  const meta = data.meta;
  const links = data.links;
  return (
    <>
      <SortFilterArtists />
      <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
        <table className="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th
                scope="col"
                className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-0"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Username
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Country
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Verified
              </th>
              <th scope="col" className="relative py-3.5 pr-4 pl-3 sm:pr-0">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {artists.map((artist) => (
              <tr key={artist.id}>
                <td className="py-5 pr-3 pl-4 text-sm whitespace-nowrap sm:pl-0">
                  <div className="flex items-center">
                    <div className="h-11 w-11 shrink-0">
                      {artist.photo ? (
                        <Image
                          alt=""
                          src={artist.photo}
                          className="h-11 w-11 rounded-full"
                          width={44}
                          height={44}
                        />
                      ) : (
                        <AvatarPlaceholder size={12} />
                      )}
                    </div>
                    <div className="ml-4">
                      <div className="font-medium text-gray-900">
                        {artist.fullName}
                      </div>
                      <div className="mt-1 text-gray-500">{artist.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-3 py-5 text-sm whitespace-nowrap text-gray-500">
                  <div className="text-gray-900">{artist.username}</div>
                </td>
                <td className="px-3 py-5 text-sm whitespace-nowrap text-gray-500">
                  {artist.country}
                </td>

                <td className="px-3 py-5 text-sm whitespace-nowrap text-gray-500">
                  <span
                    className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
                      artist.verified === "Yes"
                        ? "bg-green-50 text-green-700 ring-1 ring-green-600/20 ring-inset"
                        : "bg-red-50 text-red-800 ring-1 ring-red-600/20 ring-inset"
                    }`}
                  >
                    {artist.verified}
                  </span>
                </td>
                <td className="relative py-5 pr-4 pl-3 text-right text-sm font-medium whitespace-nowrap sm:pr-0">
                  <Link
                    href={`/dashboard/artists/${artist.id}`}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Details
                    <span className="sr-only">, {artist.fullName}</span>
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
