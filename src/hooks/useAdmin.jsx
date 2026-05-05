import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AdminService } from '../services/adminService';

// {   name,
//     price,
//     category,
//     description,
//     image
//     isAvailable
//   }

export const useCreateFood = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body) => AdminService.createFood(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', 'menu'] });
    },
  });
};

export const useUpdateFood = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ body, id }) => AdminService.updateFood(body, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', 'menu'] });
    },
  });
};

export const useDeleteFood = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => AdminService.deleteFood(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', 'menu'] });
    },
  });
};

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, newStatus }) => AdminService.updateOrderStatus(id, newStatus),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', 'get-all-orders'] });
    },
  });
};


export const useGetAllOrders =  ()=> useQuery({
  queryKey: ['user', 'get-all-orders'], 
  queryFn: () => AdminService.getAllOrders()
});

