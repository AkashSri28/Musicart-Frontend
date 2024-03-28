const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');

// User registration route
router.post('/signup', registerUser);

// User login route
router.post('/login', loginUser);

module.exports = router;
