// Register.jsx
import { useState, useRef, useEffect } from "react";
import useUserAPI from "../../hooks/useUserAPI";
import { Link } from "react-router-dom";
import ErrorPopup from "../../components/ErrorPopup"; // Adjust the import path as necessary

const Register = () => {
  const formRef = useRef(null);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const { loading, error, registerUser } = useUserAPI();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formRefData = {
      email: formRef.current.email.value,
      password: formRef.current.password.value,
      confirmPassword: formRef.current.confirmPassword.value,
    };
    registerUser(formRefData);
  };

  const handleError = () => {
    if (error) {
      document.body.classList.add("overflow-hidden");
      setShowErrorPopup(true);
    }
  };

  const closeErrorPopup = () => {
    document.body.classList.remove("overflow-hidden");
    setShowErrorPopup(false);
  };

  useEffect(() => {
    if (error) {
      handleError();
    }
  }, [error]);

  return (
    <>
      <div className="w-[30rem]">
        <h1 className="text-[50px] leading-[73px] font-['poppins'] font-bold mb-14 text-white">
          Register Now!
        </h1>

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

            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="confirm password"
              className="mb-7 rounded-full font-['poppins'] text-[25px] leading-[50px] font-medium p-0.5 pl-10 text-[#083F46] h-[3.4rem] w-[30rem]"
            />

            <div className="mt-10 font-['poppins'] text-[1.438rem] leading-[3.125rem] text-white">
              <button
                disabled={loading}
                className="px-12 py-1 border-[2px] rounded-full"
              >
                {loading ? "Submitting..." : "register"}
              </button>
            </div>
          </form>
        </div>
      </div>
      {showErrorPopup && (
        <ErrorPopup errorMessage={error} onClose={closeErrorPopup} />
      )}
      <Link
        to=".."
        className="font-['poppins'] text-[1.438rem] leading-[3.125rem] text-white underline cursor-pointer mt-16 w-[30rem]"
      >
        {"< "}Back to login
      </Link>
    </>
  );
};

export default Register;
