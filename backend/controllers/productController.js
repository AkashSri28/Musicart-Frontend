const Product = require('../models/ProductModel');

// Controller function to fetch all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    console.log(products)
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const sortProducts = async (req, res) => {
  const { criteria } = req.query;

  try {
    let products;

    // Apply sorting based on the criteria
    if (criteria === 'priceLowest') {
      products = await Product.find().sort({ price: 1 });
    } else if (criteria === 'priceHighest') {
      products = await Product.find().sort({ price: -1 });
    } else if (criteria === 'nameAZ') {
      products = await Product.find().sort({ productName: 1 });
    } else if (criteria === 'nameZA') {
      products = await Product.find().sort({ productName: -1 });
    } else {
      // Default behavior if no criteria is provided
      products = await Product.find();
    }

    res.status(200).json(products);
  } catch (error) {
    console.error('Error sorting products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}


const getProductById = async (req, res)=>{
    try {
        const productId = req.params.id;
        console.log(productId)
        const product = await Product.findById(productId);
        if (!product) {
          return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error('Error fetching product by ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const searchProducts = async (req, res) => {
  try {
    const { query } = req.query;
    // Perform search operation based on the query
    const searchResults = await Product.find({ productName: { $regex: query, $options: 'i' } });
    res.status(200).json(searchResults);
  } catch (error) {
    console.error('Error searching products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const filterProducts = async (req, res) => {
  try {
    const { type, company, color, priceRange } = req.query;

    // Construct filter object based on provided parameters
    const filter = {};
    if (type) filter.productType = type;
    if (company) filter.company = company;
    if (color) filter.color = color;
    // Add logic for price range filtering if needed

    // Perform the database query with the constructed filter
    const filteredProducts = await Product.find(filter);

    res.status(200).json(filteredProducts);
  } catch (error) {
    console.error('Error filtering products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { getAllProducts, getProductById, searchProducts, filterProducts, sortProducts };
