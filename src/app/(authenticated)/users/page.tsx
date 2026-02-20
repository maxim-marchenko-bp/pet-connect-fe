'use client';

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { clientFetch } from "@/lib/api/client-fetch";
import { User } from "@/domain/user/user.model";
import { Spinner } from "@/components/ui/spinner";
import { FilteredItems } from "@/lib/api/filtered-items";
import {
  Page,
  PageContent,
  PageFooter,
  PageHeader,
  PageHeaderSubtitle,
  PageHeaderTitle
} from "@/components/ui/page";
import { EmptyState } from "@/components/ui/empty-state";
import { AppPagination } from "@/components/app-pagination/app-pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { UserList } from "@/app/(authenticated)/users/components/user-list";
import { UsersFilterForm } from "@/app/(authenticated)/users/components/user-filter";
import { useUser } from "@/hooks/use-user";
import { buildSearchParams } from "@/lib/search-params/build-search-params";
import { updateSearchParams } from "@/lib/search-params/update-search-params";
import { useMemo } from "react";

export default function Users() {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useUser();
  const userId = user?.id;
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page') || 1);
  const pageSize = Number(searchParams.get('pageSize') || 10);
  const searchTerm = searchParams.get('searchTerm') || '';

  const queryParams = useMemo(() => ({
    page,
    pageSize,
    searchTerm,
    excludeIds: userId ? [userId] : [],
  }), [page, pageSize, searchTerm, userId]);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["users", queryParams],
    placeholderData: keepPreviousData,
    queryFn: () =>
      clientFetch<FilteredItems<User>>(
        `/users/list?${buildSearchParams(queryParams)}`,
        { method: "GET" }
      ),
  });

  const { items = [], totalCount } = data || {};

  const totalPages = totalCount
    ? Math.ceil(totalCount / pageSize)
    : 1;

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

      <PageContent>
        <UsersFilterForm
          formValue={{ searchTerm }}
          totalCount={totalCount}
          onFilterFormSubmit={(filterParams) => updateSearchParams(pathname, filterParams, searchParams, router)}
        />
        <UserList users={items} />
      </PageContent>

      <PageFooter>
        <AppPagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={(page) => updateSearchParams(pathname, { page }, searchParams, router)}
        />
      </PageFooter>
    </Page>
  );
}
