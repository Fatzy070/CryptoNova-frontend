import React, { useEffect, useState } from 'react';
import Info from '../data/Info';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
const Header = () => {
  const { nova, nav, nav2 } = Info;
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
  const checkLogin = () => {
    const token = localStorage.getItem("token");
    setLoggedIn(!!token);
  };

  checkLogin(); // check on mount

  // Listen for changes in localStorage (like login/logout)
  window.addEventListener("storage", checkLogin);

  return () => {
    window.removeEventListener("storage", checkLogin);
  };
}, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
    navigate('/login');
  };

  const links = loggedIn ? nav2 : nav;

  return (
    <header className='  w-full px-4 md:px-15 py-4.5   bg-gradient-to-r from-[#1F1F1F] via-[#2C2C2C] to-[#3B2F2F] text-gray-300'>
      <section className='flex justify-between items-center'>
        <div className='flex items-center'>
          <img src={logo} alt="CryptoNova Logo" className='w-[40px] h-[40px] inline-block mr-2' />
        <div className='font-bold hidden md:block text-[1.3rem]'>
          <h1>{nova}</h1>
        </div>
        </div>

        <div className='flex md:gap-3'>
          {links.map((item, index) => {
            if (item.name === 'logout') {
              return (
                <button
                  key={index}
                  onClick={handleLogout}
                  className='capitalize px-3 py-1 rounded-md bg-red-500 text-white font-semibold hover:bg-red-600 transition-all'
                >
                  {item.name}
                </button>
              );
            }

            return (
              <NavLink
                key={index}
                to={item.link}
                className={({ isActive }) =>
                  isActive
                    ? 'capitalize px-3 py-1 rounded-md bg-white/10 transition-all'
                    : 'capitalize px-3 py-1 hover:text-cyan-400 transition-all'
                }
              >
                {item.name}
              </NavLink>
            );
          })}
        </div>
      </section>
    </header>
  );
};

export default Header;
