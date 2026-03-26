'use client';

import { useMemo } from "react";
import { PetsPageList } from "@/app/(authenticated)/pets/components/pets-page-list";
import { useUser } from "@/hooks/use-user";
import { useUnassignPet } from "@/hooks/use-unassign-pet";
import { useRouter } from "next/navigation";

export default function HomePetsPage() {
  const { user } = useUser();
  const router = useRouter();
  const queryOptions = useMemo(() => (
    {
      path: `/users/${user.id}/pets/list`,
      queryKey: ['userPets', user.id]
    }
  ), [user.id]);

  const { handleUnassignPet } = useUnassignPet(queryOptions.queryKey);
  const handleUnassignPetAction = (id: number) => handleUnassignPet([id]);
  const handleAddPet = () => router.push('/pets/new');

  return (
    <PetsPageList
      {...queryOptions}
      canModify={true}
      handleUnassignPet={handleUnassignPetAction}
      handleAddPet={handleAddPet}
      canAdd={true}
    />
  )
}
