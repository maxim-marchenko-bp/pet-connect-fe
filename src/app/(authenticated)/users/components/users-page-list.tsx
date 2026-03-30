'use client';

import { useParamsDataLoader } from "@/hooks/params-data-loader";
import { User } from "@/domain/user/user.model";
import { Spinner } from "@/components/ui/spinner";
import { EmptyState } from "@/components/ui/empty-state";
import { Page, PageContent, PageFooter, PageHeader, PageHeaderSubtitle, PageHeaderTitle } from "@/components/ui/page";
import { ListSearch } from "@/components/list-filter-form/list-search";
import { UserList } from "@/app/(authenticated)/users/components/user-list";
import { AppPagination } from "@/components/app-pagination/app-pagination";
import { QueryOptions } from "@/domain/query-options/query-options.model";

export function UsersPageList({ path, queryKey, searchParams }: QueryOptions) {
  const {
    data,
    isLoading,
    error,
    params: { searchTerm, totalCount, totalPages, page },
    setQueryParams
  } = useParamsDataLoader<User>({
    path,
    queryKey,
    searchParams,
  });

  if (isLoading) {
    return (
      <Spinner className="absolute top-1/2 left-1/2 size-8 text-primary" />
    );
  }

  if (error) {
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
        <ListSearch formValue={{searchTerm}} totalCount={totalCount} onFilterFormSubmit={setQueryParams} />
        <UserList users={data} />
      </PageContent>

      <PageFooter>
        <AppPagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={(page) => setQueryParams({page})}
        />
      </PageFooter>
    </Page>
  )
}
