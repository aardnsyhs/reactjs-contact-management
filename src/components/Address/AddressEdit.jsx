import { useEffectOnce, useLocalStorage } from "react-use";
import AddressForm from "./AddressForm";
import { Link, useParams } from "react-router";
import { useRef, useState } from "react";
import { addressDetail, addressUpdate } from "../lib/api/AddressApi";
import { alertError, alertSuccess } from "../lib/alert";
import { contactDetail } from "../lib/api/ContactApi";

export default function AddressEdit() {
  const [token, _] = useLocalStorage("token", "");
  const { id, addressId } = useParams();
  const [contact, setContact] = useState({});
  const [formData, setFormData] = useState({});
  const currentData = useRef({});
  const [isLoading, setIsLoading] = useState(false);

  async function fetchContact() {
    try {
      const response = await contactDetail(token, id);
      const responseBody = await response.json();

      if (response.status === 200) {
        setContact(responseBody.data);
      } else {
        await alertError(responseBody.errors);
      }
    } catch (err) {
      console.error(err);
      await alertError("Something went wrong. Please try again.");
    }
  }

  async function fetchAddress() {
    try {
      const response = await addressDetail(token, id, addressId);
      const responseBody = await response.json();

      if (response.status === 200) {
        setFormData(responseBody.data);
        currentData.current = responseBody.data;
      } else {
        await alertError(responseBody.errors);
      }
    } catch (err) {
      console.error(err);
      await alertError("Something went wrong. Please try again.");
    }
  }

  function isFormChanged() {
    const current = currentData.current;
    return Object.keys(formData).some((key) => {
      const currentVal = current[key];
      const newVal = formData[key];

      if (typeof newVal === "string" && typeof currentVal === "string") {
        return newVal.trim() !== currentVal.trim();
      }

      return newVal !== currentVal;
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    if (!isFormChanged()) {
      await alertError("No changes detected");
      setIsLoading(false);
      return;
    }

    try {
      const response = await addressUpdate(token, id, addressId, formData);
      const responseBody = await response.json();

      if (response.status === 200) {
        setFormData(responseBody.data);
        currentData.current = responseBody.data;
        await alertSuccess("Address updated successfully");
      } else {
        await alertError(responseBody.errors);
      }
    } catch (err) {
      console.error(err);
      await alertError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffectOnce(() => {
    fetchContact();
    fetchAddress();
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
          <i className="fas fa-map-marker-alt text-blue-400 mr-3" /> Edit
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
            isEdit
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
