import z from "zod";

export const registerDicipline = z.object({
  name: z.string().min(2),
  hours: z.number().min(0),
  course: z.string().min(2),
});
