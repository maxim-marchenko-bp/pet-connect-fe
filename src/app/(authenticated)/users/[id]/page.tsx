'use client';

import { useParams } from "next/navigation";
import { Page, PageContent } from "@/components/ui/page";
import { useQuery } from "@tanstack/react-query";
import { clientFetch } from "@/lib/api/client-fetch";
import { User } from "@/domain/user/user.model";
import { Spinner } from "@/components/ui/spinner";
import { EmptyState } from "@/components/ui/empty-state";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Gender } from "@/domain/gender/gender.enum";
import { useFormattedDate } from "@/hooks/use-formatted-date";
import { titleCase } from "@/lib/text-transform/titlecase";
import { FilteredItems } from "@/lib/api/filtered-items";
import { Pet } from "@/domain/pet/pet.model";
import { UserInfoPetsList } from "@/app/(authenticated)/users/components/user-info-pets-list";
import { LabelValue } from "@/components/label-value/label-value";

export default function UserPage() {
  const { id } = useParams();
  const formattedDate = useFormattedDate();
  const { data: user, isLoading: isUserLoading, isError: isUserError, error: userError } = useQuery({
    queryKey: ['user', id],
    queryFn: () => clientFetch<User>(`/users/${id}`),
  });
  const { data: pets } = useQuery({
    queryKey: ['userPets', id],
    queryFn: () => clientFetch<FilteredItems<Pet>>(`/users/${id}/pets/list?pageSize=4`),
  });

  if (isUserLoading) {
    return <Spinner className="absolute top-1/2 left-1/2 size-8 text-primary"/>
  }

  if (isUserError) {
    return <EmptyState title={'Error loading user'} description={userError.message} />
  }

  if (!user) {
    return <EmptyState title={'User not found'}/>
  }

  const profileImage =
    user.gender === Gender.MALE
      ? 'male-profile-placeholder'
      : user.gender === Gender.FEMALE
        ? 'female-profile-placeholder'
        : 'unknown-profile-placeholder';

  return (
    <Page>
      <PageContent className="flex flex-col gap-4">
        <div className="flex gap-4">
          <Card className="w-fit">
            <CardContent>
              <Image src={`/images/${profileImage}.png`} alt="profile image" width={150} height={300} />
            </CardContent>
          </Card>

          <Card className="w-full">
            <CardContent className="text-[14px] flex flex-col gap-2">
              <LabelValue label={'Date of birth'} gridCols={2}>{user.dateOfBirth ? formattedDate(user.dateOfBirth) : '-'}</LabelValue>
              <LabelValue label={'Gender'} gridCols={2}>{titleCase(user.gender)}</LabelValue>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="w-full">
            <CardContent>
              <UserInfoPetsList pets={pets?.items} totalCount={pets?.totalCount}></UserInfoPetsList>
            </CardContent>
          </Card>
        </div>
      </PageContent>
    </Page>
  );
}
