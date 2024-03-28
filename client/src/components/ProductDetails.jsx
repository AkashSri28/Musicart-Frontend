import React from 'react';
import '../styles/ProductDetails.css'; // Import the CSS file
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import TopBar from './TopBar';
import HorizontalBar from './HorizontalBar';

const ProductDetails = () => {
  const productId  = useParams().id; // Get the product ID from the URL
  const [product, setProduct] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/products/${productId}`);
        if (response.status === 200) {
          setProduct(response.data);
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
    try {
      const userId = JSON.parse(localStorage.getItem('user'))._id;
      // Make a POST request to add the product to the user's cart
      const response = await axios.post('http://localhost:4000/api/cart/add', {
        productId, userId
      });
      if (response.status === 200) {
        console.log('Product added to cart successfully');
        // Optionally, you can show a success message or update the UI
      } else {
        console.error('Failed to add product to cart');
        // Optionally, you can show an error message or handle the error
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
      // Optionally, you can show an error message or handle the error
    }
  };


  return (
    <div>
      <TopBar/>
      <div className="content-wrapper">
        <HorizontalBar/>

        {/* "Back to Products" button */}
        <button onClick={() => navigate(-1)}>Back to Products</button>

          {
            product?(
              <>
                <h2>{product.productName}</h2>
                <div className="product-details-content">
                  
                  {/* Left side for images */}
                  <div className="product-images">
                    {/* {product && product.imageUrl.map((image, index) => (
                      <img key={index} src={image} alt={`Product ${index + 1}`} />
                    ))} */}
                    {product && <img src={product.imageUrl} alt={product.productName} />}
                  </div>

                  {/* Right side for description */}
                  <div className="product-description">
                    <h2>{product.productName}</h2>

                    {/* Star ratings and customer review count */}
                    <div className="ratings">
                      {/* Star ratings component */}
                      <p>Customer reviews: {product.reviewsCount}</p>
                    </div>

                    <p>Price: ${product.price}</p>
                    <p>Color: {product.color}</p>
                    <p>Type: {product.productType}</p>
                    <p>About this item:</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    <p>Available: In stock</p>
                    <p>Brand: {product.brand}</p>
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
