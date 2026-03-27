import { BaseModel } from "@/domain/base/base.type";
import { Gender } from "@/domain/gender/gender.enum";
import { Pet } from "@/domain/pet/pet.model";

export interface User extends BaseModel{
  name: string;
  lastname: string;
  email: string;
  password: string;
  dateOfBirth?: Date | null;
  isActive?: boolean;
  gender: Gender | null;
  pets?: Pet[];
}
