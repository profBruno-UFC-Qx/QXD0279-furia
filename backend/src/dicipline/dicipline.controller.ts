import { Request, Response, NextFunction } from "express";
import { DiciplineService } from "./dicipline.service.ts";

export class DiciplineController {
  constructor(private service: DiciplineService) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const discipline = await this.service.create(req.body);
      return res.status(201).json(discipline);
    } catch (error) {
      next(error);
    }
  };

  findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const disciplines = await this.service.findAll();
      return res.status(200).json(disciplines);
    } catch (error) {
      next(error);
    }
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