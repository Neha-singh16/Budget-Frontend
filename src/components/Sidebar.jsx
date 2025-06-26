

// src/components/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  FaTachometerAlt,
  FaPlusCircle,
  FaListUl,
  FaWallet,
  FaUserCircle,
} from 'react-icons/fa';

const Sidebar = () => {
  const isMenuOpen = useSelector((store) => store.menu.isMenuOpen);
  if (!isMenuOpen) return null;

  return (
    <div
      className="
        sticky
        top-16                /* 4rem down = height of your Navbar */
        left-0
        h-[calc(100vh-4rem)]  /* full viewport minus Navbar */
        w-64
        bg-[#2F4156]
        text-[#F5EFEB]
        z-50
        overflow-y-auto
        shadow-2xl
      "
    >
      <div className="p-6">
        <nav className="space-y-4">
          <SidebarLink to="/app/dashboard" icon={<FaTachometerAlt />} label="Dashboard" />
          <SidebarLink to="/app/budget"    icon={<FaListUl />}       label="Budget"    />
          <SidebarLink to="/app/expense"   icon={<FaPlusCircle />}   label="Add Expense"/>
          {/* NEW INCOME LINK */}
          <SidebarLink to="/app/income"    icon={<FaWallet />}        label="Income"    />
          {/* EXISTING PROFILE LINK */}
          <SidebarLink to="/app/profile"   icon={<FaUserCircle />}   label="Profile"   />
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


// // src/components/Sidebar.jsx
// import React from 'react';
// import { Link } from 'react-router-dom';
// import {
//   FaTachometerAlt,
//   FaPlusCircle,
//   FaListUl,
//   FaWallet,
//   FaUserCircle,
// } from 'react-icons/fa';

// const Sidebar = () => {
//   return (
//     <div className="h-full flex flex-col">
//       {/* Optional: add a logo/title at top */}
//       <div className="px-6 py-4">
//         <h2 className="text-xl font-bold text-[#F5EFEB]">BudgetBuddy</h2>
//       </div>
//       <nav className="flex-1 px-2 space-y-2 overflow-y-auto">
//         <SidebarLink to="/app/dashboard" icon={<FaTachometerAlt />} label="Dashboard" />
//         <SidebarLink to="/app/budget"    icon={<FaListUl />}       label="Budget"    />
//         <SidebarLink to="/app/expense"   icon={<FaPlusCircle />}   label="Add Expense"/>
//         <SidebarLink to="/app/income"    icon={<FaWallet />}        label="Income"    />
//         <SidebarLink to="/app/profile"   icon={<FaUserCircle />}   label="Profile"   />
//         {/* Add more links as needed */}
//       </nav>
//       {/* Optional footer or version info */}
//       <div className="px-4 py-3 text-xs text-gray-300">
//         {/* e.g.: “v1.0.0” or copyright */}
//       </div>
//     </div>
//   );
// };

// const SidebarLink = ({ to, icon, label }) => (
//   <Link to={to}>
//     <div className="flex items-center gap-3 text-[#C8D9E6] hover:bg-[#3A536E] px-4 py-2 rounded-lg transition duration-200">
//       <span className="text-lg">{icon}</span>
//       <span className="font-medium">{label}</span>
//     </div>
//   </Link>
// );

// export default Sidebar;
