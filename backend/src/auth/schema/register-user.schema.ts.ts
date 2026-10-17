import z from "zod";

enum UserTypeRoles {
  ADMIN = "admin",
  STUDENT = "student",
  TEACHER = "teacher",
}

export const RegisterUserSchema = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string().min(8),
  role: z.enum(UserTypeRoles),
});
