import z from "zod";

export const teacherSchema = z.object({
  name: z.string().min(1),
  email: z.email(),
  password: z.string().min(8),
  role: z.enum(["teacher"]).default("teacher"),
  disciplines: z.array(z.number()),
});
