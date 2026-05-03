import { useMutation , useQuery } from '@tanstack/react-query';
import { MenuService } from '../services/menuService';

export const useGetAllMenu =  ()=> useQuery({
        queryKey: ['user', 'menu'], 
        queryFn: () => MenuService.getAllMenu()
});




