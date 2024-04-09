// OrderSuccess.js
import React from 'react';
import { Link } from 'react-router-dom';
import HorizontalBar from '../components/HorizontalBar';
import '../styles/OrderSuccess.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';
import BottomBar from '../components/BottomBar';
import ViewCart from '../components/ViewCart';
import { useAuth } from '../context/authContext';

function OrderSuccess() {
    const navigate = useNavigate();

    const { isLoggedIn } = useAuth();
    return (
        <>
            <div className="content-wrapper">
                <div className="horizontal-bar">
                    {/* Left side */}
                    <div className="left-side">
                        <div class="logo-container">
                            <img src="logo.png" alt="Logo" class="logo" />
                            <span class="logo-text">Musicart</span>
                        </div>
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
                <div className="order-success-container">
                    <img src="confetti.png" alt="Order Success Image" className="success-image" />
                    <h2>Order is placed successfully!</h2>
                    <p>You  will be receiving a confirmation email with order details</p>
                    <button className="home-button" onClick={() => navigate('/')}>Go back to Home page</button>
                </div>
            </div>
            <BottomBar/>
           
        </>
    );
}

export default OrderSuccess;
