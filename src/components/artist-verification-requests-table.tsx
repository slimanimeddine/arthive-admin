"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useListArtistVerificationRequests } from "@/hooks/endpoints/admin";
import { useSession } from "@/hooks/session";
import { authHeader } from "@/lib/utils";
import ErrorUI from "./error-ui";
import Pagination from "./pagination";
import TableSkeleton from "./ui-skeletons/table-skeleton";

export default function ArtistVerificationRequestsTable() {
  const { token } = useSession();
  const searchParams = useSearchParams();

  const page = searchParams.get("page");
  const status = searchParams.get("status");

  const queryParams: Record<string, string | number> = {
    perPage: 10,
    ...(status && { "filter[status]": status }),
    ...(page && { page }),
  };

  const { isPending, isError, data, error } = useListArtistVerificationRequests(
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

  const artistVerificationRequests = data.data.map((rq) => ({
    id: rq.id,
    status: rq.status,
    submittedAt: rq.created_at,
  }));

  const meta = data.meta;
  const links = data.links;
  return (
    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
      <table className="min-w-full divide-y divide-gray-300">
        <thead>
          <tr>
            <th
              scope="col"
              className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-0"
            >
              Id
            </th>
            <th
              scope="col"
              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
            >
              Status
            </th>
            <th
              scope="col"
              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
            >
              Submitted At
            </th>
            <th scope="col" className="relative py-3.5 pr-4 pl-3 sm:pr-0">
              <span className="sr-only">Action</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {artistVerificationRequests.map((rq) => (
            <tr key={rq.id}>
              <td className="px-3 py-5 text-sm whitespace-nowrap text-gray-500">
                <div className="text-gray-900">{rq.id}</div>
              </td>
              <td className="px-3 py-5 text-sm whitespace-nowrap text-gray-500">
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
              </td>
              <td className="px-3 py-5 text-sm whitespace-nowrap text-gray-500">
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
              </td>

              <td className="relative py-5 pr-4 pl-3 text-right text-sm font-medium whitespace-nowrap sm:pr-0">
                <Link
                  href={`/dashboard/artist-verification-requests/${rq.id}`}
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
  );
}
