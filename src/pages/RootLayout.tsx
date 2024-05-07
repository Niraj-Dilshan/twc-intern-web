import { Outlet, useLocation } from "react-router-dom";
import Topbar from "../components/Topbar";
import BottomBar from "../components/BottomBar";
import backgroundImage from "../assets/background.jpg";

// The RootLayout component is a layout component that wraps the entire application.
function RootLayout() {
  const location = useLocation();

  const isLoginPage =
    location.pathname.includes("login") ||
    location.pathname.includes("register");

  return (
    <>
      <main>
        <div className=" w-full h-screen overflow-hidden">
          {!isLoginPage && (
            <div className=" w-full h-full relative">
              {/* Background */}
              <div className="absolute top-0 left-0 w-full h-screen z-10">
                <div
                  className="flex flex-row items-center justify-center h-screen text-white relative"
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
                      background: "rgba(255, 255, 255, 0.8)", // Adjust the opacity value as needed
                    }}
                  ></div>

                  <div
                    className="h-[170vh] w-[400vw] flex flex-col justify-center items-center bg-[#083F46] z-20"
                    style={{
                      borderTopRightRadius: "80% 40%",

                      borderBottomLeftRadius: "80% 40%",
                    }}
                  ></div>
                </div>
              </div>

              {/* Components */}
              <div className="absolute top-0 left-0 h-screen z-30 flex flex-col justify-center items-center w-full">
                <div className="container max-w-screen-xl h-screen flex flex-col justify-between items-center">
                  {/* Top bar */}
                  {!isLoginPage && (
                    <div className="mt-16 w-full">
                      <Topbar />
                    </div>
                  )}

                  {/* Pages contents */}
                  <Outlet />

                  {/* Bottom bar */}

                  {!isLoginPage && (
                    <div className="mb-16 w-full flex flex-row justify-end ">
                      <BottomBar />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          {isLoginPage && <Outlet />}
        </div>
      </main>
    </>
  );
}

export default RootLayout;
