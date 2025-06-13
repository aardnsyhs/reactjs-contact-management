import { useEffectOnce, useLocalStorage } from "react-use";
import AddressForm from "./AddressForm";
import { Link, useParams } from "react-router";
import { useRef, useState } from "react";
import { addressDetail, addressUpdate } from "../lib/api/AddressApi";
import { alertError, alertSuccess } from "../lib/alert";
import { contactDetail } from "../lib/api/ContactApi";
import AddressHeader from "./AddressHeader";
import AddressHeaderSkeleton from "./AddressHeaderSkeleton";
import AddressFormSkeleton from "./AddressFormSkeleton";

export default function AddressEdit() {
  const [token, _] = useLocalStorage("token", "");
  const { id, addressId } = useParams();
  const [contact, setContact] = useState({});
  const [formData, setFormData] = useState({});
  const currentData = useRef({});
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  async function fetchContact() {
    setIsFetching(true);

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
      setIsFetching(false);
    }
  }

  async function fetchAddress() {
    setIsFetching(true);

    try {
      const response = await addressDetail(token, id, addressId);
      const responseBody = await response.data;

      if (response.status === 200) {
        setFormData(responseBody.data);
        currentData.current = responseBody.data;
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
      setIsFetching(false);
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
      const responseBody = await response.data;

      if (response.status === 200) {
        setFormData(responseBody.data);
        currentData.current = responseBody.data;
        await alertSuccess("Address updated successfully");
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
          {isFetching ? (
            <>
              <AddressHeaderSkeleton />
              <AddressFormSkeleton />
            </>
          ) : (
            <>
              <AddressHeader contact={contact} />
              <AddressForm
                formData={formData}
                setFormData={setFormData}
                onSubmit={handleSubmit}
                isEdit={true}
                isLoading={isLoading}
                isFetching={isFetching}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
