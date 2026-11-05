import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

function Layout() {
  const getNavStyle = ({ isActive }) => ({
    color: isActive ? 'blue' : 'black',
    textDecoration: isActive ? 'underline' : 'none',
    marginRight: '16px',
    fontWeight: isActive ? 'bold' : 'normal'
  });

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <nav style={{ paddingBottom: '16px', borderBottom: '1px solid #ccc', marginBottom: '20px' }}>
        <NavLink to="/" end style={getNavStyle}>Trang chủ</NavLink>
        <NavLink to="/questions" style={getNavStyle}>Ngân hàng câu hỏi</NavLink>
        <NavLink to="/history" style={getNavStyle}>Lịch sử</NavLink>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;