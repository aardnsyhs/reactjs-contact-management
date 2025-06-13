import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useLocalStorage } from "react-use";
import { contactCreate } from "../lib/api/ContactApi";
import { alertError, alertSuccess } from "../lib/alert";
import ContactForm from "./ContactForm";

export default function ContactCreate() {
  const [token, _] = useLocalStorage("token", "");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await contactCreate(token, formData);
      const responseBody = await response.data;

      if (response.status === 200) {
        await alertSuccess("Contact created successfully");
        await navigate({
          pathname: "/dashboard/contacts",
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
          <i className="fas fa-user-plus text-blue-400 mr-3" /> Create New
          Contact
        </h1>
      </div>
      <div className="bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 overflow-hidden max-w-2xl mx-auto animate-fade-in">
        <div className="p-8">
          <ContactForm
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
