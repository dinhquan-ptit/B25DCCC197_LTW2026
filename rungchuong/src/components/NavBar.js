import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  const getNavStyle = ({ isActive }) => ({
    color: isActive ? 'blue' : 'black',
    textDecoration: isActive ? 'underline' : 'none',
    marginRight: '16px',
    fontWeight: isActive ? 'bold' : 'normal'
  });

  return (
    <nav style={{ paddingBottom: '16px', borderBottom: '1px solid #ccc', marginBottom: '20px' }}>
      <NavLink to="/" end style={getNavStyle}>Trang chủ</NavLink>
      <NavLink to="/questions" style={getNavStyle}>Ngân hàng câu hỏi</NavLink>
      <NavLink to="/history" style={getNavStyle}>Lịch sử</NavLink>
    </nav>
  );
};

export default NavBar;