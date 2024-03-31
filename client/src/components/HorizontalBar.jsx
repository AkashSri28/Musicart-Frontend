// HorizontalBar.jsx
import React from 'react';
import ViewCart from './ViewCart';

const HorizontalBar = ({showCartCount}) => {

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
        {showCartCount}
        <ViewCart showCartCount={showCartCount}/>
      </div>
    </div>
  );
};

export default HorizontalBar;
