import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

// Helper to decode JWT and get role
function getUserRoleFromToken(token) {
  try {
    if (!token) return null;
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.role || null;
  } catch {
    return null;
  }
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState(getUserRoleFromToken(localStorage.getItem("token")));
  const location = useLocation();
  const navigate = useNavigate();

  // Listen for token changes (login/logout from other tabs)
  useEffect(() => {
    const syncAuth = () => {
      const newToken = localStorage.getItem("token");
      setToken(newToken);
      setRole(getUserRoleFromToken(newToken));
    };
    window.addEventListener("storage", syncAuth);
    return () => window.removeEventListener("storage", syncAuth);
  }, []);

  // Also update on route change (for SPA navigation)
  useEffect(() => {
    const newToken = localStorage.getItem("token");
    setToken(newToken);
    setRole(getUserRoleFromToken(newToken));
  }, [location.pathname]);

  // Build links dynamically
  const navLinks = [
    { to: "/", label: "Home" },
    // Only show FAQs if logged in
    ...(token ? [] : [{ to: "/faqs", label: "FAQs" }]),
    { to: "/about", label: "About" },
  ];

  if (token && role === "Admin") {
    navLinks.push({ to: "/admin-dashboard", label: "Dashboard" });
  } else if (token && role === "User") {
    navLinks.push({ to: "/user-dashboard", label: "Dashboard" });
  }

  if (!token) {
    navLinks.push({ to: "/login", label: "Login" });
  }

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setRole(null);
    setIsOpen(false);
    navigate("/login");
  };

  // Handle FAQs click when not logged in
  const handleFaqsClick = (e) => {
    if (!token) {
      e.preventDefault();
      setShowLoginPrompt(true);
    }
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl shadow-lg transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <img
              src="/src/assets/logo.png"
              alt="Logo"
              className="h-12 w-12 mr-2 rounded-full shadow-lg border-2 border-blue-200 group-hover:scale-110 transition-transform duration-200"
            />
            <span className="text-2xl font-extrabold bg-gradient-to-r from-blue-700 via-fuchsia-600 to-blue-400 bg-clip-text text-transparent tracking-tight drop-shadow">
              FAQ Portal
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-3 items-center">
            {navLinks.map((link) =>
              link.label === "FAQs" ? (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={handleFaqsClick}
                  className={`px-4 py-2 rounded-xl font-semibold transition-all duration-150 ${
                    location.pathname === link.to
                      ? "bg-gradient-to-r from-blue-600 to-fuchsia-500 text-white shadow-lg"
                      : "text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                  }`}
                >
                  {link.label}
                </Link>
              ) : (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-4 py-2 rounded-xl font-semibold transition-all duration-150 ${
                    location.pathname === link.to
                      ? "bg-gradient-to-r from-blue-600 to-fuchsia-500 text-white shadow-lg"
                      : "text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
            {token && (
              <button
                onClick={handleLogout}
                className="ml-2 px-4 py-2 rounded-xl font-semibold bg-gradient-to-r from-red-500 to-pink-500 text-white shadow hover:from-red-600 hover:to-pink-600 transition-all duration-150"
              >
                Logout
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-full bg-white/80 hover:bg-blue-100 shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Toggle menu"
            >
              <svg
                className="h-7 w-7 text-blue-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Animated Mobile menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
          } bg-white/90 backdrop-blur-xl shadow-lg px-4`}
        >
          <div className="flex flex-col py-2 space-y-2">
            {navLinks.map((link) =>
              link.label === "FAQs" ? (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={handleFaqsClick}
                  className={`block px-4 py-2 rounded-xl font-semibold transition-all duration-150 ${
                    location.pathname === link.to
                      ? "bg-gradient-to-r from-blue-600 to-fuchsia-500 text-white shadow"
                      : "text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                  }`}
                >
                  {link.label}
                </Link>
              ) : (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`block px-4 py-2 rounded-xl font-semibold transition-all duration-150 ${
                    location.pathname === link.to
                      ? "bg-gradient-to-r from-blue-600 to-fuchsia-500 text-white shadow"
                      : "text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              )
            )}
            {token && (
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 rounded-xl font-semibold bg-gradient-to-r from-red-500 to-pink-500 text-white shadow hover:from-red-600 hover:to-pink-600 transition-all duration-150"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Login Prompt Modal */}
      {showLoginPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md mx-auto relative animate-fade-in">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-2xl font-bold"
              onClick={() => setShowLoginPrompt(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <div className="flex flex-col items-center">
              <img
                src="/src/assets/logo.png"
                alt="Logo"
                className="h-16 w-16 mb-4 rounded-full shadow-lg border-2 border-blue-200"
              />
              <h2 className="text-2xl font-bold text-blue-700 mb-2">Login Required</h2>
              <p className="text-gray-600 mb-4 text-center">
                Please log in to view FAQs and access all features of the FAQ Portal.
              </p>
              <Link to="/login">
                <button
                  className="bg-gradient-to-r from-blue-600 to-fuchsia-600 text-white px-8 py-2 rounded-xl font-bold text-lg shadow hover:from-blue-700 hover:to-pink-500 transition"
                  onClick={() => setShowLoginPrompt(false)}
                >
                  Go to Login
                </button>
              </Link>
            </div>
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
      )}
    </>
  );
};

export default Navbar;
