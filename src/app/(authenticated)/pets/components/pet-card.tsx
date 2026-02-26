'use client';

import { Pet } from "@/domain/pet/pet.model";
import { Card, CardContent } from "@/components/ui/card";

interface PetCardProps {
  pet: Pet;
}

export function PetCard({ pet }: PetCardProps) {

  return (
    <Card className="flex-1/5">
      <CardContent className="flex flex-col">
        <span>{pet.name}</span>
        <span>{pet.type.label}</span>
      </CardContent>
    </Card>
  )
}
