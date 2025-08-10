"use client";

import ArtistVerificationRequestsTable from "./artist-verification-requests-table";

export default function ArtistVerificationRequests() {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex-auto">
        <h1 className="text-base leading-6 font-semibold text-gray-900">
          Artist verification requests
        </h1>
        <p className="mt-2 text-sm text-gray-700">
          A list of all the artist verification requests. You can approve or
          reject them.
        </p>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <ArtistVerificationRequestsTable />
        </div>
      </div>
    </div>
  );
}
