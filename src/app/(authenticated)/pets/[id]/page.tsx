'use client';

import { LabelValue } from "@/components/label-value/label-value";
import { Card, CardContent } from "@/components/ui/card";
import { Page, PageContent } from "@/components/ui/page";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { clientFetch } from "@/lib/api/client-fetch";
import { Pet } from "@/domain/pet/pet.model";
import { Spinner } from "@/components/ui/spinner";
import { EmptyState } from "@/components/ui/empty-state";
import { User } from "@/domain/user/user.model";
import { FilteredItems } from "@/lib/api/filtered-items";
import { PetInfoUsersList } from "@/app/(authenticated)/pets/components/pet-info-users-list";

export default function PetPage() {
  const { id } = useParams();
  const petId = id as string;

  const { data: pet, isLoading: isPetLoading, isError: isPetError, error: petError } = useQuery({
    queryKey: ['pet', petId],
    queryFn: () => clientFetch<Pet>(`/pets/${petId}`),
  });

  const { data: users, isLoading: isUsersLoading, isError: isUsersError, error: usersError } = useQuery({
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
          <Card className="w-fit">
            <CardContent>
              <Image src={`/images/male-profile-placeholder.png`} alt="pet image" width={150} height={300} />
            </CardContent>
          </Card>

          <Card className="w-full">
            <CardContent className="text-[14px] flex flex-col gap-2">
              <LabelValue label={'Name'} gridCols={2}>{pet.name}</LabelValue>
              <LabelValue label={'Type'} gridCols={2}>{pet.type.label}</LabelValue>
            </CardContent>
          </Card>
        </div>

        <Card className="w-full">
          <CardContent>
            {isUsersLoading && <div className="flex justify-center"><Spinner className="size-8 text-primary"/></div>}
            {isUsersError && usersError && <EmptyState title={'Error loading users'} description={usersError.message} />}
            {!isUsersLoading && !isUsersError && <PetInfoUsersList users={users?.items} totalCount={users?.totalCount} />}
          </CardContent>
        </Card>
      </PageContent>
    </Page>
  )
}
