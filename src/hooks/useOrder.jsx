import { useMutation , useQuery, useQueryClient } from '@tanstack/react-query';
import { OrderService } from '../services/orderService';


export const usePlaceOrder = () => {
        const queryClient = useQueryClient(); // get the query client
      
        return useMutation({
          mutationFn: (body) => OrderService.placeOrder(body),
          onSuccess: () => {
            queryClient.invalidateQueries(['user', 'get-user-orders']);
          }
        });
      };

export const useGetUserOrders =  ()=> useQuery({
        queryKey: ['user', 'get-user-orders'], 
        queryFn: () => OrderService.getUserOrders()
});







