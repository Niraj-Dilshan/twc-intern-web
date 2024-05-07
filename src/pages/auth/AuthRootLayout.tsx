import { Outlet } from "react-router-dom";
import backgroundImage from "../../assets/background.jpg";
import logo from "../../assets/logo.png";

const AuthRootLayout = () => {
  return (
    <>
      <div
        className="flex flex-row items-center justify-center h-screen relative"
        style={{
          backgroundColor: "white",
          backgroundImage: `url(${backgroundImage})`,
          backgroundRepeat: "repeat-x",
          backgroundPosition: "center",
          backgroundSize: "100vh",
        }}
      >
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            background: "rgba(255, 255, 255, 0.8)",
          }}
        ></div>
        <div
          className="flex flex-col w-7/12  h-[120vh] bg-[#083F46] justify-center items-center z-10"
          style={{
            borderTopRightRadius: "50%  100%",
            borderBottomRightRadius: "50%  100%",
          }}
        >
          <Outlet />
        </div>

        <div className="flex flex-col w-5/12 h-screen justify-center items-start pl-20 text-[#083F46] z-10">
          <img src={logo} className="w-[170px]" alt="logo" />
          <p className="font-bold text-6xl text-custom mt-2">Contacts</p>
          <p className="text-5xl text-custom font-semibold">Portal</p>
        </div>
      </div>
    </>
  );
};

export default AuthRootLayout;
