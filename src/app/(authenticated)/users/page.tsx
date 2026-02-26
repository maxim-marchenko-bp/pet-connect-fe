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
import { UserList } from "@/app/(authenticated)/users/components/user-list";
import { useUser } from "@/hooks/use-user";
import { buildSearchParams } from "@/lib/search-params/build-search-params";
import { useUrlSearchParams } from "@/hooks/use-url-search-params";
import { ListFilterForm } from "@/components/list-filter-form/list-filter-form";

export default function Users() {
  const { user } = useUser();
  const userId = user?.id;
  const [queryParams, setUrlQueryParams] = useUrlSearchParams({ excludeIds: [userId] });
  const { page, pageSize, searchTerm } = queryParams;

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
        <ListFilterForm
          formValue={{ searchTerm }}
          totalCount={totalCount}
          onFilterFormSubmit={(filterParams) => setUrlQueryParams(filterParams)}
        />
        <UserList users={items} />
      </PageContent>

      <PageFooter>
        <AppPagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={(page) => setUrlQueryParams({ page })}
        />
      </PageFooter>
    </Page>
  );
}
