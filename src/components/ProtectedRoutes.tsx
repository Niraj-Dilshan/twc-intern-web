import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Assuming useAuth is correctly implemented

const ProtectedRoutes = () => {
  const { isAuthenticated, loading } = useAuth(); // Use the useAuth hook to get the authentication state

  // If loading, wait until the authentication state is determined
  if (loading) {
    return <div>Loading...</div>;
  }

  // If not authenticated, redirect to the login page
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the child routes
  return <Outlet />;
};

export default ProtectedRoutes;
