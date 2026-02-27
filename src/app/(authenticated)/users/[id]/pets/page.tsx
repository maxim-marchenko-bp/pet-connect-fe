'use client';

import { useParams } from "next/navigation";
import { Pet } from "@/domain/pet/pet.model";
import { Page, PageContent, PageFooter, PageHeader, PageHeaderSubtitle, PageHeaderTitle } from "@/components/ui/page";
import { ListFilterForm } from "@/components/list-filter-form/list-filter-form";
import { PetsList } from "@/app/(authenticated)/pets/components/pets-list";
import { AppPagination } from "@/components/app-pagination/app-pagination";
import { Spinner } from "@/components/ui/spinner";
import { EmptyState } from "@/components/ui/empty-state";
import { useParamsDataLoader } from "@/hooks/params-data-loader";

export default function PetsPage() {
  const { id } = useParams();
  const {
    data,
    isLoading,
    error,
    params: { searchTerm, totalCount, totalPages, page },
    setQueryParams
  } = useParamsDataLoader<Pet>({
    path: `/users/${id}/pets/list`,
    queryKey: ['userPets']
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
        <PetsList pets={data} />
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
