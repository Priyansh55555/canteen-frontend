import {  useQuery } from '@tanstack/react-query';
import { MenuService } from '../services/menuService';

export const useGetAllMenu =  ()=> useQuery({
        queryKey: ['user', 'menu'], 
        queryFn: () => MenuService.getAllMenu()
});

export const getAllMenuLandingPage =  ()=> useQuery({
        queryKey: ['menu-landing-page'],
        queryFn: () => MenuService.getAllMenuLandingPage()
});


