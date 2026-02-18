'use client';

import { useParams } from "next/navigation";
import { Page, PageContent } from "@/components/ui/page";
import { useQuery } from "@tanstack/react-query";
import { clientFetch } from "@/lib/api/client-fetch";
import { User } from "@/domain/user/user.type";
import { Spinner } from "@/components/ui/spinner";
import { EmptyState } from "@/components/ui/empty-state";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Gender } from "@/domain/gender/gender.enum";
import { useFormattedDate } from "@/hooks/use-formatted-date";

export default function UserPage() {
  const { id } = useParams();
  const formattedDate = useFormattedDate();
  const { data: user, isLoading, isError, error } = useQuery({
    queryKey: ['user', id],
    queryFn: () => clientFetch<User>(`/users/${id}`),
  });

  if (isLoading) {
    return <Spinner className="absolute top-1/2 left-1/2 size-8 text-primary"/>
  }

  if (isError) {
    return <EmptyState title={'Error loading user'} description={error.message} />
  }

  if (!user) {
    return <EmptyState title={'User not found'}/>
  }

  const profileImage =
    user.gender === Gender.MALE
      ? 'male-profile-placeholder'
      : user.gender === Gender.FEMALE
        ? 'female-profile-placeholder'
        : 'unknown-profile-placeholder';

  return (
    <Page>
      <PageContent className="flex gap-4">
        <Card className="w-fit">
          <CardContent>
            <Image src={`/images/${profileImage}.png`} alt="profile image" width={150} height={300} />
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardContent className="text-[16px]">
            <span>Date of birth: {user.dateOfBirth ? formattedDate(user.dateOfBirth) : '-'}</span>
            <span>Sex: {user.gender}</span>
          </CardContent>
        </Card>
      </PageContent>
    </Page>
  );
}
