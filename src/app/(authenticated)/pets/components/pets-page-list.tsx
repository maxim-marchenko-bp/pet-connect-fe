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
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { SidebarFilter } from "@/components/sidebar-filter";
import { useQuery } from "@tanstack/react-query";
import { clientFetch } from "@/lib/api/client-fetch";
import { PetType } from "@/domain/pet/pet-type.model";
import { petListFilterForm } from "@/app/(authenticated)/pets/constants/pet-list-filter-form";
import { paramsToForm } from "@/lib/form/params-to-form";
import { formatDateForApi } from "@/lib/date/format-date-for-api";

type PetFormData = Pick<Pet, 'type' | 'dateOfBirth'>;

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
    paginationParams: { totalCount, totalPages, page },
    queryFilters,
    setQueryParams
  } = useParamsDataLoader<Pet>({
    path,
    queryKey,
    searchParams,
  });
  const { data: petTypes, isLoading: isPetTypesLoading } = useQuery({
    queryKey: ['petType'],
    queryFn: () => clientFetch<PetType[]>('/pet-types')
  });
  const filterFormSubmit = (updates: PetFormData) => {
    const params = {
      ...updates,
      dateOfBirth: updates.dateOfBirth ? formatDateForApi(updates.dateOfBirth) : '',
    };
    setQueryParams(params);
  };
  const petListFilterFormConfig = petListFilterForm.map(field => {
    if (field.name === 'type') {
      return {
        ...field,
        selectOptions: petTypes?.map(t => ({ value: t.code, label: t.label })),
        isLoading: isPetTypesLoading,
      };
    } else {
      return field;
    }
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
    <SidebarProvider defaultOpen={false}>
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
          <ListSearch
            formValue={{searchTerm: queryFilters.searchTerm as string}}
            totalCount={totalCount}
            onFilterFormSubmit={setQueryParams}
          />
          <div className="w-full flex justify-end">
            <SidebarTrigger
              size="default"
              className="w-fit"
              label="Filter"
              variant="default"
              showIcon={false}
              useSizing={false}
            ></SidebarTrigger>
          </div>

          <SidebarFilter
            formValue={paramsToForm<PetFormData>(queryFilters, petListFilterFormConfig)}
            onFilterFormSubmit={filterFormSubmit}
            formFieldsConfig={petListFilterFormConfig
          } />
          <PetsList
            pets={data}
            canModify={canModify}
            handleUnassignPet={handleUnassignPet}
          />
        </PageContent>

        <PageFooter>
          <AppPagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={(page) => setQueryParams({page})}
          />
        </PageFooter>
      </Page>
    </SidebarProvider>

  )
}
