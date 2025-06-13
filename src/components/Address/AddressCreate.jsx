import { Link, useNavigate, useParams } from "react-router";
import AddressForm from "./AddressForm";
import { useEffectOnce, useLocalStorage } from "react-use";
import { useState } from "react";
import { contactDetail } from "../lib/api/ContactApi";
import { alertError, alertSuccess } from "../lib/alert";
import { addressCreate } from "../lib/api/AddressApi";

export default function AddressCreate() {
  const [token, _] = useLocalStorage("token", "");
  const { id } = useParams();
  const navigate = useNavigate();
  const [contact, setContact] = useState({});
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  async function fetchContact() {
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
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await addressCreate(token, id, formData);
      const responseBody = await response.data;

      if (response.status === 200) {
        await alertSuccess("Address created successfully");
        await navigate({
          pathname: `/dashboard/contacts/${id}`,
        });
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

  useEffectOnce(() => {
    fetchContact();
  });

  return (
    <div>
      <div className="flex items-center mb-6">
        <Link
          to={`/dashboard/contacts/${id}`}
          className="text-blue-400 hover:text-blue-300 mr-4 flex items-center transition-colors duration-200"
        >
          <i className="fas fa-arrow-left mr-2" /> Back to Contact Details
        </Link>
        <h1 className="text-2xl font-bold text-white flex items-center">
          <i className="fas fa-plus-circle text-blue-400 mr-3" /> Add New
          Address
        </h1>
      </div>
      <div className="bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 overflow-hidden max-w-2xl mx-auto animate-fade-in">
        <div className="p-8">
          <div className="mb-6 pb-6 border-b border-gray-700">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4 shadow-md">
                <i className="fas fa-user text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">
                  {contact.first_name} {contact.last_name}
                </h2>
                <p className="text-gray-300 text-sm">
                  {contact.email} • {contact.phone}
                </p>
              </div>
            </div>
          </div>
          <AddressForm
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
