import React from "react";

const FilterBar = ({ filters, selectedFilters, onFilterChange }) => {
  return (
    <div className="flex space-x-3 overflow-x-auto py-2 px-1">
      {filters.map((filter) => {
        const isSelected = selectedFilters.includes(filter);
        return (
          <button
            key={filter}
            onClick={() => onFilterChange(filter)}
            className={`whitespace-nowrap px-3 py-1 rounded-full border transition ${
              isSelected
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"
            }`}
            aria-pressed={isSelected}
          >
            {filter}
          </button>
        );
      })}
    </div>
  );
};

export default FilterBar;
