import { studentSchema } from "./student.schema.ts";

export const updateStudentSchema = studentSchema.partial();
