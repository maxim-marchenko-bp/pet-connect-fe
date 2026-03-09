'use client';

import { Pet } from "@/domain/pet/pet.model";
import Link from "next/link";

export function PetsListItem({ pet }: { pet: Pet }) {
  return (
    <div className="p-4 w-3/6 h-20">
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
  )
}
