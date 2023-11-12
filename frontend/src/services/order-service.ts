import { BACKEND_URL } from "../config/config";
import { CreateOrderDto } from "../dto/order.dto";

// Send an order request
export const createOrder = async (body: CreateOrderDto) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${BACKEND_URL}/orders/create` , {
        method: 'POST' , 
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(body)
    });
    if (!response.ok) {
      throw new Error(`Error in creating order: ${response.text}`);
    }
    return response.json();
};