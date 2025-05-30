// services/faqService.js
import authService from "./authService";

// Determine base API URL depending on environment
const BASE_API_URL =
  import.meta.env.MODE === "development"
    ? "/api"
    : "https://faq-portal.onrender.com/api"; // <-- Replace with your actual Render backend URL

const API_BASE = `${BASE_API_URL}/faqs`;

const getAuthHeaders = () => {
  const token = authService.getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const faqService = {
  getFaqs: async () => {
    const response = await fetch(API_BASE);
    if (!response.ok) throw new Error("Failed to fetch FAQs");
    return await response.json();
  },

  getFaqById: async (id) => {
    const response = await fetch(`${API_BASE}/${id}`);
    if (!response.ok) throw new Error("Failed to fetch FAQ");
    return await response.json();
  },

  createFaq: async (faqData) => {
    const response = await fetch(API_BASE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
      body: JSON.stringify(faqData),
    });
    if (!response.ok) throw new Error("Failed to create FAQ");
    return await response.json();
  },

  updateFaq: async (id, faqData) => {
    const response = await fetch(`${API_BASE}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
      body: JSON.stringify(faqData),
    });
    if (!response.ok) throw new Error("Failed to update FAQ");
    return await response.json();
  },

  deleteFaq: async (id) => {
    const response = await fetch(`${API_BASE}/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error("Failed to delete FAQ");
  },
};

export default faqService;
