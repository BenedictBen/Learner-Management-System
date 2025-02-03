import { useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  signup, login, forgetPassword, resetPassword, otpVerify, createCourse, apiLogout 
} from "../../services/learner/api";
import { useDispatch } from "react-redux";
import { signin, logout,setPendingEmail, setVerificationToken  } from "../../features/authSlice";
import { useRouter } from "next/navigation";


export const useSignup = () => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: signup,
    onSuccess: (data : any) => {
      if (!data?.user) {
        throw new Error('Invalid signup response');
      }
      // const { email, verificationToken, _id: id } = data.user;
      const { email, verificationToken } = data.user;
      console.log('Signup Response:', data);
      console.log('Verification Token:', verificationToken);
      // Store all necessary data
      if (email) localStorage.setItem('pendingEmail', email);
      if (verificationToken) localStorage.setItem('verificationToken', verificationToken);
      // if (id) localStorage.setItem('pendingUserId', id);
      
      // Update Redux state
      dispatch(setPendingEmail(email));
      dispatch(setVerificationToken(verificationToken));
    },
    onError: (error) => {
      console.error('Signup failed:', error);
    }
  });
};

// export const useOtpVerify = () => {
//   const dispatch = useDispatch();
//   const router = useRouter();

//   return useMutation({
//     mutationFn: async (otpCode: string) => {
//       const verificationToken = localStorage.getItem('verificationToken');
      
//       if (!verificationToken) {
//         throw new Error('Missing verification token');
//       }
      
//       return otpVerify({ 
//         otp: otpCode,
//         token: verificationToken 
//       });
//     },
//     onSuccess: (data) => {
//       const { email, _id: id } = data.user;
      
//       // Update auth state
//       dispatch(signin({ email, id }));
      
//       // Persist user session
//       localStorage.setItem('userEmail', email);
//       localStorage.setItem('userId', id);
      
//       // Clear temporary storage
//       localStorage.removeItem('pendingEmail');
//       localStorage.removeItem('verificationToken');
      
//       router.push("/learner");
//     },
//     onError: (error: Error) => {
//       console.error('OTP Verification failed:', error.message);
//     }
//   });
// };


export const useOtpVerify = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  return useMutation({
    mutationFn: otpVerify, 
    onSuccess: (data) => {
      const { email, _id: id } = data.User;
      
      // Update auth state
      dispatch(signin({ email, id }));
      
      // Persist user session
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userId', id);
      
      // Clear temporary storage
      localStorage.removeItem('pendingEmail');
      localStorage.removeItem('verificationToken');
      
      router.push("/learner");
    },
    onError: (error: Error) => {
      console.error('OTP Verification failed:', error.message);
    }
  });
};

  
  export const useLogin = () => {
    const dispatch = useDispatch();
    const router = useRouter();
  
    return useMutation({
      mutationFn: login,
      onSuccess: (data: { email: string; id: string }) => {
        localStorage.setItem('userEmail', data.email);
      localStorage.setItem('userId', data.id);
        dispatch(signin({ email: data.email, id: data.id }));
        router.push("/learner");
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
      mutationFn: ({ token, data }: { token: string; data: { password: string } }) => 
        resetPassword(token, data),
    });
  };
  

  
  export const useCreateCourse = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
      mutationFn: (data: any) => {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No authentication token found');
        return createCourse(data, token);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['courses'] });
      }
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
        console.error('Logout failed:', error);
        // Handle logout failure if needed
      }
    });
  };