import './App.css'
import Navbar from './components/Navbar';
import CheckoutPage from './pages/CheckoutPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductPage from './pages/ProductPage';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  return (
    <>
      <Navbar/>
      <BrowserRouter>
      <Routes>
        <Route path="/"  Component={ProductPage} />
        <Route path="/checkout" Component={CheckoutPage} />
        <Route path="/login"  Component={Login} />
        <Route path="/signup"  Component={Signup} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App
