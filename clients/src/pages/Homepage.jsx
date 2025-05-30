import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showBrowseMessage, setShowBrowseMessage] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-auto relative">
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

      {/* Main Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="w-full max-w-7xl mx-auto grid lg:grid-cols-12 gap-8 items-center px-4">
          {/* Left: Hero */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div
              className={`flex items-center gap-4 mb-6 transition-all duration-700 ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div className="relative">
                <img
                  src="logo.png"
                  alt="Logo"
                  className="w-20 h-20 rounded-2xl shadow-2xl border-4 border-blue-200"
                />
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-30 animate-pulse"></div>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">FAQ Portal</h2>
                <p className="text-purple-300 text-base">Your Knowledge Base</p>
              </div>
            </div>
            <div
              className={`mb-4 transition-all duration-700 delay-100 ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-2">
                <span className="block text-cyan-300">Find Answers</span>
                <span className="block text-white">Share Knowledge</span>
                <span className="block text-pink-400">Stay Informed</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-300 max-w-2xl leading-relaxed mt-2">
                Your central place for quick answers, helpful articles, and team resources.<br />
                <span className="text-blue-400 font-semibold">Admins</span> organize content, <span className="text-pink-400 font-semibold">users</span> discover solutions.
              </p>
            </div>

            {/* Action Buttons */}
            <div
              className={`flex flex-wrap gap-6 mt-6 transition-all duration-700 delay-200 ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <Link to="/login">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-2xl font-bold text-xl shadow-lg transition-all duration-200 transform hover:scale-105">
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button className="bg-fuchsia-700 hover:bg-fuchsia-800 text-white px-10 py-4 rounded-2xl font-bold text-xl shadow-lg transition-all duration-200 transform hover:scale-105">
                  Register
                </button>
              </Link>
              <button
                onClick={() => setShowBrowseMessage(true)}
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-10 py-4 rounded-2xl font-bold text-xl shadow-lg transition-all duration-200 transform hover:scale-105"
              >
                Browse FAQs
              </button>
            </div>
          </div>

          {/* Right: Features */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <FeatureCard
              icon="🔍"
              title="Quick Search"
              description="Find information fast with organized topics and categories."
              gradient="from-blue-400 via-blue-500 to-purple-500"
              delay={200}
              isLoaded={isLoaded}
            />
            <FeatureCard
              icon="🛡️"
              title="Role Management"
              description="Admins update content, users explore and learn—securely."
              gradient="from-fuchsia-500 via-pink-400 to-red-400"
              delay={300}
              isLoaded={isLoaded}
            />
            <FeatureCard
              icon="📊"
              title="Usage Insights"
              description="See popular questions and keep your knowledge base up to date."
              gradient="from-purple-400 via-pink-500 to-rose-500"
              delay={400}
              isLoaded={isLoaded}
            />
            <FeatureCard
              icon="📁"
              title="Organized Resources"
              description="Access guides, policies, and answers in one convenient place."
              gradient="from-cyan-400 via-blue-500 to-indigo-500"
              delay={500}
              isLoaded={isLoaded}
            />
          </div>
        </div>
      </div>

      {/* Modal message box */}
      {showBrowseMessage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-2xl text-center max-w-md mx-auto">
            <p className="text-gray-700 text-base font-medium">
              Please log in to view FAQs and access all features of the FAQ Portal.
            </p>
            <button
              onClick={() => setShowBrowseMessage(false)}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Animations */}
      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        .animation-delay-6000 { animation-delay: 6s; }
      `}</style>
    </div>
  );
}

function FeatureCard({ icon, title, description, gradient, delay, isLoaded }) {
  return (
    <div
      className={`
        group relative bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl p-6
        transition-all duration-200 cursor-pointer
        ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}
        hover:-translate-y-3 hover:scale-105
      `}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex items-start gap-4">
        <div className={`w-14 h-14 bg-gradient-to-r ${gradient} rounded-xl flex items-center justify-center text-white text-3xl shadow-lg`}>
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-white font-bold text-xl mb-2 group-hover:text-blue-300 transition-colors duration-200">
            {title}
          </h4>
          <p className="text-gray-300 text-base leading-relaxed">
            {description}
          </p>
        </div>
      </div>
      <div className={`absolute top-4 right-4 w-2 h-2 rounded-full bg-gradient-to-r ${gradient} transition-all duration-200 opacity-60`}></div>
    </div>
  );
}
