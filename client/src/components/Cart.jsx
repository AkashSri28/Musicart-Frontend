import React, { useState, useEffect } from 'react';
import '../styles/Cart.css'; // Import the CSS file
import { useNavigate, Link } from 'react-router-dom';
import TopBar from './TopBar';
import { useCart } from '../context/cartContext';
import { AiOutlineShopping } from "react-icons/ai";
import BottomBar from './BottomBar';
import ViewCart from './ViewCart';
import { useAuth } from '../context/authContext';

const Cart = () => {
  const {cartItems, updateCartItemQuantity} = useCart();
  const {isLoggedIn} = useAuth();
  
  const navigate = useNavigate();


  const handleUpdateQuantity = (itemId, quantity) => {
    updateCartItemQuantity(itemId, quantity);
  };

  const handlePlaceOrder = () => {
    navigate('/checkout');
  };

  return (
    <div>
      <TopBar/>
     
      <div className="content-wrapper">
            <div className="horizontal-bar">
                {/* Left side */}
                <div className="left-side">
                    <div class="logo-container">
                    <img src="logo.png" alt="Logo" class="logo" />
                    <span class="logo-text">Musicart</span>
                    </div>
                    <Link to="/" className="nav-link">Home</Link> /
                    <p style={{marginLeft: "10px"}}>View Cart</p>
                </div>

                {/* Right side */}
                <div className="right-side">
                    {isLoggedIn && (
                    <>
                        <ViewCart showCartCount={false}/>
                    </>
                    )}
                </div>

            </div>

        
        {/* "Back to Products" button */}
        <button className="back-to-button" onClick={() => navigate('/')}>Back to Products</button>
          <div className="cart-title">
            <AiOutlineShopping size={40} /> 
            <span className="cart-title-text">My Cart</span>
          </div>

          {cartItems.length === 0 ? (
                <p className="empty-cart-message">Your cart is empty.</p>
              ) : (
              <div className="cart-content">
            
                <div className="cart-items-section">

                  <div className='cart-items'>

                    {cartItems.map((item) => (
                     <div key={item.productId} className="cart-item">

                      <img className="cart-item-image" src={item.imageUrl} alt={item.productName} />

                      <div className="item-details">

                        <div className="column">
                          <h3>{item.productName}</h3>
                          <p>Color: {item.color}</p>
                          <p>In stock</p>
                        </div>

                        <div className="column">
                          <h3>Price</h3>
                          <p>{item.price}</p>
                        </div>

                        <div className="column">
                          <h3>Quantity</h3>
                          <div className="quantity">
                            <select
                              value={item.quantity}
                              onChange={(e) => handleUpdateQuantity(item.productId, parseInt(e.target.value))}
                            >
                              {[...Array(8)].map((_, index) => (
                                <option key={index + 1} value={index + 1}>
                                  {index + 1}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div className="column">
                          <h3>Total</h3>
                          <p>₹{(item.quantity * parseFloat(item.price.replace('₹', ''))).toFixed(2)}</p>
                        </div>
                        
                      </div>
                    </div>
                  ))}
                </div>  

                <div className="cart-total">
                  <p>{cartItems.length} items</p>
                  <p>Total: ₹{cartItems.reduce((total, item) => total + item.quantity * parseFloat(item.price.replace('₹', '')), 0).toFixed(2)}</p>
                </div>
              </div>


              <div className="price-details-section">
                <h4>PRICE DETAILS</h4>
                <div className="price-details">

                  <div>
                    <p>Total MRP:</p>
                    <p>Discount on MRP:</p>
                    <p>Convenience fee:</p>
                  </div>

                  <div>
                    <p>₹{cartItems.reduce((total, item) => total + item.quantity * parseFloat(item.price.replace('₹', '')), 0).toFixed(2)}</p>
                    <p>₹0</p>
                    <p>₹45</p>
                  </div>
                </div>

                <div>
                  <div className="price-item">
                    <p>Total Amount:</p>
                    <p>₹{(cartItems.reduce((total, item) => total + item.quantity * parseFloat(item.price.replace('₹', '')), 0) + 45).toFixed(2)}</p>
                  </div>
                  <button className="checkout-button" onClick={handlePlaceOrder}>PLACE ORDER</button>
                </div>

              </div>

            </div>
            )}

          </div>

          <BottomBar/>

      </div>
  );
};

export default Cart;
