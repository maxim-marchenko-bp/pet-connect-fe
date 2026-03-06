'use client';

import { PetsPageList } from "@/app/(authenticated)/pets/components/pets-page-list";
import { useMemo } from "react";

export default function PetsPage() {
  const queryOptions = useMemo(() => (
    {
      path: `/pets/list`,
      queryKey: ['userPets']
    }
  ), []);

  return (
    <PetsPageList {...queryOptions} />
  )
}
