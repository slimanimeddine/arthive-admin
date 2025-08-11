import ArtworksTable from "./table";

export default function Artworks() {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base leading-6 font-semibold text-gray-900">
            Artworks
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the artworks submitted by artists.
          </p>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <ArtworksTable />
        </div>
      </div>
    </div>
  );
}
