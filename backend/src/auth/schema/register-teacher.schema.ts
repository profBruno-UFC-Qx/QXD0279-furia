import z from "zod";

export const RegisterTeacherSchema = z.object({
  disciplines: z.array(z.number()),
});
