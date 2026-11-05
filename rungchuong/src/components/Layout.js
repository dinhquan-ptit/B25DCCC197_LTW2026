import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

const Layout = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <NavBar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;