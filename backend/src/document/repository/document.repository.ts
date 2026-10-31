import { DataBase } from "../../database/dataBase.ts";
import type { CreateDocumentDto } from "../dto/document.dto.ts";

export class DocumentRepository {
    constructor(private database: DataBase) { }

    async create(data: CreateDocumentDto) {
        return this.database.documents.create({ data });
    }

    async findAll(page: number, limit: number, filters: any = {}) {
        const skip = (page - 1) * limit;
        
        const whereCondition: any = {};

        if (filters?.search) {
        whereCondition.titulo = { contains: String(filters.search), mode: "insensitive" };
        }

        if (filters?.discipline) {
        whereCondition.discipline = { name: { contains: String(filters.discipline), mode: "insensitive" } };
        }

        if (filters?.teacher) {
        whereCondition.teacher_id = Number(filters.teacher);
        }

        const documents = await this.database.documents.findMany({
        where: whereCondition,
        skip: skip,
        take: limit,
        include: {
            teacher: { include: { user: true } },
            discipline: true
        },
        orderBy: { data_publicacao: 'desc' }
        });

        const total = await this.database.documents.count({ where: whereCondition });

        return {
        data: documents,
        meta: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit)
        }
        };
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