import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FaEdit } from "react-icons/fa";

const FAQ_CATEGORIES = [
  "Sales & Support",
  "Cloud Services",
  "Project Management",
  "Security",
  "QA & Testing",
  "Business Solutions"
];


const EditFaq = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(FAQ_CATEGORIES[0]);
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Set document title for better UX
  useEffect(() => {
    document.title = "Edit FAQ - FAQ Portal";
  }, []);

  useEffect(() => {
    // Fetch existing FAQ data
    const fetchFaq = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`/api/faqs/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTitle(response.data.title);
        setCategory(response.data.category || FAQ_CATEGORIES[0]);
        setDescription(response.data.description);
        setTags(response.data.tags ? response.data.tags.join(", ") : "");
      } catch (err) {
        setError("Failed to load FAQ data. It may have been deleted or you lack permissions.");
      } finally {
        setLoading(false);
      }
    };
    fetchFaq();
    // eslint-disable-next-line
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!title.trim() || !description.trim() || !category.trim()) {
      setError("Title, category, and description are required.");
      return;
    }

    setSaving(true);
    try {
      const token = localStorage.getItem("token");
      const payload = {
        title,
        category,
        description,
        tags: tags
          .split(",")
          .map((t) => t.trim())
          .filter((t) => t.length > 0),
      };
      await axios.put(
        `/api/faqs/${id}`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      alert("FAQ updated successfully!");
      navigate("/admin-dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update FAQ.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
        <p className="text-gray-200 text-lg">Loading FAQ...</p>
      </div>
    );
  }

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

      {/* Floating Card */}
      <div className="relative z-10 w-full max-w-2xl bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl p-6 md:p-8 animate-fade-in animate-float">
        <div className="flex items-center gap-2 mb-6">
          <span className="relative">
            <FaEdit className="text-3xl text-blue-600 animate-pulse" />
            <span className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur opacity-30"></span>
          </span>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Edit FAQ</h1>
        </div>

        {error && (
          <div className="text-red-600 text-center font-semibold mb-4">{error}</div>
        )}

        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          <div>
            <label className="block font-semibold text-blue-600 mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="block w-full rounded-xl border border-blue-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white/70 text-blue-900 font-semibold placeholder-blue-400"
              placeholder="Enter FAQ title"
              required
            />
          </div>

          <div>
            <label className="block font-semibold text-emerald-600 mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="block w-full rounded-xl border border-emerald-300 p-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white/70 text-emerald-900 font-semibold"
              required
            >
              {FAQ_CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold text-fuchsia-600 mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              className="block w-full rounded-xl border border-fuchsia-300 p-2 focus:ring-2 focus:ring-fuchsia-500 focus:outline-none bg-white/70 text-fuchsia-900 font-semibold placeholder-fuchsia-400"
              placeholder="Enter detailed answer"
              required
            />
          </div>

          <div>
            <label className="block font-semibold text-purple-600 mb-1">
              Tags <span className="text-gray-400 text-xs">(comma separated)</span>
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="block w-full rounded-xl border border-purple-300 p-2 focus:ring-2 focus:ring-purple-500 focus:outline-none bg-white/70 text-purple-900 font-semibold placeholder-purple-400"
              placeholder="e.g. registration, login, faq"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full bg-gradient-to-r from-blue-600 to-fuchsia-600 text-white py-2 rounded-xl font-semibold text-lg shadow hover:from-blue-700 hover:to-pink-500 transition disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
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

export default EditFaq;
