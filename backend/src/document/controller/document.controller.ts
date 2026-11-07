import { Request, Response, NextFunction } from "express";
import { DocumentService } from "../service/document.service.ts";
import { createDocumentSchema } from "../schema/document.schema.ts";
import { AppError, BadRequestError } from "../../errors/errors.ts";

export class DocumentController {
    constructor(private service: DocumentService) { }

    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!req.file) {
                throw new AppError(400, "Arquivo obrigatório");
            }

            const validatedData = createDocumentSchema.safeParse(req.body);
            if (!validatedData.success) {
                throw new BadRequestError(
                    "Dados do documento inválidos",
                    validatedData.error.issues.map((issue) => issue.message),
                );
            }

            const userId = res.locals.user?.id || (req as any).user?.id; 
            const role = res.locals.user?.role || (req as any).user?.role;

            if (role === 'student') {
                validatedData.data.student_id = userId;
            } else if (role === 'teacher') {
                validatedData.data.teacher_id = userId;
            }

            const document = await this.service.createDocument(validatedData.data, req.file);

            return res.status(201).json(document);
        } catch (error) {
            return next(error);
        }
    };

    list = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const documents = await this.service.listDocuments(page, limit, req.query);
            return res.status(200).json(documents);
        } catch (error) {
            return next(error);
        }
    };

    getById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = parseInt(req.params.id as string);
            if (isNaN(id)) {
                throw new AppError(400, "ID do documento inválido");
            }
            const document = await this.service.getDocumentById(id);
            return res.status(200).json(document);
        } catch (error) {
            return next(error);
        }
    };

    getMine = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            
            const userId = res.locals.user?.id || (req as any).user?.id; 
            const role = res.locals.user?.role || (req as any).user?.role;

            if (!userId) {
                throw new AppError(401, "Usuário não autenticado");
            }

            const documents = await this.service.getMineDocuments(page, limit, userId, role);
            return res.status(200).json(documents);
        } catch (error) {
            return next(error);
        }
    };

    delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = parseInt(req.params.id as string);
            await this.service.deleteDocument(id);
            return res.status(204).send();
        } catch (error) {
            return next(error);
        }
    };
}