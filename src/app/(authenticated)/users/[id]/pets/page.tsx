'use client';

import { useParams } from "next/navigation";
import { PetsPageList } from "@/app/(authenticated)/pets/components/pets-page-list";
import { useMemo } from "react";

export default function PetsPage() {
  const { id } = useParams();
  const queryOptions = useMemo(() => (
    {
      path: `/users/${id}/pets/list`,
      queryKey: ['userPets', id as string]
    }
  ), [id]);

  return (
    <PetsPageList {...queryOptions} />
  )
}
