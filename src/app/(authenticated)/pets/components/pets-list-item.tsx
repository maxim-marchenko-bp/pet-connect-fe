'use client';

import { Pet } from "@/domain/pet/pet.model";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "@heroicons/react/24/outline";

interface PetListItemProps {
  pet: Pet,
  canModify?: boolean,
  handleUnassignPet?: (id: number) => void
}

export function PetsListItem({ pet, canModify, handleUnassignPet }: PetListItemProps) {
  return (
    <div className="p-4 h-20 w-full flex justify-between items-center">
      <div>
        <div>
          <Link
            className="p-0 text-[16px] font-semibold text-primary"
            href={`/pets/${pet.id}`}
          >{pet.name}</Link>
        </div>
        <div>
          <span className="text-[12px]">Type: {pet.type.label}</span>
        </div>
      </div>
      {canModify && handleUnassignPet && <Button variant="outline" size="icon" onClick={() => handleUnassignPet(pet.id)}><TrashIcon/></Button>}
    </div>
  )
}
