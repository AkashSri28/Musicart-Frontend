import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import TopBar from '../components/TopBar';
import HorizontalBar from '../components/HorizontalBar';
import { useNavigate } from 'react-router-dom';
import '../styles/Checkout.css'; 

function InvoiceDetail() {
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);
  const navigate = useNavigate();

  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const response = await axios.get(`https://musicart-backend-vw7t.onrender.com/api/invoices/${id}`);
        setInvoice(response.data);
      } catch (error) {
        console.error('Error fetching invoice:', error);
      }
    };

    fetchInvoice();
  }, [id]);

  const handleImageClick = (productName, color) => {
        setSelectedProduct({ productName, color });
    };

  return (
    <div>
        <TopBar />
        <div className='content-wrapper'>

                <HorizontalBar/>
                <button className="back-to-button" onClick={() => navigate('/cart')}>Back to cart</button>
                <h2 className='checkout-title'>Invoice</h2>
                {invoice && 
                <div className="checkout-content">
                    <div className="checkout-section"> 
                        <div className="delivery-form-section">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="name">1. Delivery address</label>
                                    <div>
                                        <input type="text" id="name" value={invoice.userName} readOnly className="styled-input" />
                                        <textarea id="address" name="address" value={invoice.address} rows="4"></textarea>
                                    </div>
                                </div>
                                <hr/>

                                <div className="form-group">
                                    <label htmlFor="payment-method">2. Payment Method:</label>
                                    <select id="payment-method" name="payment-method" readOnly value={invoice.paymentMethod}>
                                        <option> Mode of payment</option>
                                        <option value="pay-on-delivery">Pay on Delivery</option>
                                        <option value="upi">UPI</option>
                                        <option value="card">Card</option>
                                    </select>
                                </div>
                                <hr/>

                                <div className="form-group">
                                    <label htmlFor="name">3. Review items and delivery</label>
                                    <div>
                                        <div className="cart-item-images">
                                            {invoice.cartItems.map((item) => (
                                                <div className='cart-image-container'
                                                    key={item.productId} 
                                                    onClick={() => handleImageClick(item.productName, item.color)}
                                                    >
                                                    <img 
                                                        src={item.imageUrl} 
                                                        alt={item.productName}  
                                                        className={selectedProduct && selectedProduct.productName === item.productName ? 'cart-item-image-selected' : 'cart-item-image'} 
                                                    />
                                                </div>
                                            ))}
                                        </div>

                                        {selectedProduct && (
                                            <div>
                                                <p style={{ fontSize: '18px', fontWeight: 'bold' }}>{selectedProduct.productName}</p>
                                                <p style={{ color: '#797979' }}>Color: {selectedProduct.color}</p>
                                            </div>
                                        )}
                                        <p>Delivery : Monday — FREE Standard Delivery</p>
                                    </div>
                                </div>
                                <hr/>
                            </form>
                        </div>
                    </div>

                    <div className="order-summary-section">
                        <div className="order-items">
                            <p className="order-summary-title">Order Summary</p>
                            {/* Repeat this div for each item in the cart */}

                            <div className="order-total-vertical">
                                <div className="order-details-vertical">
                                    <p>Items:</p>
                                    <p>₹{invoice.cartTotal}</p>
                                </div>
                                <div className="order-details-vertical">
                                    <p>Delivery:</p>
                                    <p>₹45.00</p>
                                </div>
                                <hr />
                                <div className="order-details-vertical" style={{color:'#B52B00', fontSize: '15px', fontWeight:'bold'}}>
                                    <p>Order Total:</p>
                                    <p>₹{(invoice.cartTotal + 45.00).toFixed(2)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
}
            </div>
    </div>
  );
}

export default InvoiceDetail;
