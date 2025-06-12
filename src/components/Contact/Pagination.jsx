export default function Pagination({ page, totalPage, onPageChange }) {
  const getPages = () => Array.from({ length: totalPage }, (_, i) => i + 1);

  return (
    <nav className="flex items-center space-x-3 bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 p-3 animate-fade-in">
      {page > 1 && (
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onPageChange(page - 1);
          }}
          className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 flex items-center"
        >
          <i className="fas fa-chevron-left mr-2" /> Previous
        </a>
      )}

      {getPages().map((p) => (
        <a
          key={p}
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onPageChange(p);
          }}
          className={`px-4 py-2 rounded-lg transition-all duration-200 ${
            p === page
              ? "bg-gradient text-white shadow-md"
              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800`}
        >
          {p}
        </a>
      ))}

      {page < totalPage && (
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onPageChange(page + 1);
          }}
          className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 flex items-center"
        >
          Next <i className="fas fa-chevron-right ml-2" />
        </a>
      )}
    </nav>
  );
}
