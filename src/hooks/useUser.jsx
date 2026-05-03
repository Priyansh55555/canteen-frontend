import { useMutation, useQueryClient } from '@tanstack/react-query';
import userService from '../services/userService';
import toast from 'react-hot-toast';


export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userData) => userService.updateUser(userData),
    onSuccess: (data) => {
      toast.success('Profile updated successfully');
      // Invalidate user-related queries to refetch updated data
      queryClient.invalidateQueries({ queryKey: ['user'] });
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
    onError: (error) => {
      console.log("Error update profile", error)
      const errorMessage = error?.response?.data?.message || 'Failed to update profile. Please try again.';
      toast.error(errorMessage);
    }
  });
};
