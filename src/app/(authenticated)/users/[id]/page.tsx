'use client';

import { useParams } from "next/navigation";
import { Page, PageHeader, PageHeaderSubtitle, PageHeaderTitle } from "@/components/ui/page";
import { useQuery } from "@tanstack/react-query";
import { clientFetch } from "@/lib/api/client-fetch";
import { User } from "@/domain/user/user.type";
import { Spinner } from "@/components/ui/spinner";
import { EmptyState } from "@/components/ui/empty-state";

export default function UserPage() {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['user', id],
    queryFn: () => clientFetch<User>(`/users/${id}`),
  });

  if (isLoading) {
    return <Spinner className="absolute top-1/2 left-1/2 size-8 text-primary"/>
  }

  if (isError) {
    return <EmptyState title={'Error loading user'} description={error.message} />
  }

  return (
    <Page>
      <PageHeader>
        <PageHeaderTitle>User</PageHeaderTitle>
        <PageHeaderSubtitle>{ JSON.stringify(data) }</PageHeaderSubtitle>
      </PageHeader>
    </Page>
  )
}
