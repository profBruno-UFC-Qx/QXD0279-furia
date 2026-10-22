import { Request, Response } from "express";
import { BadRequestError } from "../errors/errors.ts";
import { StudentService } from "./student.service.ts";
import { updateStudentSchema } from "./schema/studentUpdate.schema.ts";

export class StudentController {
  constructor(private studentService: StudentService) {}

  findAll = async (_req: Request, res: Response) => {
    const students = await this.studentService.findAll();
    return res.status(200).json(students);
  };

  findById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      throw new BadRequestError("ID de aluno inválido");
    }

    const student = await this.studentService.findById(id);
    return res.status(200).json(student);
  };

  update = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      throw new BadRequestError("ID de aluno inválido");
    }

    const parsedStudent = updateStudentSchema.safeParse(req.body);

    if (!parsedStudent.success) {
      throw new BadRequestError(
        "Dados de atualização do aluno mal formatados",
        parsedStudent.error,
      );
    }

    const student = await this.studentService.updateStudent(
      id,
      parsedStudent.data,
    );
    return res.status(200).json(student);
  };


}
