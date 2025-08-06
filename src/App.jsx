// import "./App.css";
// // import Login from "./components/Login";
// import Body from "./components/Body";
// import Dashboard from "./components/Dashboard";
// import IntroPage from "./components/Intro";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { Provider } from "react-redux";
// import store from "./utils/store";
// import Profile from "./components/Profile";
// import Budget from "./components/Budget";
// import ExpenseTracker from "./components/Expense";
// import ChangePasswordPage from "./components/ChangePassword";
// import AuthPage from "./components/Login";
// import WalletPage from "./components/Wallet";
// import { useEffect , useState  } from "react";
// import { useDispatch} from "react-redux";
// import axios from "axios";
// import {setUser} from "./utils/userSlice";


// function App() {
//   const dispatch = useDispatch();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axios.get("/api/auth/me", { withCredentials: true })
//       .then(res => dispatch(setUser(res.data)))
//       .catch(() => {
//         // not logged in or invalid token
//         dispatch(setUser(null));
//       })
//       .finally(() => setLoading(false));
//   }, [dispatch]);
//   if (loading) {
//     return <div className="flex items-center justify-center h-screen">Loading…</div>;
//   }


//   return (
//     <Provider store={store}>
//       <BrowserRouter>
//         <Routes>
//           {/* First visit: Intro Page */}
//           <Route path="/" element={<IntroPage />} />

//           <Route path="login" element={<AuthPage />} />

//            <Route path="/app" element={<Body />}>
//             <Route path="dashboard" index element={<Dashboard />} />

//             <Route path="profile" element={<Profile />} />
//              <Route path="password" element={<ChangePasswordPage/>} />
//             <Route path="expense" element={<ExpenseTracker />} />
//             <Route path="budget" element={<Budget />} />
//              <Route path="income" element={<WalletPage />} />

//           </Route>
//         </Routes>
//       </BrowserRouter>
//     </Provider>
//   );
// }

// export default App;



// src/App.jsx
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "./index.css";

import IntroPage           from "./components/Intro";
import AuthPage            from "./components/Login";
import Body                from "./components/Body";
import Dashboard           from "./components/Dashboard";
import Profile             from "./components/Profile";
import ChangePasswordPage  from "./components/ChangePassword";
import ExpenseTracker      from "./components/Expense";
import Budget              from "./components/Budget";
import WalletPage          from "./components/Wallet";

import { setUser }         from "./utils/userSlice";

function AuthLoader({ children }) {
  const dispatch    = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/auth/me", { withCredentials: true })
      .then(res => dispatch(setUser(res.data)))
      .catch(() => dispatch(setUser(null)))
      .finally(() => setLoading(false));
  }, [dispatch]);

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading…</div>;
  }
  return children;
}

function ProtectedRoute({ children }) {
  const user = useSelector(s => s.user);
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

function App() {
  return (
    <BrowserRouter>
      <AuthLoader>
        <Routes>
          {/* Public */}
          <Route path="/"          element={<IntroPage />} />
          <Route path="/login"     element={<AuthPage />} />
          <Route path="/signup"    element={<AuthPage />} />

          {/* Protected under /app */}
          <Route path="/app" element={<ProtectedRoute><Body/></ProtectedRoute>}>
            <Route index         element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="profile"   element={<Profile />} />
            <Route path="password"  element={<ChangePasswordPage />} />
            <Route path="expense"   element={<ExpenseTracker />} />
            <Route path="budget"    element={<Budget />} />
            <Route path="income"    element={<WalletPage />} />
          </Route>

          {/* catch‑all redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthLoader>
    </BrowserRouter>
  );
}

export default App;
