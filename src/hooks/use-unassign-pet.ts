import { clientFetch } from "@/lib/api/client-fetch";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useUser } from "@/hooks/use-user";

export function useUnassignPet(queryKey: readonly unknown[]) {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const unassignPet = (petIds: number[]) => {
    const body = JSON.stringify({ petIds });
    return clientFetch(`/users/${user.id}/remove-pets`, { method: 'POST', body, headers: { "Content-Type": "application/json" } })
  };
  const mutation = useMutation({
    mutationFn: unassignPet
  });
  const handleUnassignPet = (ids: number[]) => {
    return toast.promise(
      mutation.mutateAsync(ids),
      {
        loading: 'Unassigning pet...',
        success: async () => {
          await queryClient.invalidateQueries({ queryKey });
          return 'Successfully unassigned';
        },
        error: err => err.message,
      }
    )
  };

  return {
    mutation,
    handleUnassignPet,
  }
}
