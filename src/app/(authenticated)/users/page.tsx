'use client';

import { useQuery } from "@tanstack/react-query";
import { clientFetch } from "@/lib/api/client-fetch";
import { User } from "@/domain/user/user.type";
import { Spinner } from "@/components/ui/spinner";
import { FilteredItems } from "@/lib/api/filtered-items";
import { Page, PageHeader, PageHeaderSubtitle, PageHeaderTitle } from "@/components/ui/page";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { ErrorPage } from "@/components/ui/error-page";

export default function Users() {
  const [userLocale] = useState(() => Intl.DateTimeFormat().resolvedOptions().locale ?? 'en-GB');

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['users'],
    queryFn: () => clientFetch<FilteredItems<User>>('/users/list', { method: 'POST' }),
  });
  const { items } = data || {};

  if (isLoading) {
    return <Spinner className="absolute top-1/2 left-1/2 size-8 text-primary"/>
  }

  if (isError) {
    return <ErrorPage errorMessage={'Error loading users'} error={error} />
  }

  if (!items || items.length === 0) {
    return <ErrorPage errorMessage={'No users found'} />
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
            <div className="p-4 w-3/6">
              <div>
                <Link
                  className="p-0 text-[16px] font-semibold text-primary"
                  href={`/users/${user.id}`}
                >{user.name} {user.lastname}</Link>
              </div>
              <div>
                <div>
                  <span className="text-[12px]">Date of birth: {user.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString(userLocale, { dateStyle: 'medium' }) : '-'}</span>
                </div>
              </div>
            </div>
            { (idx !== items.length - 1) && <Separator />}
          </div>
        ))
      }
    </Page>

  )
}
