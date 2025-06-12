import { Link, useParams } from "react-router";
import { useEffectOnce, useLocalStorage } from "react-use";
import { contactDetail, contactUpdate } from "../lib/api/ContactApi";
import { alertError, alertSuccess } from "../lib/alert";
import { useState } from "react";
import ContactForm from "./ContactForm";

export default function ContactEdit() {
  const [token, _] = useLocalStorage("token", "");
  const { id } = useParams();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
  });

  async function fetchContact() {
    try {
      const response = await contactDetail(token, id);
      const responseBody = await response.json();

      if (response.status === 200) {
        setFormData(responseBody.data);
      } else {
        await alertError(responseBody.errors);
      }
    } catch (err) {
      console.error(err);
      await alertError("Something went wrong. Please try again.");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await contactUpdate(token, formData);
      const responseBody = await response.json();

      if (response.status === 200) {
        setFormData(responseBody.data);
        await alertSuccess("Contact updated successfully");
      } else {
        await alertError(responseBody.errors);
      }
    } catch (err) {
      console.error(err);
      await alertError("Something went wrong. Please try again.");
    }
  }

  useEffectOnce(() => {
    fetchContact();
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
          <i className="fas fa-user-edit text-blue-400 mr-3" /> Edit Contact
        </h1>
      </div>
      <div className="bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 overflow-hidden max-w-2xl mx-auto animate-fade-in">
        <div className="p-8">
          <ContactForm
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSubmit}
            isEdit
          />
        </div>
      </div>
    </div>
  );
}
