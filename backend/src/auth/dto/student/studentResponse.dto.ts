import { UserTypeRoles } from "../../../enums/roles.ts";

export interface StudentResponseDTO {
  name: string;
  email: string;
  role: UserTypeRoles;
  course: string;
}
