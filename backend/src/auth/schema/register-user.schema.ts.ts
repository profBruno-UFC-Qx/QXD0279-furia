import z from "zod";

enum UserTypeRoles {
  ADMIN = "admin",
  STUDENT = "student",
  TEACHER = "teacher",
}

export const RegisterUserSchema = z.object({
  name: z.string().min(3, "Nome deve possuir pelo menos 3 caracteres"),
  email: z.email("Email inválido"),
  password: z.string().min(8, "Senha deve possuir pelo menos 8 caracteres"),
  role: z.enum(UserTypeRoles),
});
