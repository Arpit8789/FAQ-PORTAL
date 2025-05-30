import React from "react";

const Modal = ({ isOpen, onClose, title, children, footer }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
      aria-labelledby="modal-title"
      tabIndex={-1}
    >
      <div
        className="bg-white rounded-md max-w-lg w-full shadow-lg p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <header className="flex justify-between items-center mb-4">
          <h2 id="modal-title" className="text-xl font-semibold text-gray-800">
            {title}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="text-gray-600 hover:text-gray-900 focus:outline-none"
          >
            &times;
          </button>
        </header>

        {/* Body */}
        <div className="mb-4">{children}</div>

        {/* Footer */}
        {footer && <footer className="flex justify-end">{footer}</footer>}
      </div>
    </div>
  );
};

export default Modal;
