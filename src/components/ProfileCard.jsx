import React from 'react';
import { Link } from 'react-router-dom';

const ProfileCard = () => {
  return (
    <div className="w-full max-w-md mx-auto bg-[#2F4156] rounded-2xl shadow-2xl overflow-hidden text-white">
      <div className="h-40 bg-[#567C8D] relative">
        <img
          className="w-35 h-35 rounded-full border-4 border-white absolute -bottom-14 left-1/2 transform -translate-x-1/2"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzfhy5lJVJrMrf-F-wqAInf-2dYq_3I60wWnU4McszvIDCHR7WDL_ci2XPBGotb7rS3Ms&usqp=CAU"
          alt="Profile"
        />
      </div>
      <div className="pt-25 px-15 pb-20 text-center">
        <h2 className="text-2xl font-bold">Stefan Salvatore</h2>
        <div className="flex justify-center gap-4 my-3">
          <span className="bg-[#567C8D] text-xs px-3 py-1 rounded-full">male</span>
          <span className="bg-[#567C8D] text-xs px-3 py-1 rounded-full">40 yrs</span>
        </div>
        <p className="text-sm text-[#C8D9E6] mb-4"></p>

        <div className="flex justify-center gap-6">
            <Link  to={"/"}>
          <button className="bg-[#F5EFEB] text-[#2F4156] font-semibold text-sm px-5 py-2 rounded-md hover:opacity-90">
            Home
         
          </button>
           </Link>
          
          <button className="bg-[#F5EFEB] text-[#2F4156] font-semibold text-sm px-5 py-2 rounded-md hover:opacity-90">
            Logout
          </button>
         
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
