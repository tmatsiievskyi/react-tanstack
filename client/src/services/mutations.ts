import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ITodo } from '../types';
import { createTodo, deleteTodo, updateTodo } from './api';

export function useCreateTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ITodo) => createTodo(data),
    onMutate: () => {
      console.log('mutate');
    },

    onError: () => {
      console.log('error');
    },

    onSuccess: () => {
      console.log('sucess');
    },

    onSettled: async (data, error, variables) => {
      console.log('settled');
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ['todos'] });
      }
    },
  });
}

export function useUpdateTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ITodo) => updateTodo(data),

    onSettled: async (_, error, variables) => {
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ['todos'] });
        await queryClient.invalidateQueries({
          queryKey: ['todo', { id: variables.id }],
        });
      }
    },
  });
}

export function useDeleteTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteTodo(id),

    onSuccess: () => {
      console.log('deleted successfully');
    },

    onSettled: async (_, error) => {
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ['todos'] });
      }
    },
  });
}
