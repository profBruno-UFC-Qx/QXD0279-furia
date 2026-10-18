import { UserTypeRoles } from "../enums/roles.ts";

export interface Payload {
  user_id: number;
  role: UserTypeRoles;
}
