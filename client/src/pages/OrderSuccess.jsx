// OrderSuccess.js
import React from 'react';
import TopBar from '../components/TopBar';
import { Link } from 'react-router-dom';

function OrderSuccess() {
    return (
        <div>
            <TopBar />
            <div className="content-wrapper">
                <h2>Your order has been placed successfully!</h2>
                <p>Thank you for shopping with us.</p>
                <Link to="/">Back to Home</Link>
            </div>
        </div>
    );
}

export default OrderSuccess;
