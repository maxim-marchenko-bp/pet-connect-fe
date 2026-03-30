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
import { SidebarFilter } from "@/components/sidebar-filter";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export function UsersPageList({ path, queryKey, searchParams }: QueryOptions) {
  const {
    data,
    isLoading,
    error,
    paginationParams: { totalCount, totalPages, page },
    queryFilters,
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
        <ListSearch formValue={{searchTerm: queryFilters.searchTerm as string}} totalCount={totalCount} onFilterFormSubmit={setQueryParams} />
        <SidebarProvider defaultOpen={false}>
          <div className="w-full flex justify-end">
            <SidebarTrigger size="default" className="w-fit" label="Filter" variant="default" showIcon={false} useSizing={false}></SidebarTrigger>
          </div>
          <SidebarFilter formValue={queryFilters} onFilterFormSubmit={setQueryParams} />
        </SidebarProvider>
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
