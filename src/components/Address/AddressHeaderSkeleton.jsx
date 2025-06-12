export default function AddressHeaderSkeleton() {
  return (
    <div className="mb-6 pb-6 border-b border-gray-700 animate-pulse">
      <div className="flex items-center">
        <div className="w-12 h-12 bg-gray-600 rounded-full mr-4" />
        <div className="flex-1">
          <div className="h-5 bg-gray-600 rounded w-1/2 mb-2" />
          <div className="h-3 bg-gray-600 rounded w-3/4" />
        </div>
      </div>
    </div>
  );
}
