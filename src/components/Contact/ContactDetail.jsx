import { useState } from "react";
import { Link, useParams } from "react-router";
import { useEffectOnce, useLocalStorage } from "react-use";
import { contactDetail } from "../lib/api/ContactApi";
import { alertConfirm, alertError, alertSuccess } from "../lib/alert";
import { addressDelete, addressList } from "../lib/api/AddressApi";
import AddressList from "../Address/AddressList";
import ContactInfo from "./ContactInfo";
import AddressCardSkeleton from "../Address/AddressCardSkeleton";
import ContactInfoSkeleton from "./ContactInfoSkeleton";

export default function ContactDetail() {
  const [token, _] = useLocalStorage("token", "");
  const { id } = useParams();
  const [contact, setContact] = useState({});
  const [addresses, setAddresses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchContact() {
    setIsLoading(true);

    try {
      const response = await contactDetail(token, id);
      const responseBody = await response.data;

      if (response.status === 200) {
        setContact(responseBody.data);
      } else {
        await alertError(responseBody.data.errors);
      }
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data && err.response.data.errors) {
        await alertError(err.response.data.errors);
      } else {
        await alertError("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchAddresses() {
    setIsLoading(true);

    try {
      const response = await addressList(token, id);
      const responseBody = await response.data;

      if (response.status === 200) {
        setAddresses(responseBody.data);
      } else {
        await alertError(responseBody.data.errors);
      }
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data && err.response.data.errors) {
        await alertError(err.response.data.errors);
      } else {
        await alertError("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDelete(addressId) {
    if (
      !(await alertConfirm("Are you sure you want to delete this address?"))
    ) {
      return;
    }

    try {
      const response = await addressDelete(token, id, addressId);
      const responseBody = await response.data;

      if (response.status === 200) {
        await fetchAddresses();
        await alertSuccess("Address deleted successfully");
      } else {
        await alertError(responseBody.data.errors);
      }
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data && err.response.data.errors) {
        await alertError(err.response.data.errors);
      } else {
        await alertError("Something went wrong. Please try again.");
      }
    }
  }

  useEffectOnce(() => {
    fetchContact();
    fetchAddresses();
  });

  return (
    <div>
      <div className="flex items-center mb-6">
        <Link
          to="/dashboard/contacts"
          className="text-blue-400 hover:text-blue-300 mr-4 flex items-center transition-colors duration-200"
        >
          <i className="fas fa-arrow-left mr-2" /> Back to Contacts
        </Link>
        <h1 className="text-2xl font-bold text-white flex items-center">
          <i className="fas fa-id-card text-blue-400 mr-3" /> Contact Details
        </h1>
      </div>
      <div className="bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 overflow-hidden max-w-2xl mx-auto animate-fade-in">
        <div className="p-8">
          {isLoading ? (
            <ContactInfoSkeleton />
          ) : (
            <ContactInfo contact={contact} />
          )}
          <div className="mb-8">
            <div className="flex items-center mb-5">
              <i className="fas fa-map-marker-alt text-blue-400 mr-3" />
              <h3 className="text-xl font-semibold text-white">Addresses</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-gray-700 bg-opacity-50 p-5 rounded-lg border-2 border-dashed border-gray-600 shadow-md card-hover">
                <Link
                  to={`/dashboard/contacts/${id}/addresses/create`}
                  className="block h-full"
                >
                  <div className="flex flex-col items-center justify-center h-full text-center py-4">
                    <div className="w-16 h-16 bg-gradient rounded-full flex items-center justify-center mb-4 shadow-lg transform transition-transform duration-300 hover:scale-110">
                      <i className="fas fa-plus text-2xl text-white" />
                    </div>
                    <h4 className="text-lg font-semibold text-white">
                      Add Address
                    </h4>
                  </div>
                </Link>
              </div>
              {isLoading ? (
                <AddressCardSkeleton />
              ) : (
                addresses.map((address) => (
                  <AddressList
                    key={address.id}
                    address={address}
                    onDelete={handleDelete}
                  />
                ))
              )}
            </div>
          </div>
          <div className="flex justify-end space-x-4">
            <Link
              to="/dashboard/contacts"
              className="px-5 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 flex items-center shadow-md"
            >
              <i className="fas fa-arrow-left mr-2" /> Back
            </Link>
            <Link
              to={`/dashboard/contacts/${id}/edit`}
              className="px-5 py-3 bg-gradient text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-lg transform hover:-translate-y-0.5 flex items-center"
            >
              <i className="fas fa-user-edit mr-2" /> Edit Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
