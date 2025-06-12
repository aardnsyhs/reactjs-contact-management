export default function ContactInfo({ contact }) {
  return (
    <>
      <div className="mb-8 text-center">
        <div className="w-20 h-20 bg-gradient rounded-full mx-auto flex items-center justify-center mb-4 shadow-lg">
          <i className="fas fa-user text-3xl text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">
          {contact.first_name} {contact.last_name}
        </h2>
        <div className="w-24 h-1 bg-gradient mx-auto rounded-full" />
      </div>
      <div className="space-y-5 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-gray-700 bg-opacity-50 p-5 rounded-lg shadow-md border border-gray-600 transition-all duration-200 hover:bg-opacity-70">
            <div className="flex items-center mb-2">
              <i className="fas fa-user-tag text-blue-400 mr-2" />
              <h3 className="text-gray-300 text-sm font-medium">First Name</h3>
            </div>
            <p className="text-white text-lg ml-6">{contact.first_name}</p>
          </div>
          <div className="bg-gray-700 bg-opacity-50 p-5 rounded-lg shadow-md border border-gray-600 transition-all duration-200 hover:bg-opacity-70">
            <div className="flex items-center mb-2">
              <i className="fas fa-user-tag text-blue-400 mr-2" />
              <h3 className="text-gray-300 text-sm font-medium">Last Name</h3>
            </div>
            <p className="text-white text-lg ml-6">{contact.last_name}</p>
          </div>
        </div>
        <div className="bg-gray-700 bg-opacity-50 p-5 rounded-lg shadow-md border border-gray-600 transition-all duration-200 hover:bg-opacity-70">
          <div className="flex items-center mb-2">
            <i className="fas fa-envelope text-blue-400 mr-2" />
            <h3 className="text-gray-300 text-sm font-medium">Email</h3>
          </div>
          <p className="text-white text-lg ml-6">{contact.email}</p>
        </div>
        <div className="bg-gray-700 bg-opacity-50 p-5 rounded-lg shadow-md border border-gray-600 transition-all duration-200 hover:bg-opacity-70">
          <div className="flex items-center mb-2">
            <i className="fas fa-phone text-blue-400 mr-2" />
            <h3 className="text-gray-300 text-sm font-medium">Phone</h3>
          </div>
          <p className="text-white text-lg ml-6">{contact.phone}</p>
        </div>
      </div>
    </>
  );
}
