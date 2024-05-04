import React, { useState } from 'react';

const Modal = ({ children, onClose }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
    onClose?.(); // Call the optional onClose function passed as a prop
  };

  return (
    <div className={`fixed inset-0 z-50 overflow-y-auto px-4 md:inset-auto md:w-full md:max-w-2xl`}>
      <div className={`relative bg-white rounded-lg shadow-md transition ease-in-out duration-150 ${isOpen ? '' : 'opacity-0 pointer-events-none'} md:my-8`}>
        <button
          type="button"
          className="absolute top-right pt-4 pr-4 text-sm text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={handleClose}
        >
          <span className="sr-only">Close</span>
          <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.707 3.307a1 1 0 00-1.414 1.414L10 11.293l5.293-5.293a1 1 0 00-1.414-1.414L8.586 6.586a.5.5 0 000 .707z" clipRule="evenodd" />
            <path fillRule="evenodd" d="M4 6a1 1 0 011 1v8a1 1 0 01-1 1H3a1 1 0 01-1-1V7a1 1 0 011-1zm8 0a1 1 0 011 1v8a1 1 0 01-1 1h-1a1 1 0 01-1-1V7a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
        </button>
        <div className="p-4 pb-0 md:p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
