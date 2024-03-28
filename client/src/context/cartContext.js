// CartContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './authContext';
import axios from 'axios';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const { isLoggedIn, user } = useAuth();

  useEffect(() => {
    const fetchCartItems = async () => {
      if (isLoggedIn) {
        try {
          const response = await axios.post('http://localhost:4000/api/cart', { userId: user._id });
          if (response.status === 200) {
            setCartItems(response.data); // Assuming the backend returns an array of cart items
          } else {
            console.error('Failed to fetch cart items');
          }
        } catch (error) {
          console.error('Error fetching cart items:', error);
        }
      }
    };
    fetchCartItems();
  }, [isLoggedIn, user]);

  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
