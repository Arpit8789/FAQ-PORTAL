import React, { useEffect } from "react";

const ToastNotification = ({ message, type = "info", onClose }) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  const bgColors = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500",
  };

  return (
    <div
      className={`fixed bottom-5 right-5 text-white px-4 py-3 rounded shadow-lg flex items-center space-x-3 max-w-sm cursor-pointer ${bgColors[type]}`}
      role="alert"
      onClick={onClose}
    >
      <span>{message}</span>
      <button
        onClick={onClose}
        aria-label="Close notification"
        className="ml-auto focus:outline-none font-bold"
      >
        &times;
      </button>
    </div>
  );
};

export default ToastNotification;
