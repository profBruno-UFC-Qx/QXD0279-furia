import z from "zod";

export const registerDicipline = z.object({
  name: z.string().min(2),
  hours: z.number(),
  course: z.string().min(2),
});
