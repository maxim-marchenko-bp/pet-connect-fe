import { useMutation } from "@tanstack/react-query";
import { clientFetch } from "@/lib/api/client-fetch";
import { PetInvitationToken } from "@/domain/pet-invite/pet-invite.model";
import { toast } from "sonner";

interface UseCopyLinkOptions {
  petId: string;
}

export function useCopyLink({ petId }: UseCopyLinkOptions) {
  const { mutateAsync } = useMutation({
    mutationKey: ['pet-invite', petId],
    mutationFn: () => clientFetch<PetInvitationToken>(`/pet-invite/pets/${petId}/invites`, { method: 'POST' })
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
