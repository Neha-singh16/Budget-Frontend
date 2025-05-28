import "./App.css";
import Signup from "./components/SignUp";
import Body from "./components/Body";
import Dashboard from "./components/Dashboard";
import IntroPage from "./components/Intro";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./utils/store";
import Profile from "./components/Profile";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          {/* First visit: Intro Page */}
          <Route path="/" element={<IntroPage />} />
           {/* <Route path="/profile" element={<Profile />} /> */}
             <Route path="signup" element={<Signup />} />

          {/* Main app routes under /app */}
          <Route path="/app" element={<Body />}>
            <Route  path="dashboard"  index element={<Dashboard />} />
          
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
