import { RegisterStudentSchema } from "../schema/register-student.schema.ts";
import { BadRequestError } from "../../errors/errors.ts";

export function isStudent(body: any) {
  const isValidStudent = RegisterStudentSchema.safeParse(body);

  if (!isValidStudent.success) {
    throw new BadRequestError(
      "Invalid student body format.",
      isValidStudent.error,
    );
  }
}
