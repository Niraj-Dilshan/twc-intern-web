import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_API_URL;

const useUserAPI = () => {
  const { login } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const navigate = useNavigate();

  const registerUser = async (values) => {
    if (values.password !== values.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      setError(null);
      setLoading(true);
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });
      const data = await res.json();

      if (res.status === 200) {
        navigate("/login");
      } else if (res.status === 400) {
        setError(data.message);
      } else {
        setError("Registration failed");
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  // The loginUser function logs in a user.
  const loginUser = async (values) => {
    try {
      setError(null);
      setLoading(true);
      const res = await fetch(`${BASE_URL}/auth/login`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(values),
      });
      const data = await res.json();

      if (res.status === 200) {
        login(data.token);
        navigate("/");
      } else if (res.status === 400) {
        setError(data.message);
      } else {
        setError("Login Failed");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, registerUser, loginUser };
};

export default useUserAPI;
