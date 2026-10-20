import { UserTypeRoles } from "../../enums/roles.ts";

export interface UserResponse {
  name: string;
  role: UserTypeRoles;
}
