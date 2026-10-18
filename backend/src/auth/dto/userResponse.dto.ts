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

  const user = "user" in obj ? obj.user : obj;

  if (typeof user !== "object" || user === null) {
    throw new Error("Invalid user response: user must be an object.");
  }

  if (!("name" in user) || typeof user.name !== "string") {
    throw new Error("Invalid user response: name must be a string.");
  }

  if (
    !("role" in user) ||
    typeof user.role !== "string" ||
    !userRoles.includes(user.role as UserTypeRoles)
  ) {
    throw new Error("Invalid user response: invalid role.");
  }

  return {
    name: user.name,
    role: user.role as UserTypeRoles,
  };
}
