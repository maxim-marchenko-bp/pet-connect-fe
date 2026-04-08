'use client';

import { Pet } from "@/domain/pet/pet.model";
import { LabelValue } from "@/components/label-value/label-value";
import { Button } from "@/components/ui/button";
import { useFormattedDate } from "@/hooks/use-formatted-date";
import { clientFetch } from "@/lib/api/client-fetch";
import { useFormMutation } from "@/hooks/use-form-mutation";
import { useRouter } from "next/navigation";

interface PetInvitationDetailsProps {
  pet: Pet;
  url: string;
}

export function PetInvitationDetails({ pet, url }: PetInvitationDetailsProps) {
  const formatDate = useFormattedDate();
  const router = useRouter();
  const handleAccept = async () => {
    return await clientFetch(`${url}/accept`, undefined, true, true);
  };
  const { handleSubmit } = useFormMutation({
    mutationFn: handleAccept,
    messages: {
      loading: 'Accepting invitation...',
      success: () => {
        router.push('/home/pets');
        return 'Pet successfully accepted.';
      },
      error: (error) => error.message,
    },
  });

  return (
    <div>
      <LabelValue label="Pet name" gridCols={4}>{pet.name}</LabelValue>
      <LabelValue label="Date of birth" gridCols={4}>{pet.dateOfBirth ? formatDate(pet.dateOfBirth) : '-'}</LabelValue>
      <LabelValue label="Pet type" gridCols={4}>{pet.type.label}</LabelValue>
      <div className="mt-4 flex justify-end">
        <Button type="button" onClick={() => handleSubmit(handleAccept)}>Accept invitation</Button>
      </div>
    </div>
  )
}
