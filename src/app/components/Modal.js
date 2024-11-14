// components/Modal.js
import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>

      <div className="relative w-full max-w-lg mx-auto bg-white rounded-lg shadow-lg p-6 md:p-8 z-10">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <AiFillCloseCircle size={30} color="red" />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
