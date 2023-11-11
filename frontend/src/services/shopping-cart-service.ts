import { BACKEND_URL } from "../config/config";

export const getShoppingCart = async (userId:number) => {
  const response = await fetch(`${BACKEND_URL}/shopping-cart/${userId}`);

  if (!response.ok) {
    throw new Error(`Error in getting cart: ${response.status}`);
  }
  return response.json();
};

export const addToShoppingCart = async (userId:number , productId:number) => {
  const response = await fetch(`${BACKEND_URL}/shopping-cart/add/${userId}/${productId}`);

  if (!response.ok) {
    throw new Error(`Error in adding to cart: ${response.status}`);
  }
  return response.json();
};

export const removefromShoppingCart = async (userId:number , productId:number) => {
  const response = await fetch(`${BACKEND_URL}/shopping-cart/remove/${userId}/${productId}` , {method: 'DELETE'});

  if (!response.ok) {
    throw new Error(`Error in removing from cart: ${response.status}`);
  }
  return response.json();
};