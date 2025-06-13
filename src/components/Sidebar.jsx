import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  FaTachometerAlt,
  FaPlusCircle,
  FaListUl,
  FaUserCircle,
} from "react-icons/fa";

const Sidebar = () => {
  const isMenuOpen = useSelector((store) => store.menu.isMenuOpen);
  if (!isMenuOpen) return null;

  return (
    <div
      className={`
        fixed
        top-16
        left-0
        h-[calc(100vh-4rem)]   /* Viewport height minus navbar height */
        w-64
        bg-[#2F4156]
        text-[#F5EFEB]
        z-50
        overflow-y-auto
        shadow-2xl
      `}
    >
      <div className="p-6">
        <nav className="space-y-4">
          <SidebarLink to="/app/dashboard" icon={<FaTachometerAlt />} label="Dashboard" />
          <SidebarLink to="/app/budget" icon={<FaListUl />} label="Budget" />
          <SidebarLink to="/app/expense" icon={<FaPlusCircle />} label="Add Expense" />
          <SidebarLink to="/app/profile" icon={<FaUserCircle />} label="Profile" />
        </nav>
      </div>
    </div>
  );
};

const SidebarLink = ({ to, icon, label }) => (
  <Link to={to}>
    <div className="flex items-center gap-3 hover:bg-[#3A536E] px-4 py-2 rounded-lg transition duration-200">
      <span className="text-[#C8D9E6]">{icon}</span>
      <span className="text-[#C8D9E6] font-medium">{label}</span>
    </div>
  </Link>
);

export default Sidebar;



// import React from "react";
// import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";
// import {
//   FaTachometerAlt,
//   FaPlusCircle,
//   FaListUl,
//   FaUserCircle,
// } from "react-icons/fa";

// const Sidebar = () => {
//   const isMenuOpen = useSelector((store) => store.menu.isMenuOpen);
//   if (!isMenuOpen) return null;

//   return (
//     <div
//       className={`
//         fixed 
//         top-16             /* push it down 4rem (64px) beneath a navbar */
//         bottom-0           /* stretch to bottom of viewport */
//         left-0 
//         w-64 
//         bg-[#2F4156] 
//         text-[#F5EFEB] 
//         shadow-2xl 
//         overflow-y-auto    /* allow the sidebar itself to scroll if needed */
//         z-50
//       `}
//     >
//       <div className="p-6">
//         <nav className="space-y-4">
//           <Link to="/app/dashboard">
//             <div className="flex items-center gap-3 hover:bg-[#3A536E] px-4 py-2 rounded-lg transition duration-200">
//               <FaTachometerAlt className="text-[#C8D9E6]" />
//               <span className="text-[#C8D9E6] font-medium">Dashboard</span>
//             </div>
//           </Link>

//           <Link to="/app/budget">
//             <div className="flex items-center gap-3 hover:bg-[#3A536E] px-4 py-2 rounded-lg transition duration-200">
//               <FaListUl className="text-[#C8D9E6]" />
//               <span className="text-[#C8D9E6] font-medium">Budget</span>
//             </div>
//           </Link>

//           <Link to="/app/expense">
//             <div className="flex items-center gap-3 hover:bg-[#3A536E] px-4 py-2 rounded-lg transition duration-200">
//               <FaPlusCircle className="text-[#C8D9E6]" />
//               <span className="text-[#C8D9E6] font-medium">Add Expense</span>
//             </div>
//           </Link>

//           <Link to="/app/profile">
//             <div className="flex items-center gap-3 hover:bg-[#3A536E] px-4 py-2 rounded-lg transition duration-200">
//               <FaUserCircle className="text-[#C8D9E6]" />
//               <span className="text-[#C8D9E6] font-medium">Profile</span>
//             </div>
//           </Link>
//         </nav>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;
