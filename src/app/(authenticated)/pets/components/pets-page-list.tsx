'use client';

import { useParamsDataLoader } from "@/hooks/params-data-loader";
import { Pet } from "@/domain/pet/pet.model";
import { Spinner } from "@/components/ui/spinner";
import { EmptyState } from "@/components/ui/empty-state";
import { Page, PageContent, PageFooter, PageHeader, PageHeaderSubtitle, PageHeaderTitle } from "@/components/ui/page";
import { ListSearch } from "@/components/list-filter-form/list-search";
import { PetsList } from "@/app/(authenticated)/pets/components/pets-list";
import { AppPagination } from "@/components/app-pagination/app-pagination";
import { QueryOptions } from "@/domain/query-options/query-options.model";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@heroicons/react/24/outline";

interface PetsPageListProps extends QueryOptions {
  canModify?: boolean;
  canAdd?: boolean;
  handleUnassignPet?: (id: number) => void;
  handleAddPet?: () => void;
}

export function PetsPageList({ path, queryKey, searchParams, canModify, canAdd, handleUnassignPet, handleAddPet }: PetsPageListProps) {
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
        <div className="w-full flex justify-between items-center">
          <div>
            <PageHeaderTitle>Pets</PageHeaderTitle>
            <PageHeaderSubtitle>Find pets you interested in</PageHeaderSubtitle>
          </div>
          {
            canAdd && handleAddPet &&
            <Button onClick={handleAddPet}>
              <PlusIcon />
              <span>Add Pet</span>
            </Button>
          }
        </div>
      </PageHeader>

      <PageContent>
        <ListSearch formValue={{searchTerm}} totalCount={totalCount} onFilterFormSubmit={setQueryParams} />
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
