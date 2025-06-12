export default function AddressFormSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="mb-5">
        <div className="h-4 bg-gray-600 rounded w-24 mb-2" />
        <div className="h-12 bg-gray-700 rounded w-full" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        {[1, 2].map((i) => (
          <div key={i}>
            <div className="h-4 bg-gray-600 rounded w-24 mb-2" />
            <div className="h-12 bg-gray-700 rounded w-full" />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
        {[1, 2].map((i) => (
          <div key={i}>
            <div className="h-4 bg-gray-600 rounded w-24 mb-2" />
            <div className="h-12 bg-gray-700 rounded w-full" />
          </div>
        ))}
      </div>
      <div className="flex justify-end space-x-4">
        <div className="h-10 w-28 bg-gray-700 rounded-lg" />
        <div className="h-10 w-36 bg-gray-700 rounded-lg" />
      </div>
    </div>
  );
}
