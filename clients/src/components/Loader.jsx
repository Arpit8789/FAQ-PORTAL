import React from "react";

const Loader = ({
  size = 8, // Tailwind size (8 = h-8 w-8)
  color = "from-blue-500 via-fuchsia-500 to-blue-400", // Tailwind gradient
  label = "Loading..."
}) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <svg
        className={`animate-spin mx-auto h-${size} w-${size}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 44 44"
        aria-label={label}
        role="img"
      >
        <defs>
          <linearGradient id="loader-gradient" x1="0" y1="0" x2="44" y2="44" gradientUnits="userSpaceOnUse">
            <stop stopColor="#3b82f6" />
            <stop offset="1" stopColor="#a21caf" />
          </linearGradient>
        </defs>
        <circle
          className="opacity-20"
          cx="22"
          cy="22"
          r="20"
          stroke="url(#loader-gradient)"
          strokeWidth="4"
          fill="none"
        />
        <path
          className="opacity-80"
          fill="url(#loader-gradient)"
          d="M22 2a20 20 0 0117.32 10.01l-3.46 2A16 16 0 0022 6V2z"
        />
      </svg>
      <span className="sr-only">{label}</span>
    </div>
  );
};

export default Loader;
