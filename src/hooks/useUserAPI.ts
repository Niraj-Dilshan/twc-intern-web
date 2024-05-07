// useUserAPI.ts
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import axios from "axios";

interface Values {
  email: string;
  password: string;
  confirmPassword?: string;
}

interface ErrorResponse {
  message: string;
}

const BASE_URL: string = import.meta.env.VITE_API_URL || '';

const useUserAPI = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const registerUserMutation = useMutation<Values, Error, Values>(
    async (values: Values): Promise<void> => {
      if (values.password!== values.confirmPassword) {
        throw new Error("Passwords do not match");
      }
      const response = await axios.post(`${BASE_URL}/auth/signup`, values);
      if (response.status === 201) {
        navigate("/login");
      } else if (response.status === 400) {
        throw new Error(response.data.message);
      } else {
        throw new Error("Registration failed");
      }
    }
  );

  const loginUserMutation = useMutation<Values, Error, Values>(
    async (values: Values): Promise<void> => {
      try {
        const response = await axios.post(`${BASE_URL}/auth/signin`, values);  
        if (response.status === 200) {
          login(response.data.access_token);
          navigate("/");
        } else if (response.status === 400) {
          throw new Error(response.data.message);
        } else {
          throw new Error("Login Failed");
        }
      } catch (error) {
        console.error("Error during login:", error);
      }
    }
  );

  return {
    loading: registerUserMutation.isLoading || loginUserMutation.isLoading,
    error: (registerUserMutation.error as ErrorResponse)?.message || (loginUserMutation.error as ErrorResponse)?.message || null,
    registerUser: registerUserMutation.mutate,
    loginUser: loginUserMutation.mutate,
  };
};

export default useUserAPI;