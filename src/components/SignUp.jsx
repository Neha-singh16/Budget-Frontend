import React from "react";

const Signup = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5EFEB]">
      <div className="bg-white text-[#2F4156] rounded-2xl shadow-2xl p-10 w-full max-w-md border border-[#C8D9E6]">
        <h2 className="text-3xl font-bold mb-6 text-center text-[#2F4156]">Sign Up</h2>
        <form className="space-y-5">
          <div>
            <label className="block mb-1 text-sm text-[#567C8D]">First Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg bg-[#C8D9E6] text-[#2F4156] placeholder-[#567C8D] border border-[#C8D9E6] outline-none focus:ring-2 focus:ring-[#567C8D]"
              placeholder="Enter your first name"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm text-[#567C8D]">Last Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg bg-[#C8D9E6] text-[#2F4156] placeholder-[#567C8D] border border-[#C8D9E6] outline-none focus:ring-2 focus:ring-[#567C8D]"
              placeholder="Enter your last name"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm text-[#567C8D]">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 rounded-lg bg-[#C8D9E6] text-[#2F4156] placeholder-[#567C8D] border border-[#C8D9E6] outline-none focus:ring-2 focus:ring-[#567C8D]"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm text-[#567C8D]">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 rounded-lg bg-[#C8D9E6] text-[#2F4156] placeholder-[#567C8D] border border-[#C8D9E6] outline-none focus:ring-2 focus:ring-[#567C8D]"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full mt-4 bg-[#2F4156] text-white font-semibold py-2 rounded-lg hover:bg-[#567C8D] transition duration-300"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;

