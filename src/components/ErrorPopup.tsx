const ErrorPopup = ({ errorMessage, onClose }) => {
 return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg text-center z-50">
        <p className="text-red-500">{errorMessage}</p>
        <button
          onClick={onClose}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Close
        </button>
      </div>
      <div className="absolute inset-0 bg-black opacity-50 z-40 pointer-events-none"></div> {/* Add pointer-events-none here */}
    </div>
 );
};

export default ErrorPopup;
