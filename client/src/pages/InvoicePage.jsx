// In InvoicePage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/authContext';
import TopBar from '../components/TopBar';
import HorizontalBar from '../components/HorizontalBar';
import { useNavigate } from 'react-router-dom';
import '../styles/InvoicePage.css'; // Import the CSS file

function InvoicePage() {
    // State to store invoices
    const [invoices, setInvoices] = useState([]);
    const {user} = useAuth();

    const navigate = useNavigate();

    // Function to fetch invoices
    useEffect(() => {        
        // Fetch invoices for the current user
        const fetchInvoices = async () => {
            try {              
                const response = await axios.post('https://musicart-backend-vw7t.onrender.com/api/invoices',{
                    userId: user._id
                });
                setInvoices(response.data);
                console.log(response.data)
            } catch (error) {
                console.error('Error fetching invoices:', error);
            }
        };

        fetchInvoices(); // Call fetchInvoices function
    }, [user]);

    const handleViewInvoice = (invoiceId) => {
        // Navigate to the invoice detail page with the invoice ID
        navigate(`/invoices/${invoiceId}`);
    };

    return (
        <div>
            <TopBar/>
            <div className='content-wrapper'>
                <HorizontalBar showCart={true}/>
                <button className="back-to-products-button" onClick={() => navigate('/')}>Back to Home</button>
                <div className="cart-title">
                    <span className="cart-title-text">My Invoices</span>
                </div>
            </div>
            
            {/* Render invoices here */}
            {invoices.length === 0 ? (
                <p className="empty-cart-message">No orders.</p>
            ) : (
                <div className='invoice-content'>
                    {invoices.map((invoice) => (
                        <div key={invoice.id} className="invoice-item">
                            {/* Display invoice image (to be provided) */}
                           

                            {/* Display user name and address */}
                            <div className="invoice-details">
                                <img src="invoice.png" alt="Invoice" className="invoice-image" />
                                <div className="invoice-details-column">
                                    <p>{invoice.userName}</p>
                                    <p style={{fontSize: '14px'}}>{invoice.address}</p>
                                </div>
                            </div>

                            {/* View invoice button */}
                            <button className="view-invoice-button" onClick={() => handleViewInvoice(invoice._id)}>View Invoice</button>
                        </div>
                    ))}
                </div>

            )}
            
        </div>
    );
}

export default InvoicePage;
