import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Signup.css'; // Import your CSS file
import BottomBar from '../components/BottomBar';

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    mobileNumber: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    name: false,
    mobileNumber: false,
    email: false,
    password: false,
  });

  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: false }); // Reset error state when input changes
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let hasError = false;
    const updatedErrors = {};

    Object.entries(formData).forEach(([key, value]) => {
      if (!value) {
        hasError = true;
        updatedErrors[key] = true;
      } else {
        updatedErrors[key] = false;
      }
    });
    console.log(hasError)
    console.log(updatedErrors)

    setErrors(updatedErrors);
    if (hasError) {
      return; // Stop submission if there are errors
    }

    try {
      const response = await axios.post('http://localhost:4000/api/user/signup', formData);
      if (response.status === 201) {
        setSuccessMessage('Registration successful! Please log in.');
        setFormData({
          name: '',
          mobileNumber: '',
          email: '',
          password: '',
        });

        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('token', response.data.token);
        // If response is successful, redirect to the product listing page
        navigate('/')
      }
      
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  return (
    <div className="signup-container">

      <div className="header-container">
        {/* Logo */}
        <img src="logo.png" alt="Logo" className="logo" />
        {/* Musicart text */}
        <h1>Musicart</h1>
      </div>

      <div className="form-container">

        <h2>Signup</h2>
        <form onSubmit={handleSubmit} className="signup-form">
          <div className={`form-group ${errors.name ? 'error' : ''}`}>
            <label>Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} />
            {errors.name && <span className="error-message">*Required field</span>}
          </div>
          <div className={`form-group ${errors.mobileNumber ? 'error' : ''}`}>
            <label>Mobile Number:</label>
            <input type="text" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} />
            {errors.mobileNumber && <span className="error-message">*Required field</span>}
          </div>
          <div className={`form-group ${errors.email ? 'error' : ''}`}>
            <label>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
            {errors.email && <span className="error-message">*Required field</span>}
          </div>
          <div className={`form-group ${errors.password ? 'error' : ''}`}>
            <label>Password:</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} />
            {errors.password && <span className="error-message">*Required field</span>}
          </div>

          {/* Agreement note */}
          <p>By enrolling your mobile phone number, you consent to receive automated security notifications via 
            text message from Musicart. Message and data rates may apply.</p>

          <button type="submit">Continue</button>

          {/* Agreement note */}
          <p>By continuing, you agree to Musicart privacy notice and conditions of use.</p>

          

        </form>
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

      </div>
      <p>Already have an account? <Link to="/login">Sign in</Link></p> {/* Add link to login page */}
      
      <BottomBar/>
    </div>
  );
}

export default Signup;
