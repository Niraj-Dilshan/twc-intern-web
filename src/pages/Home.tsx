// Home.tsx
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useContactAPI from "../hooks/useContactAPI";

const Home = () => {
  const { loading, error, contacts } = useContactAPI();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && contacts.length === 0 && !error) {
      navigate("/contacts/new"); // Redirect only if there are no contacts and no error
    }
  }, [loading, contacts, navigate, error]);

  if (loading) {
    return (
      <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 z-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message || "An error occurred"}</div>;
  }  

  return (
    <div className="container max-w-screen-xl text-white">
      <h1 className="text-[50px] leading-[73px] font-['poppins'] font-bold mb-4">
        Welcome,
      </h1>
      <p className="font-['poppins'] text-[35px] leading-[40px] mb-20">
        This is where your contacts will live. Click the button below{" "}
        <br />
        to add a new contact.
      </p>
      <Link
        to="/contacts/new"
        className="px-12 py-1 border-[2px] rounded-full font-['poppins'] text-[1.438rem] leading-[3.125rem] text-white"
      >
        add your first contact
      </Link>
    </div>
  );
};

export default Home;