// server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
require('dotenv').config();

// Create Express app
const app = express();

// Middleware for parsing JSON bodies
app.use(cors(
  {
    origin: ["https://musicart2-frontend.vercel.app"],
    methods:["POST", "GET", "PUT"],
    credentials: true
  }
));

app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://sriakash2009:admin@cluster0.hbcyh4c.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(()=>{
    // Listen for requests
    app.listen(process.env.PORT, () => {
    console.log(`Connected to DB, Sever is running on port ${process.env.PORT}`);
    console.log(process.env.PORT);
  });
})
.catch((error)=>{
    console.log(error)
})


// Routes
app.use('/api/user', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);

