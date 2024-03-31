// OrderSuccess.js
import React from 'react';
import { Link } from 'react-router-dom';
import HorizontalBar from '../components/HorizontalBar';
import '../styles/OrderSuccess.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';

function OrderSuccess() {
    const navigate = useNavigate();
    return (
        <>
            <div className="content-wrapper">
                <HorizontalBar />
                <div className="order-success-container">
                    <img src="confetti.png" alt="Order Success Image" className="success-image" />
                    <h2>Order is placed successfully!</h2>
                    <p>You  will be receiving a confirmation email with order details</p>
                    <button className="home-button" onClick={() => navigate('/')}>Go back to Home page</button>
                </div>
            </div>
           
        </>
    );
}

export default OrderSuccess;
