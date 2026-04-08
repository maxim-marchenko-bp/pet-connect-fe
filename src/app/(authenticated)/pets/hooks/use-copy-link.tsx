import { useMutation } from "@tanstack/react-query";
import { clientFetch } from "@/lib/api/client-fetch";
import { PetInvite } from "@/domain/pet-invite/pet-invite.modell";
import { toast } from "sonner";

interface UseCopyLinkOptions {
  petId: string;
}

export function useCopyLink({ petId }: UseCopyLinkOptions) {
  const { mutateAsync } = useMutation({
    mutationKey: ['pet-invite', petId],
    mutationFn: () => clientFetch<PetInvite>(`/pet-invite/pets/${petId}/invites`, { method: 'POST' })
  });

  const handleCopy = async () => {
    const promise = mutateAsync();

    toast.promise(
      promise,
      {
        loading: 'Generating copy link...',
        success: 'Link successfully copied to clipboard',
        error: 'Failed to copy link',
      }
    );

    const inviteResult = await promise;

    return inviteResult.url;
  }

  return {
    handleCopy,
  }
}
