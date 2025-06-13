import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { USER } from "../utils/constant";

export default function ChangePasswordPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ current: "", password: "", confirm: "" });
  const [show, setShow] = useState({ current: false, password: false, confirm: false });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    setError("");
  };

  const toggleShow = (field) => {
    setShow(s => ({ ...s, [field]: !s[field] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      setError("New passwords do not match");
      return;
    }
    try {
      const res = await fetch(`${USER}/profile/password`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ currentPassword: form.current, newPassword: form.password })
      });
      if (!res.ok) throw new Error((await res.json()).error || 'Password update failed');
      alert("Password updated successfully");
      navigate(-1);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5EFEB] p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-[#FFFFFF] p-8 rounded-2xl shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-[#2F4156]">Change Password</h2>

        {['current','password','confirm'].map(field => (
          <div key={field} className="mb-4 relative">
            <label className="block text-[#2F4156] font-medium mb-1">
              {field === 'current' ? 'Current Password' : field === 'password' ? 'New Password' : 'Confirm Password'}
            </label>
            <input
              name={field}
              type={show[field] ? 'text' : 'password'}
              value={form[field]}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#567C8D] outline-none"
            />
            <button
              type="button"
              onClick={() => toggleShow(field)}
              className="absolute top-9 right-3 text-gray-500"
            >
              {show[field] ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          </div>
        ))}

        {error && <p className="text-red-600 mb-4">{error}</p>}

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-gray-300 text-[#2F4156] rounded-lg hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-[#567C8D] text-white rounded-lg hover:bg-[#2F4156] transition"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
