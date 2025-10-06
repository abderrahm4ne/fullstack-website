import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  const handleSearchClick = () => {
    if (searchOpen && searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    } else {
      setSearchOpen(!searchOpen);
    }
  };

  return (
    <div className="flex flex-col">

      <div className="w-full bg-gradient-to-r from-[#1a1a1a] via-[#2c0101] to-black flex flex-row items-center py-3 xl:px-20 md:px-7 px-5 justify-between border-b border-[#f8f3e9]">

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
          {/* Search Field */}
          {searchOpen && (
            <div className="mr-4 transition-all duration-300 ease-in-out">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleSearch}
                autoFocus
                className="px-4 py-2 rounded-full bg-transparent border border-[#f8f3e9] text-[#f8f3e9] placeholder-[#f8f3e9] focus:outline-none focus:ring-2 focus:ring-[#f8f3e9] w-48 md:w-64 transition-all duration-300"
              />
            </div>
          )}

          <NavLink to="CompleteYourOrder"> 
            <ShoppingCartIcon style={{ fontSize: '2.1rem' }} className="creamy cursor-pointer routes"/>
          </NavLink>
          
          <SearchIcon 
            style={{ fontSize: '2.1rem' }} 
            onClick={handleSearchClick}
            className="creamy cursor-pointer routes" 
          />

          <button className="sm:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <CloseIcon style={{ fontSize: '2.1rem' }} className="creamy cursor-pointer routes" />
            ) : (
              <MenuIcon style={{ fontSize: '2.1rem' }} className="creamy cursor-pointer routes" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="sm:hidden bg-gradient-to-r from-[#1a1a1a] via-[#2c0101] to-black border-b flex flex-col">
          {/* Mobile Search Field */}
          <div className="px-4 py-3 border-b">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && searchQuery.trim()) {
                  navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
                  setMenuOpen(false);
                  setSearchQuery("");
                }
              }}
              className="w-full px-4 py-2 rounded-full bg-transparent border border-[#f8f3e9] text-[#f8f3e9] placeholder-[#f8f3e9] focus:outline-none focus:ring-2 focus:ring-[#f8f3e9]"
            />
          </div>
          
          <NavLink to="" className="font-bold ham-menu text-center font-routes creamy text-[1rem] py-3 border-b w-full" onClick={() => setMenuOpen(false)}>HOME</NavLink>
          <NavLink to="products" className="font-bold ham-menu text-center font-routes creamy text-[1rem] py-3 border-b w-full" onClick={() => setMenuOpen(false)}>PRODUCTS</NavLink>
          <NavLink to="about-us" className="font-bold ham-menu text-center font-routes creamy text-[1rem] py-3 border-b w-full" onClick={() => setMenuOpen(false)}>ABOUT US</NavLink>
          <NavLink to="contact" className="font-bold ham-menu text-center font-routes creamy text-[1rem] py-3 w-full" onClick={() => setMenuOpen(false)}>CONTACT</NavLink>
        </div>
      )}

      <Outlet />

      <div className="w-full bg-[#130101] text-white text-center py-5.5 text-xl font-routes flex flex-col items-center justify-center">
        &copy; {new Date().getFullYear()} Nadzheee. All rights reserved.
        <h3 className="text-lg">Nadzhee is a fictional brand created for educational purposes.</h3>
        <h3 className="text-lg">All product names, logos, and brands are property of their respective owners.</h3>
      </div>
    </div>
  );
}