import './App.css'
import { ProductCard } from './components/ProductCard'

function App() {
  const itemElements = [];

  for (let i = 0; i < 22; i++) {
    itemElements.push(
      <ProductCard/>
    );
  }

  return (
    <div className="product-list">
      {itemElements}
    </div>
  );
}

export default App
