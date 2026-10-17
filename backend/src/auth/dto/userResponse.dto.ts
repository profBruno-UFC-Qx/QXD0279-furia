import { UserEnumRoles } from "../../enums/roles.ts";

export interface UserResponse {
  name: string;
  role: UserEnumRoles;
}

export function UserResponseMapper(obj: unknown): UserResponse {
  if (typeof obj !== "object" || obj === null) {
    throw new Error("Invalid user response: expected an object.");
  }

  if (!("name" in obj) || typeof obj.name !== "string") {
    throw new Error("Invalid user response: name must be a string.");
  }

  if (
    !("role" in obj) ||
    !Object.values(UserEnumRoles).includes(obj.role as UserEnumRoles)
  ) {
    throw new Error("Invalid user response: invalid role.");
  }

  return {
    name: obj.name,
    role: obj.role as UserEnumRoles,
  };
}
