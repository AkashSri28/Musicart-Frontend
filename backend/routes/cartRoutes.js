const express = require('express');
const router = express.Router();
const { addToCart, getUserCart,updateCartItemQuantity } = require('../controllers/cartController');

// POST route to add a product to the cart
router.post('/add', addToCart);

router.put('/updateQuantity', updateCartItemQuantity);

router.post('/', getUserCart);



module.exports = router;