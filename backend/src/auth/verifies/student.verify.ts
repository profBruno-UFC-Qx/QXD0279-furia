import { RegisterStudentSchema } from "../schema/register-student.schema.ts";
import { BadRequestError } from "../../errors/errors.ts";
import { StudentDTO } from "../dto/student/student.dto.ts";

export function isStudent(body: any) {
  const isValidStudent = RegisterStudentSchema.safeParse(body);

  if (!isValidStudent.success) {
    throw new BadRequestError(isValidStudent.error);
  }

  return body as StudentDTO;
}
