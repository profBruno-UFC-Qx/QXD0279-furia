import { Request, Response } from "express";
import z from "zod";
import { BadRequestError } from "../errors/errors.ts";
import { TeacherService } from "./teacher.service.ts";
import { teacherSchema } from "./schema/teacher.schema.ts";
import { updateTeacherSchema } from "./schema/teacherUpdate.schema.ts";



export class TeacherController {
  constructor(private teacherService: TeacherService) {}

  findAll = async (_req: Request, res: Response) => {
    const teachers = await this.teacherService.findAll();
    return res.status(200).json(teachers);
  };

  findById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      throw new BadRequestError("ID de professor inválido");
    }

    const teacher = await this.teacherService.findById(id);
    return res.status(200).json(teacher);
  };

  update = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      throw new BadRequestError("ID de professor inválido");
    }

    const parsedTeacher = updateTeacherSchema.safeParse(req.body);

    if (!parsedTeacher.success) {
      throw new BadRequestError(
        "Dados de atualização do professor mal formatados",
        parsedTeacher.error,
      );
    }

    const teacher = await this.teacherService.updateTeacher(
      id,
      parsedTeacher.data,
    );
    return res.status(200).json(teacher);
  };

  delete = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      throw new BadRequestError("ID de professor inválido");
    }

    await this.teacherService.deleteTeacher(id);
    return res.status(204).send();
  };
}
