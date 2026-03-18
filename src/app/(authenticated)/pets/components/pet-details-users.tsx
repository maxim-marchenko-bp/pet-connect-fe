'use client';

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { EmptyState } from "@/components/ui/empty-state";
import { PetInfoUsersList } from "@/app/(authenticated)/pets/components/pet-info-users-list";
import { UseQueryResult } from "@tanstack/react-query";
import { FilteredItems } from "@/lib/api/filtered-items";
import { User } from "@/domain/user/user.model";

interface PetDetailsUsersProps {
  usersQuery: Partial<UseQueryResult<FilteredItems<User>>>;
}

export function PetDetailsUsers({ usersQuery }: PetDetailsUsersProps) {
  const { data: users, isLoading, isError, error } = usersQuery;
  return (
    <Card className="w-full">
      <CardContent>
        <CardTitle className="mb-4">Owners</CardTitle>
        {isLoading && <div className="flex justify-center"><Spinner className="size-8 text-primary"/></div>}
        {isError && error && <EmptyState title={'Error loading users'} description={error.message} />}
        {!isLoading && !isError && <PetInfoUsersList users={users?.items} totalCount={users?.totalCount} />}
      </CardContent>
    </Card>
  );
}
