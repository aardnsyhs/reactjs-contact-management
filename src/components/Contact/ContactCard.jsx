import { Link } from "react-router";
import Button from "../Button";

export default function ContactCard({ contact, onDelete }) {
  return (
    <div className="bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 overflow-hidden card-hover animate-fade-in">
      <div className="p-6">
        <Link
          to={`/dashboard/contacts/${contact.id}`}
          className="block cursor-pointer hover:bg-gray-700 rounded-lg transition-all duration-200 p-3"
        >
          <div className="flex items-center mb-3">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3 shadow-md">
              <i className="fas fa-user text-white" />
            </div>
            <h2 className="text-xl font-semibold text-white hover:text-blue-300 transition-colors duration-200">
              {contact.first_name} {contact.last_name}
            </h2>
          </div>
          <div className="space-y-3 text-gray-300 ml-2">
            <p className="flex items-center">
              <i className="fas fa-user-tag text-gray-500 w-6" />
              <span className="font-medium w-24">First Name:</span>
              <span>{contact.first_name}</span>
            </p>
            <p className="flex items-center">
              <i className="fas fa-user-tag text-gray-500 w-6" />
              <span className="font-medium w-24">Last Name:</span>
              <span>{contact.last_name}</span>
            </p>
            <p className="flex items-center">
              <i className="fas fa-envelope text-gray-500 w-6" />
              <span className="font-medium w-24">Email:</span>
              <span>{contact.email}</span>
            </p>
            <p className="flex items-center">
              <i className="fas fa-phone text-gray-500 w-6" />
              <span className="font-medium w-24">Phone:</span>
              <span>{contact.phone}</span>
            </p>
          </div>
        </Link>
        <div className="mt-4 flex justify-end space-x-3">
          <Button
            type="link"
            to={`/dashboard/contacts/${contact.id}/edit`}
            icon="fa-edit"
            color="gradient"
          >
            Edit
          </Button>
          <Button onClick={onDelete} icon="fa-trash-alt" color="red">
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
