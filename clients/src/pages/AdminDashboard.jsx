import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";
import FaqTable from "../components/FaqTable";
import Loader from "../components/Loader";
import { FaPlus } from "react-icons/fa";
import axios from "axios";

const FILTER_OPTIONS = [
  "Sales & Support",
  "Cloud Services",
  "Project Management",
  "Security",
  "QA & Testing",
  "Business Solutions"
];

const AdminDashboard = () => {
  const [faqs, setFaqs] = useState([]);
  const [filteredFaqs, setFilteredFaqs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/faqs", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setFaqs(response.data);
        setFilteredFaqs(response.data);
      } catch (error) {
        console.error("Failed to fetch FAQs", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFaqs();
  }, []);

  useEffect(() => {
    let filtered = faqs;
    if (selectedFilters.length > 0) {
      filtered = filtered.filter(
        (faq) => faq.category && selectedFilters.includes(faq.category)
      );
    }
    filtered = filtered.filter(
      (faq) =>
        (faq.title && faq.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (faq.tags &&
          faq.tags.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
          )) ||
        (faq.description && faq.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredFaqs(filtered);
  }, [searchTerm, faqs, selectedFilters]);

  const handleFilterChange = (filter) => {
    setSelectedFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };

  // Edit and Delete handlers
  const handleEdit = (faq) => {
    navigate(`/edit-faq/${faq._id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this FAQ?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`/api/faqs/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setFaqs((prev) => prev.filter((faq) => faq._id !== id));
      } catch (err) {
        alert("Failed to delete FAQ.");
      }
    }
  };

  return (
    <div className="relative min-h-screen w-full flex bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Responsive Sidebar */}
      <aside className="hidden md:block w-64 bg-white/90 border-r min-h-screen sticky top-0 shadow-md backdrop-blur-xl z-20">
        <Sidebar role="admin" />
      </aside>
      <main className="flex-1 p-2 sm:p-4 md:p-6 flex flex-col gap-4 w-full">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
          <h1 className="text-2xl md:text-3xl font-extrabold text-white drop-shadow tracking-tight">
            Admin Dashboard
          </h1>
          <Link
            to="/add-faq"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-fuchsia-600 text-white rounded-xl shadow-lg hover:from-blue-700 hover:to-pink-500 transition font-semibold text-base"
          >
            <FaPlus /> Add FAQ
          </Link>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 bg-white/80 backdrop-blur rounded-xl shadow px-4 py-2 sticky top-2 z-10">
          <SearchBar
            placeholder="Search FAQs..."
            value={searchTerm}
            onChange={setSearchTerm}
          />
          <div className="w-full md:w-auto">
            <FilterBar
              filters={FILTER_OPTIONS}
              selectedFilters={selectedFilters}
              onFilterChange={handleFilterChange}
            />
          </div>
        </div>

        <div className="flex-1 flex flex-col min-h-[300px]">
          {loading ? (
            <div className="flex-1 flex items-center justify-center">
              <Loader />
            </div>
          ) : filteredFaqs.length === 0 ? (
            <p className="text-fuchsia-300 text-center mt-8 text-lg font-semibold drop-shadow">
              No FAQs found.
            </p>
          ) : (
            <FaqTable
              faqs={faqs}
              onEdit={handleEdit}
              onDelete={handleDelete}
              role="Admin"   // <-- Add this line
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
