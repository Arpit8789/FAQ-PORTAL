import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import Loader from "../components/Loader";
const API_BASE = import.meta.env.VITE_API_BASE;

const BrowseFaqs = () => {
  const [faqs, setFaqs] = useState([]);
  const [filteredFaqs, setFilteredFaqs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const searchInputRef = useRef(null);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await axios.get("${API_BASE}/api/faqs");
        setFaqs(response.data);
        setFilteredFaqs(response.data);
      } catch (error) {
        setFaqs([]);
        setFilteredFaqs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchFaqs();
  }, []);

  // Focus the search bar on mount
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  // Filter FAQs when searchTerm changes
  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const filtered = faqs.filter(faq =>
      (faq.title && faq.title.toLowerCase().includes(term)) ||
      (faq.description && faq.description.toLowerCase().includes(term)) ||
      (faq.tags && faq.tags.some(tag => tag.toLowerCase().includes(term)))
    );
    setFilteredFaqs(filtered);
  }, [searchTerm, faqs]);

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center p-4 overflow-auto">
      {loading ? (
        <div className="flex-1 flex items-center justify-center w-full">
          <Loader />
        </div>
      ) : (
        <>
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search FAQs..."
            autoFocus={true}
            ref={searchInputRef}
          />
          <ul className="w-full max-w-4xl mt-6 space-y-4">
            {filteredFaqs.length === 0 ? (
              <li className="text-center text-white text-lg font-semibold">
                No FAQs found.
              </li>
            ) : (
              filteredFaqs.map(faq => (
                <li
                  key={faq._id}
                  className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl p-4 transition hover:shadow-2xl hover:-translate-y-1 duration-200 cursor-pointer"
                >
                  <h3 className="text-lg font-bold text-gray-800 mb-1">{faq.title}</h3>
                  <div className="text-fuchsia-600 text-xs font-bold uppercase mb-2">{faq.category}</div>
                  <p className="text-gray-700">{faq.description}</p>
                  {faq.tags && faq.tags.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {faq.tags.map(tag => (
                        <span
                          key={tag}
                          className="inline-block bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full font-semibold uppercase tracking-wide"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </li>
              ))
            )}
          </ul>
        </>
      )}
    </div>
  );
};

export default BrowseFaqs;
