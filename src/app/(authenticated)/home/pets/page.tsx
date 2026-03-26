'use client';

import { useMemo } from "react";
import { PetsPageList } from "@/app/(authenticated)/pets/components/pets-page-list";
import { useUser } from "@/hooks/use-user";

export default function HomePetsPage() {
  const { user } = useUser();
  const queryOptions = useMemo(() => (
    {
      path: `/users/${user.id}/pets/list`,
      queryKey: ['userPets', user.id]
    }
  ), [user.id]);

  return (
    <PetsPageList {...queryOptions} canModify={true} />
  )
}
