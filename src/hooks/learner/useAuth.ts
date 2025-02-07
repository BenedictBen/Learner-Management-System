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
  signin,
  logout,
  setPendingEmail,
  setVerificationToken,
  clearTemporaryPassword,
} from "../../features/authSlice";
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

// export const useOtpVerify = () => {
//   const dispatch = useDispatch();
//   const router = useRouter();

//   return useMutation({
//     mutationFn: otpVerify,
//     onSuccess: (data) => {
//       const { email, _id: id } = data.User;

//       dispatch(signin({ email, id }));

//       localStorage.setItem("userEmail", email);
//       localStorage.setItem("userId", id);

//       localStorage.removeItem("pendingEmail");
//       localStorage.removeItem("verificationToken");

//       router.push("/learner");
//     },
//     onError: (error: Error) => {
//       console.error("OTP Verification failed:", error.message);
//     },
//   });
// };

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
        const result = await signIn('credentials', {
          redirect: false,
          email: pendingUserEmail || email,
          password: temporaryPassword,
        });

        // 3. Handle login result
        if (result?.error) {
          throw new Error(result.error);
        }

        // 4. Update auth state and storage
        dispatch(signin({ email, id }));
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userId", id);

        // 5. Cleanup temporary data
        localStorage.removeItem("pendingEmail");
        localStorage.removeItem("verificationToken");
        dispatch(clearTemporaryPassword());

        // 6. Redirect directly to dashboard
        router.push("/learner/dashboard");

      } catch (error: any) {
        console.error("Post-verification login failed:", error);
        toast({
          title: "Authentication Error",
          description: error.message || "Failed to complete login process",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        router.push("/learner");
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

export const useLogin = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  return useMutation({
    mutationFn: login,
    onSuccess: (data: { email: string; id: string }) => {
      // Store user information in localStorage
      localStorage.setItem("userEmail", data.email);
      localStorage.setItem("userId", data.id);

      // Dispatch the signin action to update Redux state
      dispatch(signin({ email: data.email, id: data.id }));

      // Redirect the user to the learner dashboard
      router.push("/learner/dashboard");
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

// export const useRegisterCourse = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async (data: {
//       firstname: string;
//       lastname: string;
//       email: string;
//       course: string;
//       gender: string;
//       location: string;
//       phone: string;
//       disability: boolean;
//       image: string;
//       description: string;
//       amount: number;
//     }) => {
//       // const token = localStorage.getItem("token");
//       // if (!token) throw new Error("No authentication token found");

//       // Pass token inside the headers if required
//       return await registerCourse(data);
//     },

//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["courses"] });
//     },
//     onError: (error) => {
//       console.error("Course creation failed:", error);
//     },
//   });
// };

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

export const useLogout = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  return useMutation({
    mutationFn: apiLogout,
    onSuccess: () => {
      dispatch(logout());
      router.push("/login");
    },
    onError: (error) => {
      console.error("Logout failed:", error);
      // Handle logout failure if needed
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