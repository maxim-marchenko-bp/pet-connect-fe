'use client';

import { User } from "@/domain/user/user.model";
import { Card, CardContent } from "@/components/ui/card";
import { LabelValue } from "@/components/label-value/label-value";
import { useFormattedDate } from "@/hooks/use-formatted-date";
import { titleCase } from "@/lib/text-transform/titlecase";

interface UserCardProps {
  user: User;
}

export function PetInfoUserCard({ user }: UserCardProps) {
  const formattedDate = useFormattedDate();

  return (
    <Card className="flex-1/5">
      <CardContent className="flex flex-col">
        <LabelValue label={'Name'} gridCols={2}>{user.name} {user.lastname}</LabelValue>
        <LabelValue label={'Gender'} gridCols={2}>{titleCase(user.gender)}</LabelValue>
        {user.dateOfBirth && <LabelValue label={'Birth Date'} gridCols={2}>{formattedDate(user.dateOfBirth)}</LabelValue>}
      </CardContent>
    </Card>
  )
}
