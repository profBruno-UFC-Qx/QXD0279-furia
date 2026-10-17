import { UserEnumRoles } from "../../enums/roles.ts";

export interface StudentDTO {
  name: string;
  email: string;
  password: string;
  course: string;
  role: UserEnumRoles;
}
