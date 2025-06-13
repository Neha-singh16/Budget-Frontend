


// pages/Body.tsx
import React from 'react';
import { Outlet } from "react-router-dom";
import Navbar from '../components/Navbar';
import Footer from "../components/Footer";
import Sidebar from '../components/Sidebar';
import { useSelector } from 'react-redux';

const Body = () => {
  const isMenuOpen = useSelector((state) => state.menu.isMenuOpen);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 overflow-hidden">
      {/* Navbar */}
      <Navbar />

      <div className="flex flex-grow overflow-hidden">
        {/* Sidebar wrapper: width toggles between 0 and 16rem */}
        <div
          className={`flex flex-shrink-0
            ${isMenuOpen ? 'w-64' : 'w-0'}
            transition-all duration-300
          `}
        >
          <Sidebar />
        </div>

        {/* Main content: takes remaining space */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <main className="flex-1 overflow-auto">
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Body;

