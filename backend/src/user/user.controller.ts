import { Request, Response } from "express";
import z from "zod";
import { BadRequestError } from "../errors/errors.ts";
import { UserService } from "./user.service.ts";
import { updateUserSchema } from "./schema/updateUser.schema.ts";

export class UserController {
  constructor(private service: UserService) {}

  findAll = async (req: Request, res: Response) => {
    const take = Number(req.query.limit) || 100;
    const page = Number(req.query.page) || 1;
    const skip = (page - 1) * take;

    const users = await this.service.findAll(take, skip);
    return res.status(200).json(users);
  };

  findById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      throw new BadRequestError("ID de usuário inválido");
    }

    const user = await this.service.findById(id);
    return res.status(200).json(user);
  };

  getStats = async (_req: Request, res: Response) => {
    const stats = await this.service.getStats();
    return res.status(200).json(stats);
  };

  update = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      throw new BadRequestError("ID de usuário inválido");
    }

    const parsedUser = updateUserSchema.safeParse(req.body);

    if (!parsedUser.success) {
      throw new BadRequestError(
        "Dados de atualização do usuário mal formatados",
        parsedUser.error,
      );
    }

    const user = await this.service.updateUser(id, parsedUser.data);
    return res.status(200).json(user);
  };

  delete = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      throw new BadRequestError("ID de usuário inválido");
    }

    await this.service.deleteUser(id);
    return res.status(204).send();
  };

  deleteByEmail = async (req: Request, res: Response) => {
    const parsedEmail = z.string().email().safeParse(req.params.email);

    if (!parsedEmail.success) {
      throw new BadRequestError("E-mail de usuário inválido");
    }

    await this.service.deleteUserByEmail(parsedEmail.data);
    return res.status(204).send();
  };
}
