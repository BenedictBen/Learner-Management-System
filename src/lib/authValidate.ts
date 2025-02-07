import { login } from "@/services/learner/api";

export async function validateUser(email: string, password: string) {
  try {
    const response = await login({ email, password });
    
    if (response.error || !response.user) {
      throw new Error(response.message || "Authentication failed");
    }

    return {
      id: response.user.id,
      email: response.user.email,
      name: "", // Add if available in response
      image: "" // Add if available in response
    };
  } catch (error) {
    console.error("Validation error:", error);
    throw error;
  }
}