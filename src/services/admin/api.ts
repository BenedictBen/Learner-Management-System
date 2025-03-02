// import { Credentials } from 'next-auth/providers/credentials';
import { Course, Invoice } from "@/lib/types";
import { useSession } from "next-auth/react";
import Cookies from 'js-cookie';
// import Invoices from "@/app/api/auth/invoices/route";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;



const handleResponse = async (response: Response) => {
    try {
      const data = await response.json();
      
      if (!response.ok) {
        // Handle different error structures
        const errorMessage = data.error?.message || 
                            data.message || 
                            `HTTP error! status: ${response.status}`;
        throw new Error(errorMessage);
      }
      
      return data;
    } catch (error) {
      console.error("Error handling response:", error);
      throw new Error("Failed to process server response");
    }
  };


  export const signup = async (data: {
    email: string;
    password: string;
  }): Promise<{ 
    user: {
      success: boolean;
    message: string;
      email: string;
      verificationToken: string;
      _id: string;
      // Add other user fields if needed
    }
  }> => {
    const response = await fetch(`${BASE_URL}/admin/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const responseData = await handleResponse(response);
    console.log('Raw Signup Response:', responseData); // Add debug log
    return responseData;
  };
  
  export const otpVerify = async (token: string) => {
    const response = await fetch(`${BASE_URL}/admin/auth/verify-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: 'include', 
      body: JSON.stringify({ token }),
    });
    return handleResponse(response);
  };
  
  
  interface AdminResponse {
    Admin?: {
      _id: string;
      email: string;
      first_name: string;
      last_name: string;
      contact: string;
    };
    message: string;
    error?: string;
  }
  

export const login = async (data: {
  email: string;
  password: string;
}): Promise<AdminResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/admin/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // This is crucial for cookies
      body: JSON.stringify(data),
    });  

    const result = await handleResponse(response);
    
    if (!result.Admin) {
      throw new Error("Admin not found in response");
    }

    return {
      Admin: {
        _id: result.Admin._id,
        email: result.Admin.email,
        first_name: result.Admin.first_name,
        last_name: result.Admin.last_name,
        contact: result.Admin.contact,
      },
      message: result.message,
    };
  } catch (error) {
    console.error("Login Error:", error);
    return {
      message: "Login failed",
      error: error instanceof Error ? error.message : "Unknown error"
    };
  }
};
  
  export const forgetPassword = async (data: { email: string }): Promise<void> => {
    const response = await fetch(`${BASE_URL}/admin/auth/forget-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  };
  
  export const resetPassword = async (token: string, data: {
    password: string;
  }): Promise<void> => {
    const response = await fetch(`${BASE_URL}/admin/auth/reset-password/${token}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  };


  
  export const courseList = async (): Promise<Course[]> => {
    const response = await fetch("https://tmp-se-project.azurewebsites.net//api/courses", {
      method: "GET",
      headers: { 
        "Content-Type": "application/json",
      },
      
    })
    const data = await handleResponse(response);
    // First check if response has the expected structure
    if (!data.success || !Array.isArray(data.courses)) {
      throw new Error('Invalid courses response format');
    }
  
    return data.courses; // Return the nested array
  }
  
// import { fetchWithAuth } from "@/lib/api-client";

// apiLogout.ts

export const apiLogout = async (): Promise<void> => {
  try {
    // Client-side cleanup
    Cookies.remove('token', { path: '/' });
    
    // Call server-side API route
    await fetch('/api/auth/logout', {
      method: 'POST'
    });

  } catch (error) {
    console.error('Logout error:', error);
    throw new Error('Logout failed');
  }
};
  


export const invoiceList = async (): Promise<Invoice[]> => {
  const Invoices = '/api/auth/invoices'
  
  const response = await fetch(Invoices, {
    method: "GET",
    headers: { 
      "Content-Type": "application/json",
      credentials: "include", 
    },
    
  })
  const data = await handleResponse(response);
  console.log(data)
  // First check if response has the expected structure
  if (!data.success || !Array.isArray(data.courses)) {
    throw new Error('Invalid courses response format');
  }

  return data.courses; 
} 