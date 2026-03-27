import { BaseModel } from "@/domain/base/base.type";
import { PetType } from "@/domain/pet/pet-type.model";
import { User } from "@/domain/user/user.model";

export interface Pet extends BaseModel {
  name: string;
  dateOfBirth?: Date | null;
  type: PetType;
  users: User[];
  canEdit?: boolean;
}

export interface CreatePetDto extends Omit<Pet, 'type'> {
  type: string | null;
}
