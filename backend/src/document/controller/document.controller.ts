import { Request, Response, NextFunction } from "express";
import { DocumentService } from "../service/document.service.ts";
import { createDocumentSchema } from "../schema/document.schema.ts";
import { uploadFileToStorage } from "../../utils/storage.ts";
import { AppError } from "../../errors/errors.ts";

export class DocumentController {
    private service = new DocumentService();

    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!req.file) {
                throw new AppError(400, "Arquivo obrigatório");
            }

            const validatedData = createDocumentSchema.parse(req.body);
            const file_url = await uploadFileToStorage(req.file);

            const document = await this.service.createDocument({
                ...validatedData,
                file_url
            });

            res.status(201).json(document);
        } catch (error) {
            next(error);
        }
    };

    list = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const documents = await this.service.listDocuments(page, limit);
            res.status(200).json(documents);
        } catch (error) {
            next(error);
        }
    };

    getById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = parseInt(req.params.id as string);
            const document = await this.service.getDocumentById(id);
            res.status(200).json(document);
        } catch (error) {
            next(error);
        }
    };

    delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = parseInt(req.params.id as string);
            await this.service.deleteDocument(id);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    };
}