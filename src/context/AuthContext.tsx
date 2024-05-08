// AuthContext.tsx
import create from 'zustand';
import { createContext, useContext, useEffect } from 'react';

const AuthContext = createContext();

// Define types for state
interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (newToken: string) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  setError: (message: string | null) => void;
}

// Create Zustand store
export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  isAuthenticated: false,
  loading: true,
  error: null,
  setLoading: (loading) => {
    console.log('Setting loading:', loading);
    set({ loading });
  },
  setError: (message) => {
    console.log('Setting error:', message);
    set({ error: message });
  },
  login: (newToken) => {
    console.log('Logging in with token:', newToken);
    localStorage.setItem('accessToken', newToken); // Save token to local storage
    set((state) => ({
      ...state,
      token: newToken,
      isAuthenticated: true,
      loading: false,
    }));
  },
  logout: () => {
    console.log('Logging out');
    localStorage.removeItem('accessToken'); // Remove token from local storage
    set((state) => ({
      ...state,
      token: null,
      isAuthenticated: false,
      loading: false,
    }));
  },
}));

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { login } = useAuthStore();

  // Initialize authentication state from local storage upon component mount
  useEffect(() => {
    const storedToken = localStorage.getItem('accessToken');
    if (storedToken) {
      login(storedToken);
    }
  }, []); // Run only on component mount

  const contextValue = useAuthStore();

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
};

export const useAuth = () => useContext(AuthContext);