import React, { useState, useEffect, forwardRef } from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = forwardRef(
  ({ value, onChange, placeholder = "Search FAQs...", autoFocus = false }, ref) => {
    const [inputValue, setInputValue] = useState(value || "");

    useEffect(() => {
      setInputValue(value || "");
    }, [value]);

    useEffect(() => {
      const handler = setTimeout(() => {
        onChange(inputValue);
      }, 300);
      return () => clearTimeout(handler);
    }, [inputValue, onChange]);

    return (
      <div className="relative w-full max-w-md">
        <label htmlFor="faq-search" className="sr-only">
          Search FAQs
        </label>
        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400 pointer-events-none" />
        <input
          ref={ref}
          id="faq-search"
          type="search"
          className="w-full border border-blue-200 bg-white/70 backdrop-blur-md rounded-xl py-2 pl-10 pr-10 text-blue-900 font-semibold placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow transition"
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          autoComplete="off"
        />
        {inputValue && (
          <button
            onClick={() => setInputValue("")}
            aria-label="Clear search"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-full w-7 h-7 flex items-center justify-center transition"
            tabIndex={0}
          >
            &#10005;
          </button>
        )}
      </div>
    );
  }
);

export default SearchBar;
