import React, { useState, useEffect } from "react";
import faqService from "../services/faqService";
import { FaChevronDown, FaChevronUp, FaSearch } from "react-icons/fa";
const API_BASE = import.meta.env.VITE_API_BASE;

const ViewFaqs = () => {
  const [faqs, setFaqs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedId, setExpandedId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const data = await faqService.getFaqs();
        setFaqs(data);
      } catch (error) {
        console.error("Error fetching FAQs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFaqs();
  }, []);

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (faq.tags &&
        faq.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        ))
  );

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

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
      <div className="relative z-10 w-full max-w-2xl bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl p-4 md:p-8 animate-fade-in">
        <h1 className="text-2xl md:text-3xl font-extrabold mb-6 text-center text-blue-700 drop-shadow tracking-tight">
          Frequently Asked Questions
        </h1>

        <div className="relative mb-6">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400" />
          <input
            type="text"
            placeholder="Search FAQs..."
            className="w-full pl-10 pr-3 py-3 border rounded-xl border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/70 text-blue-900 font-semibold placeholder-blue-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {loading ? (
          <p className="text-center text-blue-400 font-semibold">Loading FAQs...</p>
        ) : filteredFaqs.length === 0 ? (
          <p className="text-center text-fuchsia-400 font-semibold">No FAQs found.</p>
        ) : (
          <div className="space-y-3">
            {filteredFaqs.map((faq) => (
              <div
                key={faq._id}
                className="border border-blue-100 rounded-2xl shadow bg-white/95 transition hover:shadow-2xl hover:-translate-y-1 duration-200"
              >
                <button
                  className="w-full text-left px-5 py-4 flex justify-between items-center focus:outline-none rounded-2xl hover:bg-blue-50 transition"
                  onClick={() => toggleExpand(faq._id)}
                  aria-expanded={expandedId === faq._id}
                  aria-controls={`faq-panel-${faq._id}`}
                >
                  <span className="font-semibold text-gray-800">{faq.question}</span>
                  <span className="text-blue-600">
                    {expandedId === faq._id ? <FaChevronUp /> : <FaChevronDown />}
                  </span>
                </button>
                {expandedId === faq._id && (
                  <div
                    id={`faq-panel-${faq._id}`}
                    className="px-5 pb-4 text-gray-700 border-t whitespace-pre-wrap animate-fade-in"
                  >
                    {faq.answer}
                    {faq.tags && faq.tags.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {faq.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-block bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full font-semibold"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
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

export default ViewFaqs;
