'use client';

import { User } from "@/domain/user/user.model";
import { EmptyState } from "@/components/ui/empty-state";
import { PetInfoUserCard } from "@/app/(authenticated)/pets/components/pet-info-user-card";
import { usePathname } from "next/navigation";
import { InfoPageItemsList } from "@/components/info-page-items-list/info-page-items-list";

interface UserListProps {
  users?: User[];
  totalCount?: number;
}

export function PetInfoUsersList({ users, totalCount = 0 }: UserListProps) {
  const pathname = usePathname();
  if (!users?.length) {
    return <EmptyState title={'No users were found'}/>
  }

  return (
    <InfoPageItemsList
      items={users}
      seeMoreHref={`${pathname}/users`}
      totalCount={totalCount}
      itemComponent={({item}) => <PetInfoUserCard user={item} /> }
    />
  )
}
