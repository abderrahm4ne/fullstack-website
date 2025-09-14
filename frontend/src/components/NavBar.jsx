import { useState } from "react";
import { NavLink } from "react-router-dom";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen ">

      <div className="w-full bg-primary flex flex-row items-center py-3 xl:px-20 md:px-7 px-5  justify-between border-b">

        {/* Left - Logo */}
        <div className="flex-1 flex justify-start tracking-wider">
          <div className="xl:text-6xl text-5xl font-bold font-logo brand-red">// // //</div>
        </div>

        {/* Center - Navigation Links */}
        <div className="flex-1 flex justify-center">
          <div className="hidden sm:flex md:space-x-3.5 space-x-2">

            <NavLink to="#" className="font-bold routes font-routes text-black xl:text-[1.3rem] sm:text-[1.1rem] text-[1rem]">HOME</NavLink>
            <NavLink to="#" className="font-bold routes font-routes text-black xl:text-[1.3rem] sm:text-[1.1rem] text-[1rem]">PRODUCTS</NavLink>
            <NavLink to="#" className="font-bold text-center routes font-routes text-black xl:text-[1.3rem] sm:text-[1.1rem] text-[1rem]">ABOUT US</NavLink>
            <NavLink to="#" className="font-bold routes font-routes text-black xl:text-[1.3rem] sm:text-[1.1rem] text-[1rem]">CONTACT</NavLink>

          </div>
        </div>

        {/* Right - Icons */}
        <div className="flex-1 flex justify-end items-center space-x-3">

          <ShoppingCartIcon style={{ fontSize: '2.1rem' }}  className="text-black cursor-pointer routes" />
          <SearchIcon style={{ fontSize: '2.1rem' }} className="text-black cursor-pointer routes" />

          <button className="sm:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <CloseIcon style={{ fontSize: '2.1rem' }} className="text-black cursor-pointer routes" />
            ) : (
              <MenuIcon style={{ fontSize: '2.1rem' }} className="text-black cursor-pointer routes" />
            )}
          </button>

        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="sm:hidden bg-secondary border-b flex flex-col ">
          <NavLink to="#" className="font-bold ham-menu text-center font-routes text-black text-[1.1rem] py-3 border-b w-full" onClick={() => setMenuOpen(false)}>HOME</NavLink>
          <NavLink to="#" className="font-bold ham-menu text-center font-routes text-black text-[1.1rem] py-3 border-b w-full" onClick={() => setMenuOpen(false)}>PRODUCTS</NavLink>
          <NavLink to="#" className="font-bold ham-menu text-center font-routes text-black text-[1.1rem] py-3 border-b w-full" onClick={() => setMenuOpen(false)}>ABOUT US</NavLink>
          <NavLink to="#" className="font-bold ham-menu text-center font-routes text-black text-[1.1rem] py-3 w-full" onClick={() => setMenuOpen(false)}>CONTACT</NavLink>
        </div>
      )}

      </div>
  );
}