export default function ContactCardSkeleton() {
  return (
    <div className="bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 overflow-hidden animate-fade-in card-hover">
      <div className="p-6 animate-pulse">
        <div className="flex items-center mb-3">
          <div className="w-10 h-10 bg-gray-600 rounded-full mr-3" />
          <div className="h-5 bg-gray-600 rounded w-3/4" />
        </div>
        <div className="space-y-3 text-gray-300 ml-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-6 h-4 bg-gray-600 rounded" />
              <div className="h-4 bg-gray-600 rounded w-24" />
              <div className="h-4 bg-gray-600 rounded flex-1" />
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-end space-x-3">
          <div className="w-20 h-8 bg-gray-600 rounded-lg" />
          <div className="w-20 h-8 bg-gray-600 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
