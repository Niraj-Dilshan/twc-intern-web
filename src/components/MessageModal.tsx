const MessageModal = ({
  handlePopupClose,
  onConfirmation,
  showModal,
  isModelOpened,
}) => {
  return (
    <>
      <div
        id="default-modal"
        tabindex="-1"
        aria-hidden="true"
        className={` ${
          !isModelOpened ? "hidden" : ""
        } fixed  z-50 flex justify-center items-center w-full  md:inset-0  h-full max-h-full  bg-gray-900 bg-opacity-30 backdrop-blur-sm  `}
      >
        <div className="relative p-4 w-full max-w-[900px] ">
          <div className="relative bg-white rounded-3xl shadow h-[14rem] flex flex-col justify-center items-center">
            <div className="flex flex-col items-center justify-center p-4">
              <p className="font-['poppins'] text-[30px] leading-[30px] text-[#083F46] font-medium">
                {showModal.message ||
                  "Your contact has been saved successfully!"}
              </p>

              {showModal.confirmationModal ? (
                <div className="flex flex-row justify-center items-center gap-5">
                  <button
                    onClick={() => {
                      onConfirmation(true), handlePopupClose();
                    }}
                    data-modal-hide="default-modal"
                    type="button"
                    className="mt-12 font-['poppins'] text-[30px] leading-[30px] ms-3 text-white bg-[#083F46] hover:bg-gray-100  hover:border-[#083F46] focus:outline-none  rounded-full border   font-medium px-7 py-4 hover:text-gray-900 focus:z-10 "
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => handlePopupClose()}
                    data-modal-hide="default-modal"
                    type="button"
                    className="mt-12 font-['poppins'] text-[30px] leading-[30px] ms-3 text-[#083F46] bg-white hover:bg-[#083F46] border-2 border-[#083F46] focus:outline-none  rounded-full    font-medium px-7 py-4 hover:text-white  focus:z-10 "
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handlePopupClose()}
                  data-modal-hide="default-modal"
                  type="button"
                  className="mt-12 font-['poppins'] text-[30px] leading-[30px] ms-3 text-white bg-[#083F46] hover:bg-gray-100  hover:border-[#083F46] focus:outline-none  rounded-full border   font-medium px-7 py-4 hover:text-gray-900 focus:z-10 "
                >
                  Okay
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MessageModal;
