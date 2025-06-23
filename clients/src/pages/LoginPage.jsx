import React, { useState } from "react";
import axios from "axios";
import { FaSignInAlt, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";

import.meta.env && console.log("🧪 VITE_API_BASE:", import.meta.env.VITE_API_BASE);


const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!username || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post("/api/auth/login", {
        username,
        password,
      });

      localStorage.setItem("token", response.data.token);

      const role = response.data.user.role;
      if (role === "Admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/user-dashboard");
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Login failed. Try again.";
      // If the error is about user not found, append register prompt
      if (
        msg.toLowerCase().includes("not exist") ||
        msg.toLowerCase().includes("not found") ||
        msg.toLowerCase().includes("invalid credentials")
      ) {
        setError(
          <>
            {msg} <br />
            <span className="text-blue-700">
              New user?{" "}
              <Link
                to="/register"
                className="underline font-semibold hover:text-fuchsia-600"
              >
                Register here
              </Link>
            </span>
          </>
        );
      } else {
        setError(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen h-screen w-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="absolute top-10 left-1/4 w-72 h-72 bg-blue-500/30 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-20 right-1/4 w-80 h-80 bg-purple-500/30 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/3 w-64 h-64 bg-pink-500/30 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-cyan-500/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-6000"></div>
      </div>
      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      ></div>
      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl p-6 sm:p-8 animate-fade-in">
        <div className="flex flex-col items-center mb-6">
          <div className="relative mb-2">
            <div className="w-14 h-14 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl">
              <FaSignInAlt className="text-white text-3xl" />
            </div>
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-30 animate-pulse"></div>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 text-center">Sign In</h2>
          <p className="text-gray-500 text-center text-sm mt-1">
            Welcome back to the FAQ Portal!
          </p>
        </div>
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div>
            <label className="block mb-1 font-semibold text-blue-600">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="block w-full border border-blue-300 rounded-xl p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white/70 text-blue-900 font-semibold placeholder-blue-400"
              placeholder="Enter username"
              required
              autoComplete="username"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold text-fuchsia-600">Password</label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full border border-fuchsia-300 rounded-xl p-2 focus:ring-2 focus:ring-fuchsia-500 focus:outline-none bg-white/70 text-fuchsia-900 font-semibold placeholder-fuchsia-400 pr-10"
                placeholder="Enter password"
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-2 flex items-center text-fuchsia-500 focus:outline-none"
                tabIndex={-1}
                onClick={() => setShowPass((v) => !v)}
                aria-label={showPass ? "Hide password" : "Show password"}
              >
                {showPass ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          {error && (
            <div className="text-red-600 text-sm text-center" role="alert">
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-fuchsia-600 text-white py-2 rounded-xl font-semibold text-lg shadow hover:from-blue-700 hover:to-pink-500 transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        {/* Permanent register prompt */}
        <div className="mt-6 text-center text-blue-700 text-sm">
          New user?{" "}
          <Link
            to="/register"
            className="underline font-semibold hover:text-fuchsia-600"
          >
            Register here
          </Link>
        </div>
      </div>
      <style>
        {`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(40px);}
            to { opacity: 1; transform: translateY(0);}
          }
          .animate-fade-in {
            animation: fade-in 0.8s cubic-bezier(.4,0,.2,1) both;
          }
          @keyframes blob {
            0%, 100% { transform: translate(0px, 0px) scale(1);}
            33% { transform: translate(30px, -50px) scale(1.1);}
            66% { transform: translate(-20px, 20px) scale(0.9);}
          }
          .animate-blob { animation: blob 7s infinite; }
          .animation-delay-2000 { animation-delay: 2s; }
          .animation-delay-4000 { animation-delay: 4s; }
          .animation-delay-6000 { animation-delay: 6s; }
        `}
      </style>
    </div>
  );
};

export default LoginPage;
