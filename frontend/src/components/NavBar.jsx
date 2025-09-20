import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex flex-col ">

      <div className="w-full bg-gradient-to-r from-[#1a1a1a] via-[#2c0101] to-black flex flex-row items-center py-3 xl:px-20 md:px-7 px-5  justify-between border-b border-[#f8f3e9] ">

        {/* Left - Logo */}
        <div className="flex-1 flex justify-start tracking-wider">

          <div className="xl:text-6xl text-5xl font-logo creamy"
          style={{ textShadow: '-3px 3px 6px rgba(0, 0, 0, 0.8)' }}>
            Nadzheee
          </div>

        </div>

        {/* Center - Navigation Links */}
        <div className="flex-1 flex justify-center">
          <div className="hidden sm:flex md:space-x-3.5 space-x-2">

            <NavLink to="" className="routes font-routes creamy xl:text-[1.2rem] sm:text-[1.1rem] text-[1rem]">HOME</NavLink>
            <NavLink to="products" className="routes font-routes creamy xl:text-[1.2rem] sm:text-[1.1rem] text-[1rem]">PRODUCTS</NavLink>
            <NavLink to="about-us" className="text-center routes font-routes creamy xl:text-[1.2rem] sm:text-[1.1rem] text-[1rem]">ABOUT US</NavLink>
            <NavLink to="contact" className="routes font-routes creamy xl:text-[1.2rem] sm:text-[1.1rem] text-[1rem]">CONTACT</NavLink>

          </div>
        </div>

        {/* Right - Icons */}
        <div className="flex-1 flex justify-end items-center space-x-3">

          <ShoppingCartIcon style={{ fontSize: '2.1rem' }}  className=" creamy cursor-pointer routes" />
          <SearchIcon style={{ fontSize: '2.1rem' }} className=" creamy cursor-pointer routes" />

          <button className="sm:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <CloseIcon style={{ fontSize: '2.1rem' }} className=" creamy cursor-pointer routes" />
            ) : (
              <MenuIcon style={{ fontSize: '2.1rem' }} className=" creamy cursor-pointer routes" />
            )}
          </button>

        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="sm:hidden bg-gradient-to-r from-[#1a1a1a] via-[#2c0101] to-black border-b flex flex-col ">
          <NavLink to="home" className="font-bold ham-menu text-center font-routes text-black  brand-red text-[1rem] py-3 border-b w-full" onClick={() => setMenuOpen(false)}>HOME</NavLink>
          <NavLink to="products" className="font-bold ham-menu text-center font-routes  brand-red text-[1rem] py-3 border-b w-full" onClick={() => setMenuOpen(false)}>PRODUCTS</NavLink>
          <NavLink to="about" className="font-bold ham-menu text-center font-routes  brand-red text-[1rem] py-3 border-b w-full" onClick={() => setMenuOpen(false)}>ABOUT US</NavLink>
          <NavLink to="contact" className="font-bold ham-menu text-center font-routes  brand-red text-[1rem] py-3 w-full" onClick={() => setMenuOpen(false)}>CONTACT</NavLink>
        </div>
      )}

      <Outlet />

      <div className="w-full bg-[#130101] text-white text-center py-4 text-xl font-routes">
        Nadzheee is an Algerian brand © 2025.
      </div>

      </div>
  );
}