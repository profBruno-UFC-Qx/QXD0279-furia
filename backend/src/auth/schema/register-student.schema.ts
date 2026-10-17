import z from "zod";

export const RegisterStudentSchema = z.object({
  course: z.string(),
});
