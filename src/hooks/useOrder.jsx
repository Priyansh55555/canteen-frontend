import { useMutation , useQuery, useQueryClient } from '@tanstack/react-query';
import { OrderService } from '../services/orderService';


export const usePlaceOrder =  ()=> useMutation({
        mutationFn: (body)=> OrderService.placeOrder(body)
});

export const useGetUserOrders =  ()=> useQuery({
        queryKey: ['user', 'get-user-orders'], 
        queryFn: () => OrderService.getUserOrders()
});







