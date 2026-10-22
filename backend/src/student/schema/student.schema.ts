import z from "zod";

export const studentSchema = z.object({
  name: z.string().min(1),
  email: z.email(),
  password: z.string().min(8),
  role: z.enum(["student"]).default("student"),
  course: z.string().min(1),
});
