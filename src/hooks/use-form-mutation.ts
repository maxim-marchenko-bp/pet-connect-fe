import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

interface UseFormMutationOptions<TData, TVariables, TError = Error> {
  mutationFn: (variables: TVariables) => Promise<TData>;
  onSuccess?: (data: TData, variables: TVariables) => void;
  onError?: (error: TError, variables: TVariables) => void;
  messages?: {
    loading?: string;
    success?: string | ((data: TData) => string);
    error?: string | ((error: TError) => string);
  };
  showToastOnSuccess?: boolean;
  showToastOnError?: boolean;
}

export function useFormMutation<TData = unknown, TVariables = unknown, TError = Error>({
  mutationFn,
  onSuccess,
  onError,
  messages = {},
  showToastOnSuccess = true,
  showToastOnError = true,
}: UseFormMutationOptions<TData, TVariables, TError>) {
  const {
    loading = 'Loading...',
    success = 'Success!',
    error = 'An error occurred',
  } = messages;

  const mutation = useMutation<TData, TError, TVariables>({
    mutationFn,
    onSuccess,
    onError,
  });

  const handleSubmit = (variables: TVariables) => {
    const promise = mutation.mutateAsync(variables);

    return toast.promise(
      promise,
      {
        loading,
        success:
          showToastOnSuccess
            ? ((data) => typeof success === 'function' ? success(data) : success)
            : undefined,
        error: showToastOnError
          ? ((err) => typeof error === 'function' ? error(err) : (err as Error)?.message || error)
          : undefined,
      }
    );
  };

  return {
    ...mutation,
    handleSubmit,
  };
}
