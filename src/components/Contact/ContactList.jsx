import { useEffect, useState } from "react";
import { useLocalStorage } from "react-use";
import { contactDelete, contactList } from "../lib/api/ContactApi";
import { alertConfirm, alertError, alertSuccess } from "../lib/alert";
import { Link } from "react-router";
import ContactSearch from "./ContactSearch";
import ContactCard from "./ContactCard";
import Pagination from "./Pagination";

export default function ContactList() {
  const [token] = useLocalStorage("token", "");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [contacts, setContacts] = useState([]);
  const [reload, setReload] = useState(false);

  async function fetchContacts() {
    try {
      const response = await contactList(token, { name, email, phone, page });
      const responseBody = await response.json();

      if (response.status === 200) {
        setContacts(responseBody.data);
        setTotalPage(responseBody.paging.total_page);
      } else {
        await alertError(responseBody.errors);
      }
    } catch (err) {
      console.error(err);
      await alertError("Something went wrong. Please try again.");
    }
  }

  async function handleSearchContacts(e) {
    e.preventDefault();
    setPage(1);
    setReload(!reload);
  }

  async function handlePageChange(page) {
    setPage(page);
    setReload(!reload);
  }

  async function handleContactDelete(id) {
    if (!(await alertConfirm("Are you sure you want to delete this contact?")))
      return;

    try {
      const response = await contactDelete(token, id);
      const responseBody = await response.json();

      if (response.status === 200) {
        setReload(!reload);
        await alertSuccess("Contact deleted successfully");
      } else {
        await alertError(responseBody.errors);
      }
    } catch (err) {
      console.error(err);
      await alertError("Something went wrong. Please try again.");
    }
  }

  useEffect(() => {
    fetchContacts();
  }, [reload]);

  return (
    <div>
      <div className="flex items-center mb-6">
        <i className="fas fa-users text-blue-400 text-2xl mr-3" />
        <h1 className="text-2xl font-bold text-white">My Contacts</h1>
      </div>
      <ContactSearch
        name={name}
        setName={setName}
        email={email}
        setEmail={setEmail}
        phone={phone}
        setPhone={setPhone}
        onSubmit={handleSearchContacts}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gray-800 bg-opacity-80 rounded-xl shadow-custom overflow-hidden border-2 border-dashed border-gray-700 card-hover animate-fade-in">
          <Link to="/dashboard/contacts/create" className="block p-6 h-full">
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-20 h-20 bg-gradient rounded-full flex items-center justify-center mb-5 shadow-lg transform transition-transform duration-300 hover:scale-110">
                <i className="fas fa-user-plus text-3xl text-white" />
              </div>
              <h2 className="text-xl font-semibold text-white mb-3">
                Create New Contact
              </h2>
              <p className="text-gray-300">Add a new contact to your list</p>
            </div>
          </Link>
        </div>
        {contacts.map((contact) => (
          <ContactCard
            key={contact.id}
            contact={contact}
            onDelete={() => handleContactDelete(contact.id)}
          />
        ))}
      </div>
      <div className="mt-10 flex justify-center">
        <Pagination
          page={page}
          totalPage={totalPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
