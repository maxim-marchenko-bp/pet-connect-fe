'use client';

import { Pet } from "@/domain/pet/pet.model";
import { EmptyState } from "@/components/ui/empty-state";
import { UserInfoPetCard } from "@/app/(authenticated)/users/components/user-info-pet-card";
import { usePathname } from "next/navigation";
import { InfoPageItemsList } from "@/components/info-page-items-list/info-page-items-list";

interface PetListProps {
  pets?: Pet[];
  totalCount?: number;
}

export function UserInfoPetsList({ pets, totalCount = 0 }: PetListProps) {
  const pathname = usePathname();
  if (!pets?.length) {
    return <EmptyState title={'No pets were found'}/>
  }

  return (
    <InfoPageItemsList
      items={pets}
      seeMoreHref={`${pathname}/pets`}
      totalCount={totalCount}
      itemComponent={({item}) => <UserInfoPetCard pet={item} /> }
    />
  )
}
