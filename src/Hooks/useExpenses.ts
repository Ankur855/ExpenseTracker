import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import {
  getExpenses,
  addExpense,
  updateExpense,
  deleteExpense,
} from '../Api/expenses';

// GET
export function useExpenses() {
  return useQuery({
    queryKey: ['expenses'],
    queryFn: getExpenses,
  });
}

// ADD
export function useAddExpense() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['expenses']});
    },
  });
}

// UPDATE
export function useUpdateExpense() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['expenses']});
    },
  });
}

// DELETE
export function useDeleteExpense() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['expenses']});
    },
  });
}
