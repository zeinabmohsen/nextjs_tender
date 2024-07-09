import React, { useState } from "react";

const Popup = ({ children, onClose, isOpen, setIsOpen, header }) => {
  const handleClose = () => {
    setIsOpen(false);
    onClose?.(); // Call the optional onClose function passed as a prop
  };

  return (
    <div
      className={`fixed inset-0 z-50 ${
        isOpen ? "" : "opacity-0 pointer-events-none"
      } flex items-center justify-center`}
    >
      <div
        className="fixed inset-0 bg-black opacity-50 z-40 cursor-pointer"
        onClick={handleClose}
      ></div>
      <div
        className={`relative bg-white rounded-lg shadow-md transition ease-in-out duration-150 z-50 ${
          isOpen ? "" : "opacity-0 pointer-events-none"
        } md:my-8`}
      >
        <button
          type="button"
          className="absolute top-4 right-4 text-sm text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={handleClose}
        >
          <span className="sr-only">Close</span>
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <div class="pt-6 md:p-4 mt-4">
          <h3 className="text-lg font-semibold text-gray-900">{header}</h3>
        </div>
        <div className="p-4 pb-0 md:p-5">{children}</div>
      </div>
    </div>
  );
};

export default Popup;
