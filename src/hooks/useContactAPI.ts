import { useQuery, useMutation } from "react-query";
import axios, { AxiosError } from "axios";
import { useContactStore } from "../store/useContactStore";
import { useAuthStore } from "../context/AuthContext"; // Import the useAuth hook

const BASE_URL = import.meta.env.VITE_API_URL;

const useContactAPI = () => {
  const { token: authStoreToken } = useAuthStore();
  const {
    addContact,
    getContacts,
    deleteContact,
    setError,
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
  
  console.log(token);

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

  const addContactMutation = useMutation(
    async (contact) => {
      try {
        const response = await axiosInstance.post("/contacts", contact);
        if (response.status === 201) {
          addContact(contact);
          getContacts();
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
          deleteContact(contactId);
          getContacts();
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
    async (contactId: number, updatedContact) => {
      try {
        const response = await axiosInstance.put(
          `/contacts/${contactId}`,
          updatedContact
        );
        if (response.status === 200) {
          getContacts();
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
  };
};

export default useContactAPI;