import { BACKEND_URL } from "../config/config";

export const fetchProducts = async () => {
    try {
      const response = await fetch(BACKEND_URL+'/product');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
};