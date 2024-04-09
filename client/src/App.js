import './App.css';

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './pages/Signup';
import ProductListing from './components/ProductListing'
import ProductDetails from './components/ProductDetails';
import Login from './pages/Login';
import Cart from './components/Cart';
import { AuthProvider, useAuth } from './context/authContext';
import { CartProvider } from './context/cartContext';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import InvoicePage from './pages/InvoicePage';
import InvoiceDetail from './pages/InvoiceDetail';
 // Import your Signup component

function App() {
  const {isLoggedIn} = useAuth();
  
  return (
      <Router>
        <div className="App">
              {/* Define your routes */}
              <Routes>
                <Route path="/" element={<ProductListing/>} />
                <Route path="/signup" element={<Signup/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/cart" element={isLoggedIn ? <Cart/> : <Navigate to="/login" /> } />
                <Route path="/checkout" element={isLoggedIn ? <Checkout /> :<Navigate to="/login" />  } />
                <Route path="/order-success" element={ isLoggedIn ? <OrderSuccess /> : <Navigate to="/login" /> } />
                <Route path="/product/:id" element={<ProductDetails/>} />
                <Route path="/invoices" element={ isLoggedIn ? <InvoicePage /> : <Navigate to="/login" /> } />
                <Route path="/invoices/:id" element={ isLoggedIn ? <InvoiceDetail /> : <Navigate to="/login" /> } />
                
              </Routes>
          </div>
       
    </Router>
  );
}


export default App;
