import { Router } from "express";
import { DocumentController } from "../controller/document.controller.ts";
import { AuthMiddleware } from "../../auth/middlewares/auth.middleware.ts";
import { AutorizationMiddleware } from "../../middlewares/autorization.middleware.ts";
import { uploadMiddleware } from "../../middlewares/upload.middleware.ts";

export function createDocumentRouter(documentController: DocumentController) {
    const documentRouter = Router();

    documentRouter.post(
        "/document",
        AuthMiddleware,
        AutorizationMiddleware(["teacher", "student", "admin"]),
        uploadMiddleware.single("file"),
        documentController.create
    );

    documentRouter.get("/document", AuthMiddleware, documentController.list);

    documentRouter.get("/document/:id", AuthMiddleware, documentController.getById);

    documentRouter.delete(
        "/document/:id",
        AuthMiddleware,
        AutorizationMiddleware(["teacher", "admin"]),
        documentController.delete
    );

    return documentRouter;
}