import React from 'react';
import '../styles/ProductDetails.css'; // Import the CSS file
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import TopBar from './TopBar';
import HorizontalBar from './HorizontalBar';
import { useCart } from '../context/cartContext';
import { useAuth } from '../context/authContext';

const ProductDetails = () => {
  const productId  = useParams().id; // Get the product ID from the URL
  const [product, setProduct] = useState(null);
  const { isLoggedIn } = useAuth(); 
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [selectedImage, setSelectedImage] = useState(null);


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://musicart-backend-vw7t.onrender.com/api/products/${productId}`);
        if (response.status === 200) {
          setProduct(response.data);
          setSelectedImage(response.data.imageUrl[0]);
        } else {
          console.error('Failed to fetch product');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = async () => {
    if (!isLoggedIn) {
      // If user is not logged in, redirect to login page
      navigate('/login');
      return;
    }
    addToCart(product); 
  };

  const handleThumbnailClick = (image) => {
    setSelectedImage(image);
  };


  return (
    <div>
      <TopBar/>
      <div className="content-wrapper">
        
        <div className="horizontal-bar">
          {/* Left side */}
          <div className="left-side">
            <div class="logo-container">
              <img src="logo.png" alt="Logo" class="logo" />
              <span class="logo-text">Musicart</span>
            </div>
            <Link to="/" className="nav-link">Home</Link> /
            <p style={{marginLeft: "10px"}}>{product?.productName}</p>
          </div>

        </div>

        {/* "Back to Products" button */}
        <button className='back-to-button' onClick={() => navigate(-1)}>Back to Products</button>

          {
            product?(
              <>
                <h2 className='product-title'>{product.description}</h2>
                <div className="product-details-content">
                  
                  {/* Left side for images */}
                  <div className="product-images">
                    {/* Large image */}
                    <div className="large-image-container">
                      <img className="product-image large-image" src={selectedImage} alt={product.productName} />
                    </div>

                    {/* Additional images */}
                    <div className="thumbnail-images-container">
                      {product.imageUrl
                      .filter((image) => image !== selectedImage)
                      .map((image, index) => (
                        <img
                          key={index}
                          className="thumbnail-image"
                          src={image}
                          alt={`Thumbnail ${index + 1}`}
                          onClick={() => handleThumbnailClick(image)}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Right side for description */}
                  <div className="product-description">
                    <h2>{product.productName}</h2>

                    {/* Star ratings and customer review count */}
                    <div className="ratings">
                      {/* Star ratings component */}
                      <p>Customer reviews: {product.reviewsCount}</p>
                    </div>

                    <p>Price - ₹ {product.price}</p>
                    <p>{product.color} | {product.productType}</p>
                    <div className='about-product'>

                      <p>About this item:</p>
                      <ul>
                        {product.about && product.about.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                      
                    </div>
                   
                    <p>Available: In stock</p>
                    <p>Brand: {product.company}</p>
                    <button onClick={handleAddToCart}>Add to Cart</button>
                    <button className='buy-now'>Buy Now</button>
                  </div>
                </div>
              </>
              
              
            ):(
              <p>Loading...</p>
          )}          
          
      </div>
      
    </div>
  );
};

export default ProductDetails;
