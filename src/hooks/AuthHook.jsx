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
export const useGetUser =  ()=> useQuery({
        queryKey: ['user', 'get-user'], 
        queryFn: () => AuthService.getUser()
});




