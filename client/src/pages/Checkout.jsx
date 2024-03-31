import React, { useState, useRef } from 'react'
import TopBar from '../components/TopBar'
import HorizontalBar from '../components/HorizontalBar';
import { useNavigate } from 'react-router-dom';
import '../styles/Checkout.css'; // Import the CSS file
import { useAuth } from '../context/authContext';
import { useCart } from '../context/cartContext';
import axios from 'axios';

function Checkout() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { cartItems, cartTotal } = useCart();

    const [selectedProduct, setSelectedProduct] = useState(null);

    const addressRef = useRef(null);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

    const handleImageClick = (productName, color) => {
        setSelectedProduct({ productName, color });
    };

    const handlePlaceOrder = async (event) => {
        event.preventDefault(); 

        if (addressRef.current.value.trim() === '') {
            alert('Please fill out the delivery address');
            return;
        }

        if (!selectedPaymentMethod) {
            alert('Please select a payment method');
            return;
        }

        // Prepare the invoice data
        const invoiceData = {
            userId: user._id, // Assuming user._id is accessible
            userName: user.name, // Assuming user.name is accessible
            address: addressRef.current.value.trim(),
            paymentMethod: selectedPaymentMethod,
            cartItems: cartItems.map(item => ({
                productId: item.productId,
                productName: item.productName,
                quantity: item.quantity,
                price: item.price
            })),
            cartTotal: cartTotal
        };

        try {
            // Send a POST request to save the invoice data
            const response = await axios.post('https://musicart-backend-vw7t.onrender.com/api/invoices', invoiceData);
    
            // Check if the request was successful
            if (response.status === 201) {
                // Redirect to the success page
                console.log(response.data)
                navigate('/order-success');
            } else {
                console.error('Failed to save invoice data');
                // Optionally, you can display an error message to the user
            }
        } catch (error) {
            console.error('Error saving invoice data:', error);
            // Optionally, you can display an error message to the user
        }
    };

    const handlePaymentMethodChange = (e) => {
        setSelectedPaymentMethod(e.target.value);
    };

  return (
    <div>

        <TopBar/>
        <div className='content-wrapper'>

            <HorizontalBar/>
            <button className="back-to-products-button" onClick={() => navigate('/cart')}>Back to cart</button>
            <h2 className='checkout-title'>Checkout</h2>
            <div className="checkout-content">
                <div className="checkout-section">
                    <div className="delivery-form-section">
                        <form>
                            <div className="form-group">
                                <label htmlFor="name">1. Delivery address</label>
                                <div>
                                    <input type="text" id="name" value={user?.name} readOnly className="styled-input" />
                                    <textarea ref={addressRef} id="address" name="address" rows="4"></textarea>
                                </div>
                            </div>
                            <hr/>

                            <div className="form-group">
                                <label htmlFor="payment-method">2. Payment Method:</label>
                                <select id="payment-method" name="payment-method" onChange={handlePaymentMethodChange}>
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
                                        {cartItems.map((item) => (
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
                                            <p>Estimated delivery : Monday — FREE Standard Delivery</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <hr/>
                        </form>
                    </div>
                    <div className="place-order-section">
                        <button onClick={handlePlaceOrder} className="place-order-button">Place your order</button>
                        <div className="order-details">
                            <p className="order-total">Order Total: ₹{cartTotal}</p>
                            <p className="order-terms">By placing your order, you agree to our Terms of Use and Privacy Notice.</p>
                        </div>
                    </div>
                </div>
              

                <div className="order-summary-section">
                    <button onClick={handlePlaceOrder} className="place-order-button">Place your order</button>
                    <p className="order-terms">By placing your order, you agree to our Terms of Use and Privacy Notice.</p>
                    <hr/>
                    <div className="order-items">
                        <p className="order-summary-title">Order Summary</p>
                        {/* Repeat this div for each item in the cart */}

                        <div className="order-total-vertical">
                            <div className="order-details-vertical">
                                <p>Items:</p>
                                <p>₹{cartTotal}</p>
                            </div>
                            <div className="order-details-vertical">
                                <p>Delivery:</p>
                                <p>₹45.00</p>
                            </div>
                            <hr />
                            <div className="order-details-vertical" style={{color:'#B52B00', fontSize: '15px', fontWeight:'bold'}}>
                                <p>Order Total:</p>
                                <p>₹{(cartTotal + 45.00).toFixed(2)}</p>
                            </div>
                        </div>
                    </div>


                   
                 </div>
            </div>
        </div>
    </div>
  )
}

export default Checkout