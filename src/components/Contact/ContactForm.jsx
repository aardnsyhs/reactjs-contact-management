import Button from "../Button";

export default function ContactForm({
  formData,
  setFormData,
  onSubmit,
  isEdit = false,
  isLoading = false,
  isFetching = false,
}) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const renderSkeleton = () => (
    <div className="w-full h-[48px] bg-gray-600 animate-pulse rounded-lg" />
  );

  return (
    <form onSubmit={onSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        {["first_name", "last_name"].map((field) => (
          <div key={field}>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              {field.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase())}
            </label>
            <div className="relative">
              {isFetching ? (
                renderSkeleton()
              ) : (
                <>
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="fas fa-user-tag text-gray-500" />
                  </div>
                  <input
                    type="text"
                    name={field}
                    value={formData[field] || ""}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    placeholder={`Enter ${field.replace("_", " ")}`}
                    required
                  />
                </>
              )}
            </div>
          </div>
        ))}
      </div>
      {["email", "phone"].map((field) => (
        <div className="mb-5" key={field}>
          <label className="block text-gray-300 text-sm font-medium mb-2">
            {field.charAt(0).toUpperCase() + field.slice(1)}
          </label>
          <div className="relative">
            {isFetching ? (
              renderSkeleton()
            ) : (
              <>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i
                    className={`fas fa-${
                      field === "email" ? "envelope" : "phone"
                    } text-gray-500`}
                  />
                </div>
                <input
                  type={field === "email" ? "email" : "tel"}
                  name={field}
                  value={formData[field] || ""}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  placeholder={`Enter ${field}`}
                  required
                />
              </>
            )}
          </div>
        </div>
      ))}
      {!isFetching && (
        <div className="flex justify-end space-x-4 mt-6">
          <Button
            type="link"
            to="/dashboard/contacts"
            icon="fa-times"
            color="gray"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            icon={isEdit ? "fa-save" : "fa-plus-circle"}
            isEdit={isEdit}
            isLoading={isLoading}
            color="gradient"
          />
        </div>
      )}
    </form>
  );
}
