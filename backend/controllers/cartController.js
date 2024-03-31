const Cart = require('../models/CartModel');
const mongoose = require('mongoose');

const addToCart = async (req, res) => {
    try {
      // Extract product ID and user ID from the request body
      const { productId, userId } = req.body;
  
      // Check if the product is already in the user's cart
      let cart = await Cart.findOne({ user: userId });
  
      if (!cart) {
        // If the user doesn't have a cart yet, create a new one
        cart = new Cart({ user: userId, products: [{ product: new mongoose.Types.ObjectId(productId), quantity: 1 }] });
      } else {
        // If the user already has a cart, check if the product is already in the cart
        const productIndex = cart.products.findIndex(product => product.product.equals(new mongoose.Types.ObjectId(productId)));
  
        if (productIndex !== -1) {
          cart.products[productIndex].quantity++;
        } else {
          // If the product is not yet in the cart, add it
          cart.products.push({ product: new mongoose.Types.ObjectId(productId), quantity: 1 } );
        }
      }
  
      // Save the updated cart to the database
      await cart.save();
  
      // Send a success response
      res.status(200).json({ success: true, message: 'Product added to cart successfully' });
    } catch (error) {
      // If an error occurs, send an error response
      console.error('Error adding product to cart:', error);
      res.status(500).json({ success: false, message: 'Failed to add product to cart' });
    }
  };

  //Update product quantity in cart for user
  const updateCartItemQuantity = async (req, res) => {
    try {
      // Extract item ID and quantity from the request body
      const { productId, quantity, userId } = req.body;
  
      // Find the user's cart based on user ID
      let cart = await Cart.findOne({ user: userId });
  
      if (!cart) {
        // If the user doesn't have a cart, send a response indicating the cart is not found
        return res.status(404).json({ success: false, message: 'Cart not found' });
      }
      
      // Find the index of the item in the cart products array
      const productIndex = cart.products.findIndex(product => product.product.equals(new mongoose.Types.ObjectId(productId)));
  
      if (productIndex === -1) {
        // If the item is not found in the cart, send a response indicating the item is not in the cart
        return res.status(404).json({ success: false, message: 'Product not found in the cart' });
      }
  
      // Update the quantity of the item in the cart
      cart.products[productIndex].quantity = quantity;
  
      // Save the updated cart to the database
      await cart.save();
  
      // Send a success response
      res.status(200).json({ success: true, message: 'Item quantity updated successfully' });
    } catch (error) {
      // If an error occurs, send an error response
      console.error('Error updating item quantity:', error);
      res.status(500).json({ success: false, message: 'Failed to update item quantity' });
    }
  };

  // Controller function to fetch user's cart data
const getUserCart = async (req, res) => {
    try {
      // Get the user's ID from the request object
      const userId = req.body.userId;
  
      // Find the user's cart in the database
      const cart = await Cart.findOne({ user: userId }).populate('products.product');
  
      if (!cart) {
        return res.status(201).json({ message: 'Cart not found' });
      }
  
      // Extract cart items and return them as a response
      const cartItems = cart.products.map(item => ({
        productId: item.product._id,
        imageUrl: item.product.imageUrl,
        productName: item.product.productName,
        color: item.product.color,
        price: item.product.price,
        quantity: item.quantity
      }));
  
      res.status(200).json(cartItems);
    } catch (error) {
      console.error('Error fetching cart data:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  
  module.exports = {addToCart, getUserCart, updateCartItemQuantity};