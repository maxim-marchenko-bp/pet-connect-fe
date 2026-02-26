'use client';

import { EmptyState } from "@/components/ui/empty-state";
import { Pet } from "@/domain/pet/pet.model";
import { Separator } from "@/components/ui/separator";
import { PetListItem } from "@/app/(authenticated)/pets/components/pet-list-item";

export function PetsList({ pets }: { pets: Pet[] }) {
  if (!pets || pets.length === 0) {
    return <EmptyState title="No pets found" />;
  }

  return (
    pets.map((pet, idx) => (
      <div key={pet.id}>
        <PetListItem pet={pet} />
        {idx !== pets.length - 1 && <Separator />}
      </div>
    ))
  )
}
