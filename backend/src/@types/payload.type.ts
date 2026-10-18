import { UserTypeRoles } from "../enums/roles.ts";

export interface Payload {
  id: number;
  role: UserTypeRoles;
}
