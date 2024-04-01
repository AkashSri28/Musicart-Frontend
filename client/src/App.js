import './App.css';

import { BrowserRouter as Router, Routes, Route, Redirect } from 'react-router-dom';
import Signup from './pages/Signup';
import ProductListing from './components/ProductListing'
import ProductDetails from './components/ProductDetails';
import Login from './pages/Login';
import Cart from './components/Cart';
import { AuthProvider } from './context/authContext';
import { CartProvider } from './context/cartContext';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import InvoicePage from './pages/InvoicePage';
import InvoiceDetail from './pages/InvoiceDetail';
 // Import your Signup component

function App() {
  return (
      <Router>
        <AuthProvider>
          <CartProvider>

            <div className="App">
              {/* Define your routes */}
              <Routes>
                <Route path="/" element={<ProductListing/>} />
                <Route path="/signup" element={<Signup/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/cart" element={<Cart/>} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/order-success" element={<OrderSuccess />} />
                <Route path="/product/:id" element={<ProductDetails/>} />
                <Route path="/invoices" element={<InvoicePage />} />
                <Route path="/invoices/:id" element={<InvoiceDetail />} />
                
              </Routes>
            </div>

          </CartProvider>
          

        </AuthProvider>
       
    </Router>
  );
}


export default App;
