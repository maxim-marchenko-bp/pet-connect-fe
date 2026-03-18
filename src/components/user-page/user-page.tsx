'use client';

import { Spinner } from "@/components/ui/spinner";
import { EmptyState } from "@/components/ui/empty-state";
import { Gender } from "@/domain/gender/gender.enum";
import { Page, PageContent } from "@/components/ui/page";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { LabelValue } from "@/components/label-value/label-value";
import { titleCase } from "@/lib/text-transform/titlecase";
import { UserInfoPetsList } from "@/app/(authenticated)/users/components/user-info-pets-list";
import { useFormattedDate } from "@/hooks/use-formatted-date";
import { User } from "@/domain/user/user.model";
import { Pet } from "@/domain/pet/pet.model";
import { FilteredItems } from "@/lib/api/filtered-items";
import { UseQueryResult } from "@tanstack/react-query";

interface UserPageProps {
  userQuery: Partial<UseQueryResult<User>>;
  petsQuery: Partial<UseQueryResult<FilteredItems<Pet>>>;
}

export function UserPage({ userQuery, petsQuery }: UserPageProps ) {
  const formattedDate = useFormattedDate();

  const { data: user, isLoading: isUserLoading, isError: isUserError, error: userError } = userQuery;
  const { data: pets, isLoading: isPetsLoading, isError: isPetsError, error: petsError } = petsQuery;

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
          <Card className="w-full">
            <CardContent>
              <CardTitle className="mb-4">Pets</CardTitle>
              {isPetsLoading && <div className="flex justify-center"><Spinner className="size-8 text-primary"/></div>}
              {isPetsError && petsError && <EmptyState title={'Error loading pets'} description={petsError.message} />}
              {!isPetsLoading && !isPetsError && <UserInfoPetsList pets={pets?.items} totalCount={pets?.totalCount}></UserInfoPetsList>}
            </CardContent>
          </Card>
        </div>
      </PageContent>
    </Page>
  );
}
