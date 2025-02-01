export const API_BASE_URL = "https://tmp-se-project.azurewebsites.net/api";

export const signup = async (data: {
  email: string;
  password: string;
}): Promise<{ token: string }> => {
  const response = await fetch(`${API_BASE_URL}/user/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const handleResponse = async (response: Response) => {
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || `HTTP error! status: ${response.status}`);
  }
  
  return data;
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