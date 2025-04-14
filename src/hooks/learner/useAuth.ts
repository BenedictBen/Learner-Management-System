import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  signup,
  login,
  forgetPassword,
  resetPassword,
  otpVerify,
  apiLogout,
  courseList,
  registerCourse,
} from "../../services/learner/api";
import { useDispatch, useSelector } from "react-redux";
import {
  setPendingEmail,
  setVerificationToken,
  clearTemporaryPassword,
} from "../../features/authSlice";
import { useState, useEffect } from "react";
import {  clearCourseState } from "@/features/courseSlice";

import {  learnerLogout } from "@/features/learnerAuthSlice"
import { useRouter } from "next/navigation";
import { useToast } from "@chakra-ui/react";
import { RootState } from "@/lib/store";
import { signIn } from "next-auth/react";



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


export const useOtpVerify = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { pendingUserEmail, temporaryPassword } = useSelector((state: RootState) => state.auth);
  const toast = useToast();

  return useMutation({
    mutationFn: otpVerify,
    onSuccess: async (data) => {
      try {
        // 1. Get user data from OTP verification response
        const { email, _id: id } = data.User;
        
        // 2. Automatically log the user in using credentials
        const result = await signIn('learner', {
          redirect: false,
          email: pendingUserEmail || email,
          password: temporaryPassword,
        });

        // 3. Handle login result
        if (result?.error) {
          throw new Error(result.error);
        }

        // 4. Update auth state and storage
        // dispatch(signin({ email, id }));
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userId", id);

        // 5. Cleanup temporary data
        localStorage.removeItem("pendingEmail");
        localStorage.removeItem("verificationToken");
        dispatch(clearTemporaryPassword());

        // 6. Redirect directly to dashboard
        router.push("/learner");

      } catch (error: any) {
        console.error("Post-verification login failed:", error);
        toast({
          title: "Authentication Error",
          description: error.message || "Failed to complete login process",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
       
      }
    },
    onError: (error: Error) => {
      console.error("OTP Verification failed:", error.message);
      toast({
        title: "Verification Failed",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
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

// hooks/learner/useAuth.ts
export const useRegisterCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: registerCourse, // Directly use the API function
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      // You can add toast here if you want
    },
    onError: (error) => {
      console.error("Course creation failed:", error);
    },
  });
};

// hooks/useLogout.ts
export const useLogout = () => {
  const dispatch = useDispatch();
 
  const router = useRouter();

  return useMutation({
    mutationFn: apiLogout,

    onSuccess: () => {
      // Reset Redux state
      // document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;';
      dispatch(learnerLogout());
      dispatch(clearCourseState());

      // Force full page reload
      router.push('/learner');
      // setTimeout(() => window.location.reload(), 100);
    },
    onError: (error) => {
      console.error("Logout failed:", error);
      // Consider showing error toast
    },
  });
};


// Add to your existing query hooks file
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
