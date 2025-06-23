import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Loader from "../components/Loader";
import SearchBar from "../components/SearchBar";
import axios from "axios";
import { FaUserCircle, FaPlus, FaEnvelope, FaChevronDown, FaChevronUp, FaBookmark } from "react-icons/fa";
const API_BASE = import.meta.env.VITE_API_BASE;


// Main FAQ categories
const FAQ_CATEGORIES = [
  "Sales & Support",
  "Cloud Services",
  "Project Management",
  "Security",
  "QA & Testing",
  "Business Solutions"
];

// Contact Support Modal
function ContactSupportModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md mx-auto relative animate-fade-in">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-2xl font-bold"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4 text-blue-700">Contact Support</h2>
        <div className="space-y-2">
          <div>
            <span className="font-semibold text-gray-700">Email:</span> support@yourcompany.com
          </div>
          <div>
            <span className="font-semibold text-gray-700">Phone:</span> +91-9876543210
          </div>
          <div>
            <span className="font-semibold text-gray-700">Address:</span> 123, Tech Park, Noida, India
          </div>
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
  );
}

const UserDashboard = () => {
  const [username, setUsername] = useState("");
  const [recentFaqs, setRecentFaqs] = useState([]);
  const [filteredFaqs, setFilteredFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [expanded, setExpanded] = useState(null);
  const [bookmarkedIds, setBookmarkedIds] = useState([]);
  const [showSupportModal, setShowSupportModal] = useState(false);

  // Fetch user info, FAQs, and bookmarks
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const res = await axios.get("${API_BASE}/api/auth/me", {
            headers: { Authorization: `Bearer ${token}` }
          });
          setUsername(res.data.username || "User");
        } else {
          setUsername("User");
        }
        const faqResponse = await axios.get("${API_BASE}/api/faqs?limit=50");
        setRecentFaqs(faqResponse.data);
        setFilteredFaqs(faqResponse.data);

        // Fetch bookmarked FAQ IDs
        if (token) {
          const bookmarksRes = await axios.get("${API_BASE}/api/auth/bookmarks", {
            headers: { Authorization: `Bearer ${token}` }
          });
          setBookmarkedIds(bookmarksRes.data.map(faq => faq._id));
        }
      } catch (err) {
        setUsername("User");
        setRecentFaqs([]);
        setFilteredFaqs([]);
        setBookmarkedIds([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    let faqs = recentFaqs;
    if (category !== "All") {
      faqs = faqs.filter(faq => faq.category === category);
    }
    if (search) {
      faqs = faqs.filter(faq =>
        (faq.title && faq.title.toLowerCase().includes(search.toLowerCase())) ||
        (faq.description && faq.description.toLowerCase().includes(search.toLowerCase()))
      );
    }
    setFilteredFaqs(faqs);
  }, [search, category, recentFaqs]);

  // Accordion expand/collapse
  const handleAccordionToggle = idx => {
    setExpanded(expanded === idx ? null : idx);
  };

  // Handle bookmarking
  const handleBookmark = async (faqId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "${API_BASE}/api/auth/bookmarks",
        { faqId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBookmarkedIds(prev => [...prev, faqId]);
      alert("Bookmarked!");
    } catch (err) {
      alert("Failed to bookmark FAQ.");
    }
  };

  // Ask a Question button handler
  const handleAskQuestion = () => {
    alert("Currently this feature is not available. Here you will ask a question and it will be added to 'Your Query'.");
  };

  return (
    <div className="relative min-h-screen w-full flex bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
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
      <Sidebar />
      <main className="flex-1 p-2 sm:p-4 md:p-6 flex flex-col gap-4 w-full">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
          <div className="flex items-center gap-3">
            <FaUserCircle className="text-4xl text-blue-400 drop-shadow animate-pulse" />
            <div>
              <h1 className="text-2xl font-bold text-white drop-shadow">
                Welcome, <span className="text-blue-300">{username}</span>!
              </h1>
              <p className="text-gray-300 text-sm">How can we help you today?</p>
            </div>
          </div>
          <div className="flex gap-2 mt-4 sm:mt-0">
            <button
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-fuchsia-600 text-white rounded-xl shadow-lg hover:from-blue-700 hover:to-pink-500 transition font-semibold"
              onClick={handleAskQuestion}
            >
              <FaPlus /> Ask a Question
            </button>
            <button
              className="flex items-center gap-2 px-4 py-2 bg-white/90 text-blue-700 rounded-xl shadow hover:bg-blue-50 transition font-semibold"
              onClick={() => setShowSupportModal(true)}
              title="Contact support"
            >
              <FaEnvelope /> Contact Support
            </button>
          </div>
        </div>

        {/* Search and Categories */}
        <div className="flex flex-col gap-2 bg-white/80 backdrop-blur rounded-xl shadow px-4 py-2 sticky top-2 z-10 animate-fade-in">
          <SearchBar value={search} onChange={setSearch} placeholder="Search FAQs..." />
          <div className="flex flex-wrap gap-1 mt-2">
            <button
              className={`px-3 py-1 rounded-full border text-sm font-semibold transition ${
                category === "All"
                  ? "bg-blue-600 text-white shadow"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"
              }`}
              onClick={() => setCategory("All")}
              aria-pressed={category === "All"}
            >
              All
            </button>
            {FAQ_CATEGORIES.map(cat => (
              <button
                key={cat}
                className={`px-3 py-1 rounded-full border text-sm font-semibold transition ${
                  category === cat
                    ? "bg-blue-600 text-white shadow"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"
                }`}
                onClick={() => setCategory(cat)}
                aria-pressed={category === cat}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* FAQs List */}
        <section className="flex-1 flex flex-col w-full">
          <h2 className="text-lg font-semibold mb-2 text-white drop-shadow">Recent FAQs</h2>
          {loading ? (
            <div className="flex-1 flex items-center justify-center">
              <Loader />
            </div>
          ) : filteredFaqs.length === 0 ? (
            <p className="text-fuchsia-300 text-center mt-8 text-lg font-semibold drop-shadow">
              No FAQs found. Try a different search or category.
            </p>
          ) : (
            <ul className="space-y-3 animate-fade-in w-full">
              {filteredFaqs.map((faq, idx) => (
                <li key={faq._id} className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl transition hover:shadow-2xl hover:-translate-y-1 duration-200 w-full">
                  <AccordionItem
                    faq={faq}
                    expanded={expanded === idx}
                    onToggle={() => handleAccordionToggle(idx)}
                    isBookmarked={bookmarkedIds.includes(faq._id)}
                    onBookmark={handleBookmark}
                  />
                </li>
              ))}
            </ul>
          )}
        </section>
        {showSupportModal && <ContactSupportModal onClose={() => setShowSupportModal(false)} />}
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

// AccordionItem for FAQ with accessibility, animation, and bookmark button
function AccordionItem({ faq, expanded, onToggle, isBookmarked, onBookmark }) {
  return (
    <details open={expanded} className="group transition-all duration-300 w-full" aria-expanded={expanded}>
      <summary
        className={`cursor-pointer px-4 py-3 font-semibold flex justify-between items-center rounded-t transition-colors duration-200 
          ${expanded ? "bg-blue-50" : "bg-white/0 hover:bg-blue-50"}`}
        onClick={onToggle}
        tabIndex={0}
        onKeyDown={e => {
          if (e.key === "Enter" || e.key === " ") onToggle();
        }}
        aria-controls={`faq-panel-${faq._id}`}
        aria-expanded={expanded}
      >
        <span>{faq.title}</span>
        <span className="flex items-center gap-2">
          <span className="text-xs text-fuchsia-600 bg-fuchsia-100 px-2 py-0.5 rounded-full font-bold uppercase">{faq.category}</span>
          <button
            className={`ml-2 text-xl ${isBookmarked ? "text-emerald-600" : "text-gray-400 hover:text-emerald-600"} transition`}
            title={isBookmarked ? "Bookmarked" : "Add to Bookmarks"}
            onClick={e => {
              e.stopPropagation();
              if (!isBookmarked) onBookmark(faq._id);
            }}
            aria-label={isBookmarked ? "Bookmarked" : "Add to Bookmarks"}
            disabled={isBookmarked}
            type="button"
          >
            <FaBookmark />
          </button>
          {expanded ? <FaChevronUp className="text-blue-400" /> : <FaChevronDown className="text-blue-400" />}
        </span>
      </summary>
      <div id={`faq-panel-${faq._id}`} className="px-4 pb-3 text-gray-700 animate-fade-in">
        {faq.description}
        <div className="mt-2 flex items-center gap-2 flex-wrap">
          <span className="text-sm text-gray-500">Was this helpful?</span>
          <button
            className="px-3 py-1 rounded-full bg-green-100 text-green-700 hover:bg-green-200 font-semibold text-sm transition"
            onClick={() => alert("Thank you for your feedback!")}
            type="button"
          >
            Yes
          </button>
          <button
            className="px-3 py-1 rounded-full bg-red-100 text-red-700 hover:bg-red-200 font-semibold text-sm transition"
            onClick={() => alert("We'll try to improve this answer!")}
            type="button"
          >
            No
          </button>
        </div>
      </div>
    </details>
  );
}

export default UserDashboard;
