import { DocumentRepository } from "../repository/document.repository.ts";
import type { CreateDocumentDto } from "../dto/document.dto.ts";
import { AppError } from "../../errors/errors.ts";
import type { CreateDocumentInput } from "../schema/document.schema.ts";

type UploadDocumentFile = (file: Express.Multer.File) => Promise<string>;

export class DocumentService {
    constructor(
        private repository: DocumentRepository,
        private uploadFile: UploadDocumentFile,
    ) { }

    async createDocument(data: CreateDocumentInput, file: Express.Multer.File) {
        const [teacher, discipline, student] = await Promise.all([
            this.repository.findTeacherById(data.teacher_id),
            this.repository.findDisciplineById(data.discipline_id),
            data.student_id === undefined
                ? Promise.resolve(true)
                : this.repository.findStudentById(data.student_id),
        ]);

        if (!teacher) {
            throw new AppError(404, "Professor não encontrado");
        }
        if (!discipline) {
            throw new AppError(404, "Disciplina não encontrada");
        }
        if (!student) {
            throw new AppError(404, "Estudante não encontrado");
        }

        const file_url = await this.uploadFile(file);
        const document: CreateDocumentDto = { ...data, file_url };
        return this.repository.create(document);
    }

    async listDocuments(page: number, limit: number) {
        const skip = (page - 1) * limit;
        return this.repository.findAll(skip, limit);
    }

    async getDocumentById(id: number) {
        const document = await this.repository.findById(id);
        if (!document) {
            throw new AppError(404, "Documento não encontrado");
        }
        return document;
    }

    async deleteDocument(id: number) {
        await this.getDocumentById(id);
        return this.repository.delete(id);
    }
}