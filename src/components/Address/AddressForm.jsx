import { Link, useParams } from "react-router";

export default function AddressForm({
  formData,
  setFormData,
  onSubmit,
  isEdit = false,
  isLoading = false,
}) {
  const { id } = useParams();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={onSubmit}>
      {[
        {
          name: "street",
          label: "Street",
          icon: "road",
          placeholder: "Enter street address",
        },
      ].map(({ name, label, icon, placeholder }) => (
        <div key={name} className="mb-5">
          <label
            htmlFor={name}
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
              id={name}
              name={name}
              value={formData[name] || ""}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              placeholder={placeholder}
              required
            />
          </div>
        </div>
      ))}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        {[
          {
            name: "city",
            label: "City",
            icon: "city",
            placeholder: "Enter city",
          },
          {
            name: "province",
            label: "Province/State",
            icon: "map",
            placeholder: "Enter province or state",
          },
        ].map(({ name, label, icon, placeholder }) => (
          <div key={name}>
            <label
              htmlFor={name}
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
                id={name}
                name={name}
                value={formData[name] || ""}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                placeholder={placeholder}
                required
              />
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
        {[
          {
            name: "country",
            label: "Country",
            icon: "flag",
            placeholder: "Enter country",
          },
          {
            name: "postal_code",
            label: "Postal Code",
            icon: "mail-bulk",
            placeholder: "Enter postal code",
          },
        ].map(({ name, label, icon, placeholder }) => (
          <div key={name}>
            <label
              htmlFor={name}
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
                id={name}
                name={name}
                value={formData[name] || ""}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                placeholder={placeholder}
                required
              />
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-end space-x-4">
        <Link
          to={`/dashboard/contacts/${id}`}
          className="px-5 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 flex items-center shadow-md"
        >
          <i className="fas fa-times mr-2" /> Cancel
        </Link>
        <button
          type="submit"
          disabled={isLoading}
          className={`px-5 py-3 bg-gradient text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-lg transform hover:-translate-y-0.5 flex items-center ${
            isLoading
              ? "opacity-60 cursor-not-allowed"
              : "hover:opacity-90 hover:-translate-y-0.5"
          }`}
        >
          {isLoading ? (
            <>
              <i className="fas fa-spinner fa-spin mr-2" />
              {isEdit ? "Updating..." : "Saving..."}
            </>
          ) : (
            <>
              <i
                className={`fas ${isEdit ? "fa-save" : "fa-plus-circle"} mr-2`}
              />
              {isEdit ? "Update Address" : "Add Address"}
            </>
          )}
        </button>
      </div>
    </form>
  );
}
