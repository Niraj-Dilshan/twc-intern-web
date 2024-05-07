import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useContactAPI from "../hooks/useContactAPI";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { token } = useAuth();
  const { loading, getContacts, contacts } = useContactAPI();
  const navigate = useNavigate();
  const [hasAttemptedFetch, setHasAttemptedFetch] = useState(false); // State to track if fetch attempt has been made

  useEffect(() => {
    if (token && !hasAttemptedFetch) {
      getContacts();
      setHasAttemptedFetch(true); // Mark that a fetch attempt has been made
    }
  }, [token, getContacts, hasAttemptedFetch]); // Include hasAttemptedFetch in the dependency array

  useEffect(() => {
    if (!loading && contacts.length > 0) {
      navigate("/contacts");
    }
  }, [loading, contacts, navigate]); // This effect depends on loading and contacts

  return (
    <>
      {loading ? (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
        </div>
      ) : (
        <div className="container max-w-screen-xl text-white">
          <h1 className=" text-[50px] leading-[73px] font-['poppins'] font-bold mb-4">
            Welcome,
          </h1>
          <p className="font-['poppins'] text-[35px] leading-[40px] mb-20">
            This is where your contacts will live. Click the button below{" "}
            <br></br> to add a new contact.
          </p>
          <Link
            to="contacts/new"
            className="px-12 py-1 border-[2px] rounded-full font-['poppins'] text-[1.438rem] leading-[3.125rem]   text-white "
          >
            add your first contact
          </Link>
        </div>
      )}
    </>
  );
};

export default Home;
