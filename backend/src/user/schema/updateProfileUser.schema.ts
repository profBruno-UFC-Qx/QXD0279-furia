import z from "zod";

export const updateProfileUserSchema = z.object({
  name: z.string().trim().min(1, "Nome é obrigatório"),
  course: z.string().trim().min(1).optional(),
});
