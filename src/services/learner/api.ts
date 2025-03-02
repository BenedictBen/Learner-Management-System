import { Course } from "@/lib/types";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;


// api.ts
const handleResponse = async (response: Response) => {
  try {
    const data = await response.json();
    
    if (!response.ok) {
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
  const response = await fetch(`${BASE_URL}/user/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const responseData = await handleResponse(response);
  console.log('Raw Signup Response:', responseData); // Add debug log
  return responseData;
};



export const otpVerify = async (token: string) => {
  const response = await fetch(`${BASE_URL}/user/auth/verify-email`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: 'include', // Add this line
    body: JSON.stringify({ token }),
  });
  return handleResponse(response);
};




export const login = async (data: {
  email: string;
  password: string;
}): Promise<{ user?: { email: string; id: string };
message: string;
error?: string  }> => {
  try {
    const response = await fetch(`${BASE_URL}/user/auth/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });

    // Handle the response
    const result = await handleResponse(response);

    // Ensure the returned object has the required fields
    return {
      user: {
        email: result.user.email,
        id: result.user._id
      },
      message: result.message
    };
  } catch (error) {
    // Handle errors gracefully and return a default object
    console.error("Login Error:", error);
    return {
      message: "Network error occurred",
      error: error instanceof Error ? error.message : "Unknown error"
    };
  }
};

export const forgetPassword = async (data: { email: string }): Promise<void> => {
  const response = await fetch(`${BASE_URL}/user/auth/forget-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

export const resetPassword = async (token: string, data: {
  password: string;
}): Promise<void> => {
  const response = await fetch(`${BASE_URL}/user/auth/reset-password/${token}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};


export const registerCourse = async (data: any): Promise<void> => {
  try{

 
  const response = await fetch(`${BASE_URL}/learners`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      // "Authorization": `Bearer ${localStorage.getItem("token")}`
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorData = await response.json();

    throw new Error("Failed to create course");
  }
    const responseData = await handleResponse(response);

  return responseData 
}catch (error) {
  console.error("API request failed:", error);
  throw new Error("Failed to create course");
}

};


export const apiLogout = async (): Promise<void> => {
  const response = await fetch(`${BASE_URL}/user/auth/logout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
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