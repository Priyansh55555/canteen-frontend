import { useMutation , useQuery } from '@tanstack/react-query';
import { AuthService } from '../services/authService';

export const useRegister =  ()=> useMutation({
        mutationFn: (body)=>AuthService.register(body)
});

export const useLogin =  ()=> useMutation({
        mutationFn: (body)=>AuthService.login(body)
});

export const useLogout =  ()=> useMutation({
        mutationFn: AuthService.logout,
});

export const useGetUser =  ()=> useQuery({
        queryKey: ['user', 'get-user'], 
        queryFn: () => AuthService.getUser()
});




