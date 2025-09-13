import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen ">

      <div className="w-full bg-primary flex flex-row items-center py-4 px-6 justify-between border-b">

        {/* Left - Logo */}
        <div className="flex-1 flex justify-start">
          <div className="text-5xl font-bold font-logo c-red">/////</div>
        </div>

        {/* Center - Navigation Links */}
        <div className="flex-1 flex justify-center">
          <div className="hidden md:flex space-x-3.5">

            <NavLink to="#" className="font-bold font-routes text-routes text-sm">HOME</NavLink>
            <NavLink to="#" className="font-bold font-routes text-routes text-sm">PRODUCTS</NavLink>
            <NavLink to="#" className="font-bold font-routes text-routes text-sm">ABOUT US</NavLink>
            <NavLink to="#" className="font-bold font-routes text-routes text-sm">CONTACT</NavLink>

            
          </div>
        </div>

        {/* Right - Icons */}
        <div className="flex-1 flex justify-end items-center space-x-6">
        
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-800 px-6 py-4 space-y-4 border-b border-gray-700">
          <NavLink to="#" className="font-bold font-routes text-routes text-sm">HOME</NavLink>
          <NavLink to="#" className="font-bold font-routes text-routes text-sm">PRODUCTS</NavLink>
          <NavLink to="#" className="font-bold font-routes text-routes text-sm">ABOUT US</NavLink>
          <NavLink to="#" className="font-bold font-routes text-routes text-sm">CONTACT</NavLink>
        </div>
      )}

      </div>
  );
}