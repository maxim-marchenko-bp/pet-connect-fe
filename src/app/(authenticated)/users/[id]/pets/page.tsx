'use client';

import { useParams } from "next/navigation";
import { useUrlSearchParams } from "@/hooks/use-url-search-params";
import { useQuery } from "@tanstack/react-query";
import { clientFetch } from "@/lib/api/client-fetch";
import { buildSearchParams } from "@/lib/search-params/build-search-params";
import { FilteredItems } from "@/lib/api/filtered-items";
import { Pet } from "@/domain/pet/pet.model";
import { Page, PageContent, PageFooter, PageHeader, PageHeaderSubtitle, PageHeaderTitle } from "@/components/ui/page";
import { ListFilterForm } from "@/components/list-filter-form/list-filter-form";
import { PetsList } from "@/app/(authenticated)/pets/components/pets-list";
import { AppPagination } from "@/components/app-pagination/app-pagination";
import { Spinner } from "@/components/ui/spinner";
import { EmptyState } from "@/components/ui/empty-state";

export default function PetsPage() {
  const { id } = useParams();
  const [queryParams, setQueryParams] = useUrlSearchParams();
  const { page, pageSize, searchTerm } = queryParams;
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['userPets', queryParams],
    queryFn: () => clientFetch<FilteredItems<Pet>>(`/users/${id}/pets/list?${buildSearchParams(queryParams)}`),
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
        <PageHeaderTitle>Pets</PageHeaderTitle>
        <PageHeaderSubtitle>Find pets you interested in</PageHeaderSubtitle>
      </PageHeader>

      <PageContent>
        <ListFilterForm formValue={{searchTerm}} totalCount={totalCount} onFilterFormSubmit={setQueryParams} />
        <PetsList pets={items} />
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
