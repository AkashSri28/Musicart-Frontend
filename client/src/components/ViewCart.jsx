import React from 'react'
import { useCart } from '../context/cartContext'
import { useNavigate } from 'react-router-dom';
import { MdOutlineShoppingCart } from "react-icons/md";
import '../styles/ViewCart.css'; 


function ViewCart({showCartCount}) {
    const {totalProductCount} = useCart();
    const navigate = useNavigate();

    const handleViewCart = () =>{
        navigate('/cart');
      }

  return (
    <button className="view-cart-btn" onClick={handleViewCart}>
      <MdOutlineShoppingCart className="cart-icon"/>
      <span className="button-text">View Cart {showCartCount && totalProductCount}</span>
    </button>
  )
}

export default ViewCart