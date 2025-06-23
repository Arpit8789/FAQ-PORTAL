import React, { useState } from "react";
import axios from "axios";
import { FaUserPlus } from "react-icons/fa";

// ✅ Use environment variable base URL
const BASE_API_URL = import.meta.env.VITE_API_BASE;
console.log("🧪 VITE_API_BASE (register):", BASE_API_URL);

const RegisterPage = () => {
  const [role, setRole] = useState("User");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!username || !email || !password || !confirm) {
      setError("Please fill in all fields.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      console.log("📦 Sending registration to:", `${BASE_API_URL}/auth/register`);
      await axios.post(`${BASE_API_URL}/auth/register`, {
        username,
        email,
        password,
        role,
      });

      setSuccess("Registration successful! You may now login.");
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirm("");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed.");
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
      {/* Register Card */}
      <div className="relative z-10 w-full max-w-md bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl p-6 sm:p-8 animate-fade-in">
        <div className="flex flex-col items-center mb-6">
          <div className="relative mb-2">
            <div className="w-14 h-14 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl">
              <FaUserPlus className="text-white text-3xl" />
            </div>
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-30 animate-pulse"></div>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 text-center">Create Account</h2>
          <p className="text-gray-500 text-center text-sm mt-1">
            Join the FAQ Portal as User or Admin
          </p>
        </div>
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div>
            <label className="block mb-1 font-semibold text-emerald-600">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="block w-full border border-emerald-300 rounded-xl p-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white/70 text-emerald-900 font-semibold"
              required
            >
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
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
            <label className="block mb-1 font-semibold text-fuchsia-600">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full border border-fuchsia-300 rounded-xl p-2 focus:ring-2 focus:ring-fuchsia-500 focus:outline-none bg-white/70 text-fuchsia-900 font-semibold placeholder-fuchsia-400"
              placeholder="Enter email"
              required
              autoComplete="email"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold text-blue-600">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full border border-blue-300 rounded-xl p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white/70 text-blue-900 font-semibold placeholder-blue-400"
              placeholder="Enter password"
              required
              autoComplete="new-password"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold text-fuchsia-600">Confirm Password</label>
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="block w-full border border-fuchsia-300 rounded-xl p-2 focus:ring-2 focus:ring-fuchsia-500 focus:outline-none bg-white/70 text-fuchsia-900 font-semibold placeholder-fuchsia-400"
              placeholder="Confirm password"
              required
              autoComplete="new-password"
            />
          </div>
          {error && <p className="text-red-600 text-sm" role="alert">{error}</p>}
          {success && <p className="text-green-600 text-sm" role="alert">{success}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-fuchsia-600 text-white py-2 rounded-xl font-semibold text-lg shadow hover:from-blue-700 hover:to-pink-500 transition disabled:opacity-50"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
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

export default RegisterPage;
