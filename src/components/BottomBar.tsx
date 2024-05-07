import exitIcon from "../assets/exitIcon.png";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

// The BottomBar component is a bar at the bottom of the screen that allows the user to log out.
const BottomBar = () => {
  const { logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate("/login");
  }

  return (
    <div>
      <button
        onClick={() => logout()}
        className="font-['poppins']  text-[1.438rem] leading-[3.125rem] text-white  underline cursor-pointer flex flex-row justify-between items-center gap-5"
      >
        <img src={exitIcon} width={43} height={43} />
        logout
      </button>
    </div>
  );
};

export default BottomBar;
