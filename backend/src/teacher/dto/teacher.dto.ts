import { UserTypeRoles } from "../../enums/roles.ts";

export interface TeacherDTO {
  name: string;
  email: string;
  password: string;
  disciplines: Array<number>;
  role: UserTypeRoles;
}
