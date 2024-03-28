import React, { useState } from 'react';
import '../styles/Login.css'; // Import your CSS file
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BottomBar from '../components/BottomBar';
import { useAuth } from '../context/authContext';

const Login = () => {
  // State variables for email/mobile number and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });

  const { login } = useAuth(); // Get the login function from AuthContext
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    let hasError = false;
    const updatedErrors = {};

    if (!email) {
      hasError = true;
      updatedErrors.email = true;
    } else {
      updatedErrors.email = false;
    }

    if (!password) {
      hasError = true;
      updatedErrors.password = true;
    } else {
      updatedErrors.password = false;
    }

    setErrors(updatedErrors);

    if (hasError) {
      return; // Stop submission if there are errors
    }

    try {
      // Make API call to authenticate user
      const response = await axios.post('http://localhost:4000/api/user/login', { email, password });

      // Handle successful login
      login(response.data.user, response.data.token); // Use the login function from AuthContext

      // If response is successful, redirect to the product listing page
      navigate('/')
    } catch (error) {
      // Handle login error (display error message, clear form fields, etc.)
      console.error('Login error:', error);
    }
  };

  // Function to navigate to the signup page
  const handleCreateAccount = () => {
    navigate('/signup'); // Replace '/signup' with the path to your signup page
  };

  return (
    <div className="login-container">
      <div className="header-container"> {/* Container for logo and text */}
        {/* Logo */}
        <img src="logo.png" alt="Logo" className="logo" />

        {/* Musicart text */}
        <h1>Musicart</h1>
    </div>

      <div className="form-container"> {/* Wrap the form in a div */}
        <h2>Sign in</h2>
        <form onSubmit={handleSubmit} className="sign-in-form"> {/* Add a class to the form */}
            {/* Email or mobile input */}
            <div className={`form-group ${errors.email ? 'error' : ''}`}>
            <label htmlFor="email">Enter your email or mobile number</label>
            <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <span className="error-message">*Required field</span>}
            </div>
            {/* Password input */}
            <div className={`form-group ${errors.password ? 'error' : ''}`}>
            <label htmlFor="password">Password</label>
            <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <span className="error-message">*Required field</span>}
            </div>
            {/* Submit button */}
            <button type="submit">Continue</button>

            {/* Agreement note */}
            <p>By continuing, you agree to Musicart privacy notice and conditions of use.</p>
        </form>
      </div>

        {/* New to Musicart */}
        <div className="new-to-musicart">
            <p>New to Musicart?</p>
            {/* Create account button */}
            <button onClick={handleCreateAccount}>Create your Musicart account</button>
        </div>

        <BottomBar/>
    </div>

  );
};

export default Login;
