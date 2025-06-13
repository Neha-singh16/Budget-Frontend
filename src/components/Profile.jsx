

// // src/components/ProfilePage.jsx
// import React, { useState, useEffect } from "react";
// import { Pencil, X, ArrowLeft } from "lucide-react";
// import { useDispatch, useSelector } from "react-redux";
// import { setUser } from "../utils/userSlice";
// import {USER} from "../utils/constant";

// export default function ProfilePage() {
//   const dispatch = useDispatch();
//   const user = useSelector((s) => s.user);
//   const [temp, setTemp] = useState(user || {});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [edit, setEdit] = useState(false);

//   useEffect(() => {
//     (async () => {
//       try {
//         const res = await fetch(`${USER}/profile/view`, {
//           credentials: "include",
//         });
//         if (!res.ok) throw new Error("Failed to load profile");
//         const data = await res.json();
//         const formatted = {
//           firstName: data.firstName || "",
//           lastName: data.lastName || "",
//           photoUrl: data.photoUrl || "https://i.pravatar.cc/600",
//           phoneNo: data.phoneNo?.toString() || "",
//           address: data.address || "",
//           dob: data.dob?.split("T")[0] || "",
//           email: data.email || "",
//         };
//         dispatch(setUser(formatted));
//         setTemp(formatted);
//       } catch (e) {
//         setError(e.message);
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, [dispatch]);

//   const onChange = (e) => {
//     setTemp({ ...temp, [e.target.name]: e.target.value });
//     setError(null);
//   };

//   const save = async () => {
//     try {
//       const body = {
//         firstName: temp.firstName,
//         lastName:  temp.lastName,
//         photoUrl:  temp.photoUrl,
//         phoneNo:   temp.phoneNo,
//         address:   temp.address,
//         dob:       temp.dob,
//       };
//       const res = await fetch(`${USER}/profile/update`, {
//         method:  "PATCH",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify(body),
//       });
//       if (!res.ok) throw new Error("Failed to update");
//       dispatch(setUser(temp));
//       setEdit(false);
//     } catch (e) {
//       setError(e.message);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="h-screen flex items-center justify-center bg-gradient-to-br from-[#EDEDED] to-[#F5F5F5]">
//         <p className="text-lg text-[#2F4156] animate-pulse">Loading profile…</p>
//       </div>
//     );
//   }
//   if (error) {
//     return (
//       <div className="h-screen flex flex-col items-center justify-center bg-[#F5EFEB]">
//         <p className="text-red-500 mb-4">{error}</p>
//         <button
//           onClick={() => window.location.reload()}
//           className="px-6 py-2 bg-[#2F4156] text-white rounded hover:bg-[#567C8D] transition"
//         >
//           Retry
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#F5EFEB] to-[#E0DAD1] p-8 flex items-center justify-center">
//       {/* <button
//         onClick={() => (window.location.href = "/")}
//         className="absolute top-6 left-6 flex items-center text-[#2F4156] hover:text-[#567C8D] space-x-2"
//       >
//         <ArrowLeft /> <span className="font-medium">Home</span>
//       </button> */}

//       <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full grid grid-cols-1 md:grid-cols-3 overflow-hidden">
//         {/* Left panel: full-cover background */}
//         <div className="relative h-64 md:h-auto md:col-span-1">
//           <div
//             className="absolute inset-0 bg-center bg-cover"
//             style={{ backgroundImage: `url(${user.photoUrl})` }}
//           />
//         </div>

//         {/* Right panel: info */}
//         <div className="col-span-2 p-8 space-y-6">
//           <div className="flex justify-between items-center">
//             <h1 className="text-3xl font-bold text-[#2F4156]">
//               {user.firstName || user.lastName
//                 ? `${user.firstName} ${user.lastName}`.trim()
//                 : "Your Name"}
//             </h1>
//             {edit ? (
//               <button
//                 onClick={() => {
//                   setTemp(user);
//                   setEdit(false);
//                   setError(null);
//                 }}
//                 className="text-red-500 hover:text-red-700 transition"
//               >
//                 <X size={24} />
//               </button>
//             ) : (
//               <button
//                 onClick={() => setEdit(true)}
//                 className="text-[#567C8D] hover:text-[#2F4156] transition"
//               >
//                 <Pencil size={24} />
//               </button>
//             )}
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {[
//               { label: "First Name", field: "firstName", type: "text" },
//               { label: "Last Name",  field: "lastName",  type: "text" },
//               { label: "Email",      field: "email",     type: "email", disabled: true },
//               { label: "Phone No",   field: "phoneNo",   type: "tel" },
//               { label: "Address",    field: "address",   type: "text" },
//               { label: "Date of Birth", field: "dob",    type: "date" },
//             ].map(({ label, field, type, disabled }) => (
//               <div key={field}>
//                 <label className="block text-[#2F4156] font-semibold mb-1">{label}</label>
//                 {edit && !disabled ? (
//                   <input
//                     name={field}
//                     type={type}
//                     value={temp[field]}
//                     onChange={onChange}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#567C8D] text-[#2F4156]"
//                   />
//                 ) : (
//                   <p className="px-4 py-2 bg-gray-100 rounded-lg text-[#2F4156]">
//                     {user[field] || "-"}
//                   </p>
//                 )}
//               </div>
//             ))}
//           </div>

//           {edit && (
//             <div className="pt-4 border-t border-gray-200 flex justify-end space-x-4">
//               <button
//                 onClick={save}
//                 className="px-6 py-2 bg-[#567C8D] text-white rounded-lg hover:bg-[#2F4156] transition font-semibold"
//               >
//                 Save
//               </button>
//               <button
//                 onClick={() => {
//                   setTemp(user);
//                   setEdit(false);
//                   setError(null);
//                 }}
//                 className="px-6 py-2 bg-gray-200 text-[#2F4156] rounded-lg hover:bg-gray-300 transition"
//               >
//                 Cancel
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }


// // src/components/ProfilePage.jsx
// import React, { useState, useEffect } from "react";
// import { Pencil, X } from "lucide-react";
// import { useDispatch, useSelector } from "react-redux";
// import { setUser } from "../utils/userSlice";
// import {USER} from "../utils/constant";
// import ChangePassword from "./ChangePassword";

// export default function ProfilePage() {
//   const dispatch = useDispatch();
//   const user = useSelector((s) => s.user);
//   const [temp, setTemp] = useState(user || {});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [edit, setEdit] = useState(false);
//   const [showPwd, setShowPwd] = useState(false);

//   useEffect(() => {
//     (async () => {
//       try {
//         const res = await fetch(`${USER}/profile/view`, { credentials: "include" });
//         if (!res.ok) throw new Error("Failed to load profile");
//         const data = await res.json();
//         const formatted = {
//           firstName: data.firstName || "",
//           lastName: data.lastName || "",
//           photoUrl: data.photoUrl || "https://i.pravatar.cc/600",
//           phoneNo: data.phoneNo?.toString() || "",
//           address: data.address || "",
//           dob: data.dob?.split("T")[0] || "",
//           email: data.email || "",
//         };
//         dispatch(setUser(formatted));
//         setTemp(formatted);
//       } catch (e) {
//         setError(e.message);
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, [dispatch]);

//   const onChange = (e) => {
//     setTemp({ ...temp, [e.target.name]: e.target.value });
//     setError(null);
//   };

//   const save = async () => {
//     try {
//       const body = {
//         firstName: temp.firstName,
//         lastName: temp.lastName,
//         photoUrl: temp.photoUrl,
//         phoneNo: temp.phoneNo,
//         address: temp.address,
//         dob: temp.dob,
//       };
//       const res = await fetch(`${USER}/profile/update`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify(body),
//       });
//       if (!res.ok) throw new Error("Failed to update");
//       dispatch(setUser(temp));
//       setEdit(false);
//     } catch (e) {
//       setError(e.message);
//     }
//   };

//   const handlePasswordUpdate = async (currentPwd, newPwd) => {
//     try {
//       const res = await fetch(`${USER}/profile/password`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify({ currentPassword: currentPwd, newPassword: newPwd }),
//       });
//       if (!res.ok) {
//         const errObj = await res.json().catch(() => ({}));
//         throw new Error(errObj.error || "Password update failed");
//       }
//       setShowPwd(false);
//       alert("Password updated successfully!");
//     } catch (e) {
//       alert(e.message);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="h-screen flex items-center justify-center bg-gradient-to-br from-[#EDEDED] to-[#F5F5F5]">
//         <p className="text-lg text-[#2F4156] animate-pulse">Loading profile…</p>
//       </div>
//     );
//   }
//   if (error) {
//     return (
//       <div className="h-screen flex flex-col items-center justify-center bg-[#F5EFEB]">
//         <p className="text-red-500 mb-4">{error}</p>
//         <button
//           onClick={() => window.location.reload()}
//           className="px-6 py-2 bg-[#2F4156] text-white rounded hover:bg-[#567C8D] transition"
//         >
//           Retry
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#F5EFEB] to-[#E0DAD1] p-8 flex items-center justify-center">
//       <button
//         onClick={() => setShowPwd(true)}
//         className="absolute top-6 right-6 px-4 py-2 bg-[#567C8D] text-white rounded hover:bg-[#2F4156] transition"
//       >
//         Change Password
//       </button>

//       <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full grid grid-cols-1 md:grid-cols-3 overflow-hidden">
//         {/* Left panel */}
//         <div className="relative h-64 md:h-auto md:col-span-1">
//           <div
//             className="absolute inset-0 bg-center bg-cover"
//             style={{ backgroundImage: `url(${user.photoUrl})` }}
//           />
//         </div>

//         {/* Right panel */}
//         <div className="col-span-2 p-8 space-y-6">
//           <div className="flex justify-between items-center">
//             <h1 className="text-3xl font-bold text-[#2F4156]">
//               {user.firstName || user.lastName
//                 ? `${user.firstName} ${user.lastName}`.trim()
//                 : "Your Name"}
//             </h1>
//             {edit ? (
//               <button
//                 onClick={() => { setTemp(user); setEdit(false); setError(null); }}
//                 className="text-red-500 hover:text-red-700 transition"
//               >
//                 <X size={24} />
//               </button>
//             ) : (
//               <button
//                 onClick={() => setEdit(true)}
//                 className="text-[#567C8D] hover:text-[#2F4156] transition"
//               >
//                 <Pencil size={24} />
//               </button>
//             )}
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {[
//               { label: "First Name", field: "firstName", type: "text" },
//               { label: "Last Name",  field: "lastName",  type: "text" },
//               { label: "Email",      field: "email",     type: "email", disabled: true },
//               { label: "Phone No",   field: "phoneNo",   type: "tel" },
//               { label: "Address",    field: "address",   type: "text" },
//               { label: "Date of Birth", field: "dob",    type: "date" },
//             ].map(({ label, field, type, disabled }) => (
//               <div key={field}>
//                 <label className="block text-[#2F4156] font-semibold mb-1">{label}</label>
//                 {edit && !disabled ? (
//                   <input
//                     name={field}
//                     type={type}
//                     value={temp[field]}
//                     onChange={onChange}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#567C8D] text-[#2F4156]"
//                   />
//                 ) : (
//                   <p className="px-4 py-2 bg-gray-100 rounded-lg text-[#2F4156]">
//                     {user[field] || "-"}
//                   </p>
//                 )}
//               </div>
//             ))}
//           </div>

//           {edit && (
//             <div className="pt-4 border-t border-gray-200 flex justify-end space-x-4">
//               <button
//                 onClick={save}
//                 className="px-6 py-2 bg-[#567C8D] text-white rounded-lg hover:bg-[#2F4156] transition font-semibold"
//               >
//                 Save
//               </button>
//               <button
//                 onClick={() => { setTemp(user); setEdit(false); setError(null); }}
//                 className="px-6 py-2 bg-gray-200 text-[#2F4156] rounded-lg hover:bg-gray-300 transition"
//               >
//                 Cancel
//               </button>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Change Password Modal */}
//       <ChangePassword
//         isOpen={showPwd}
//         onClose={() => setShowPwd(false)}
//         onSubmit={handlePasswordUpdate}
//       />
//     </div>
//   );
// }




// src/components/ProfilePage.jsx
import React, { useState, useEffect } from "react";
import { Pencil, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../utils/userSlice";
import {USER} from "../utils/constant";

export default function ProfilePage() {
  const dispatch = useDispatch();
  const user = useSelector((s) => s.user);
  const [temp, setTemp] = useState(user || {});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${USER}/profile/view`, { credentials: "include" });
        if (!res.ok) throw new Error("Failed to load profile");
        const data = await res.json();
        const formatted = {
          firstName: data.firstName || "",
          lastName:  data.lastName || "",
          photoUrl:  data.photoUrl || "https://i.pravatar.cc/600",
          phoneNo:   data.phoneNo?.toString() || "",
          address:   data.address || "",
          dob:       data.dob?.split("T")[0] || "",
          email:     data.email || "",
        };
        dispatch(setUser(formatted));
        setTemp(formatted);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [dispatch]);

  const onChange = (e) => {
    setTemp({ ...temp, [e.target.name]: e.target.value });
    setError(null);
  };

  const save = async () => {
    try {
      const body = {
        firstName: temp.firstName,
        lastName:  temp.lastName,
        photoUrl:  temp.photoUrl,
        phoneNo:   temp.phoneNo,
        address:   temp.address,
        dob:       temp.dob,
      };
      const res = await fetch(`${USER}/profile/update`, {
        method:  "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error("Failed to update");
      dispatch(setUser(temp));
      setEdit(false);
    } catch (e) {
      setError(e.message);
    }
  };

  if (loading) return <div className="h-screen flex items-center justify-center">Loading...</div>;
  if (error)   return <div className="h-screen flex items-center justify-center">{error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5EFEB] to-[#E0DAD1] p-8 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full grid grid-cols-1 md:grid-cols-3 overflow-hidden">
        {/* Left panel */}
        <div className="relative h-64 md:h-auto md:col-span-1">
          <div
            className="absolute inset-0 bg-center bg-cover"
            style={{ backgroundImage: `url(${user.photoUrl})` }}
          />
        </div>

        {/* Right panel */}
        <div className="col-span-2 p-8 space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-[#2F4156]">
              {user.firstName || user.lastName
                ? `${user.firstName} ${user.lastName}`.trim()
                : "Your Name"}
            </h1>
            {edit ? (
              <button onClick={() => setEdit(false)} className="text-red-500">
                <X size={24} />
              </button>
            ) : (
              <button onClick={() => setEdit(true)} className="text-[#567C8D]">
                <Pencil size={24} />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { label: "First Name", field: "firstName" },
              { label: "Last Name",  field: "lastName"  },
              { label: "Email",      field: "email",      disabled: true },
              { label: "Phone No",   field: "phoneNo"   },
              { label: "Address",    field: "address"   },
              { label: "Date of Birth", field: "dob"    },
            ].map(({ label, field, disabled }) => (
              <div key={field}>
                <label className="block text-[#2F4156] font-semibold mb-1">{label}</label>
                {edit && !disabled ? (
                  <input
                    name={field}
                    type={field === 'dob' ? 'date' : 'text'}
                    value={temp[field]}
                    onChange={onChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#567C8D]"
                  />
                ) : (
                  <p className="px-4 py-2 bg-gray-100 rounded-lg">{user[field] || '-'}</p>
                )}
              </div>
            ))}
          </div>

          {edit && (
            <div className="pt-4 border-t flex justify-end space-x-4">
              <button onClick={save} className="px-6 py-2 bg-[#567C8D] text-white rounded-lg">
                Save
              </button>
              <button onClick={() => setEdit(false)} className="px-6 py-2 bg-gray-200 rounded-lg">
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
