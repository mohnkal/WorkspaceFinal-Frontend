import React, { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleMenuToggler = () => [setIsMenuOpen(!isMenuOpen)];
  return (
    <nav>
      <a href="/" className="flex items-center gap-2 text-2xl">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="29"
          height="30"
          viewBox="0 0 29 30"
          fill="none"
        >
          <circle cx="12.0143" cy="12.5143" r="12.0143" fill="#3575E2" fillOpacity={0.4} />
          <circle cx="16.9857" cy="17.4857" r="12.0143" fill="#3575E2" />
        </svg>
        <span>WorkSpace</span>
      </a>
    </nav>
  );
};

export default Navbar;
