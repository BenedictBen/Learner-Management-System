export const API_BASE_URL = "https://tmp-se-project.azurewebsites.net/api";



const handleResponse = async (response: Response) => {
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || `HTTP error! status: ${response.status}`);
  }
  
  return data;
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
  const response = await fetch(`${API_BASE_URL}/user/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const responseData = await handleResponse(response);
  console.log('Raw Signup Response:', responseData); // Add debug log
  return responseData;
};

// services/learner/api.ts
export const otpVerify = async (token: string): Promise<{ 
  User: { 
    email: string; 
    _id: string 
  } 
}> => {
  const response = await fetch(`${API_BASE_URL}/user/auth/verify-email`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token }), // Send only the token
  });
  return handleResponse(response);
};



export const login = async (data: {
  email: string;
  password: string;
}): Promise<{ 
  email: string, 
  id: string, 
  message: string 
}> => {
  const response = await fetch(`${API_BASE_URL}/user/auth/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: 'include',
    body: JSON.stringify(data),
  });
  
  const result = await handleResponse(response);
  
  return {
    email: result.user.email,
    id: result.user._id,
    message: result.message
  };
};


export const forgetPassword = async (data: { email: string }): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/user/auth/forget-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

export const resetPassword = async (token: string, data: {
  password: string;
}): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/user/auth/reset-password/${token}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};


export const createCourse = async (data: {
  firstname: string;
  lastname: string;
  email: string;
  course: string;
  gender: string;
  location: string;
  phone: string;
  disability: string;
  image: string;
  description: string;
  amount: number;
}, token: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/learners`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};


export const apiLogout = async (): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/user/auth/logout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  return handleResponse(response);
};