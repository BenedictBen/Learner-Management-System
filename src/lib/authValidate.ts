import { login } from "@/services/learner/api";

// src/lib/authValidate.ts
export async function validateUser(email: string, password: string) {
  try {
    const response = await login({ email, password });
    
    if (response.error || !response.user) {
      throw new Error(response.message || "Authentication failed");
    }
    
    return response.user;
  } catch (error) {
    console.error("Validation error:", error);
    throw new Error(
      (error as Error).message || "Network error. Please check your connection."
    );
  }
}