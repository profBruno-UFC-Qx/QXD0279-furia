import { RegisterStudentSchema } from "../schema/register-student.schema.ts";
import { BadRequestError } from "../../errors/errors.ts";
import { StudentRegisterDTO } from "../dto/register.student.dto.ts";

export function isStudent(body: any) {
  const isValidStudent = RegisterStudentSchema.safeParse(body);

  if (!isValidStudent.success) {
    throw new BadRequestError("Dados de cadastro mal formatados");
  }

  return body as StudentRegisterDTO;
}
