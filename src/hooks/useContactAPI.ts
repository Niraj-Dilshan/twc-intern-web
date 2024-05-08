import { useQuery, useMutation } from "react-query";
import axios, { AxiosError } from "axios";
import { useContactStore } from "../store/useContactStore";
import { useAuthStore } from "../context/AuthContext";
import { useState } from "react";

const BASE_URL = import.meta.env.VITE_API_URL;

const useContactAPI = () => {
  const { token: authStoreToken } = useAuthStore();
  const {
    addContact,
    updateContact,
    deleteContact,
    setError,
    getContact,
  } = useContactStore();

  // Fallback to localStorage if token is not available in useAuthStore
  const token = authStoreToken || localStorage.getItem("accessToken") || "";

  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
    },
  });

  const handleAxiosError = (error: AxiosError) => {
    if (axios.isAxiosError(error)) {
      const axiosError: AxiosError = error;
      const errorMessage =
        axiosError.response?.data?.message || axiosError.message;
      setError(errorMessage);
    } else {
      setError(error.message);
    }
    throw error;
  };

  const [isModelOpened, setIsModelOpened] = useState(false);

  const toggleModal = () => {
    setIsModelOpened(!isModelOpened);
  };

  const fetchContacts = async () => {
    try {
      const response = await axiosInstance.get("/contacts");
      if (response.status === 200) {
        const strippedContacts = response.data.map((contact) => ({
          _id: contact.id,
          name: contact.name,
          email: contact.email,
          phone: contact.phone,
          gender: contact.gender,
        }));
        addContact(strippedContacts);
        return strippedContacts;
      } else {
        throw new Error("Failed to fetch contacts");
      }
    } catch (error) {
      handleAxiosError(error);
    }
  };

   // Define the useQuery hook to fetch contacts data
   const { refetch } = useQuery("contacts", fetchContacts, {
    refetchOnWindowFocus: false,
    retry: false,
  });

  const addContactMutation = useMutation(
    async (contact) => {
      try {
        const response = await axiosInstance.post("/contacts", contact);
        if (response.status === 201) {
          addContact(contact);
          await refetch();
          return contact;
        } else {
          throw new Error("Failed to add contact");
        }
      } catch (error) {
        handleAxiosError(error);
      }
    }
  );

  const deleteContactMutation = useMutation(
    async (contactId: number) => {
      try {
        const response = await axiosInstance.delete(`/contacts/${contactId}`);
        if (response.status === 200) {
          // Delete the contact locally before fetching new contacts
          deleteContact(contactId);
          // Fetch contacts again after deleting the contact
          await refetch();
          toggleModal();
          return "Contact deleted";
        } else {
          throw new Error("Failed to delete contact");
        }
      } catch (error) {
        handleAxiosError(error);
      }
    }
  );
  

  const updateContactMutation = useMutation(
    async (updatedContactPassed:JSON) => {
      const updatedContact = JSON.parse(JSON.stringify(updatedContactPassed));
      const contactId = updatedContact.id;
      // recreate json object without id
      delete updatedContact.id;
      try {
        const response = await axiosInstance.patch(
          `/contacts/${contactId}`,
          updatedContact
        );
        if (response.status === 200) {
          updateContact(contactId, updatedContact);
          await refetch();
        } else {
          throw new Error("Failed to update contact");
        }
      } catch (error) {
        handleAxiosError(error);
      }
    }
  );

  const getContactsQuery = useQuery("contacts", fetchContacts, {
    refetchOnWindowFocus: false,
    retry: false,
  });

  return {
    loading: getContactsQuery.isLoading,
    error: getContactsQuery.error,
    contacts: getContactsQuery.data || [],
    addContact: addContactMutation.mutate,
    deleteContact: deleteContactMutation.mutate,
    updateContact: updateContactMutation.mutate,
    fetchContacts: getContactsQuery.refetch,
    toggleModal,
    isModelOpened,
  };
};

export default useContactAPI;