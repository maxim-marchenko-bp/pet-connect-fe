'use client';

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { clientFetch } from "@/lib/api/client-fetch";
import { User } from "@/domain/user/user.type";
import { Spinner } from "@/components/ui/spinner";
import { FilteredItems } from "@/lib/api/filtered-items";
import {
  Page,
  PageFooter,
  PageHeader,
  PageHeaderSubtitle,
  PageHeaderTitle
} from "@/components/ui/page";
import { EmptyState } from "@/components/ui/empty-state";
import { AppPagination } from "@/components/app-pagination/app-pagination";
import { useRouter, useSearchParams } from "next/navigation";
import { UserList } from "@/app/(authenticated)/users/components/user-list";
import { UsersFilterForm } from "@/app/(authenticated)/users/components/user-filter";

export default function Users() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page') || 1);
  const pageSize = Number(searchParams.get('pageSize') || 10);
  const searchTerm = searchParams.get('searchTerm') || '';

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["users", searchParams.toString()],
    placeholderData: keepPreviousData,
    queryFn: ({ queryKey: [_, params] }) =>
      clientFetch<FilteredItems<User>>(`/users/list?${new URLSearchParams(params)}`, {
        method: "GET",
      }),
  });

  const { items = [], totalCount } = data || {};

  const totalPages = totalCount
    ? Math.ceil(totalCount / pageSize)
    : 1;

  const updateParams = (updates: Record<string, string | number>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value === "" || value === null || value === undefined) {
        params.delete(key);
      } else {
        params.set(key, String(value));
      }
    });

    router.push(`/users?${params.toString()}`);
  };

  if (isLoading) {
    return (
      <Spinner className="absolute top-1/2 left-1/2 size-8 text-primary" />
    );
  }

  if (isError) {
    return (
      <EmptyState
        title="Error loading users"
        description={error.message}
      />
    );
  }

  return (
    <Page>
      <PageHeader>
        <PageHeaderTitle>People</PageHeaderTitle>
        <PageHeaderSubtitle>Find people you might know or interested in</PageHeaderSubtitle>
      </PageHeader>

      <div className="space-y-2">
        <UsersFilterForm formValue={{ searchTerm }} totalCount={totalCount} onFilterFormSubmit={updateParams} />
        <UserList users={items} />
      </div>

      <PageFooter>
        <AppPagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={(page) => updateParams({ page })}
        />
      </PageFooter>
    </Page>
  );
}
