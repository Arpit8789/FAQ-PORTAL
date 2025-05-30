import React, { useEffect, useState } from "react";
import { FaUserCircle, FaEnvelope, FaIdBadge, FaCalendarAlt } from "react-icons/fa";
import axios from "axios";
import Loader from "../components/Loader";

const UserProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(res.data);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
        <Loader />
      </div>
    );

  if (!user)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
        <p className="text-gray-200">Failed to load profile.</p>
      </div>
    );

  return (
    <div className="relative min-h-screen h-screen w-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute inset-0 opacity-40 pointer-events-none -z-10">
        <div className="absolute top-10 left-1/4 w-72 h-72 bg-blue-500/30 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-20 right-1/4 w-80 h-80 bg-purple-500/30 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/3 w-64 h-64 bg-pink-500/30 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-cyan-500/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-6000"></div>
      </div>
      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none -z-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      ></div>
      <div className="relative z-10 w-full max-w-xl mx-auto p-4 sm:p-6">
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl p-6 sm:p-8 flex flex-col items-center animate-fade-in animate-float">
          <FaUserCircle className="text-6xl text-blue-600 mb-2 animate-pulse" />
          <h2 className="text-2xl font-bold text-gray-800 mb-1">{user.username}</h2>
          <span className="text-blue-500 font-semibold mb-2">{user.role}</span>
          <div className="w-full flex flex-col gap-2 mt-4">
            <div className="flex items-center gap-2 text-blue-700 font-medium">
              <FaEnvelope /> <span>{user.email}</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-700 font-medium">
              <FaIdBadge /> <span>User ID: {user.id || user._id}</span>
            </div>
            <div className="flex items-center gap-2 text-purple-700 font-medium">
              <FaCalendarAlt />{" "}
              <span>
                Joined: {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
              </span>
            </div>
          </div>
          <button
            className="mt-6 px-5 py-2 bg-gradient-to-r from-blue-600 to-fuchsia-600 text-white rounded-xl font-semibold shadow hover:from-blue-700 hover:to-pink-500 transition"
            onClick={() => alert("Change password feature coming soon!")}
          >
            Change Password
          </button>
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
          @keyframes float {
            0%, 100% { transform: translateY(0);}
            50% { transform: translateY(-10px);}
          }
          .animate-float {
            animation: float 3s ease-in-out infinite;
          }
        `}
      </style>
    </div>
  );
};

export default UserProfilePage;
