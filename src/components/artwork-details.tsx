"use client";

import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { useShowArtwork } from "@/hooks/endpoints/admin";
import { useSession } from "@/hooks/session";
import { authHeader, fileUrl } from "@/lib/utils";
import ErrorUI from "./error-ui";
import DetailsSkeleton from "./ui-skeletons/details-skeleton";

export default function ArtworkDetails() {
  const { token } = useSession();
  const { id } = useParams<{ id: string }>();
  const { isPending, isError, data, error } = useShowArtwork(
    id,
    authHeader(token),
  );

  if (isPending) {
    return <DetailsSkeleton />;
  }

  if (isError) {
    if (error.isAxiosError && error.response?.status === 404) {
      notFound();
    }
    return <ErrorUI message={error.message} />;
  }

  if (!data) {
    return <div></div>;
  }

  const artwork = {
    id: data.data.id,
    title: data.data.title,
    status: data.data.status,
    description: data.data.description,
    createdAt: data.data.created_at,
    likesCount: data.data.artwork_likes_count,
    commentsCount: data.data.artwork_comments_count,
    owner: {
      id: data.data.user.id,
      fullName: `${data.data.user.first_name} ${data.data.user.last_name}`,
    },
    photos: data.data.artwork_photos.map((photo) => ({
      id: photo.id,
      isMain: photo.is_main,
      url: fileUrl(photo.path) as string,
    })),
    tags: data.data.tags.map((tag) => ({
      id: tag.id,
      name: tag.name,
    })),
  };

  return (
    <div>
      <div className="px-4 sm:px-0">
        <h3 className="text-base/7 font-semibold text-gray-900">
          Artwork Information
        </h3>
        <p className="mt-1 max-w-2xl text-sm/6 text-gray-500">
          Details and information about the artwork.
        </p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Title</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {artwork.title}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Description</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {artwork.description}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Status</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              <span
                className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
                  artwork.status === "published"
                    ? "bg-green-50 text-green-700 ring-1 ring-green-600/20 ring-inset"
                    : "bg-yellow-50 text-yellow-800 ring-1 ring-yellow-600/20 ring-inset"
                }`}
              >
                {artwork.status}
              </span>
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Likes Count</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {artwork.likesCount}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">
              Comments Count
            </dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {artwork.commentsCount}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">
              Creation Date
            </dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {
                <time
                  dateTime={artwork.createdAt}
                  title={new Date(artwork.createdAt).toDateString()}
                >
                  {new Date(artwork.createdAt).toDateString()}
                </time>
              }{" "}
              at{" "}
              {
                <time
                  dateTime={artwork.createdAt}
                  title={new Date(artwork.createdAt).toLocaleTimeString()}
                >
                  {new Date(artwork.createdAt).toLocaleTimeString()}
                </time>
              }
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Tags</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              <span className="inline-flex flex-wrap gap-x-2">
                {artwork.tags.map((tag) => (
                  <span
                    key={tag.id}
                    className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-indigo-700/10 ring-inset"
                  >
                    {tag.name}
                  </span>
                ))}
              </span>
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Owner</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              <span className="inline-flex w-full items-center justify-between">
                <span>{artwork.owner.fullName}</span>
                <Link
                  prefetch={true}
                  href={`/dashboard/artists/${artwork.owner.id}`}
                  className="font-medium text-indigo-600 hover:text-indigo-900"
                >
                  Details
                </Link>
              </span>
            </dd>
          </div>

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Photos</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                {artwork.photos.map((photo) => (
                  <div key={photo.id} className="group relative">
                    <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
                      <Image unoptimized
                        src={photo.url}
                        alt={`Artwork photo ${photo.id}`}
                        width={400}
                        height={400}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    {photo.isMain === 1 && (
                      <span className="absolute top-2 left-2 inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-blue-700/10 ring-inset">
                        Main Photo
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
