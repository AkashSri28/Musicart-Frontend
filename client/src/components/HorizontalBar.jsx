// HorizontalBar.jsx
import React from 'react';

const HorizontalBar = () => {
  return (
    <div className="horizontal-bar">
      {/* Left side */}
      <div className="left-side">
        <img src="logo.png" alt="Logo" className="logo" />
        <a href="#" className="nav-link">Home</a>
        <a href="#" className="nav-link">Invoice</a>
      </div>
      {/* Right side */}
      <div className="right-side">
        <button className="view-cart-btn">View Cart</button>
        <img src="profile.jpg" alt="Profile" className="profile-image" />
      </div>
    </div>
  );
};

export default HorizontalBar;
