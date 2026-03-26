'use client';

import { Pet } from "@/domain/pet/pet.model";
import { EmptyState } from "@/components/ui/empty-state";
import { UserInfoPetCard } from "@/app/(authenticated)/users/components/user-info-pet-card";
import { usePathname } from "next/navigation";
import { InfoPageItemsList } from "@/components/info-page-items-list/info-page-items-list";
import Link from "next/link";
import React from "react";

interface PetListProps {
  pets?: Pet[];
  totalCount?: number;
  canModify?: boolean;
}

export function UserInfoPetsList({ pets, totalCount = 0, canModify }: PetListProps) {
  const pathname = usePathname();
  if (!pets?.length) {
    return (
      <div>
        <EmptyState title={'No pets were found'}/>
        {
          canModify &&
          <div className="flex justify-end mt-6">
            <Link
              href={{pathname: `${pathname}/pets`}}
              className="p-0 text-[16px] font-semibold text-primary"
            >
              Manage pets
            </Link>
          </div>
        }
     </div>
    )
  }

  return (
    <InfoPageItemsList
      items={pets}
      seeMoreHref={`${pathname}/pets`}
      totalCount={totalCount}
      canModify={canModify}
      itemComponent={({item}) => <UserInfoPetCard pet={item} /> }
    />
  )
}
