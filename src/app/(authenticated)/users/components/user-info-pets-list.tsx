'use client';

import { Pet } from "@/domain/pet/pet.model";
import { EmptyState } from "@/components/ui/empty-state";
import { UserInfoPetCard } from "@/app/(authenticated)/users/components/user-info-pet-card";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
    <div>
      <div className="flex justify-between gap-16">
        {
          pets.map(pet => (
            <UserInfoPetCard key={pet.id} pet={pet} />
          ))
        }
      </div>
      {
        (totalCount > pets.length) &&
        <div className="flex justify-end mt-6">
          <Link
            href={{pathname: `${pathname}/pets`}}
            className="p-0 text-[16px] font-semibold text-primary"
          >See more</Link>
        </div>
      }
    </div>

  )
}
