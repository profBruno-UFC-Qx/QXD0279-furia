import { Request, Response, NextFunction } from "express";
import multer from "multer";
import { AppError } from "../errors/errors.ts";

export const errorHandling = (
  erre: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (erre instanceof AppError) {
    return res.status(erre.status).json({
      message: erre.message,
      details: erre.details,
    });
  } else {
    if (erre instanceof multer.MulterError) {
      const status = erre.code === "LIMIT_FILE_SIZE" ? 413 : 400;
      const message = erre.code === "LIMIT_FILE_SIZE"
        ? "O arquivo excede o limite de 5 MB"
        : "Não foi possível processar o arquivo enviado";
      return res.status(status).json({ message });
    }
    console.log(erre);
    return res.status(500).json("Something went wrong!!");
  }
};
