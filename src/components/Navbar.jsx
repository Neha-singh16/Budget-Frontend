
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../utils/menuSlice";
import { removeUser } from "../utils/userSlice";
import { USER } from "../utils/constant";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const user = useSelector((s) => s.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Toggle sidebar
  const ToggleMenuHandler = () => dispatch(toggleMenu());

  // Handle logout
  const handleLogout = async () => {
    try {
      await axios.post(
        USER + "/logout",
        {},
        { withCredentials: true }
      );
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  // Close dropdown on outside click
  useEffect(() => {
    const onBodyClick = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", onBodyClick);
    return () =>
      document.removeEventListener("mousedown", onBodyClick);
  }, []);

  // Auto‑close dropdown after 5 seconds
  useEffect(() => {
    if (!dropdownOpen) return;
    const timer = setTimeout(() => setDropdownOpen(false), 5000);
    return () => clearTimeout(timer);
  }, [dropdownOpen]);

  return (
    <nav className="bg-[#2F4156] text-white shadow-md px-6 py-3 flex justify-between items-center">
      {/* Left: Hamburger + Title */}
      <div className="flex items-center space-x-4">
        <button
          onClick={ToggleMenuHandler}
          aria-label="Toggle sidebar"
          className="focus:outline-none"
        >
          <svg
            className="w-7 h-7 text-[#F5EFEB]"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              d="M4 6h16M4 12h16M4 18h16"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <span className="text-2xl font-bold tracking-wide">
          BudgetBuddy
        </span>
      </div>

      {/* Right: Welcome + Profile Dropdown */}
      {user && (
        <div
          ref={dropdownRef}
          className="relative flex items-center space-x-3"
        >
          <span className="text-sm opacity-80">
            Welcome back, {user.firstName}
          </span>

          {/* Avatar */}
          <img
            src={user.photoUrl}
            alt="Profile"
            className="w-10 h-10 rounded-full border-2 border-[#C8D9E6] cursor-pointer"
            onClick={() => setDropdownOpen((o) => !o)}
          />

          {/* Pointer Arrow */}
          {dropdownOpen && (
            <div
              className="absolute right-3 top-[calc(100%+4px)] w-0 h-0
                         border-l-8 border-r-8 border-b-8
                         border-l-transparent border-r-transparent
                         border-b-[#F1F5F9]"
            />
          )}

          {/* Dropdown Menu */}
          <div
            className={`absolute right-0 mt-36 w-44
                        bg-[rgb(231,238,245)] text-[#2F4156]
                        border border-[#C8D9E6] rounded-lg
                        shadow-lg overflow-hidden
                        transform transition-all origin-top-right
                        z-50
                        ${
                          dropdownOpen
                            ? "opacity-100 scale-100"
                            : "opacity-0 scale-95 pointer-events-none"
                        }`}
          >
            <ul>
              <li>
                <button
                  type="button"
                  className="w-full text-left px-4 py-2
                             hover:bg-[#567C8D] hover:text-white
                             transition"
                  onClick={() => {
                    setDropdownOpen(false);
                    navigate("/app/password");
                  }}
                >
                 Change Password
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="w-full text-left px-4 py-2
                             hover:bg-[#567C8D] hover:text-white
                             transition"
                  onClick={() => {
                    setDropdownOpen(false);
                    handleLogout();
                  }}
                >
                  Log Out
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;


// // src/components/Navbar.jsx
// import React, { useState, useEffect, useRef } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { toggleMenu } from "../utils/menuSlice";
// import { removeUser } from "../utils/userSlice";
// import { USER } from "../utils/constant";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const Navbar = () => {
//   const user = useSelector((s) => s.user);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const dropdownRef = useRef(null);

//   // Toggle sidebar
//   const ToggleMenuHandler = () => dispatch(toggleMenu());

//   // Handle logout
//   const handleLogout = async () => {
//     try {
//       await axios.post(
//         USER + "/logout",
//         {},
//         { withCredentials: true }
//       );
//       dispatch(removeUser());
//       navigate("/login");
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // Close dropdown on outside click
//   useEffect(() => {
//     const onBodyClick = (e) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(e.target)
//       ) {
//         setDropdownOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", onBodyClick);
//     return () =>
//       document.removeEventListener("mousedown", onBodyClick);
//   }, []);

//   // Auto‑close dropdown after 5 seconds
//   useEffect(() => {
//     if (!dropdownOpen) return;
//     const timer = setTimeout(() => setDropdownOpen(false), 5000);
//     return () => clearTimeout(timer);
//   }, [dropdownOpen]);

//   return (
//     <nav className="bg-[#2F4156] text-white shadow-md px-6 py-3 flex justify-between items-center">
//       {/* Left: Hamburger + Title */}
//       <div className="flex items-center space-x-4">
//         <button
//           onClick={ToggleMenuHandler}
//           aria-label="Toggle sidebar"
//           className="focus:outline-none"
//         >
//           <svg
//             className="w-7 h-7 text-[#F5EFEB]"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             viewBox="0 0 24 24"
//           >
//             <path
//               d="M4 6h16M4 12h16M4 18h16"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             />
//           </svg>
//         </button>
//         <span className="text-2xl font-bold tracking-wide">
//           BudgetBuddy
//         </span>
//       </div>

//       {/* Right: Welcome + Profile Dropdown */}
//       {user && (
//         <div
//           ref={dropdownRef}
//           className="relative flex items-center space-x-3"
//         >
//           <span className="text-sm opacity-80">
//             Welcome back, {user.firstName}
//           </span>

//           {/* Avatar */}
//           <img
//             src={user.photoUrl}
//             alt="Profile"
//             className="w-10 h-10 rounded-full border-2 border-[#C8D9E6] cursor-pointer"
//             onClick={() => setDropdownOpen((o) => !o)}
//           />

//           {/* Dropdown Menu */}
//           <div
//             className={`absolute right-0 mt-36 w-44
//                         bg-[rgb(231,238,245)] text-[#2F4156]
//                         border border-[#C8D9E6] rounded-lg
//                         shadow-lg overflow-hidden
//                         transform transition-all origin-top-right
//                         z-50
//                         ${
//                           dropdownOpen
//                             ? "opacity-100 scale-100"
//                             : "opacity-0 scale-95 pointer-events-none"
//                         }`}
//           >
//             <ul>
//               <li>
//                 <button
//                   type="button"
//                   className="w-full text-left px-4 py-2
//                              hover:bg-[#567C8D] hover:text-white
//                              transition"
//                   onClick={() => {
//                     setDropdownOpen(false);
//                     navigate("/app/password");
//                   }}
//                 >
//                   Change Password
//                 </button>
//               </li>
//               <li>
//                 <button
//                   type="button"
//                   className="w-full text-left px-4 py-2
//                              hover:bg-[#567C8D] hover:text-white
//                              transition"
//                   onClick={() => {
//                     setDropdownOpen(false);
//                     handleLogout();
//                   }}
//                 >
//                   Log Out
//                 </button>
//               </li>
//             </ul>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;
