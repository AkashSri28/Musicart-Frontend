// TopBar.jsx
import React from 'react';
import { useAuth } from '../context/authContext';
import {useNavigate, Link} from 'react-router-dom';
import '../styles/TopBar.css';

const TopBar = () => {
  const { isLoggedIn, login, logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    // navigate('/');
  };

  return (
    <div className="top-bar">
       <div className="phone-number">Phone: 123-456-7890</div>
       <div className="promotion">Get 50% off on selected items | Shop now</div>

      {!isLoggedIn ? (
        <div className="auth-buttons">
          <Link to="/login">Login</Link>|
          <Link to="/signup">Signup</Link>
        </div>
      ) : (
        <div className="logout-button" onClick={handleLogout}>
          Logout
        </div>
      )}

    </div>
  );
};

export default TopBar;
