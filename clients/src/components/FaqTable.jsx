import React from "react";
import { FaEdit, FaTrash, FaBookmark } from "react-icons/fa";

const FaqTable = ({ faqs, onEdit, onDelete, onBookmark, role = "User" }) => {
  return (
    <div className="overflow-x-auto rounded-2xl shadow-xl bg-white/90 backdrop-blur-xl animate-fade-in">
      <table className="min-w-full table-auto border-collapse">
        <thead className="bg-gradient-to-r from-blue-100 to-fuchsia-100">
          <tr>
            <th className="px-4 py-3 text-left text-blue-700 font-bold">Title</th>
            <th className="px-4 py-3 text-left text-fuchsia-700 font-bold">Category</th>
            <th className="px-4 py-3 text-center text-gray-700 font-bold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {faqs.length === 0 && (
            <tr>
              <td colSpan="3" className="text-center py-6 text-gray-500 font-semibold">
                No FAQs found.
              </td>
            </tr>
          )}
          {faqs.map((faq) => (
            <tr
              key={faq._id}
              className="hover:bg-blue-50 hover:shadow-lg transition cursor-pointer"
            >
              <td className="px-4 py-3 text-gray-800 font-medium">{faq.title}</td>
              <td className="px-4 py-3">
                <span className="inline-block bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full font-semibold uppercase tracking-wide">
                  {faq.category}
                </span>
              </td>
              <td className="px-4 py-3 text-center space-x-4">
                <button
                  onClick={() => onEdit && onEdit(faq)}
                  aria-label={`Edit FAQ ${faq.title}`}
                  className="inline-flex items-center justify-center text-blue-600 hover:text-blue-800 focus:outline-none transform hover:scale-110 transition"
                  title="Edit"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => onDelete && onDelete(faq._id)}
                  aria-label={`Delete FAQ ${faq.title}`}
                  className="inline-flex items-center justify-center text-red-600 hover:text-red-800 focus:outline-none transform hover:scale-110 transition"
                  title="Delete"
                >
                  <FaTrash />
                </button>
                {/* Show bookmark button only for non-Admin */}
                {role !== "Admin" && (
                  <button
                    onClick={() => onBookmark && onBookmark(faq._id)}
                    aria-label={`Bookmark FAQ ${faq.title}`}
                    className="inline-flex items-center justify-center text-emerald-600 hover:text-emerald-800 focus:outline-none transform hover:scale-110 transition"
                    title="Bookmark"
                  >
                    <FaBookmark />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <style>
        {`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(40px);}
            to { opacity: 1; transform: translateY(0);}
          }
          .animate-fade-in {
            animation: fade-in 0.7s cubic-bezier(.4,0,.2,1) both;
          }
        `}
      </style>
    </div>
  );
};

export default FaqTable;
