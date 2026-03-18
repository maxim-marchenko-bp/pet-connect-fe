'use client';

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { EmptyState } from "@/components/ui/empty-state";
import { UserInfoPetsList } from "@/app/(authenticated)/users/components/user-info-pets-list";
import { UseQueryResult } from "@tanstack/react-query";
import { FilteredItems } from "@/lib/api/filtered-items";
import { Pet } from "@/domain/pet/pet.model";
import { Button } from "@/components/ui/button";

interface UserDetailsPetsProps {
  petsQuery: Partial<UseQueryResult<FilteredItems<Pet>>>;
  canAddPets?: boolean;
}

export function UserDetailsPets({ petsQuery, canAddPets }: UserDetailsPetsProps) {
  const { data: pets, isLoading, isError, error } = petsQuery;

  return (
    <Card className="w-full">
      <CardContent>
        <CardTitle className="mb-4">
          <div className="flex justify-between items-center min-h-8">
            <span>Pets</span>
            {canAddPets && <Button size="sm" className="ml-4">Add Pet</Button>}
          </div>
        </CardTitle>
        {isLoading && <div className="flex justify-center"><Spinner className="size-8 text-primary"/></div>}
        {isError && error && <EmptyState title={'Error loading pets'} description={error.message} />}
        {!isLoading && !isError && <UserInfoPetsList pets={pets?.items} totalCount={pets?.totalCount}></UserInfoPetsList>}
      </CardContent>
    </Card>
  )
}
