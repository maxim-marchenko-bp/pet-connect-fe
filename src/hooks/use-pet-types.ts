import { useQuery } from "@tanstack/react-query";
import { clientFetch } from "@/lib/api/client-fetch";
import { PetType } from "@/domain/pet/pet-type.model";

export function usePetTypes() {
  return useQuery({
    queryKey: ['pet-types'],
    queryFn: () => clientFetch<PetType[]>('/pet-types'),
  });
}
