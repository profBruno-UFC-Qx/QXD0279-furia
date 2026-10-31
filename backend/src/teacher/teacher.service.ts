import { NotFoundError } from "../errors/errors.ts";
import { UserService } from "../user/user.service.ts";
import { TeacherRegisterDTO } from "../auth/dto/register.teacher.dto.ts";
import { TeacherDTO } from "./dto/teacher.dto.ts";
import { TeacherRepository } from "./teacher.repository.ts";
import { DataBase } from "../database/dataBase.ts";
import { pagWrapper } from "../utils/pagWrapper.ts";
import { calculateAverage } from "./utils/calculateAvarege.ts";
import { filterTeacher } from "../@types/filterTeacher.type.ts";

export class TeacherService {
  constructor(
    private userService: UserService,
    private teacherRepository: TeacherRepository,
    private database: DataBase,
  ) { }

  async createTeacher(teacherData: TeacherRegisterDTO) {
    const { email, password, name, role, disciplines } = teacherData;

    return await this.database.$transaction(async (tx) => {
      const user = await this.userService.createUserInTransaction(
        {
          email,
          password,
          name,
          role,
        },
        tx,
      );

      return await this.teacherRepository.createTeacher(
        user,
        { ...teacherData, disciplines },
        tx,
      );
    });
  }

  async findAll(take: number, skip: number, filters: filterTeacher) {
    const total = await this.teacherRepository.count();
    const data = await this.teacherRepository.findAll(take, skip, filters);

    const NotasGerais = data.map((prof) => {
      return {
        ...prof,
        avaliacoes: {
          nota_geral_media: calculateAverage(
            prof.avaliacoes.map((av) => av.nota_geral),
          ),
          nota_didatica_media: calculateAverage(
            prof.avaliacoes.map((av) => av.nota_didatica),
          ),
          nota_metodologia_media: calculateAverage(
            prof.avaliacoes.map((av) => av.nota_metodologia),
          ),
        },
      };
    });

    return { data: NotasGerais, meta: pagWrapper(take, skip, total) };
  }

  async getDashboard(userId: number) {
    const teacherData = await this.teacherRepository.getDashboardInfo(userId);

    if (!teacherData) {
      throw new NotFoundError("Professor não encontrado para este usuário");
    }

    const totalReviews = teacherData.avaliacoes.length;
    const mediaGeral = calculateAverage(
      teacherData.avaliacoes.map((av) => av.nota_geral)
    );

    const activeDisciplines = teacherData.disciplines.map(d => {
      const reviewsDaDisciplina = teacherData.avaliacoes.filter(av => av.discipline_id === d.discipline_id);
      return {
        id: d.discipline_id.toString(),
        name: d.name,
        studentCount: reviewsDaDisciplina.length, // Usando número de reviews como aproximação
        averageRating: calculateAverage(reviewsDaDisciplina.map(av => av.nota_geral))
      };
    });

    return {
      professorName: teacherData.user.name,
      stats: {
        averageRating: mediaGeral,
        totalReviews: totalReviews,
        activeDocuments: teacherData.documents.length,
        activeDisciplinesCount: teacherData.disciplines.length
      },
      recentReviews: teacherData.avaliacoes.slice(0, 5),
      activeDisciplines: activeDisciplines,
      recentDocuments: teacherData.documents.map(doc => ({
        id: doc.id.toString(),
        fileName: doc.titulo,
        disciplineName: doc.discipline?.name || 'Geral',
      }))
    };
  }

  async findById(id: number) {
    const teacher = await this.teacherRepository.findById(id);

    if (!teacher) {
      throw new NotFoundError("Professor nao encontrado");
    }

    return teacher;
  }

  async findProfileById(id: number) {
    const teacherProfile = await this.teacherRepository.findProfileById(id);

    if (!teacherProfile) {
      throw new NotFoundError("Perfil do professor não encontrado");
    }

    const avaliacoesFormatadas = {
      ...teacherProfile,
      media_geral: calculateAverage(
        teacherProfile.avaliacoes.map((av) => av.nota_geral)
      ),
      media_didatica: calculateAverage(
        teacherProfile.avaliacoes.map((av) => av.nota_didatica)
      ),
      media_metodologia: calculateAverage(
        teacherProfile.avaliacoes.map((av) => av.nota_metodologia)
      ),
    };

    return avaliacoesFormatadas;
  }

  async updateTeacher(id: number, teacherData: Partial<TeacherDTO>) {
    const teacher = await this.findById(id);

    if (!teacher.user) {
      throw new NotFoundError("Professor nao encontrado");
    }

    const updatedUser = await this.userService.updateUser(
      teacher.user.user_id,
      {
        ...(teacherData.name ? { name: teacherData.name } : {}),
        ...(teacherData.email ? { email: teacherData.email } : {}),
        ...(teacherData.password ? { password: teacherData.password } : {}),
        ...(teacherData.role ? { role: teacherData.role } : {}),
      },
    );

    if (!updatedUser) {
      throw new NotFoundError("Usuario nao encontrado");
    }

    const updatedTeacher = await this.teacherRepository.findById(id);
    if (!updatedTeacher) {
      throw new NotFoundError("Professor nao encontrado");
    }

    updatedTeacher.user = updatedUser;
    return updatedTeacher;
  }

  async deleteTeacher(id: number) {
    const teacher = await this.teacherRepository.findById(id);

    if (!teacher || !teacher.user) {
      throw new NotFoundError("Professor nao encontrado");
    }

    const deleted = await this.userService.deleteUser(teacher.user.user_id);

    if (!deleted) {
      throw new NotFoundError("Nao foi possivel deletar o professor");
    }

    return deleted;
  }
}
