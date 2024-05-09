import exitIcon from "../assets/exitIcon.png";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

// Create an Axios instance with withCredentials set to true
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// The BottomBar component is a bar at the bottom of the screen that allows the user to log out.
const BottomBar = () => {
  const { logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate("/login");
  }

  const handleLogout = async () => {
    try {
      await axiosInstance.get('/auth/signout');
      logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div>
      <button
        onClick={() => handleLogout()}
        className="font-['poppins']  text-[1.438rem] leading-[3.125rem] text-white  underline cursor-pointer flex flex-row justify-between items-center gap-5"
      >
        <img src={exitIcon} width={43} height={43} />
        logout
      </button>
    </div>
  );
};

export default BottomBar;
