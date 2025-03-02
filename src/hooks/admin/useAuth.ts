"use client"

import { useMutation, useQuery } from "@tanstack/react-query";
import {
    signup,
    login,
    forgetPassword,
    resetPassword,
    apiLogout,
    courseList,
    invoiceList,
 
    // registerCourse,
  } from "../../services/admin/api";

import { useDispatch } from "react-redux";
import {
    signin,
    logout,
    setPendingEmail,
    setVerificationToken,
  } from "../../features/authSlice";
  import { useRouter } from "next/navigation";
import { useToast } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { clearCourseState } from "@/features/courseSlice";


export const useSignup = () => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: signup,
    onSuccess: (data: any) => {
      if (!data?.user) {
        throw new Error("Invalid signup response");
      }
      
      const { email, verificationToken } = data.user;
      // Store all necessary data
      if (email) localStorage.setItem("pendingEmail", email);
      if (verificationToken)
        localStorage.setItem("verificationToken", verificationToken);
      // if (id) localStorage.setItem('pendingUserId', id);

      // Update Redux state
      dispatch(setPendingEmail(email));
      dispatch(setVerificationToken(verificationToken));
    },
    onError: (error) => {
      console.error("Signup failed:", error);
    },
  });
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

// hooks/admin/useAuth.ts
export const useLogin = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const toast = useToast();

  return useMutation({
    mutationFn: login,
    onSuccess: (response: AdminResponse) => {
      if (!response.Admin) {
        throw new Error(response.message || "Authentication failed");
      }

      // Map to AdminUser type from authSlice
      const adminUser = {
        email: response.Admin.email,
        id: response.Admin._id,
        role: "admin" as const,
        first_name: response.Admin.first_name,
        last_name: response.Admin.last_name,
        contact: response.Admin.contact,
        name: `${response.Admin.first_name} ${response.Admin.last_name}`
      };

      // Sync with localStorage and Redux
      
      localStorage.setItem("adminUser", JSON.stringify(adminUser));
      dispatch(signin(adminUser));
      router.push("/admin");
    },
    onError: (error: Error) => {
      toast({
        title: "Login Failed",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  });
};
// hooks/useAuth.ts
export const useLogout = () => {
  // These hooks are now properly called within a custom hook
  const dispatch = useDispatch();
  const router = useRouter();

  return useMutation({
    mutationFn: apiLogout,
    onSuccess: () => {
      
      dispatch(logout());
      dispatch(clearCourseState());
      router.push("/admin/login");
    }
  });
};


export const useForgotPassword = () => {
  return useMutation({
    mutationFn: forgetPassword,
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: ({
      token,
      data,
    }: {
      token: string;
      data: { password: string };
    }) => resetPassword(token, data),
  });
};



export const useCourseList = () => {
  return useQuery({
    queryKey: ['courses'],
    queryFn: courseList,
    staleTime: 60 * 1000, // 1 minute cache
  });
};



export const useCourses = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("https://tmp-se-project.azurewebsites.net/api/courses");
        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }
        const data = await response.json();
        if (data.success && data.courses) {
          setCourses(data.courses);
        } else {
          throw new Error("Invalid response from server");
        }
      } catch (err: any) {
        setError(err.message || "An error occurred while fetching courses");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return { courses, loading, error };
};








