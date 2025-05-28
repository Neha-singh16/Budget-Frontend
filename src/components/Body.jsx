

// import React from 'react';
// import { Outlet } from "react-router-dom";
// import Navbar from '../components/Navbar';
// import Footer from "../components/Footer";
// import Sidebar from '../components/Sidebar';

// const Body = () => {
//   return (
//     <>
//       <div className="flex min-h-screen">
//         {/* Sidebar */}
//         <Sidebar />

//         {/* Main content area: navbar + page content + footer */}
//         <div className="flex flex-col flex-grow">
//           <Navbar />
//           <main className="flex-grow overflow-auto p-4">
//             <Outlet />
//           </main>
//           <Footer />
//         </div>
//       </div>
//     </>
//   );
// };

// export default Body;

import React from 'react';
import { Outlet } from "react-router-dom";
import Navbar from '../components/Navbar';
import Footer from "../components/Footer";
import Sidebar from '../components/Sidebar';
import { useSelector } from 'react-redux';

const Body = () => {
  const isMenuOpen = useSelector((state) => state.menu.isMenuOpen);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Navbar spans full width */}
      <Navbar />

      {/* Main content layout: Sidebar + Main content */}
      <div className="flex flex-grow overflow-hidden">
        {/* Sidebar */}
        <div
          className={`transition-all duration-400 ease-in-out ${
            isMenuOpen ? 'w-64' : 'w-0'
          }`}
        >
          <Sidebar />
        </div>

        {/* Page Content */}
        <div className="flex flex-col flex-grow">
          <main className="flex-grow overflow-auto transition-all duration-300">
            <Outlet />
          </main>

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Body;
