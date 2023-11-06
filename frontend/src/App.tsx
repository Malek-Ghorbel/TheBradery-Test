import './App.css'
import Navbar from './components/Navbar';
import { ProductCard } from './components/ProductCard'

function App() {
  const itemElements = [];

  for (let i = 0; i < 22; i++) {
    itemElements.push(
      <ProductCard/>
    );
  }

  return (
    <>
      <Navbar/>
      <div className="container product-list">
        
        {itemElements}
      </div>
    </>
  );
}

export default App
