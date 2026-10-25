import { DocumentRepository } from "../repository/document.repository.ts";
import { CreateDocumentDto } from "../dto/document.dto.ts";
import { AppError } from "../../errors/errors.ts";

export class DocumentService {
    private repository = new DocumentRepository();

    async createDocument(data: CreateDocumentDto) {
        return this.repository.create(data);
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