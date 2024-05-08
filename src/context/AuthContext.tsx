// Import jwt-decode for decoding JWT tokens
import create from 'zustand';
import { createContext, useContext, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // Make sure to install jwt-decode

const AuthContext = createContext();

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (newToken: string) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  setError: (message: string | null) => void;
  checkTokenExpiration: () => void; // Method to check token expiration
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  isAuthenticated: false,
  loading: true,
  error: null,
  setLoading: (loading) => {
    set({ loading });
  },
  setError: (message) => {
    set({ error: message });
  },
  login: (newToken) => {
    localStorage.setItem('accessToken', newToken);
    set((state) => ({
      ...state,
      token: newToken,
      isAuthenticated: true,
      loading: false,
    }));
  },
  logout: () => {
    localStorage.removeItem('accessToken');
    set((state) => ({
      ...state,
      token: null,
      isAuthenticated: false,
      loading: false,
    }));
  },
  checkTokenExpiration: () => {
    const storedToken = localStorage.getItem('accessToken');
    if (storedToken) {
      const tokenExpirationTime = jwtDecode(storedToken).exp * 1000; // Decode token and get expiration time in milliseconds
      const currentTime = Date.now(); // Current time in milliseconds
      if (currentTime > tokenExpirationTime) {
        localStorage.removeItem('accessToken');
        set((state) => ({
          ...state,
          token: null,
          isAuthenticated: false,
          loading: false,
        }));
      }
    }
  },
}));

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { login, checkTokenExpiration } = useAuthStore();

  useEffect(() => {
    const storedToken = localStorage.getItem('accessToken');
    if (storedToken) {
      login(storedToken);
    }
    checkTokenExpiration(); // Check token expiration on component mount
  }, [login, checkTokenExpiration]);

  const contextValue = useAuthStore();

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
};

export const useAuth = () => useContext(AuthContext);