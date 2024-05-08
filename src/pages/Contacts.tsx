import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import maleImg from "../assets/male.png";
import femaleImg from "../assets/female.png";
import useContactAPI from "../hooks/useContactAPI";
import pencil from "../assets/pencil.svg";
import trash from "../assets/trash.svg";
import change from "../assets/change.svg";
import MessageModal from "../components/MessageModal";
import { useAuth } from "../context/AuthContext";

// The Contacts component displays a list of contacts.
const Contacts = () => {
  const { token } = useAuth();
  const {
    contacts,
    loading,
    isModelOpened,
    toggleModal,
    fetchContacts,
    deleteContact,
    updateContact,
  } = useContactAPI();

  const [index, setIndex] = useState(null);
  const [selectedContact, setSelectedContact] = useState({});
  const [updateContactData, setUpdateContactData] = useState({});
  const [showModal, setshowModal] = useState({
    message: "",
    confirmationModal: false,
  });

  const toggleGender = () => {
    setSelectedContact((prevState) => {
      if (!prevState || !prevState.gender) {
        return prevState;
      }

      const newGender = prevState.gender === "male" ? "female" : "male";
      setUpdateContactData((prevData) => ({
        ...prevData,
        gender: newGender,
      }));
      return {
        ...prevState,
        gender: newGender,
      };
    });
  };

  // The changeData function updates the contact data
  const changeData = (e) => {
    setUpdateContactData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

    setSelectedContact((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // The handleUpdate function updates a contact
  const handleUpdate = async (id, data) => {
    await updateContact(id, { ...data });
    fetchContacts();
    isModelOpened &&
      setshowModal((prevState) =>
        setshowModal({
          ...prevState,

          message: `Your contact has been saved successfully!`,
          confirmationModal: false,
        })
      );
    setIndex(null);
    setSelectedContact({});
    setUpdateContactData({});
  };

  // The handleDelete function deletes a contact
  const handleDelete = (id, name) => {
    setSelectedContact({ _id: id });
    toggleModal();
    setshowModal((prevState) => ({
      ...prevState,
      message: `Do you want to delete the contact "${name}" ?`,
      confirmationModal: true,
    }));
  };

  // The onConfirmation function confirms the deletion of a contact
  const onConfirmation = (choice) => {
    //setIsConfirmation(!isConfirmation);
    if (choice) {
      deleteContact(selectedContact._id);
    }

    isModelOpened &&
      setshowModal((prevState) =>
        setshowModal({
          ...prevState,

          message: `Your contact has been deleted successfully!`,
          confirmationModal: false,
        })
      );
  };

  useEffect(() => {
    if (token) {
      fetchContacts();
    }
  }, []);

  // The updateInputBoxes array contains the input boxes for updating a contact.
  const updateInputBoxes = [
    {
      id: 1,
      component: (
        <div className="flex flex-row justify-center items-center bg-[#e7eced] py-2 px-2  h-[3rem] max-w-fit gap-1">
          <input
            type="text"
            id="name"
            name="name"
            value={selectedContact ? selectedContact.name : ""}
            onChange={(e) => changeData(e)}
            className="bg-[#e7eced] font-['poppins'] text-[20px] leading-[50px] font-medium   text-[#083F46]  focus:outline-none max-w-[220px]"
          />
          <div className="border-r-2 border-[#083F46] h-[2rem]"></div>
        </div>
      ),
    },
    {
      id: 2,
      component: (
        <div className="flex flex-row justify-center items-center bg-[#e7eced] py-2 px-2  h-[3rem] max-w-fit  gap-1">
          <input
            disabled={true}
            type="text"
            id="gender"
            name="gender"
            value={selectedContact ? selectedContact.gender : ""}
            className="bg-[#e7eced] font-['poppins'] text-[20px] leading-[50px] font-medium   text-[#083F46]  focus:outline-none max-w-[80px]"
          />
          <img src={change} className="w-5" onClick={() => toggleGender()} />
        </div>
      ),
    },
    {
      id: 3,
      component: (
        <div className="flex flex-row justify-center items-center bg-[#e7eced] py-2 px-2  h-[3rem]  max-w-fit gap-1 ">
          <input
            type="email"
            id="email"
            name="email"
            value={selectedContact ? selectedContact.email : ""}
            onChange={(e) => changeData(e)}
            className="bg-[#e7eced] font-['poppins'] text-[20px] leading-[50px] font-medium   text-[#083F46]  focus:outline-none max-w-[330px]"
          />
          <div className="border-r-2 border-[#083F46] h-[2rem]"></div>
        </div>
      ),
    },
    {
      id: 4,
      component: (
        <div className="flex flex-row justify-center items-center bg-[#e7eced] py-2 px-2  h-[3rem] max-w-fit  gap-1 ">
          <input
            type="text"
            id="phone"
            name="phone"
            value={selectedContact ? selectedContact.phone : ""}
            onChange={(e) => changeData(e)}
            className="bg-[#e7eced] font-['poppins'] text-[20px] leading-[50px] font-medium   text-[#083F46]  focus:outline-none max-w-[150px]"
          />
          <div className="border-r-2 border-[#083F46] h-[2rem]"></div>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="container max-w-screen-xl text-white mb-10">
        <div className="flex flex-row justify-between items-center mb-10">
          <h1 className=" text-[50px] leading-[73px] font-['poppins'] font-bold ">
            Contacts
          </h1>
          <Link
            to="new"
            className="px-12 py-1  border-[2px] rounded-full font-['poppins']  text-[1.438rem] leading-[3.125rem]   text-white "
          >
            add new contact
          </Link>
        </div>

        <div className="rounded-3xl px-7 py-4 bg-white max-h-[390px] overflow-y-scroll">
          {contacts?.length === 0 ? (
            <p className="text-[20px] leading-[50px]  font-['poppins'] text-gray-600 text-center">
              Not found any contacts
            </p>
          ) : loading ? (
            <p className="text-[20px] leading-[50px]  font-['poppins'] text-gray-600 text-center">
              Loading ...
            </p>
          ) : (
            <table className="w-full  text-left rtl:text-right text-[#083F46] ">
              <thead className="text-xs ">
                <tr className="text-[18px] leading-[50px] font-['poppins'] font-bold">
                  <th scope="col" className="px-3 py-3"></th>
                  <th scope="col" className="px-3 py-3">
                    full name
                  </th>
                  <th scope="col" className="px-3 py-3">
                    gender
                  </th>
                  <th scope="col" className="px-3 py-3">
                    email
                  </th>
                  <th scope="col" className="px-3 py-3">
                    phone phone
                  </th>
                  <th scope="col" className="px-3 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {contacts?.map((contact, idx) => {
                  return (
                    <tr
                      key={contact._id}
                      className="bg-white border-b text-[20px] leading-[50px] font-['poppins'] "
                    >
                      <td className="px-2 py-4 min-w-[105px]">
                        <img
                          src={contact.gender === "male" ? maleImg : femaleImg}
                          className="w-[60px] h-[60px] rounded-full"
                        />
                      </td>
                      <td className="px-3 py-4 min-w-[262px]">
                        {index === idx
                          ? updateInputBoxes[0].component
                          : contact.name}
                      </td>
                      <td className="px-3 py-4 min-w-[118px]">
                        {index === idx
                          ? updateInputBoxes[1].component
                          : contact.gender}
                      </td>
                      <td className="px-3 py-4 min-w-[330px]">
                        {index === idx
                          ? updateInputBoxes[2].component
                          : contact.email}
                      </td>
                      <td className="px-3 py-4 min-w-[200px]">
                        {index === idx
                          ? updateInputBoxes[3].component
                          : contact.phone}
                      </td>
                      <td className="px-3 py-4 min-w-[100px] ">
                        {index === idx ? (
                          <div className="flex flex-row gap-2">
                            <button
                              onClick={() => {
                                setIndex(null);
                                setUpdateContactData({});
                                setSelectedContact({});
                              }}
                              className="py-1 bg-[#fd6262] text-white text-sm rounded-2xl px-3"
                            >
                              {" "}
                              x{" "}
                            </button>
                            <button
                              onClick={() => {
                                handleUpdate(contact._id, {
                                  ...updateContactData,
                                });
                              }}
                              className="p-2 bg-[#083F46] text-white text-sm rounded-2xl"
                            >
                              save
                            </button>
                          </div>
                        ) : (
                          <>
                            <button>
                              <img
                                src={pencil}
                                className="w-5 mr-5 "
                                onClick={() => (
                                  setIndex(idx),
                                  setSelectedContact({ ...contact })
                                )}
                              />
                            </button>
                            <button
                              onClick={() =>
                                handleDelete(contact._id, contact.name)
                              }
                            >
                              <img src={trash} className="w-5  " />
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* The MessageModal component is a modal that displays a message to the user. */}
      <MessageModal
        isModelOpened={isModelOpened}
        showModal={showModal}
        handlePopupClose={toggleModal}
        onConfirmation={onConfirmation}
      />
    </>
  );
};

export default Contacts;
