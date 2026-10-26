import { Request, Response, NextFunction } from "express";
import { DiciplineService } from "./dicipline.service.ts";
import { registerDicipline } from "./schemas/registerDicipline.schema.ts";
import { BadRequestError } from "../errors/errors.ts";

export class DiciplineController {
  constructor(private service: DiciplineService) {}

  create = async (req: Request, res: Response) => {
    const isValidDicipline = registerDicipline.safeParse(req.body);

    if (!isValidDicipline.success) {
      throw new BadRequestError(
        "Dados de diciplina mal formatados",
        isValidDicipline.error,
      );
    }

    const discipline = await this.service.create(req.body);
    return res.status(201).json(discipline);
  };

  findAll = async (req: Request, res: Response) => {
    const take = Number(req.query.limit) || 100;
    const page = Number(req.query.page) || 1;

    const skip = (page - 1) * take;

    const disciplines = await this.service.findAll(take, skip);
    return res.status(200).json(disciplines);
  };

  findAllNames = async (req: Request, res: Response) => {
    const disciplines = await this.service.findAllNames();
    return res.status(200).json(disciplines);
  };

  //   findById = async (req: Request, res: Response, next: NextFunction) => {
  //     try {
  //       const id = Number(req.params.id);

  //       if (!Number.isInteger(id) || id <= 0) {
  //         return res.status(400).json({ message: "ID inválido" });
  //       }

  //       const discipline = await this.service.findById(id);
  //       return res.status(200).json(discipline);
  //     } catch (error) {
  //       next(error);
  //     }
  //   };

  //   update = async (req: Request, res: Response, next: NextFunction) => {
  //     try {
  //       const id = Number(req.params.id);

  //       if (!Number.isInteger(id) || id <= 0) {
  //         return res.status(400).json({ message: "ID inválido" });
  //       }

  //       const discipline = await this.service.update(id, req.body);
  //       return res.status(200).json(discipline);
  //     } catch (error) {
  //       next(error);
  //     }
  //   };

  //   delete = async (req: Request, res: Response, next: NextFunction) => {
  //     try {
  //       const id = Number(req.params.id);

  //       if (!Number.isInteger(id) || id <= 0) {
  //         return res.status(400).json({ message: "ID inválido" });
  //       }

  //       await this.service.delete(id);
  //       return res.status(204).send();
  //     } catch (error) {
  //       next(error);
  //     }
  //   };
}
