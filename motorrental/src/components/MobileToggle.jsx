import React from "react";

const MobileToggle = ({ setMenuOpen, menuOpen }) => {
  return (
    <>
      {/* Mobile nav toggle */}
      <div className="md:hidden">
        <button onClick={() => setMenuOpen((prev) => !prev)}>
          <svg
            className="w-6 h-6 text-[#0f172a]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>
    </>
  );
};

export default MobileToggle;
