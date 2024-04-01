import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/ProductListing.css'; // Import the CSS file
import axios from 'axios';
import TopBar from './TopBar';
import { useAuth } from '../context/authContext';
import { useCart } from '../context/cartContext';
import SortDropdown from './SortDropdown';
import { CiGrid41 } from "react-icons/ci";
import { IoGridSharp } from "react-icons/io5";
import { FaList } from "react-icons/fa";
import { TfiViewListAlt } from "react-icons/tfi";
import { FaSearch } from 'react-icons/fa';
import ViewCart from './ViewCart';


const ProductListing = () => {
  // const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState([]);
  const [sortingCriteria, setSortingCriteria] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [selectedType, setSelectedType] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState('');

  const navigate = useNavigate();
  const {isLoggedIn, user, logout} = useAuth();
  const { fetchCartItems, addToCart } = useCart(); 

  const [viewMode, setViewMode] = useState('grid');

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  const handleDetailsClick = (product) => {
    // Navigate to the description page for the selected product
    navigate(`/product/${product._id}`);
  };

  useEffect(() => {
    // Fetch products from backend API when component mounts
    const fetchProducts = async () => {
        try {
          const response = await axios.get('https://musicart-backend-vw7t.onrender.com/api/products');
          if (response.status === 200) {
            setProducts(response.data);
            setFilteredProducts(response.data);
          } else {
            console.error('Failed to fetch products');
          }
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      };

      fetchCartItems();  
      fetchProducts();
  }, []);

  useEffect(() => {
    // Fetch filtered products from the backend whenever the selected filters change
    const fetchFilteredProducts = async () => {
      try {
        const response = await axios.get('https://musicart-backend-vw7t.onrender.com/api/products/filter', {
          params: {
            type: selectedType,
            company: selectedCompany,
            color: selectedColor,
            priceRange: selectedPriceRange
          }
        });
        setFilteredProducts(response.data);
      } catch (error) {
        console.error('Error fetching filtered products:', error);
      }
    };

    fetchFilteredProducts();
  }, [selectedType, selectedCompany, selectedColor, selectedPriceRange]);

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const handleCompanyChange = (event) => {
    setSelectedCompany(event.target.value);
  };

  const handleColorChange = (event) => {
    setSelectedColor(event.target.value);
  };

  const handlePriceRangeChange = (event) => {
    setSelectedPriceRange(event.target.value);
  };

  const handleSearchChange = async (event) => {
    const searchTerm = event.target.value;
    setSearchQuery(event.target.value);
    
    //Search request to backend
    try {
      const response = await axios.get(`https://musicart-backend-vw7t.onrender.com/api/products/search?query=${searchTerm}`);
      if (response.status === 200) {
        setFilteredProducts(response.data);
      } else {
        console.error('Failed to fetch search results');
      }
    } catch (error) {
      console.error('Error searching products:', error);
    }
  };


  const handleSortingChange = async (criteria) => {
    setSortingCriteria(criteria);
    try {
      const response = await axios.get(`http://localhost:4000/api/products/sort?criteria=${criteria}`);
      if (response.status === 200) {
        setFilteredProducts(response.data);
      } else {
        console.error('Failed to fetch sorted products');
      }
    } catch (error) {
      console.error('Error fetching sorted products:', error);
    }
  };

  // Options for filter dropdowns
  const headphoneTypes = [...new Set(products.map(product => product.productType))];
  const companies = [...new Set(products.map(product => product.company))];
  const colors = [...new Set(products.map(product => product.color))];
  const priceRanges = ['Under $20', '$20 - $30', '$30 - $40', '$40 - $50', 'Over $50'];

   // Function to get user's initials
   const getUserInitials = () => {
    if (user && user.name) {
      const [firstName, lastName] = user.name.split(' ');
      return `${firstName.charAt(0)}${lastName ? lastName.charAt(0) : ''}`;
    }
    return '';
  };

  // Function to handle logout
  const handleLogout = () => {
    logout(); 
  };

  return (
    <div className="product-listing">
      {/* Top bar */}
      <div className="top-bar">
        <div className="phone-number">Phone: 123-456-7890</div>
        <div className="promotion">Get 50% off | Shop now</div>
        {!isLoggedIn && (
        <div className="auth-buttons">
          <Link to="/login">Login</Link>|
          <Link to="/signup">Signup</Link>
        </div>
        )}
      </div>

      <div className="content-wrapper">
        {/* Horizontal bar */}
        <div className="horizontal-bar">
          {/* Left side */}
          <div className="left-side">
            <div class="logo-container">
              <img src="logo.png" alt="Logo" class="logo" />
              <span class="logo-text">Musicart</span>
            </div>
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/invoices" className="nav-link">Invoice</Link>
          </div>
          {/* Right side */}
          <div className="right-side">
            {isLoggedIn && (
              <>
                <ViewCart showCartCount={true}/>
                
                {/* User profile button */}
                <button className="profile-button" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                  {getUserInitials()}
                  {isDropdownOpen && (
                    <div className="dropdown-content">
                      <p>{user.name}</p> {/* Full name */}
                      <button className="logout-button" onClick={handleLogout}>Logout</button> {/* Logout button */}
                    </div>
                  )}
                </button>
              </>
            )}
          </div>
        </div>

        {/* Banner */}
        <div className="banner">
          <img src="banner.png" alt="Banner" className="banner-image" />
        </div>

        {/* Search bar */}
        <div className="search-container">
          <span className="search-icon">&#128269;</span>
          <input
            type="text"
            placeholder={"Search by Product Name"}
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>

        {/* Additional bar */}
        <div className="additional-bar">
          {/* View toggle buttons */}
          <div className="view-toggle-buttons">
            <button
              className={`view-button ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => handleViewModeChange('grid')}
            >
              {viewMode === 'grid' ? <IoGridSharp className="view-icons"/> :<CiGrid41 className="view-icons"/>}
            </button>
            <button
              className={`view-button ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => handleViewModeChange('list')}
            >
              {viewMode === 'list' ? <FaList className="view-icons"/> : <TfiViewListAlt className="view-icons"/>}
            </button>
          </div>

          {/* Filter dropdowns */}
          <div className="filter-dropdowns">
            <select className="filter-dropdown" onChange={handleTypeChange}>

              <option value="">Headphone Type</option>
              {headphoneTypes.map((type, index) => (
                <option key={index} value={type}>{type}</option>
              ))}

            </select>
            <select className="filter-dropdown" onChange={handleCompanyChange}>
              <option value="">Company</option>
              {companies.map((type, index) => (
                <option key={index} value={type}>{type}</option>
              ))}
            </select>
            <select className="filter-dropdown" onChange={handleColorChange}>
              <option value="">Color</option>
              {colors.map((type, index) => (
                <option key={index} value={type}>{type}</option>
              ))}
            </select>
            <select className="filter-dropdown" onChange={handlePriceRangeChange}>
              <option value="">Price</option>
              {priceRanges.map((type, index) => (
                <option key={index} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Sort by dropdown */}
          <SortDropdown onSortingChange={handleSortingChange}/>
        </div>


        {/* Product grid/list */}
        <div className={`product-${viewMode}`}>
          {/* For grid view */}
          {viewMode === 'grid' && (
            <div className="product-grid">
              {filteredProducts.map((product) => (
              <div key={product.id} className="product-card">

                <div className="product-image-container">

                  <img 
                    src={product.imageUrl} 
                    alt={product.productName} 
                    onClick={() => handleDetailsClick(product)}
                    style={{ cursor: 'pointer' }}
                  />
                  <div className="add-to-cart-button" onClick={() => addToCart(product)}>
                    <img src="cart_icon.png" alt="Add to Cart" />
                  </div>

                </div>
                
                <div className="product-details">
                  <h3>{product.productName}</h3>
                  <p>Price: {product.price}</p>
                  <p>{product.color}</p>
                  <p>{product.productType}</p>
                </div>
              </div>
            ))}
            </div>
          )}

          {/* For list view */}
          {viewMode === 'list' && (
            <div className="product-list">
              {filteredProducts.map((product) => (
              <div key={product.id} className="product-card">
                
                <div className="product-image-container">

                  <img 
                    src={product.imageUrl} 
                    alt={product.productName} 
                    onClick={() => handleDetailsClick(product)}
                    style={{ cursor: 'pointer' }}
                  />
                  <div className="add-to-cart-button" onClick={() => addToCart(product)}>
                    <img src="cart_icon.png" alt="Add to Cart" />
                  </div>

                </div>
                <div className="product-details">
                  <h3>{product.productName}</h3>
                  <p>Price: {product.price}</p>
                  <p>{product.color}</p>
                  <p>{product.description}</p>
                  <p>{product.productType}</p>
                  <button onClick={() => handleDetailsClick(product)}>Details</button>
                </div>
              </div>
            ))}
            </div>
          )}
          
        </div>
      </div>
      
    </div>
  );
};

export default ProductListing;
