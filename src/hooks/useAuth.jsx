import { useMutation , useQuery, useQueryClient } from '@tanstack/react-query';
import { AuthService } from '../services/authService';
import { useNavigate } from 'react-router-dom';

export const useRegister =  ()=> useMutation({
        mutationFn: (body)=>AuthService.register(body)
});

export const useLogin =  ()=> useMutation({
        mutationFn: (body)=>AuthService.login(body)
});

export const useLogout =  ()=> {
        const queryClient = useQueryClient();
        const navigate = useNavigate();
        return useMutation({
        mutationFn: AuthService.logout,
        onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['user'] });
                navigate("/");
              },
        });
};

// export interface User {
//         _id: string;
      
//         name: string;
//         email: string;
//         role: "admin" | "user"; // extend if needed
      
//         fullName: string;
//         profilePicture: string;
//         posterPicture: string;
      
//         isVerified: boolean;
//         phoneNumber: string;
      
//         gender: "male" | "female" | "other"; // safer than plain string
//         address: string;
      
//         createdAt: string; // or Date if you parse it
//         updatedAt: string; // or Date
//       }

export const useGetUser =  ()=> useQuery({
        queryKey: ['user', 'get-user'], 
        queryFn: () => AuthService.getUser()
});




