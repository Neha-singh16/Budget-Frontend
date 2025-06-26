
import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import { setUser, removeUser } from '../utils/userSlice';
import { USER } from '../utils/constant';

const Body = () => {
    const dispatch = useDispatch();
     const navigate = useNavigate();
  const isMenuOpen = useSelector((s) => s.menu.isMenuOpen);
  const user     = useSelector(s => s.user);


   useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${USER}/profile/view`, {
          credentials: 'include',
        });
        if (res.ok) {
          const data = await res.json();
          dispatch(setUser(data));
        } else {
          // not logged in: redirect to login
          dispatch(removeUser());
          navigate('/login', { replace: true });
        }
      } catch (err) {
        console.error('Unable to verify login:', err);
        dispatch(removeUser());
        navigate('/login', { replace: true });
      }
    })();
  }, [dispatch, navigate]);

  // While that request is in flight you might want to show a loader...
  if (user === undefined) {
    return <div className="h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Navbar />

      <div
        className={`flex flex-1 overflow-hidden transition-all duration-300 `}
      >
        {isMenuOpen && <Sidebar />}

        <div className="flex-1 flex flex-col overflow-hidden">
          <main className="flex-1 overflow-auto ">
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Body;
