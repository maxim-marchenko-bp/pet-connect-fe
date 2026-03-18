'use client';

import { useParams } from "next/navigation";
import { UserPage } from "@/components/user-page/user-page";
import { useQuery } from "@tanstack/react-query";
import { clientFetch } from "@/lib/api/client-fetch";
import { User } from "@/domain/user/user.model";
import { FilteredItems } from "@/lib/api/filtered-items";
import { Pet } from "@/domain/pet/pet.model";

export default function UserDetailsPage() {
  const { id } = useParams();
  const userId = id as string;
  const userQuery = useQuery({
    queryKey: ['user', userId],
    queryFn: () => clientFetch<User>(`/users/${userId}`),
  });

  const petsQuery = useQuery({
    queryKey: ['userPets', userId],
    queryFn: () => clientFetch<FilteredItems<Pet>>(`/users/${userId}/pets/list?pageSize=4`),
  });

  return (
    <UserPage userQuery={userQuery} petsQuery={petsQuery} />
  )
}
