"use client";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { useShowArtistVerificationRequest } from "@/hooks/endpoints/admin";
import { useSession } from "@/hooks/session";
import { authHeader } from "@/lib/utils";
import EditArtistVerificationRequestStatusModal from "./edit-artist-verification-request-status-modal";
import ErrorUI from "./error-ui";
import DetailsSkeleton from "./ui-skeletons/details-skeleton";

export default function ArtistVerificationRequestDetails() {
  const { token } = useSession();
  const { id } = useParams<{ id: string }>();
  const { isPending, isError, data, error } = useShowArtistVerificationRequest(
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

  const rq = {
    id: data.data.id,
    status: data.data.status,
    reason: data.data.reason,
    userId: data.data.user_id,
    submittedAt: data.data.created_at,
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
            <dt className="text-sm/6 font-medium text-gray-900">Id</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {rq.id}
            </dd>
          </div>

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Status</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              <span className="inline-flex w-full items-center justify-between gap-x-2">
                <span
                  className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
                    rq.status === "approved"
                      ? "bg-green-50 text-green-700 ring-1 ring-green-600/20 ring-inset"
                      : rq.status === "pending"
                        ? "bg-yellow-50 text-yellow-800 ring-1 ring-yellow-600/20 ring-inset"
                        : "bg-red-50 text-red-800 ring-1 ring-red-600/20 ring-inset"
                  }`}
                >
                  {rq.status}
                </span>
                {rq.status === "pending" && (
                  <EditArtistVerificationRequestStatusModal
                    status={rq.status}
                  />
                )}
              </span>
            </dd>
          </div>
          {rq.reason && (
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm/6 font-medium text-gray-900">Bio</dt>
              <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                {rq.reason}
              </dd>
            </div>
          )}

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">
              Submitted at
            </dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {
                <time
                  dateTime={rq.submittedAt}
                  title={new Date(rq.submittedAt).toDateString()}
                >
                  {new Date(rq.submittedAt).toDateString()}
                </time>
              }{" "}
              at{" "}
              {
                <time
                  dateTime={rq.submittedAt}
                  title={new Date(rq.submittedAt).toLocaleTimeString()}
                >
                  {new Date(rq.submittedAt).toLocaleTimeString()}
                </time>
              }
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">User</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              <Link
                href={`/dashboard/artists/${rq.userId}`}
                className="text-indigo-600 hover:text-indigo-900"
              >
                View user details
              </Link>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
