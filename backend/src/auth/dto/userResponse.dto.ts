import { UserTypeRoles } from "../../enums/roles.ts";

export interface UserResponse {
  name: string;
  role: UserTypeRoles;
}

const userRoles: UserTypeRoles[] = ["student", "teacher", "admin"];

export function UserResponseMapper(obj: unknown): UserResponse {
  if (typeof obj !== "object" || obj === null) {
    throw new Error("Invalid user response: expected an object.");
  }

  if (!("name" in obj) || typeof obj.name !== "string") {
    throw new Error("Invalid user response: name must be a string.");
  }

  if (
    !("role" in obj) ||
    typeof obj.role !== "string" ||
    !userRoles.includes(obj.role as UserTypeRoles)
  ) {
    throw new Error("Invalid user response: invalid role.");
  }

  return {
    name: obj.name,
    role: obj.role as UserTypeRoles,
  };
}
