'use client';

import { useUser } from "@/hooks/use-user";
import { UserPage } from "@/components/user-page/user-page";
import { useQuery } from "@tanstack/react-query";
import { clientFetch } from "@/lib/api/client-fetch";
import { FilteredItems } from "@/lib/api/filtered-items";
import { Pet } from "@/domain/pet/pet.model";

export default function HomePage() {
  const { user } = useUser();
  const { id } = user;

  const petsQuery = useQuery({
    queryKey: ['userPets', id],
    queryFn: () => clientFetch<FilteredItems<Pet>>(`/users/${id}/pets/list?pageSize=4`),
  });

  return (
    <UserPage petsQuery={petsQuery} userQuery={{data: user}} canAddPets={true} canModify={true} />
  )
}
