'use client';

import { useParams } from "next/navigation";
import { Page, PageHeader, PageHeaderSubtitle, PageHeaderTitle } from "@/components/ui/page";
import { useQuery } from "@tanstack/react-query";
import { clientFetch } from "@/lib/api/client-fetch";
import { User } from "@/domain/user/user.type";
import { Spinner } from "@/components/ui/spinner";
import { ErrorPage } from "@/components/ui/error-page";

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
    return <ErrorPage errorMessage={'Error loading user'} error={error} />
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
