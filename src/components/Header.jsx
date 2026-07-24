import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';

export const Header = () => {
  const token = useSelector(state => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav style={{ padding: '10px', background: '#eee', display: 'flex', gap: '15px' }}>
      <Link to="/">Home</Link>
      {token ? (
        <>
          <Link to="/todos">Todos</Link>
          <Link to="/create">Create Todo</Link>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </nav>
  );
};