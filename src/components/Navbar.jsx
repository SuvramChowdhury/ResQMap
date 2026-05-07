const Navbar = () => {
  return (
    <>
      {/* Main navbar */}
      <div className="flex justify-between items-center px-4 py-2.5 bg-gray-900 border-b border-white/5">
        {/* Logo */}
        <svg
          width="140"
          height="36"
          viewBox="0 0 160 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="20"
            cy="20"
            r="14"
            stroke="#EF4444"
            strokeWidth="1.5"
            strokeDasharray="4 2"
            opacity="0.6"
          />
          <path
            d="M20 8C15.5817 8 12 11.5817 12 16C12 21 20 30 20 30C20 30 28 21 28 16C28 11.5817 24.4183 8 20 8Z"
            fill="#EF4444"
          />
          <circle cx="20" cy="16" r="3" fill="white" />
          <text
            x="44"
            y="26"
            fontFamily="Inter, system-ui, sans-serif"
            fontSize="20"
            fontWeight="800"
            fill="#FFFFFF"
            letterSpacing="-0.02em"
          >
            ResQ
          </text>
          <text
            x="96"
            y="26"
            fontFamily="Inter, system-ui, sans-serif"
            fontSize="20"
            fontWeight="300"
            fill="#9CA3AF"
            letterSpacing="-0.02em"
          >
            Map
          </text>
        </svg>

        {/* Tagline — all screen sizes, bigger on desktop */}
        <p className="text-base md:text-base font-semibold text-gray-400 tracking-wide">
          See It. Report It. Save Someone.
        </p>
      </div>
    </>
  );
};

export default Navbar;
