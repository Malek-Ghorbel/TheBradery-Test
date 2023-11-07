import './App.css'
import Navbar from './components/Navbar';
import CheckoutPage from './pages/CheckoutPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductPage from './pages/ProductPage';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  const cartItems = [
    {
      id: 1,
      title: 'Product 1',
      price: 19.99,
      imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
    },
    {
      id: 2,
      title: 'Product 2',
      price: 29.99,
      imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
    },
  ];

  return (
    <>
      <Navbar/>
      <BrowserRouter>
      <Routes>
        <Route path="/"  Component={ProductPage} />
        <Route path="/checkout" Component={() => <CheckoutPage cartItems={cartItems} />} />
        <Route path="/login"  Component={Login} />
        <Route path="/signup"  Component={Signup} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App
