import { BACKEND_URL } from "../config/config";

// fetch products from backend
export const fetchProducts = async () => {
  const response = await fetch(BACKEND_URL+'/product');      
  if (!response.ok) {
    throw new Error(`Error in getting products: ${response.status}`);
  }
  return response.json();
};
