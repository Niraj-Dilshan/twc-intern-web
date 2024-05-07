// Login.jsx
import { useState, useRef, useEffect } from "react";
import useUserAPI from "../../hooks/useUserAPI";
import { Link } from "react-router-dom";
import ErrorPopup from "../../components/ErrorPopup";

const Login = () => {
  const formRef = useRef();
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const { loading, error, loginUser } = useUserAPI();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formRefData = {
      email: formRef.current.email.value,
      password: formRef.current.password.value,
    };
    loginUser(formRefData);
  };

  useEffect(() => {
    if (error) {
      handleError();
    }
  }, [error]);

  const handleError = () => {
    document.body.classList.add("overflow-hidden");
    setShowErrorPopup(true);
  };

  const closeErrorPopup = () => {
    document.body.classList.remove("overflow-hidden");
    setShowErrorPopup(false);
  };

  return (
    <>
      <div className="mb-14 text-white inline-flex flex-col items-start w-[30rem]">
        <h1 className="text-[50px] leading-[73px] font-['poppins'] font-bold mb-4">
          Hi there,
        </h1>
        <h2 className="font-['poppins'] text-[35px] leading-[40px]">
          Welcome to our
          <br />
          contacts portal
        </h2>
      </div>
      <div className="">
        <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col">
          <input
            type="email"
            id="email"
            name="email"
            placeholder="e-mail"
            className="mb-7 rounded-full font-['poppins'] text-[25px] leading-[50px] font-medium p-0.5 pl-10 text-[#083F46] h-[3.4rem] w-[30rem]"
          />

          <input
            type="password"
            id="password"
            name="password"
            placeholder="password"
            className="mb-7 rounded-full font-['poppins'] text-[25px] leading-[50px] font-medium p-0.5 pl-10 text-[#083F46] h-[3.4rem] w-[30rem]"
          />

          <div className="flex flex-row items-center justify-start mt-14 font-['poppins'] text-[1.438rem] leading-[3.125rem] text-white">
            <button
              type="submit"
              disabled={loading}
              className="px-12 py-1 border-[2px] rounded-full"
            >
              {loading ? "Wait..." : "login"}
            </button>{" "}
            <p className="mx-4">or</p>
            <Link to="/register" className="underline cursor-pointer">
              Click here to Register
            </Link>
          </div>
        </form>
      </div>
      {showErrorPopup && (
        <ErrorPopup errorMessage={error} onClose={closeErrorPopup} />
      )}
    </>
  );
};

export default Login;
