import { BACKEND_URL } from "../config/config";

// login and signup calls
export const loginUser = async (email: string , password: string) => {
    const response = await fetch(`${BACKEND_URL}/auth/login` , {
        method: 'POST' , 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      throw new Error(`Wrong email or password`);
    }
    return response.json();
};

export const registerUser = async (email: string , password: string, fullName:string) => {
    const response = await fetch(`${BACKEND_URL}/auth/register` , {
        method: 'POST' , 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, fullName, password }),
    });
    if (!response.ok) {
      throw new Error(`Error creating user ${response.text}`);
    }
    return response.json();
};