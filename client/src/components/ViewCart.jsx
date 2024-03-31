import React from 'react'
import { useCart } from '../context/cartContext'
import { useNavigate } from 'react-router-dom';

function ViewCart({showCartCount}) {
    const {totalProductCount} = useCart();
    const navigate = useNavigate();

    const handleViewCart = () =>{
        navigate('/cart');
      }

  return (
    <button className="view-cart-btn" onClick={handleViewCart}>View Cart {showCartCount && totalProductCount} </button>
  )
}

export default ViewCart