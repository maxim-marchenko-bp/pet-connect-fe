'use client';

import { useParamsDataLoader } from "@/hooks/params-data-loader";
import { Pet } from "@/domain/pet/pet.model";
import { Spinner } from "@/components/ui/spinner";
import { EmptyState } from "@/components/ui/empty-state";
import { Page, PageContent, PageFooter, PageHeader, PageHeaderSubtitle, PageHeaderTitle } from "@/components/ui/page";
import { ListFilterForm } from "@/components/list-filter-form/list-filter-form";
import { PetsList } from "@/app/(authenticated)/pets/components/pets-list";
import { AppPagination } from "@/components/app-pagination/app-pagination";
import { QueryOptions } from "@/domain/query-options/query-options.model";

interface PetsPageListProps extends QueryOptions {
  canModify?: boolean;
  handleUnassignPet?: (id: number) => void;
}

export function PetsPageList({ path, queryKey, searchParams, canModify, handleUnassignPet }: PetsPageListProps) {
  const {
    data,
    isLoading,
    error,
    params: { searchTerm, totalCount, totalPages, page },
    setQueryParams
  } = useParamsDataLoader<Pet>({
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
        <PageHeaderTitle>Pets</PageHeaderTitle>
        <PageHeaderSubtitle>Find pets you interested in</PageHeaderSubtitle>
      </PageHeader>

      <PageContent>
        <ListFilterForm formValue={{searchTerm}} totalCount={totalCount} onFilterFormSubmit={setQueryParams} />
        <PetsList pets={data} canModify={canModify} handleUnassignPet={handleUnassignPet} />
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
