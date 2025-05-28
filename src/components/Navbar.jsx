import React, { useState } from "react";
import { toggleMenu } from "../utils/menuSlice";
import { useDispatch } from "react-redux";


const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
const dispatch = useDispatch();

  const ToggleMenuHandler = () => {
    dispatch(toggleMenu());
  }

  return (
    <nav className="bg-[#2F4156] text-white shadow-md px-8 py-3 flex justify-between items-center">
      {/* Hamburger + App Title */}
      <div className="flex items-center space-x-6">
         
        {/* Hamburger button */}
        <button
        //   onClick={toggleSidebar}
          className="focus:outline-none"
          aria-label="Toggle sidebar"
          onClick={ToggleMenuHandler}
        >
          {/* Hamburger icon */}
          <svg
            className="w-8 h-8 text-[#F5EFEB]"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
           
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>

        {/* App Title */}
       <div className="text-2xl font-bold text-[#F5EFEB] tracking-wide">
          BudgetBuddy
        </div>
      </div>

      {/* Profile Image + Dropdown */}
      <div className="relative">
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onMouseEnter={() => setDropdownOpen(true)}
          onMouseLeave={() => setDropdownOpen(false)}
        >
          <img
            src="https://i.pravatar.cc/150?img=8"
            alt="profile"
            className="w-10 h-10 rounded-full border-2 border-[#C8D9E6] object-cover"
          />
          {/* You can enable the dropdown arrow here if you want */}
          {/* <FiChevronDown className="text-[#C8D9E6]" /> */}
        </div>

        {/* Dropdown Menu */}
        {dropdownOpen && (
          <div
            className="absolute right-0 mt-2 w-40 bg-[#567C8D] text-white border border-[#C8D9E6] rounded-md shadow-lg z-50"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <ul className="py-2">
              <li className="px-4 py-2 hover:bg-[#C8D9E6] hover:text-[#2F4156] cursor-pointer">
                Profile
              </li>
              <li className="px-4 py-2 hover:bg-[#C8D9E6] hover:text-[#2F4156] cursor-pointer">
                Log Out
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
