// import React from "react";
// import { useSelector } from "react-redux";

// const Sidebar = () => {
//   const isMenuOpen = useSelector((store) => store.menu.isMenuOpen);

//   console.log("Sidebar open state:", isMenuOpen);
//   if (!isMenuOpen) return null;
//   return (
//     <div
//       className={`fixed top-15.5 left-0 h-full w-64 bg-[#2F4156] text-[#F5EFEB] shadow-lg transform transition-transform duration-300 ease-in-out z-50
        
//         `}
//     >
//       <div className="p-6">
//         <nav className="space-y-6">
//           {/* Dashboard */}
//           <div>
//             <h3 className="font-semibold mb-2 text-[#C8D9E6]">Dashboard</h3>
//           </div>

//           {/* Add Expense */}
//           <div>
//             <h3 className="font-semibold mb-2 text-[#C8D9E6]">Add Expense</h3>
//           </div>

//           {/* Categories */}
//           <div>
//             <h3 className="font-semibold mb-2 text-[#C8D9E6]">Categories</h3>
//           </div>

//           {/* Profile */}
//           <div>
//             <h3 className="font-semibold mb-2 text-[#C8D9E6]">Profile</h3>
//           </div>

//           {/* Auth/Login */}
//           <div>
//             <h3 className="font-semibold mb-2 text-[#C8D9E6]">UserAuth</h3>
//             <ul className="ml-4 space-y-1 text-sm"></ul>
//           </div>
//         </nav>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;


import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  FaTachometerAlt,
  FaPlusCircle,
  FaListUl,
  FaUserCircle,
  FaUserShield,
} from "react-icons/fa";

const Sidebar = () => {
  const isMenuOpen = useSelector((store) => store.menu.isMenuOpen);

  if (!isMenuOpen) return null;

  return (
    <div
      className={`fixed top-15.5 left-0 h-full w-64 bg-[#2F4156] text-[#F5EFEB] shadow-2xl z-50 transition-transform duration-300 ease-in-out`}
    >

      <div className="p-6">
     
        {/* <h2 className="text-xl font-bold text-center text-[#F5EFEB] mb-8 tracking-wide">
          💸BudgetBuddy
        </h2> */}
        <nav className="space-y-4">
          {/* Dashboard */}
          <Link to={"/app/dashboard"}>
          <div className="flex items-center gap-3 hover:bg-[#3A536E] px-4 py-2 rounded-lg cursor-pointer transition duration-200 ">
            <FaTachometerAlt className="text-[#C8D9E6]" />
            <span className="text-[#C8D9E6] font-medium">Dashboard</span>
          </div>
          </Link>

          {/* Add Expense */}
          <div className="flex items-center gap-3 hover:bg-[#3A536E] px-4 py-2 rounded-lg cursor-pointer transition duration-200">
            <FaPlusCircle className="text-[#C8D9E6]" />
            <span className="text-[#C8D9E6] font-medium">Add Expense</span>
          </div>

          {/* Categories */}
          <div className="flex items-center gap-3 hover:bg-[#3A536E] px-4 py-2 rounded-lg cursor-pointer transition duration-200">
            <FaListUl className="text-[#C8D9E6]" />
            <span className="text-[#C8D9E6] font-medium">Categories</span>
          </div>

          {/* Profile */}
             <Link to={"/app/profile"}>
          <div className="flex items-center gap-3 hover:bg-[#3A536E] px-4 py-2 rounded-lg cursor-pointer transition duration-200">
            <FaUserCircle className="text-[#C8D9E6]" />
         
            <span className="text-[#C8D9E6] font-medium">Profile</span>
          </div>
</Link>
          {/* User Auth */}
          <div className="flex items-center gap-3 hover:bg-[#3A536E] px-4 py-2 rounded-lg cursor-pointer transition duration-200">
            <FaUserShield className="text-[#C8D9E6]" />
            <span className="text-[#C8D9E6] font-medium">UserAuth</span>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
