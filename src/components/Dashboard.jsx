import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [categories, setCategories] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [budget, setBudget] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Fetch data from APIs
  useEffect(() => {
    fetch("/api/categories")
      .then(res => res.json())
      .then(data => setCategories(data));

    fetch("/api/expenses")
      .then(res => res.json())
      .then(data => {
        setExpenses(data);
        setFilteredExpenses(data);
      });

    fetch("/api/budget")
      .then(res => res.json())
      .then(data => setBudget(data));
  }, []);

  // Filter expenses on category change
  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredExpenses(expenses);
    } else {
      const filtered = expenses.filter(exp => exp.category === selectedCategory);
      setFilteredExpenses(filtered);
    }
  }, [selectedCategory, expenses]);

  const calculateSpent = () => {
    return filteredExpenses.reduce((sum, exp) => sum + exp.amount, 0);
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-6 text-[#1F2937]">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-1">Monthly Budget</h3>
          <p className="text-2xl font-bold">${budget?.amount ?? 0}</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-1">Spent</h3>
          <p className="text-2xl font-bold text-red-500">${calculateSpent()}</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-1">Remaining</h3>
          <p className="text-2xl font-bold text-green-600">
            ${budget ? budget.amount - calculateSpent() : 0}
          </p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Category:</label>
        <select
          className="w-full sm:w-64 p-2 border border-gray-300 rounded-lg"
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          {categories.map(cat => (
            <option key={cat._id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Expense List */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-4">Expenses</h2>
        {filteredExpenses.length === 0 ? (
          <p className="text-gray-500">No expenses in this category yet.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {filteredExpenses.map(exp => (
              <li key={exp._id} className="flex justify-between py-3">
                <span>{exp.description} ({exp.category})</span>
                <span className="text-red-500">- ${exp.amount}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
