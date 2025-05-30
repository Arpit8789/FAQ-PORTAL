import React, { useState } from "react";
import { FaChevronDown, FaChevronUp, FaTag } from "react-icons/fa";

// Map categories to color classes
const CATEGORY_COLORS = {
  "Sales & Support": "bg-blue-100 text-blue-700",
  "Cloud Services": "bg-cyan-100 text-cyan-700",
  "Project Management": "bg-yellow-100 text-yellow-700",
  "Security": "bg-red-100 text-red-700",
  "QA & Testing": "bg-fuchsia-100 text-fuchsia-700",
  "Business Solutions": "bg-emerald-100 text-emerald-700",
  "General": "bg-green-100 text-green-700"
};

const FaqCard = ({ faq }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => setExpanded((exp) => !exp);

  // Show first 150 chars of description when collapsed
  const shortDesc =
    faq.description.length > 150
      ? faq.description.slice(0, 150) + "..."
      : faq.description;

  return (
    <article className="bg-white/90 backdrop-blur-xl shadow-xl rounded-2xl p-5 mb-4 cursor-pointer hover:shadow-2xl hover:-translate-y-1 transition-all duration-200">
      <header
        onClick={toggleExpanded}
        className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2"
        aria-expanded={expanded}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") toggleExpanded();
        }}
      >
        <h3 className="text-lg sm:text-xl font-bold text-gray-800">{faq.title}</h3>
        <span
          className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide shadow-sm ${
            CATEGORY_COLORS[faq.category] || "bg-gray-200 text-gray-700"
          }`}
        >
          {faq.category}
        </span>
      </header>
      <div
        className={`mt-3 text-gray-700 leading-relaxed transition-all duration-300 ${
          expanded ? "max-h-[1000px]" : "max-h-20 overflow-hidden"
        }`}
        aria-hidden={!expanded}
      >
        {expanded ? faq.description : shortDesc}
      </div>
      {faq.tags && faq.tags.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {faq.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 text-xs px-2 py-0.5 rounded-full"
            >
              <FaTag className="text-blue-400" /> {tag}
            </span>
          ))}
        </div>
      )}
      <button
        onClick={toggleExpanded}
        aria-label={expanded ? "Collapse answer" : "Expand answer"}
        className="mt-3 text-blue-600 font-semibold hover:underline flex items-center focus:outline-none"
      >
        {expanded ? (
          <>
            Collapse <FaChevronUp className="ml-1" />
          </>
        ) : (
          <>
            Read More <FaChevronDown className="ml-1" />
          </>
        )}
      </button>
    </article>
  );
};

export default FaqCard;
