import multer from "multer";
import { extname } from "node:path";
import { AppError } from "../errors/errors.ts";

const storage = multer.memoryStorage();
const allowedMimeTypes: Record<string, string> = {
    ".pdf": "application/pdf",
    ".doc": "application/msword",
    ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
};

export const uploadMiddleware = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
    fileFilter: (_req, file, callback) => {
        const extension = extname(file.originalname).toLowerCase();
        if (allowedMimeTypes[extension] !== file.mimetype) {
            return callback(new AppError(400, "Formato inválido. Envie um arquivo PDF, DOC ou DOCX."));
        }
        return callback(null, true);
    },
});