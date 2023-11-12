import { BACKEND_URL } from "../config/config";

// Backend calls for shopping cart operations

export const getShoppingCart = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${BACKEND_URL}/shopping-cart` , {
    method: 'GET' , 
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    },
  });

  if (!response.ok) {
    throw new Error(`Error in getting cart: ${response.status}`);
  }
  return response.json();
};

export const addToShoppingCart = async (productId:number) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${BACKEND_URL}/shopping-cart/add/${productId}`,{
    method: 'GET' , 
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    },
  });

  if (!response.ok) {
    throw new Error(`Error in adding to cart: ${response.status}`);
  }
  return response.json();
};

export const removefromShoppingCart = async (productId:number) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${BACKEND_URL}/shopping-cart/remove/${productId}` , {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });

  if (!response.ok) {
    throw new Error(`Error in removing from cart: ${response.status}`);
  }
  return response.json();
};