import { Pet } from "@/domain/pet/pet.model";

export interface PetInvitationToken {
  token: string;
  url: string;
}

export interface PetInvite {
  id: number;
  used: boolean;
  pet: Pet;
}
