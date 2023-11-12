import { BACKEND_URL } from "../config/config";
import { CreateOrderDto } from "../models/order-dto";

// request for making an order
export const createOrder = async (body: CreateOrderDto) => {
    const response = await fetch(`${BACKEND_URL}/orders/create` , {
        method: 'POST' , 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    if (!response.ok) {
      throw new Error(`Error in creating order: ${response.status}`);
    }
    return response.json();
};