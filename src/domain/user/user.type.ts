import { BaseModel } from "@/domain/base/base.type";

export interface User extends BaseModel{
  name: string;
  lastname: string;
  email: string;
  password: string;
  age?: number;
  isActive?: boolean;
}
