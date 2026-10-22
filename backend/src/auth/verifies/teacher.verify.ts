import { RegisterTeacherSchema } from "../schema/register-teacher.schema.ts";
import { BadRequestError } from "../../errors/errors.ts";
import { TeacherRegisterDTO } from "../dto/register.teacher.dto.ts";

export function isTeacher(body: any) {
  const isValidTeacher = RegisterTeacherSchema.safeParse(body);

  if (!isValidTeacher.success) {
    throw new BadRequestError("Dados de cadastro mal formatados");
  }

  return body as TeacherRegisterDTO;
}
