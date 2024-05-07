import logo from "../assets/logoWhite.png";
import { useNavigate } from "react-router-dom";

const Topbar = () => {
  const navigate = useNavigate();

  return (
    <div className="container max-w-screen-xl text-white">
      <div onClick={() => navigate("/")} className="cursor-pointer w-fit">
        <img src={logo} width={80} height={70} alt="Logo" />
        <p className="font-bold text-3xl">contacts</p>
        <p className="text-2xl">portal</p>
      </div>
    </div>
  );
};

export default Topbar;
