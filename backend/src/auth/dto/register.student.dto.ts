import { UserTypeRoles } from "../../enums/roles.ts";

export interface StudentRegisterDTO {
  name: string;
  email: string;
  password: string;
  course: string;
  role: UserTypeRoles;
}
