

// src/components/Dashboard.jsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setBudgets }    from '../utils/budgetSlice';
import { setExpenses }   from '../utils/expenseSlice';
import { setCategories } from '../utils/categorySlice';
import { setPeriod }     from '../utils/dashboardSlice';
import {USER} from '../utils/constant';

import {
  PieChart, Pie, Cell, Tooltip as PieTooltip,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as LineTooltip, ResponsiveContainer
} from 'recharts';

const colors = {
  navy:   '#2F4156',
  teal:   '#567C8D',
  skyBlue:'#C8D9E6',
  beige:  '#F5EFEB',
  white:  '#FFFFFF',
  accent: '#567C8D',  // for charts
  danger: '#e53e3e',
};

export default function Dashboard() {
  const dispatch    = useDispatch();
  const budgets     = useSelector(s => s.budget.budgets);
  const expenses    = useSelector(s => s.expense.expenses);
  const categories  = useSelector(s => s.category.categories);
  const period      = useSelector(s => s.dashboard.period);

  useEffect(() => {
    (async () => {
      try {
        const [buds, exps, cats] = await Promise.all([
          fetch(`${USER}/user/budget`,  { credentials:'include' }).then(r=>r.json()),
          fetch(`${USER}/user/expense`, { credentials:'include' }).then(r=>r.json()),
          fetch(`${USER}/category`,     { credentials:'include' }).then(r=>r.json()),
        ]);
        dispatch(setBudgets(buds));
        dispatch(setExpenses(exps));
        dispatch(setCategories(cats));
      } catch (e) {
        console.error(e);
      }
    })();
  }, [dispatch, period]);

  // derive metrics
  const totalBudget = budgets.reduce((sum,b)=>sum+b.limit,0);
  const totalSpent  = expenses.reduce((sum,e)=>sum+Number(e.amount),0);
  const remaining   = totalBudget - totalSpent;
  const activeCount = budgets.filter(b=>b.isActive).length;
  const overBudgetPct = budgets.length
    ? Math.round(
        budgets.filter(b => {
          const spent = expenses
            .filter(e=>e.budget===b._id)
            .reduce((s,e)=>s+Number(e.amount),0);
          return spent > b.limit;
        }).length / budgets.length * 100
      )
    : 0;

  const handlePeriodChange = (e) => dispatch(setPeriod(e.target.value));

  // === Expense Breakdown Data (group by category) ===
  const breakdownMap = {};
  expenses.forEach(e => {
    const catName = categories.find(c=>c._id===e.category)?.name || 'Unknown';
    breakdownMap[catName] = (breakdownMap[catName] || 0) + Number(e.amount);
  });
  const breakdownData = Object.entries(breakdownMap).map(([name, value])=>({ name, value }));

  // === Spending Trend Data (group by date) ===
  const trendMap = {};
  expenses.forEach(e => {
    const date = new Date(e.date).toLocaleDateString();
    trendMap[date] = (trendMap[date] || 0) + Number(e.amount);
  });
  // sort by date ascending
  const trendData = Object.entries(trendMap)
    .map(([date,value])=>({ date, value }))
    .sort((a,b)=> new Date(a.date) - new Date(b.date));

  return (
    <div className="p-6 bg-beige min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-navy">Dashboard</h1>
        <select
          value={period}
          onChange={handlePeriodChange}
          className="p-2 rounded bg-white border"
        >
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {[
          { label:'Total Budget', value:`₹${totalBudget}`,   color:colors.navy},
          { label:'Total Spent',  value:`₹${totalSpent}`,    color:colors.teal},
          { label:'Remaining',    value:`₹${remaining}`,     color:colors.skyBlue},
          { label:'Active Budgets',value:activeCount,           color:colors.beige},
          { label:'Over-Budget %',value:`${overBudgetPct}%`, color:colors.navy},
        ].map(c=>(
          <div key={c.label} className="p-4 bg-white rounded shadow"
               style={{borderTop:`4px solid ${c.color}`}}>
            <p className="text-sm text-gray-500">{c.label}</p>
            <p className="text-xl font-semibold text-navy">{c.value}</p>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Expense Breakdown */}
        <div className="bg-white rounded-lg p-6 shadow">
          <h2 className="text-xl font-semibold text-navy mb-4">Expense Breakdown</h2>
          {breakdownData.length ? (
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={breakdownData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {breakdownData.map((entry, i) => (
                    <Cell key={i} fill={i % 2 ? colors.teal : colors.accent} />
                  ))}
                </Pie>
                <PieTooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-500">No expenses yet</p>
          )}
        </div>

        {/* Spending Trend */}
        <div className="bg-white rounded-lg p-6 shadow">
          <h2 className="text-xl font-semibold text-navy mb-4">Spending Trend</h2>
          {trendData.length ? (
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={colors.teal}
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
                <LineTooltip />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-500">No expenses yet</p>
          )}
        </div>
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="col-span-2 bg-white rounded-lg p-6 shadow">
          <h2 className="text-xl font-semibold text-navy mb-4">Recent Activity</h2>
          <ul className="space-y-4 max-h-80 overflow-y-auto">
            {expenses.slice(0,10).map(e=>{
              const name = categories.find(c=>c._id===e.category)?.name||'Unknown';
              return (
                <li key={e._id} className="flex justify-between">
                  <div>
                    <p className="font-medium text-navy">{name}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(e.date).toLocaleDateString()}
                    </p>
                  </div>
                  <span className="font-semibold text-navy">-₹{e.amount}</span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg p-6 shadow flex flex-col space-y-4">
          <h2 className="text-xl font-semibold text-navy">Quick Actions</h2>
          <button className="px-4 py-2 bg-teal text-white rounded hover:bg-navy">
            + Add Expense
          </button>
          <button className="px-4 py-2 bg-teal text-white rounded hover:bg-navy">
            + Add Budget
          </button>
          <button className="px-4 py-2 bg-teal text-white rounded hover:bg-navy">
            Manage Categories
          </button>
        </div>
      </div>
    </div>
  );
}

