// HorizontalBar.jsx
import React from 'react';
import ViewCart from './ViewCart';
import '../styles/HorizontalBar.css'; // Import the CSS file
import { Link } from 'react-router-dom';

const HorizontalBar = ({showCart, showCartCount}) => {

  return (
    <div className="horizontal-bar">
      {/* Left side */}
      <div className="left-side">
        <div class="logo-container">
          <img src="logo.png" alt="Logo" class="logo" />
          <span class="logo-text">Musicart</span>
        </div>
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/invoices" className="nav-link">Invoice</Link>
      </div>
      {/* Right side */}
      <div className="right-side">
       {showCart && <ViewCart showCartCount={showCartCount}/>}
      </div>
    </div>
  );
};

export default HorizontalBar;
