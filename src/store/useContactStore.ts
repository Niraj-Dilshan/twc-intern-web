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
  setError: (message: string) => void;
};

export const useContactStore = create<Store>((set) => ({
  contacts: [],
  loading: false,
  error: null,
  addContact: (contact) =>
    set((state) => ({ contacts: [...state.contacts, contact] })),
  getContacts: () => set((state) => ({ loading: true })),
  deleteContact: (contactId: number) =>
    set((state) => ({
      contacts: state.contacts.filter((contact) => contact._id!== contactId),
    })),
  updateContact: (contactId: number, updatedContact: Partial<Contact>) =>
    set((state) => ({
      contacts: state.contacts.map((contact) =>
        contact._id === contactId? {...contact,...updatedContact } : contact
      ),
    })),
  setError: (message: string) => set({ error: message }), // Implement setError action
}));