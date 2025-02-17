import React from "react";
import Logo from "../Logo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center p-2 bg-gray-300">
      {/* Logo Section */}
      <img className="w-[110px] ml-10" src={Logo} alt="FilmVault Logo" />

      {/* Navigation Links */}
      <div className="flex space-x-10 mr-10 font-semibold text-lg">
        <Link to="/" className="text-black hover:text-blue-500">
          Home
        </Link>
        <Link to="/Watchlist" className="text-black hover:text-blue-500">
          Watchlist
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
