import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setBudgets, addBudget, deleteBudget } from "../utils/budgetSlice";
import { setCategories } from "../utils/categorySlice";
import {USER} from "../utils/constant";

export default function Budget() {
  const dispatch = useDispatch();
  const budgets = useSelector((state) => state.budget.budgets);
  const categories = useSelector((state) => state.category.categories);

  const [formData, setFormData] = useState({
    categoryId: "",
    limit: "",
    period: "monthly",
  });

  const [selectedCategory, setSelectedCategory] = useState("all");

  // 🔁 Fetch categories & budgets
  useEffect(() => {
    fetch(`${USER}/category`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => dispatch(setCategories(data)))
      .catch(console.error);

    fetch(`${USER}/user/budget`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => dispatch(setBudgets(data)))
      .catch(console.error);
  }, [dispatch]);

  // 🧠 Handle Form Input
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // ➕ Create Budget

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch(`${USER}/user/budget`, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (res.ok) {
      dispatch(addBudget(data));
      setFormData({ categoryId: "", limit: "", period: "monthly" });
    } else {
      alert(data.error || "Something went wrong!");
    }
  } catch (err) {
    console.error("Budget submission error:", err);
    alert("Something went wrong while submitting the budget.");
  }
};

  // ❌ Delete Budget
  const handleDelete = async (id) => {
    const res = await fetch(`${USER}/user/budget/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (res.ok) {
      dispatch(deleteBudget(id));
    }
  };

  // 🔍 Filtered Budgets
  const filteredBudgets =
    selectedCategory === "all"
      ? budgets
      : budgets.filter((b) => b.categoryId === selectedCategory);

  return (
    <div className="p-6 bg-[#F5EFEB] min-h-screen">
      <h1 className="text-3xl font-bold text-[#2F4156] mb-6">Manage Budgets</h1>
      {/* Add Budget Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-[#C8D9E6] rounded-lg p-4 mb-6 shadow-lg"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            required
            className="p-2 rounded bg-[#F5EFEB] border text-[#2F4156]"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
             

              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>

          <input
            type="number"
            name="limit"
            placeholder="Limit"
            value={formData.limit}
            onChange={handleChange}
            required
            className="p-2 rounded bg-[#F5EFEB] border text-[#2F4156]"
          />

          <select
            name="period"
            value={formData.period}
            onChange={handleChange}
            className="p-2 rounded bg-[#F5EFEB] border text-[#2F4156]"
          >
            <option value="monthly">Monthly</option>
            <option value="weekly">Weekly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-[#567C8D] text-white rounded hover:bg-[#2F4156]"
        >
          Add Budget
        </button>
      </form>

      {/* Budget List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredBudgets.map((budget) => (
          <div
            key={budget._id}
            className="bg-white rounded-lg p-4 shadow-md flex flex-col justify-between"
          >
            <h2 className="text-xl font-semibold text-[#2F4156]">
              {categories.find((c) => c._id === budget.categoryId)?.name ??
                "Unknown"}
            </h2>
            <p className="text-[#567C8D]">Limit: ₹{budget.limit}</p>
            <p className="text-[#567C8D] capitalize">Period: {budget.period}</p>
            <button
              onClick={() => handleDelete(budget._id)}
              className="mt-3 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
