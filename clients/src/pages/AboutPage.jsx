import React from "react";
import { FaQuestionCircle, FaUsers, FaRocket, FaHeart } from "react-icons/fa";

const AboutPage = () => {
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
      <div className="relative z-10 w-full max-w-3xl bg-white/95 rounded-2xl shadow-2xl p-4 md:p-8 backdrop-blur-xl animate-fade-in">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-4 mb-4">
          <FaQuestionCircle className="text-5xl text-blue-600 flex-shrink-0" />
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-1 tracking-tight">
              About Our FAQ Portal
            </h1>
            <p className="text-gray-500 text-base md:text-lg">
              Your one-stop platform for instant answers, seamless support, and community-driven knowledge.
            </p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1 flex items-center gap-3 bg-blue-50 rounded-xl p-3 shadow-sm">
            <FaUsers className="text-2xl text-blue-500" />
            <div>
              <div className="font-semibold text-gray-700">For Everyone</div>
              <div className="text-sm text-gray-500">Easy access for users and powerful tools for admins.</div>
            </div>
          </div>
          <div className="flex-1 flex items-center gap-3 bg-fuchsia-50 rounded-xl p-3 shadow-sm">
            <FaRocket className="text-2xl text-fuchsia-500" />
            <div>
              <div className="font-semibold text-gray-700">Fast & Reliable</div>
              <div className="text-sm text-gray-500">Lightning-fast search, instant answers, always available.</div>
            </div>
          </div>
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-bold text-blue-700 mb-1">Why Choose Us?</h2>
          <ul className="list-disc list-inside text-gray-700 text-sm md:text-base space-y-1">
            <li>Get answers to your questions 24/7, no waiting.</li>
            <li>Admins can manage, edit, and analyze FAQs with ease.</li>
            <li>Smart search, category filters, and user-friendly design.</li>
            <li>Ask questions, give feedback, and help improve our knowledge base.</li>
          </ul>
        </div>
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex items-center gap-2 text-fuchsia-700 font-semibold">
            <FaHeart className="text-xl" />
            Built with care by the FAQ Portal Team
          </div>
          <div className="text-sm text-gray-400 text-right">
            &copy; {new Date().getFullYear()} FAQ Portal. All rights reserved.
          </div>
        </div>
      </div>
      <style>
        {`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(40px);}
            to { opacity: 1; transform: translateY(0);}
          }
          .animate-fade-in {
            animation: fade-in 0.7s cubic-bezier(.4,0,.2,1) both;
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

export default AboutPage;
