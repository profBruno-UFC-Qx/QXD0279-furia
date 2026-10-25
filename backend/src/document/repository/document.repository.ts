import { databaseInstance } from "../../database/dataBase.ts";
import { CreateDocumentDto } from "../dto/document.dto.ts";

export class DocumentRepository {
    async create(data: CreateDocumentDto) {
        return databaseInstance.documents.create({ data });
    }

    async findAll(skip: number, take: number) {
        return databaseInstance.documents.findMany({ skip, take });
    }

    async findById(id: number) {
        return databaseInstance.documents.findUnique({ where: { id } });
    }

    async delete(id: number) {
        return databaseInstance.documents.delete({ where: { id } });
    }
}