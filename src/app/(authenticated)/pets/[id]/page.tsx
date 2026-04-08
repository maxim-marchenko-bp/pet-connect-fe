'use client';

import { LabelValue } from "@/components/label-value/label-value";
import { Card, CardContent } from "@/components/ui/card";
import { Page, PageContent } from "@/components/ui/page";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { clientFetch } from "@/lib/api/client-fetch";
import { Pet } from "@/domain/pet/pet.model";
import { Spinner } from "@/components/ui/spinner";
import { EmptyState } from "@/components/ui/empty-state";
import { User } from "@/domain/user/user.model";
import { FilteredItems } from "@/lib/api/filtered-items";
import { PetDetailsUsers } from "@/app/(authenticated)/pets/components/pet-details-users";
import { Button } from "@/components/ui/button";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { CopyButton } from "@/components/ui/copy-button";
import { ProfileCard } from "@/components/ui/profile-card";
import { useCopyLink } from "@/app/(authenticated)/pets/hooks/use-copy-link";
import { useFormattedDate } from "@/hooks/use-formatted-date";

export default function PetPage() {
  const { id } = useParams();
  const router = useRouter();
  const formatDate = useFormattedDate();
  const petId = id as string;

  const { data: pet, isLoading: isPetLoading, isError: isPetError, error: petError } = useQuery({
    queryKey: ['pet', petId],
    queryFn: () => clientFetch<Pet>(`/pets/${petId}`),
  });

  const { handleCopy } = useCopyLink({ petId });

  const usersQuery = useQuery({
    queryKey: ['petUsers', petId],
    queryFn: () => clientFetch<FilteredItems<User>>(`/pets/${petId}/users/list?pageSize=4`),
  })

  if (isPetLoading) {
    return <Spinner className="absolute top-1/2 left-1/2 size-8 text-primary"/>
  }

  if (isPetError) {
    return <EmptyState title={'Error loading pet'} description={petError.message} />
  }

  if (!pet) {
    return <EmptyState title={'Pet not found'}/>
  }

  return (
    <Page>
      <PageContent className="flex flex-col gap-4">
        <div className="flex gap-4">
          <ProfileCard>
            <Image src={`/images/male-profile-placeholder.png`} alt="pet image" width={150} height={300} />
            {
              pet.canEdit &&
                <div>
                  <Button
                    className="w-full mt-4"
                    onClick={() => router.push(`/pets/${petId}/edit`)}
                  >
                    <div className="flex justify-between items-center gap-2">
                      <PencilSquareIcon />
                      <span>Edit info</span>
                    </div>
                  </Button>

                  <CopyButton handleCopy={handleCopy} className="w-full mt-4" />
                </div>
            }
          </ProfileCard>

          <Card className="w-full">
            <CardContent className="text-[14px] flex flex-col gap-2">
              <LabelValue label={'Name'} gridCols={2}>{pet.name}</LabelValue>
              <LabelValue label={'Type'} gridCols={2}>{pet.type.label}</LabelValue>
              <LabelValue label={'Birth Date'} gridCols={2}>{pet.dateOfBirth ? formatDate(pet.dateOfBirth) : '-'}</LabelValue>
            </CardContent>
          </Card>
        </div>

        <PetDetailsUsers usersQuery={usersQuery} />
      </PageContent>
    </Page>
  )
}
