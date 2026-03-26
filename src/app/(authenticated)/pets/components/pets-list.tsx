'use client';

import { EmptyState } from "@/components/ui/empty-state";
import { Pet } from "@/domain/pet/pet.model";
import { Separator } from "@/components/ui/separator";
import { PetsListItem } from "@/app/(authenticated)/pets/components/pets-list-item";

interface PetsListProps {
  pets: Pet[],
  canModify?: boolean,
  handleUnassignPet?: (id: number) => void
}

export function PetsList({ pets, canModify, handleUnassignPet }: PetsListProps) {
  if (!pets || pets.length === 0) {
    return <EmptyState title="No pets found" />;
  }

  return (
    pets.map((pet, idx) => (
      <div key={pet.id}>
        <PetsListItem pet={pet} canModify={canModify} handleUnassignPet={handleUnassignPet} />
        {idx !== pets.length - 1 && <Separator />}
      </div>
    ))
  )
}
