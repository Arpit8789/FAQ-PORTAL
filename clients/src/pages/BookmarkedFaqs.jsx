import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import { FaBookmark } from "react-icons/fa";

const BookmarkedFaqs = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/api/auth/bookmarks", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setBookmarks(res.data); // Expecting an array of FAQ objects
      } catch {
        setBookmarks([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBookmarks();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
        <Loader />
      </div>
    );

  if (!bookmarks.length)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl p-8 flex flex-col items-center animate-fade-in">
          <FaBookmark className="text-4xl text-blue-600 mb-2 animate-pulse" />
          <div className="text-gray-500 text-lg font-semibold">You have no bookmarked FAQs yet.</div>
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
          `}
        </style>
      </div>
    );

  return (
    <div className="relative min-h-screen h-screen w-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center overflow-auto">
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
      <div className="relative z-10 p-2 sm:p-6 w-full max-w-3xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-6 drop-shadow tracking-tight animate-fade-in flex items-center gap-2">
          <FaBookmark className="text-blue-400" />
          Bookmarked FAQs
        </h1>
        <ul className="space-y-4 animate-fade-in">
          {bookmarks.map(faq => (
            <li key={faq._id} className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl p-4 transition hover:shadow-2xl hover:-translate-y-1 duration-200">
              <div className="font-semibold text-gray-800 text-lg">{faq.title}</div>
              <div className="text-fuchsia-600 text-xs font-bold uppercase mb-1">{faq.category}</div>
              <div className="text-gray-700">{faq.description}</div>
            </li>
          ))}
        </ul>
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

export default BookmarkedFaqs;
