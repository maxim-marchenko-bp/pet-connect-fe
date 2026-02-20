import { BaseModel } from "@/domain/base/base.type";

export interface PetType extends BaseModel {
  code: string;
  label: string;
}
