// TopBar.jsx
import React from 'react';
import { useAuth } from '../context/authContext';
import {Link} from 'react-router-dom';
import '../styles/TopBar.css';

const TopBar = () => {
  const { isLoggedIn, login, logout } = useAuth();

  const handleLogout = () => {
    logout();
    // Perform any additional logout actions (e.g., redirect)
  };

  return (
    <div className="top-bar">
      <div className="phone-number">Phone: 123-456-7890</div>
      <div className="promotion">Get 50% off | Shop now</div>

      {!isLoggedIn ? (
        <div className="auth-buttons">
          <Link to="/login">Login</Link>
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
