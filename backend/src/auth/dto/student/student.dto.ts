import { RegisterStudentSchema } from "../../schema/register-student.schema.ts";
import { RegisterUserSchema } from "../../schema/register-user.schema.ts.ts";

import z from "zod";

export type StudentDTO = z.infer<typeof RegisterUserSchema> &
  z.infer<typeof RegisterStudentSchema>;
