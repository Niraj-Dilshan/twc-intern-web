import create from "zustand";

type Contact = {
  _id: number;
  name: string;
  email: string;
  phone: string;
  gender: string;
};

type Store = {
  contacts: Contact[];
  loading: boolean;
  error: string | null;
  addContact: (contact: Contact) => void;
  getContacts: () => void;
  deleteContact: (contactId: number) => void;
  updateContact: (contactId: number, updatedContact: Partial<Contact>) => void;
  setError: (message: string | null) => void;
  getContact: (contactId: number) => Contact | undefined;
};

export const useContactStore = create<Store>((set, get) => ({
  contacts: [],
  loading: false,
  error: null,
  addContact: (contact) =>
    set((state) => ({ contacts: [...state.contacts, contact] })),
  getContacts: () => set({ loading: true, error: null }), // Update loading state before fetching
  deleteContact: (contactId: number) => {
    set({ loading: true, error: null }); // Update loading state before deleting
    set((state) => ({
      contacts: state.contacts.filter((contact) => contact._id!== contactId),
      loading: false, // Reset loading state after deleting
    }));
  },
  updateContact: (contactId: number, updatedContact: Partial<Contact>) =>
    set((state) => {
      console.log('Updating contact:', contactId, updatedContact);
      return {
        contacts: state.contacts.map((contact) =>
          contact._id === contactId? {...contact,...updatedContact } : contact
        ),
      };
    }),
  setError: (message: string | null) => set({ error: message }), // Correctly update error state
  getContact: (contactId: number) => {
    const contact = get().contacts.find((contact) => contact._id === contactId);
    return contact;
  },
}));