import { UserTypeRoles } from "../../enums/roles.ts";

export interface UserResponse {
  id: number
  name: string;
  role: UserTypeRoles;
}
