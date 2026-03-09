'use client';

import { useParams } from "next/navigation";
import { UsersPageList } from "@/app/(authenticated)/users/components/users-page-list";
import { useMemo } from "react";

export default function PetUsersPage() {
  const { id } = useParams();
  const queryOptions = useMemo(() => (
    {
      path: `/pets/${id}/users/list`,
      queryKey: ['petUsers', id as string]
    }
  ), [id]);

  return (
    <UsersPageList {...queryOptions} />
  )
}
