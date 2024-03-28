import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Cart.css'; // Import the CSS file
import HorizontalBar from './HorizontalBar';
import { useNavigate } from 'react-router-dom';
import TopBar from './TopBar';
import { useCart } from '../context/cartContext';

const Cart = () => {
  const {cartItems} = useCart();
  
  const navigate = useNavigate();


  const handleUpdateQuantity = (itemId, quantity) => {
    // Implement functionality to update quantity of an item in the cart
  };

  const handleRemoveItem = (itemId) => {
    // Implement functionality to remove an item from the cart
  };

  return (
    <div>
      <TopBar/>
     
      <div className="content-wrapper">
        <HorizontalBar/>

        
        {/* "Back to Products" button */}
        <button onClick={() => navigate(-1)}>Back to Products</button>
          <h2>My cart</h2>

          <div className="cart-content">

            <div className="cart-items-section">
              {cartItems.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <div>
                {cartItems.map((item) => (
                  <div key={item.productId} className="cart-item">
                    <img src={item.imageUrl} alt={item.productName} />
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
                            onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value))}
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
                        <p>${item.quantity * item.price}</p>
                      </div>
                      
                    </div>
                  </div>
                ))}
                <div className="cart-total">
                  <p>{cartItems.length} items</p>
                  <p>Total: ${cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}</p>
                </div>
              </div>  
            )}
            </div> 
            
            <div className="price-details-section">
              {/* Price details section */}
              <div className="price-details">
                <h4>PRICE DETAILS</h4>
                <p>Total MRP: ${cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}</p>
                <p>Discount on MRP: $0</p>
                <p>Convenience fee: $45</p>
                <p>Total amount: ${
                  cartItems.reduce((total, item) => total + item.price * item.quantity, 0) + 45
                }</p>
              </div>
              <button className="checkout-button">PLACE ORDER</button>
            </div>

          </div>

      </div>
      
        

    </div>
  );
};

export default Cart;
