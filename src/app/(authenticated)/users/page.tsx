'use client';

import { Spinner } from "@/components/ui/spinner";
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
import { ListFilterForm } from "@/components/list-filter-form/list-filter-form";
import { useParamsDataLoader } from "@/hooks/params-data-loader";
import { User } from "@/domain/user/user.model";

export default function Users() {
  const { user } = useUser();
  const {
    isLoading,
    error,
    data,
    params: { searchTerm, totalCount, totalPages, page },
    setQueryParams
  } = useParamsDataLoader<User>({
    path: '/users/list',
    queryKey: ['users'],
    searchParams: { excludeIds: [user.id]}
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
        <ListFilterForm
          formValue={{ searchTerm }}
          totalCount={totalCount}
          onFilterFormSubmit={(filterParams) => setQueryParams(filterParams)}
        />
        <UserList users={data} />
      </PageContent>

      <PageFooter>
        <AppPagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={(page) => setQueryParams({ page })}
        />
      </PageFooter>
    </Page>
  );
}
