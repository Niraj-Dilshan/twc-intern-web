import create from 'zustand';
import { createContext, useContext, useEffect } from 'react';

// Define types for state
interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (newToken: string) => void;
  logout: () => void;
}

// Create Zustand store
const useAuthStore = create<AuthState>((set) => ({
  token: null,
  isAuthenticated: false,
  loading: true,
  login: (newToken) =>
    set((state) => ({
     ...state,
      token: newToken,
      isAuthenticated: true,
      loading: false,
    })),
  logout: () =>
    set((state) => ({
     ...state,
      token: null,
      isAuthenticated: false,
      loading: false,
    })),
}));

// Export context for use in components
export const AuthContext = createContext<AuthState | undefined>(undefined);

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const authStore = useAuthStore();
  const { token, isAuthenticated, loading, login, logout } = authStore;

  // Fetch token from local storage
  useEffect(() => {
    const storedData = localStorage.getItem('user_data');
    if (storedData) {
      const { userToken } = JSON.parse(storedData);
      if (userToken) {
        login(userToken);
      }
    }
  }, [login]);

  const contextValue = {
    token,
    isAuthenticated,
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

// Custom hook to use AuthContext
export const useAuth = (): AuthState => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};