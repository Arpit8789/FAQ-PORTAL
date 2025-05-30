import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaQuestionCircle,
  FaChartBar,
  FaUserCircle,
  FaBookmark,
  FaInbox,
  FaBars,
  FaTimes
} from "react-icons/fa";

function getUserRoleFromToken() {
  try {
    const token = localStorage.getItem("token");
    if (!token) return "User";
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
    const payload = JSON.parse(jsonPayload);
    return payload.role || "User";
  } catch {
    return "User";
  }
}

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const role = getUserRoleFromToken();

  const linkClasses =
    "flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-fuchsia-50 hover:text-blue-700 rounded-lg transition font-medium";
  const activeLinkClasses =
    "bg-gradient-to-r from-blue-100 to-fuchsia-100 text-blue-700 font-semibold shadow animate-pulse";

  const iconColor = (label) => {
    switch (label) {
      case "Your Answers":
      case "Browse FAQs":
        return "text-blue-500";
      case "Analytics":
        return "text-fuchsia-500";
      case "Bookmarked":
        return "text-emerald-500";
      case "Account":
      case "My Profile":
        return "text-purple-500";
      default:
        return "text-blue-500";
    }
  };

  // Links for each role
  const userLinks = [
    {
      to: "/user/faqs",
      label: "Browse FAQs",
      icon: <FaQuestionCircle className={iconColor("Browse FAQs")} />
    },
    {
      to: "/auth/bookmarks",
      label: "Bookmarked",
      icon: <FaBookmark className={iconColor("Bookmarked")} />
    },
    {
      to: "/user/account",
      label: "My Profile",
      icon: <FaUserCircle className={iconColor("My Profile")} />
    }
  ];

  // The new admin link for "Your Answers"
  const adminLinks = [
    {
      to: "#",
      label: "Your Answers",
      icon: <FaQuestionCircle className={iconColor("Your Answers")} />,
      onClick: (e) => { e.preventDefault(); setShowModal(true); }
    },
    {
      to: "/admin/analytics",
      label: "Analytics",
      icon: <FaChartBar className={iconColor("Analytics")} />
    },
    {
      to: "/admin/account",
      label: "Account",
      icon: <FaUserCircle className={iconColor("Account")} />
    }
  ];

  // For mobile: overlay background click closes sidebar
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) setOpen(false);
  };

  // Modal for "Your Answers"
  const Modal = () => (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40"
      onClick={() => setShowModal(false)}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 text-center relative animate-fade-in"
        onClick={e => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-2xl font-bold"
          onClick={() => setShowModal(false)}
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-xl font-bold text-blue-700 mb-2">Work Under Progress</h2>
        <p className="text-gray-700 mb-2">
          Currently, uploaded FAQ by you will be displayed here shortly.<br />
          <span className="text-fuchsia-600 font-semibold">Work under progress!</span>
        </p>
      </div>
      <style>
        {`
          .animate-fade-in {
            animation: fade-in 0.4s cubic-bezier(.4,0,.2,1) both;
          }
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(40px);}
            to { opacity: 1; transform: translateY(0);}
          }
        `}
      </style>
    </div>
  );

  return (
    <>
      {/* Hamburger for mobile */}
      <button
        className="md:hidden fixed top-4 left-4 z-40 p-2 bg-white/90 rounded-full shadow-lg border border-blue-100 hover:bg-blue-50 transition"
        onClick={() => setOpen(true)}
        aria-label="Open sidebar"
      >
        <FaBars className="text-blue-700 text-2xl" />
      </button>

      {/* Sidebar Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-white/90 border-r min-h-screen h-screen sticky top-0 shadow-md backdrop-blur-xl z-20">
        <div className="p-6 pb-2 flex-1 flex flex-col h-full">
          <h2 className="text-xl font-bold bg-gradient-to-r from-blue-700 via-fuchsia-600 to-blue-400 bg-clip-text text-transparent tracking-tight mb-4 drop-shadow">
            {role === "Admin" ? "Admin Panel" : "User Panel"}
          </h2>
          <nav className="flex flex-col gap-1 flex-1">
            {role === "Admin"
              ? adminLinks.map((link, idx) =>
                  link.label === "Your Answers" ? (
                    <div
                      key={link.label}
                      className={`${linkClasses} cursor-pointer`}
                      onClick={link.onClick}
                      tabIndex={0}
                      aria-label="Your Answers"
                    >
                      {link.icon}
                      {link.label}
                    </div>
                  ) : (
                    <NavLink
                      key={link.to}
                      to={link.to}
                      className={({ isActive }) =>
                        isActive ? `${linkClasses} ${activeLinkClasses}` : linkClasses
                      }
                    >
                      {link.icon}
                      {link.label}
                    </NavLink>
                  )
                )
              : userLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    className={({ isActive }) =>
                      isActive ? `${linkClasses} ${activeLinkClasses}` : linkClasses
                    }
                  >
                    {link.icon}
                    {link.label}
                  </NavLink>
                ))}
            {/* Not clickable section */}
            <div className="flex items-center gap-3 px-4 py-3 text-gray-400 rounded-lg cursor-not-allowed select-none mt-4 border-t pt-4">
              <FaInbox className="text-yellow-500" />
              <span className="font-semibold">
                {role === "Admin" ? "Raised Query" : "Your Query"}
              </span>
            </div>
          </nav>
        </div>
      </aside>

      {/* Sidebar Mobile Drawer */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex"
          onClick={handleOverlayClick}
          style={{ background: "rgba(0,0,0,0.35)" }}
        >
          <aside className="w-64 bg-white/95 shadow-2xl h-full flex flex-col animate-slide-in">
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h2 className="text-lg font-bold bg-gradient-to-r from-blue-700 via-fuchsia-600 to-blue-400 bg-clip-text text-transparent tracking-tight drop-shadow">
                {role === "Admin" ? "Admin Panel" : "User Panel"}
              </h2>
              <button
                className="p-2 rounded-full hover:bg-blue-50 transition"
                onClick={() => setOpen(false)}
                aria-label="Close sidebar"
              >
                <FaTimes className="text-blue-700 text-xl" />
              </button>
            </div>
            <nav className="flex flex-col gap-1 flex-1 p-4">
              {role === "Admin"
                ? adminLinks.map((link, idx) =>
                    link.label === "Your Answers" ? (
                      <div
                        key={link.label}
                        className={`${linkClasses} cursor-pointer`}
                        onClick={link.onClick}
                        tabIndex={0}
                        aria-label="Your Answers"
                      >
                        {link.icon}
                        {link.label}
                      </div>
                    ) : (
                      <NavLink
                        key={link.to}
                        to={link.to}
                        className={({ isActive }) =>
                          isActive ? `${linkClasses} ${activeLinkClasses}` : linkClasses
                        }
                        onClick={() => setOpen(false)}
                      >
                        {link.icon}
                        {link.label}
                      </NavLink>
                    )
                  )
                : userLinks.map((link) => (
                    <NavLink
                      key={link.to}
                      to={link.to}
                      className={({ isActive }) =>
                        isActive ? `${linkClasses} ${activeLinkClasses}` : linkClasses
                      }
                      onClick={() => setOpen(false)}
                    >
                      {link.icon}
                      {link.label}
                    </NavLink>
                  ))}
              <div className="flex items-center gap-3 px-4 py-3 text-gray-400 rounded-lg cursor-not-allowed select-none mt-4 border-t pt-4">
                <FaInbox className="text-yellow-500" />
                <span className="font-semibold">
                  {role === "Admin" ? "Raised Query" : "Your Query"}
                </span>
              </div>
            </nav>
          </aside>
        </div>
      )}

      {showModal && <Modal />}

      {/* Animations */}
      <style>
        {`
          @keyframes slide-in {
            from { transform: translateX(-100%); opacity: 0.6; }
            to { transform: translateX(0); opacity: 1; }
          }
          .animate-slide-in {
            animation: slide-in 0.3s cubic-bezier(.4,0,.2,1) both;
          }
          .animate-pulse {
            animation: pulse 1.5s cubic-bezier(.4,0,.6,1) infinite;
          }
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: .6; }
          }
        `}
      </style>
    </>
  );
};

export default Sidebar;
