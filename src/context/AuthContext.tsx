import create from 'zustand';
import { createContext, useContext, useEffect } from 'react';

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
    set((state) => ({
      ...state,
      token: newToken,
      isAuthenticated: true,
      loading: false,
    }));
  },
  logout: () => {
    console.log('Logging out');
    set((state) => ({
      ...state,
      token: null,
      isAuthenticated: false,
      loading: false,
    }));
    localStorage.removeItem('accessToken');
  },
}));

// Export context for use in components
export const AuthContext = createContext<AuthState | undefined>(undefined);

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { login } = useAuthStore();

  // Fetch token from local storage
  useEffect(() => {
    const storedData = localStorage.getItem('accessToken');
    if (storedData) {
      login(storedData);
    }
  }, []);

  const store = useAuthStore();

  return <AuthContext.Provider value={store}>{children}</AuthContext.Provider>;
};

// Custom hook to use AuthContext
export const useAuth = (): AuthState => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};