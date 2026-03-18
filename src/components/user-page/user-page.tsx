'use client';

import { Spinner } from "@/components/ui/spinner";
import { EmptyState } from "@/components/ui/empty-state";
import { Gender } from "@/domain/gender/gender.enum";
import { Page, PageContent } from "@/components/ui/page";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { LabelValue } from "@/components/label-value/label-value";
import { titleCase } from "@/lib/text-transform/titlecase";
import { useFormattedDate } from "@/hooks/use-formatted-date";
import { User } from "@/domain/user/user.model";
import { Pet } from "@/domain/pet/pet.model";
import { FilteredItems } from "@/lib/api/filtered-items";
import { UseQueryResult } from "@tanstack/react-query";
import { UserDetailsPets } from "@/app/(authenticated)/users/components/user-details-pets";
import { useCallback } from "react";
import { useRouter } from "next/navigation";

interface UserPageProps {
  userQuery: Partial<UseQueryResult<User>>;
  petsQuery: Partial<UseQueryResult<FilteredItems<Pet>>>;
  canAddPets?: boolean;
}

export function UserPage({ userQuery, petsQuery, canAddPets }: UserPageProps ) {
  const formattedDate = useFormattedDate();
  const router = useRouter();

  const { data: user, isLoading: isUserLoading, isError: isUserError, error: userError } = userQuery;

  const handleAddPet = useCallback(() => {
    router.push('/pets/new');
  }, [router]);

  if (isUserLoading) {
    return <Spinner className="absolute top-1/2 left-1/2 size-8 text-primary"/>
  }

  if (isUserError && userError) {
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
          <UserDetailsPets petsQuery={petsQuery} canAddPets={canAddPets} handleAddPet={handleAddPet} />
        </div>
      </PageContent>
    </Page>
  );
}
