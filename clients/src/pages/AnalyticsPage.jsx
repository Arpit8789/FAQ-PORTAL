import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaUsers,
  FaQuestionCircle,
  FaTags,
  FaUserShield,
  FaUser,
} from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import Loader from "../components/Loader";

// Helper for tag cloud font size
function getFontSize(count, min, max) {
  if (max === min) return "1.2em";
  return `${1 + ((count - min) / (max - min)) * 1.1}em`;
}

const COLORS = [
  "bg-blue-500",
  "bg-fuchsia-500",
  "bg-emerald-500",
  "bg-yellow-500",
  "bg-cyan-500",
  "bg-pink-500",
];

const AnalyticsPage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const [faqRes, userRes] = await Promise.all([
          axios.get("/api/faqs/analytics", {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          }),
          axios.get("/api/auth/analytics", {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          }),
        ]);
        setStats({
          ...faqRes.data,
          ...userRes.data,
        });
      } catch (err) {
        setStats(null);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
        <Loader />
      </div>
    );
  if (!stats)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
        <p className="text-gray-200">Failed to load analytics.</p>
      </div>
    );

  // For tag cloud font scaling
  const tagCounts = stats.topTags?.map((t) => t.count) || [1];
  const minTag = Math.min(...tagCounts);
  const maxTag = Math.max(...tagCounts);

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex justify-center overflow-auto">
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
      <main className="relative z-10 w-full max-w-6xl mx-auto p-2 sm:p-6">
        <h1 className="text-3xl font-extrabold text-white mb-8 drop-shadow tracking-tight animate-fade-in">
          Admin Analytics
        </h1>
        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-fade-in">
          <div className="bg-white/90 rounded-2xl shadow-xl p-6 flex flex-col items-center">
            <FaQuestionCircle className="text-3xl text-blue-500 mb-2" />
            <div className="text-2xl font-bold text-gray-800">{stats.totalFaqs}</div>
            <div className="text-gray-500">Total FAQs</div>
          </div>
          <div className="bg-white/90 rounded-2xl shadow-xl p-6 flex flex-col items-center">
            <FaUsers className="text-3xl text-fuchsia-500 mb-2" />
            <div className="text-2xl font-bold text-gray-800">{stats.totalUsers}</div>
            <div className="text-gray-500">Total Users</div>
          </div>
          <div className="bg-white/90 rounded-2xl shadow-xl p-6 flex flex-col items-center">
            <FaUserShield className="text-3xl text-emerald-500 mb-2" />
            <div className="text-2xl font-bold text-gray-800">{stats.usersByRole?.Admin || 0}</div>
            <div className="text-gray-500">Admins</div>
          </div>
          <div className="bg-white/90 rounded-2xl shadow-xl p-6 flex flex-col items-center">
            <FaUser className="text-3xl text-cyan-500 mb-2" />
            <div className="text-2xl font-bold text-gray-800">{stats.usersByRole?.User || 0}</div>
            <div className="text-gray-500">Users</div>
          </div>
        </div>

        {/* Top Categories */}
        <div className="bg-white/90 rounded-2xl shadow-xl p-6 mb-8 animate-fade-in">
          <h2 className="text-xl font-semibold mb-4 text-blue-700">Top Categories</h2>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={stats.faqsByCategory || []} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" allowDecimals={false} />
              <YAxis dataKey="category" type="category" width={120} />
              <Tooltip />
              <Bar dataKey="count" fill="#6366f1" radius={[0, 10, 10, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top Tags Cloud */}
        <div className="bg-white/90 rounded-2xl shadow-xl p-6 mb-8 animate-fade-in">
          <h2 className="text-xl font-semibold mb-4 text-fuchsia-700">Top Tags</h2>
          <div className="flex flex-wrap gap-3">
            {(stats.topTags || []).slice(0, 15).map((tag, i) => (
              <span
                key={tag.tag}
                className={`px-3 py-1 rounded-full font-bold text-xs bg-fuchsia-100 text-fuchsia-700`}
                style={{ fontSize: getFontSize(tag.count, minTag, maxTag) }}
              >
                {tag.tag} ({tag.count})
              </span>
            ))}
          </div>
        </div>

        {/* Recent FAQs */}
        <div className="bg-white/90 rounded-2xl shadow-xl p-6 animate-fade-in">
          <h2 className="text-xl font-semibold mb-4 text-emerald-700">Recent FAQs</h2>
          <ul className="divide-y divide-gray-200">
            {(stats.recentFaqs || []).map((faq) => (
              <li key={faq._id} className="py-3 flex items-center gap-2">
                <FaQuestionCircle className="text-blue-400" />
                <span className="font-semibold text-gray-800">{faq.title}</span>
                <span className="ml-2 text-xs text-gray-500">{faq.category}</span>
              </li>
            ))}
          </ul>
        </div>
      </main>
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

export default AnalyticsPage;
