'use client';

import { useQuery } from "@tanstack/react-query";
import { clientFetch } from "@/lib/api/client-fetch";
import { User } from "@/domain/user/user.type";
import { Spinner } from "@/components/ui/spinner";
import { FilteredItems } from "@/lib/api/filtered-items";
import { Page, PageHeader, PageHeaderSubtitle, PageHeaderTitle } from "@/components/ui/page";
import { Separator } from "@/components/ui/separator";
import { UserItem } from "@/app/(authenticated)/users/user";
import { EmptyState } from "@/components/ui/empty-state";

export default function Users() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['users'],
    queryFn: () => clientFetch<FilteredItems<User>>('/users/list', { method: 'POST' }),
  });
  const { items } = data || {};

  if (isLoading) {
    return <Spinner className="absolute top-1/2 left-1/2 size-8 text-primary"/>
  }

  if (isError) {
    return <EmptyState title={'Error loading users'} description={error.message} />
  }

  if (!items || items.length === 0) {
    return <EmptyState title={'No users found'} />
  }

  return (
    <Page>
      <PageHeader>
        <PageHeaderTitle>People</PageHeaderTitle>
        <PageHeaderSubtitle>Find people you might know or interested in</PageHeaderSubtitle>
      </PageHeader>

      {
        items.map((user, idx) => (
          <div key={user.id}>
            <UserItem user={user} />
            { (idx !== items.length - 1) && <Separator />}
          </div>
        ))
      }
    </Page>

  )
}
