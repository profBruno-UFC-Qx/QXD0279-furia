import { UserTypeRoles } from "../../enums/roles.ts";

export interface CreateTeacherDTO {
  name: string;
  email: string;
  password: string;
  role: UserTypeRoles;
}