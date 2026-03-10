'use client';

import { Pet } from "@/domain/pet/pet.model";
import { Card, CardContent } from "@/components/ui/card";
import { LabelValue } from "@/components/label-value/label-value";
import Link from "next/link";

interface PetCardProps {
  pet: Pet;
}

export function UserInfoPetCard({ pet }: PetCardProps) {

  return (
    <Card className="flex-1/5">
      <CardContent className="flex flex-col">
        <LabelValue label={'Name'} gridCols={2}>
          <Link
            className="p-0 text-[16px] font-semibold text-primary"
            href={`/pets/${pet.id}`}
          >{pet.name}</Link>
        </LabelValue>
        <LabelValue label={'Type'} gridCols={2}>{pet.type.label}</LabelValue>
      </CardContent>
    </Card>
  )
}
