'use client';

import { Pet } from "@/domain/pet/pet.model";

export function PetsListItem({ pet }: {pet: Pet}) {
  return (
    <div className="p-4 w-3/6 h-20">
      <span>{pet.name}</span>
      <span>{pet.type.label}</span>
    </div>
  )
}
