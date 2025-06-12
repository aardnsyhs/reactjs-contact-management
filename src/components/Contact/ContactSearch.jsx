import { useState, useRef, useEffect } from "react";

export default function ContactSearchForm({
  name,
  setName,
  email,
  setEmail,
  phone,
  setPhone,
  onSubmit,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (isOpen && contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [isOpen]);

  return (
    <div className="bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 p-6 mb-8 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <i className="fas fa-search text-blue-400 mr-3" />
          <h2 className="text-xl font-semibold text-white">Search Contacts</h2>
        </div>
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="text-gray-300 hover:text-white hover:bg-gray-700 p-2 rounded-full focus:outline-none transition-all duration-200"
        >
          <i
            className={`fas ${
              isOpen ? "fa-chevron-up" : "fa-chevron-down"
            } text-lg`}
          />
        </button>
      </div>

      <div
        className="transition-all duration-300 ease-in-out overflow-hidden"
        style={{
          maxHeight: `${height}px`,
          opacity: isOpen ? 1 : 0,
          marginTop: isOpen ? "1rem" : "0",
        }}
        ref={contentRef}
      >
        <form onSubmit={onSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                id: "search_name",
                label: "Name",
                icon: "user",
                value: name,
                onChange: setName,
                placeholder: "Search by name",
              },
              {
                id: "search_email",
                label: "Email",
                icon: "envelope",
                value: email,
                onChange: setEmail,
                placeholder: "Search by email",
              },
              {
                id: "search_phone",
                label: "Phone",
                icon: "phone",
                value: phone,
                onChange: setPhone,
                placeholder: "Search by phone",
              },
            ].map(({ id, label, icon, value, onChange, placeholder }) => (
              <div key={id}>
                <label
                  htmlFor={id}
                  className="block text-gray-300 text-sm font-medium mb-2"
                >
                  {label}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className={`fas fa-${icon} text-gray-500`} />
                  </div>
                  <input
                    type="text"
                    id={id}
                    name={id}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    placeholder={placeholder}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 text-right">
            <button
              type="submit"
              className="px-5 py-3 bg-gradient text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-lg transform hover:-translate-y-0.5"
            >
              <i className="fas fa-search mr-2" /> Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
