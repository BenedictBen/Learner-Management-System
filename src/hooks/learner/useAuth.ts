import { useMutation } from "@tanstack/react-query";
import { signup, login} from "../../services/learner/api";
import { useDispatch } from "react-redux";
import { signin} from "../../features/authSlice";
import { useRouter } from "next/navigation";


export const useSignup = () => {
    return useMutation({
      mutationFn: signup,
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