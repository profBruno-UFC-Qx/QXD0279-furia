import { UserTypeRoles } from "../../enums/roles.ts";

export interface CreateStudentDTO {
  name: string;
  email: string;
  password: string;
  course: string;
  role: UserTypeRoles;
}
