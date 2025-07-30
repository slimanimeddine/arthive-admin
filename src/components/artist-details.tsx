"use client";
import { useShowArtist } from "@/hooks/endpoints/admin";
import { authHeader, fileUrl, matchQueryStatus } from "@/lib/utils";
import DetailsSkeleton from "./ui-skeletons/details-skeleton";
import ErrorUI from "./error-ui";
import Image from "next/image";
import AvatarPlaceholder from "./avatar-placeholder";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "@/hooks/session";

export default function ArtistDetails() {
  const { token } = useSession();
  const { id } = useParams<{ id: string }>();
  const showArtistQuery = useShowArtist(id, authHeader(token));

  const router = useRouter();

  return matchQueryStatus(showArtistQuery, {
    Loading: <DetailsSkeleton />,
    Errored: <ErrorUI />,
    Empty: <></>,
    Success: ({ data }) => {
      const artist = {
        id: data.data.id,
        firstName: data.data.first_name,
        lastName: data.data.last_name,
        username: data.data.username,
        email: data.data.email,
        bio: data.data.bio,
        country: data.data.country,
        verified: data.data.artist_verified_at ? "Yes" : "No",
        photo: fileUrl(data.data.photo),
        artworks: data.data.artworks.map((artwork) => ({
          id: artwork.id,
          title: artwork.title,
          likesCount: artwork.artwork_likes_count,
          commentsCount: artwork.artwork_comments_count,
          mainPhoto: fileUrl(artwork.artwork_main_photo_path)!,
        })),
      };
      return (
        <div>
          <div className="px-4 sm:px-0">
            <h3 className="text-base/7 font-semibold text-gray-900">
              Artist Information
            </h3>
            <p className="mt-1 max-w-2xl text-sm/6 text-gray-500">
              Details and information about the artist.
            </p>
          </div>
          <div className="mt-6 border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium text-gray-900">Photo</dt>
                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {artist.photo ? (
                    <Image
                      className="h-20 w-20 rounded-lg"
                      src={artist.photo}
                      alt="Artist Photo"
                      width={80}
                      height={80}
                      priority
                    />
                  ) : (
                    <AvatarPlaceholder size={14} />
                  )}
                </dd>
              </div>

              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium text-gray-900">
                  First name
                </dt>
                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {artist.firstName}
                </dd>
              </div>

              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium text-gray-900">
                  Last name
                </dt>
                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {artist.lastName}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium text-gray-900">
                  Username
                </dt>
                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {artist.username}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium text-gray-900">
                  Email address
                </dt>
                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {artist.email}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium text-gray-900">Bio</dt>
                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {artist.bio}
                </dd>
              </div>

              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium text-gray-900">Country</dt>
                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {artist.country}
                </dd>
              </div>

              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium text-gray-900">
                  Verified
                </dt>
                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <span
                    className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
                      artist.verified === "Yes"
                        ? "bg-green-50 text-green-700 ring-1 ring-green-600/20 ring-inset"
                        : "bg-red-50 text-red-800 ring-1 ring-red-600/20 ring-inset"
                    }`}
                  >
                    {artist.verified}
                  </span>
                </dd>
              </div>
            </dl>
            {/* Artworks Section */}
            {artist.artworks.length > 0 && (
              <div className="mt-12">
                <div className="px-4 sm:px-0">
                  <h3 className="text-base/7 font-semibold text-gray-900">
                    Artworks
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm/6 text-gray-500">
                    Collection of artworks by this artist.
                  </p>
                </div>
                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                  {artist.artworks.map((artwork) => (
                    <div
                      onClick={() =>
                        router.push(`/dashboard/artworks/${artwork.id}`)
                      }
                      key={artwork.id}
                      className="group relative hover:underline"
                    >
                      <div className="aspect-h-1 aspect-w-1 lg:aspect-none w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80">
                        <Image
                          src={artwork.mainPhoto}
                          alt={artwork.title}
                          width={400}
                          height={400}
                          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                        />
                      </div>
                      <div className="mt-4 flex justify-between">
                        <div>
                          <h3 className="text-sm text-gray-700">
                            <span
                              aria-hidden="true"
                              className="absolute inset-0"
                            />
                            {artwork.title}
                          </h3>
                        </div>
                        <div className="flex space-x-4">
                          <p className="text-sm font-medium text-gray-900">
                            {artwork.likesCount} likes
                          </p>
                          <p className="text-sm font-medium text-gray-900">
                            {artwork.commentsCount} comments
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      );
    },
  });
}
