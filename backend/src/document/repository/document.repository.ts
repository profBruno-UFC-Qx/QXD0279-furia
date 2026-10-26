import { DataBase } from "../../database/dataBase.ts";
import type { CreateDocumentDto } from "../dto/document.dto.ts";

export class DocumentRepository {
    constructor(private database: DataBase) { }

    async create(data: CreateDocumentDto) {
        return this.database.documents.create({ data });
    }

    async findAll(skip: number, take: number) {
        return this.database.documents.findMany({
            skip, 
            take,
            include: {
                discipline: true,
                teacher: {
                    include: {
                        user: true
                    }
                }
            }
        });
    }

    async findById(id: number) {
        return this.database.documents.findUnique({ where: { id } });
    }

    async delete(id: number) {
        return this.database.documents.delete({ where: { id } });
    }

    async findTeacherById(id: number) {
        return this.database.teacher.findUnique({ where: { teacher_id: id } });
    }

    async findDisciplineById(id: number) {
        return this.database.discipline.findUnique({ where: { discipline_id: id } });
    }

    async findStudentById(id: number) {
        return this.database.student.findUnique({ where: { student_id: id } });
    }
}