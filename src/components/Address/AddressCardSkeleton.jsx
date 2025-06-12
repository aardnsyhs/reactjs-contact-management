export default function AddressCardSkeleton() {
  return (
    <div className="bg-gray-700 bg-opacity-50 p-5 rounded-lg shadow-md border border-gray-600 animate-pulse space-y-4">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gray-600 rounded-full" />
        <div className="h-5 bg-gray-600 rounded w-1/3" />
      </div>
      <div className="space-y-2 ml-2">
        <div className="h-4 bg-gray-600 rounded w-3/4" />
        <div className="h-4 bg-gray-600 rounded w-2/3" />
        <div className="h-4 bg-gray-600 rounded w-3/5" />
        <div className="h-4 bg-gray-600 rounded w-1/2" />
        <div className="h-4 bg-gray-600 rounded w-2/5" />
      </div>
      <div className="flex justify-end space-x-3">
        <div className="h-8 w-20 bg-gray-600 rounded" />
        <div className="h-8 w-20 bg-gray-600 rounded" />
      </div>
    </div>
  );
}
