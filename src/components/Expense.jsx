// src/components/ExpenseTracker.jsx
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setExpenses } from '../utils/expenseSlice';
import { setCategories } from '../utils/categorySlice';
import { setBudgets } from '../utils/budgetSlice'; // we still need to load initial budgets
import {USER} from '../utils/constant';

export default function ExpenseTracker() {
  const dispatch    = useDispatch();
  const expenses    = useSelector(s => s.expense.expenses);
  const categories  = useSelector(s => s.category.categories);
  const budgets     = useSelector(s => s.budget.budgets);

  const [formData, setFormData] = useState({
    amount: '', date: new Date().toISOString().substr(0,10),
    category:'', budget:'', note:''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const [cats, buds, exps] = await Promise.all([
          fetch(`${USER}/category`,      { credentials:'include' }).then(r=>r.json()),
          fetch(`${USER}/user/budget`,   { credentials:'include' }).then(r=>r.json()),
          fetch(`${USER}/user/expense`,  { credentials:'include' }).then(r=>r.json()),
        ]);
        dispatch(setCategories(cats));
        dispatch(setBudgets(buds));
        dispatch(setExpenses(exps));
      } catch (e) {
        console.error(e);
      }
    })();
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData(fd => ({ ...fd, [e.target.name]: e.target.value }));
    setError('');
  };

  const getSpent = (budgetId) => 
    expenses
      .filter(e => e.budget === budgetId)
      .reduce((sum, e) => sum + Number(e.amount), 0);

  const canAfford = () => {
    const b = budgets.find(x => x._id === formData.budget);
    if (!b) return true;
    const remaining = b.limit - getSpent(b._id);
    if (Number(formData.amount) > remaining) {
      setError(`Amount exceeds remaining ₹${remaining}`);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canAfford()) return;

    const res = await fetch(`${USER}/user/expense`, {
      method: 'POST', credentials:'include',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      const data = await res.json();
      dispatch(setExpenses([data, ...expenses]));
      setFormData({ amount:'', date:new Date().toISOString().substr(0,10), category:'', budget:'', note:'' });
    } else {
      const errObj = await res.json().catch(async()=>({ error: await res.text() }));
      setError(errObj.error || 'Add failed');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this expense?')) return;
    const res = await fetch(`${USER}/user/expense/${id}`, {
      method:'DELETE', credentials:'include'
    });
    if (res.ok) {
      dispatch(setExpenses(expenses.filter(e => e._id !== id)));
    }
  };

  return (
    <div className="p-6 bg-[#F5EFEB] min-h-screen">
      <h1 className="text-3xl font-bold text-[#2F4156] mb-6">Expense Tracker</h1>

      <form onSubmit={handleSubmit} className="bg-[#C8D9E6] p-4 mb-6 rounded shadow">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <input type="number" name="amount" value={formData.amount}
            onChange={handleChange} required placeholder="Amount"
            className="p-2 rounded bg-[#F5EFEB] border text-[#2F4156]" />

          <input type="date" name="date" value={formData.date}
            onChange={handleChange} required
            className="p-2 rounded bg-[#F5EFEB] border text-[#2F4156]" />

          <select name="category" value={formData.category}
            onChange={handleChange} required
            className="p-2 rounded bg-[#F5EFEB] border text-[#2F4156]">
            <option value="">Select Category</option>
            {categories.map(c => (
              <option key={c._id} value={c._id}>{c.name}</option>
            ))}
          </select>

          <select name="budget" value={formData.budget}
            onChange={handleChange} required
            className="p-2 rounded bg-[#F5EFEB] border text-[#2F4156]">
            <option value="">Select Budget</option>
            {budgets.length === 0
              ? <option disabled>No budgets—<Link to="/app/budget" className="underline">Create one</Link></option>
              : budgets.map(b => {
                  const spent = getSpent(b._id);
                  const rem   = b.limit - spent;
                  const name  = categories.find(c=>c._id===b.categoryId)?.name || 'Unnamed';
                  return (
                    <option key={b._id} value={b._id}>
                      {name} — Rem: ₹{rem}
                    </option>
                  );
                })
            }
          </select>

          <input type="text" name="note" value={formData.note}
            onChange={handleChange} placeholder="Note"
            className="p-2 rounded bg-[#F5EFEB] border text-[#2F4156]" />
        </div>

        {error && <p className="mt-2 text-red-600">{error}</p>}

        <button type="submit"
          className="mt-4 px-4 py-2 bg-[#567C8D] text-white rounded hover:bg-[#2F4156]">
          Add Expense
        </button>
      </form>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold text-[#2F4156] mb-4">Recent Expenses</h2>
        <ul className="space-y-4">
          {expenses.map(e => {
            const catName = categories.find(c=>c._id===e.category)?.name || 'Unknown';
            const bud     = budgets.find(b=>b._id===e.budget);
            const budName = categories.find(c=>c._id===bud?.categoryId)?.name || 'No Budget';
            return (
              <li key={e._id} className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-[#2F4156]">{catName} ({budName})</p>
                  <p className="text-sm text-gray-500">
                    {new Date(e.date).toLocaleDateString()} — {e.note}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-[#2F4156]">₹{e.amount}</span>
                  <button onClick={()=>handleDelete(e._id)}
                    className="text-red-500 hover:text-red-700">
                    Delete
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
