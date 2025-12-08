import { useMutation , useQuery } from '@tanstack/react-query';
import { AdminService } from '../services/adminService';

// {   name,
//     price,
//     category,
//     description,
//     image
//   }
export const useCreateFood =  ()=> useMutation({
        mutationFn: (body)=>AdminService.createFood(body)
});





