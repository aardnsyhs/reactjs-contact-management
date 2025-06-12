export default function ContactInfoSkeleton() {
  return (
    <>
      <div className="mb-8 text-center animate-pulse">
        <div className="w-20 h-20 bg-gray-600 rounded-full mx-auto mb-4" />
        <div className="h-6 bg-gray-600 rounded w-1/2 mx-auto mb-2" />
        <div className="h-1 bg-gray-600 rounded w-24 mx-auto" />
      </div>
      <div className="space-y-5 mb-8 animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="bg-gray-700 bg-opacity-50 p-5 rounded-lg shadow-md border border-gray-600"
            >
              <div className="flex items-center mb-2 space-x-2">
                <div className="w-5 h-5 bg-gray-600 rounded-full" />
                <div className="h-3 bg-gray-600 rounded w-1/4" />
              </div>
              <div className="h-5 bg-gray-600 rounded w-3/4 ml-6" />
            </div>
          ))}
        </div>
        {[1, 2].map((i) => (
          <div
            key={i}
            className="bg-gray-700 bg-opacity-50 p-5 rounded-lg shadow-md border border-gray-600"
          >
            <div className="flex items-center mb-2 space-x-2">
              <div className="w-5 h-5 bg-gray-600 rounded-full" />
              <div className="h-3 bg-gray-600 rounded w-1/4" />
            </div>
            <div className="h-5 bg-gray-600 rounded w-3/4 ml-6" />
          </div>
        ))}
      </div>
    </>
  );
}
