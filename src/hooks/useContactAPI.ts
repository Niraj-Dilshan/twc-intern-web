// useContactAPI.js
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_API_URL;

const useContactAPI = () => {
  const { token } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [isModelOpened, setIsModelOpened] = useState(false);
  const navigate = useNavigate();

  const toggleModal = () => {
    setIsModelOpened(!isModelOpened);
  };

  const authHeader = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const getContacts = async () => {
    try {
      setError(null);
      setLoading(true);
      const res = await fetch(`${BASE_URL}/contacts`, {
        method: "GET",
        headers: authHeader,
      });

      if (!res.ok) {
        throw new Error("Failed to fetch contacts");
      }

      const data = await res.json();

      if (res.status === 200) {
        setContacts(data);
      } else if (res.status === 400) {
        setError(data.message);
      } else {
        setError("An error occurred while fetching contacts");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const addContact = async (values) => {
    try {
      setError(null);
      setLoading(true);
      const res = await fetch(`${BASE_URL}/contacts`, {
        method: "POST",
        headers: authHeader,
        body: JSON.stringify(values),
      });
      const data = await res.json();

      if (res.status === 200) {
        setContacts([...contacts, data.contact]);
        navigate("/contacts");
      } else if (res.status === 400) {
        setError(data.message);
      } else {
        setError("Adding contact failed");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteContact = async (contactId) => {
    try {
      setError(null);
      setLoading(true);
      const res = await fetch(`${BASE_URL}/contacts/${contactId}`, {
        method: "DELETE",
        headers: authHeader,
      });
      const data = await res.json();

      if (res.status === 200) {
        setContacts(contacts.filter((contact) => contact._id !== contactId));
        setIsModelOpened(true);
      } else if (res.status === 400) {
        setError(data.message);
      } else {
        setError("Deleting contact failed");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateContact = async (contactId, values) => {
    try {
      setError(null);
      setLoading(true);
      const res = await fetch(`${BASE_URL}/contacts/${contactId}`, {
        method: "PUT",
        headers: authHeader,
        body: JSON.stringify(values),
      });
      const data = await res.json();

      if (res.status === 200) {
        setContacts(
          contacts.map((contact) =>
            contact._id === contactId ? data.data : contact
          )
        );
        setIsModelOpened(true);
      } else if (res.status === 400) {
        setError(data.message);
      } else {
        setError("Updating contact failed");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    contacts,
    isModelOpened,
    toggleModal,
    addContact,
    getContacts,
    deleteContact,
    updateContact,
  };
};

export default useContactAPI;
