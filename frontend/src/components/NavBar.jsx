import { useState } from "react";
import { NavLink } from "react-router-dom";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen ">

      <div className="w-full bg-primary flex flex-row items-center py-3 px-20 justify-between border-b">

        {/* Left - Logo */}
        <div className="flex-1 flex justify-start tracking-wider">
          <div className="text-5xl font-bold font-logo brand-red">// // //</div>
        </div>

        {/* Center - Navigation Links */}
        <div className="flex-1 flex justify-center">
          <div className="hidden md:flex space-x-3.5">

            <NavLink to="#" className="font-bold routes font-routes text-black text-[1.1rem]">HOME</NavLink>
            <NavLink to="#" className="font-bold routes font-routes text-black text-[1.1rem]">PRODUCTS</NavLink>
            <NavLink to="#" className="font-bold routes font-routes text-black text-[1.1rem]">ABOUT US</NavLink>
            <NavLink to="#" className="font-bold routes font-routes text-black text-[1.1rem]">CONTACT</NavLink>

            
          </div>
        </div>

        {/* Right - Icons */}
        <div className="flex-1 flex justify-end items-center space-x-3">
          
          <ShoppingCartIcon style={{ fontSize: '1.9rem' }}  className="text-black cursor-pointer routes" />
          <SearchIcon style={{ fontSize: '1.9rem' }} className="text-black cursor-pointer routes" />

        </div>
      </div>

      

      </div>
  );
}