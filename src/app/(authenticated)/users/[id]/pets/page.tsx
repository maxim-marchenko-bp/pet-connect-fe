'use client';

import { useParams } from "next/navigation";
import { useUrlSearchParams } from "@/hooks/use-url-search-params";
import { useQuery } from "@tanstack/react-query";
import { clientFetch } from "@/lib/api/client-fetch";
import { buildSearchParams } from "@/lib/search-params/build-search-params";
import { FilteredItems } from "@/lib/api/filtered-items";
import { Pet } from "@/domain/pet/pet.model";

export default function PetsPage() {
  const { id } = useParams();
  const { searchParams, queryParams } = useUrlSearchParams();

  const { data } = useQuery({
    queryKey: ['userPets', queryParams],
    queryFn: () => clientFetch<FilteredItems<Pet>>(`/users/${id}/pets/list?${buildSearchParams(queryParams)}`),
  });

  console.log(data);


  return <div>{id}</div>
}
