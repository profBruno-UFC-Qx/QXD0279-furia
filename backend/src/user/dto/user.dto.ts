export interface UserDTO {
  password: string;
  email: string;
  name: string;
  role: "student" | "teacher" | "admin";
}
