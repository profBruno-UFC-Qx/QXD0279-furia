import z from "zod";

export const updateProfileUserSchema = z.object({
  name: z.string().min(2),
  course: z.string(),
});
