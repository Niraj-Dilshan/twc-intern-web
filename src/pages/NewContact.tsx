import { useRef } from "react";
import useContactAPI from "../hooks/useContactAPI";

// The NewContact component is used to add a new contact.
const NewContact = () => {
  const formRef = useRef();

  const { loading, error, addContact, getContacts, contacts } = useContactAPI();

  // The handleSubmit function is called when the form is submitted.
  const handleSubmit = (e) => {
    e.preventDefault();
    const formRefData = {
      name: formRef.current.fullName.value,
      email: formRef.current.email.value,
      phone: formRef.current.phoneNumber.value,
      gender: formRef.current.gender.value,
    };

    addContact(formRefData);
    formRef.current.reset();
  };

  return (
    <>
      <div className="container max-w-screen-xl text-white">
        <h1 className=" text-[50px] leading-[73px] font-['poppins'] font-bold mb-16">
          New Contact
        </h1>

        <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col ">
          <div className="flex flex-row justify-start gap-10 items-center">
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="full name"
              className="mb-7 rounded-full font-['poppins'] text-[25px] leading-[50px]  font-medium p-0.5 pl-10 text-[#083F46]  h-[3.4rem] w-[30rem]"
            />
            <input
              type="email"
              id="email"
              name="email"
              placeholder="e-mail"
              className="mb-7 rounded-full font-['poppins'] text-[25px] leading-[50px]  font-medium p-0.5 pl-10 text-[#083F46]  h-[3.4rem] w-[30rem]"
            />
          </div>
          <div className="flex flex-row justify-start gap-10 items-center">
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="phone number"
              className="mb-7 rounded-full font-['poppins'] text-[25px] leading-[50px]  font-medium p-0.5 pl-10 text-[#083F46]  h-[3.4rem] w-[30rem]"
            />
            <div className="flex flex-row justify-between items-center w-[30rem] font-['poppins'] text-[25px] leading-[50px]  font-medium  text-white">
              <label>gender</label>
              <span>
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  className="mr-2 w-5 h-5 border-1 cursor-pointer  rounded-full"
                  value={"male"}
                />
                <label htmlFor="male">male</label>
              </span>
              <span>
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  className="mr-2 w-5 h-5 border-1 cursor-pointer  rounded-full"
                  value={"female"}
                />
                <label htmlFor="female">female</label>
              </span>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-12 py-1 mt-14 border-[2px] rounded-full font-['poppins']  text-[1.438rem] leading-[3.125rem] w-[350px]   text-white "
          >
            {loading ? "Wait..." : "add your first contact"}
          </button>
        </form>
      </div>
    </>
  );
};

export default NewContact;
