import { useNavigate } from 'react-router-dom';
import { useMutation } from "react-query";
import axios from "axios";
import { AxiosError } from "axios";
import { useAuthStore } from "../context/AuthContext";

interface Values {
  email: string;
  password: string;
  confirmPassword?: string;
}

const BASE_URL = import.meta.env.VITE_API_URL;

const useUserAPI = () => {
  const { login } = useAuthStore();
  const { setError } = useAuthStore();
  const navigate = useNavigate();

  const registerUserMutation = useMutation<Values, AxiosError, Values>(
    async (values: Values) => {
      try {
        if (values.password !== values.confirmPassword) {
          throw new Error("Passwords do not match");
        }
        const response = await axios.post(`${BASE_URL}/auth/signup`, values);
        if (response.status === 201) {
          navigate("/login");
        } else if (response.status === 400) {
          setError(response.data.message);
          throw new Error(response.data.message);
        } else {
          setError("Registration failed");
          throw new Error("Registration failed");
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const axiosError: AxiosError = error;
          const errorMessage = axiosError.response?.data?.message || axiosError.message;
          setError(errorMessage);
        } else {
          setError(error.message);
        }
        throw error; // Rethrow error to be caught by React Query
      }
    }
  );

  // Adjusted loginUserMutation
  const loginUserMutation = useMutation<Values, AxiosError, Values>(
    async (values: Values) => {
      try {
        const response = await axios.post(`${BASE_URL}/auth/signin`, values);
        if (response.status === 200) {
          login(response.data.access_token);
          localStorage.setItem('accessToken', response.data.access_token);
          navigate("/");
        } else if (response.status === 400) {
          setError(response.data.message);
          throw new Error(response.data.message);
        } else {
          setError("Login Failed");
          throw new Error("Login Failed");
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const axiosError: AxiosError = error;
          const errorMessage = axiosError.response?.data?.message || axiosError.message;
          setError(errorMessage);
        } else {
          setError(error.message);
        }
        throw error; // Rethrow error to be caught by React Query
      }
    }
  );

  return {
    loading: loginUserMutation.isLoading || registerUserMutation.isLoading,
    registerUser: registerUserMutation.mutate,
    loginUser: loginUserMutation.mutate, 
  };
};

export default useUserAPI;