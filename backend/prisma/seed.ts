import bcrypt from "bcrypt";
import { databaseInstance as prisma } from "../src/database/dataBase";
import { Role } from "../src/generated/prisma/enums";

const usersSeed = [
  {
    user_id: 1,
    email: "aluno1@avaliae.com",
    name: "Ana Silva",
    password: "123456",
    role: Role.student,
  },
  {
    user_id: 2,
    email: "aluno2@avaliae.com",
    name: "Bruno Costa",
    password: "123456",
    role: Role.student,
  },
  {
    user_id: 3,
    email: "prof1@avaliae.com",
    name: "Carla Mendes",
    password: "123456",
    role: Role.teacher,
  },
  {
    user_id: 4,
    email: "prof2@avaliae.com",
    name: "Daniel Rocha",
    password: "123456",
    role: Role.teacher,
  },
] as const;

const studentsSeed = [
  { student_id: 1, course: "Engenharia de Software" },
  { student_id: 2, course: "Ciência da Computação" },
] as const;

const disciplinesSeed = [
  {
    discipline_id: 1,
    name: "Algoritmos e Programação",
    course: "Engenharia de Software",
    hours: 60,
  },
  {
    discipline_id: 2,
    name: "Banco de Dados",
    course: "Engenharia de Software",
    hours: 40,
  },
  {
    discipline_id: 3,
    name: "Arquitetura de Software",
    course: "Engenharia de Software",
    hours: 80,
  },
] as const;

const avaliacoesSeed = [
  {
    nota_geral: 8.4,
    nota_didatica: 8.7,
    nota_metodologia: 8.1,
    comment: "Excelente desempenho e boa organização na disciplina.",
    student_id: 1,
    teacher_id: 3,
    discipline_id: 1,
  },
  {
    nota_geral: 9.1,
    nota_didatica: 9.3,
    nota_metodologia: 8.9,
    comment: "Muito bom domínio dos conceitos e aplicação prática.",
    student_id: 2,
    teacher_id: 4,
    discipline_id: 2,
  },
  {
    nota_geral: 8.8,
    nota_didatica: 9.0,
    nota_metodologia: 8.6,
    comment: "Crítica construtiva bem fundamentada e apresentação clara.",
    student_id: 1,
    teacher_id: 4,
    discipline_id: 3,
  },
] as const;

async function main() {
  await prisma.avaliacao.deleteMany();
  await prisma.teacher.deleteMany();
  await prisma.student.deleteMany();
  await prisma.user.deleteMany();
  await prisma.discipline.deleteMany();

  for (const user of usersSeed) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const userData = {
      user_id: user.user_id,
      email: user.email,
      name: user.name,
      password: hashedPassword,
      role: user.role,
    };

    if (user.role === Role.student) {
      const studentData = studentsSeed.find(
        (student) => student.student_id === user.user_id,
      );

      await prisma.user.create({
        data: {
          ...userData,
          student: {
            create: {
              course: studentData?.course ?? "Engenharia de Software",
            },
          },
        },
      });
      continue;
    }

    await prisma.user.create({
      data: {
        ...userData,
        teacher: {
          create: {},
        },
      },
    });
  }

  for (const discipline of disciplinesSeed) {
    await prisma.discipline.create({
      data: {
        discipline_id: discipline.discipline_id,
        name: discipline.name,
        course: discipline.course,
        hours: discipline.hours,
      },
    });
  }

  await prisma.teacher.update({
    where: { teacher_id: 3 },
    data: {
      disciplines: {
        set: [{ discipline_id: 1 }, { discipline_id: 2 }],
      },
    },
  });

  await prisma.teacher.update({
    where: { teacher_id: 4 },
    data: {
      disciplines: {
        set: [{ discipline_id: 2 }, { discipline_id: 3 }],
      },
    },
  });

  for (const avaliacao of avaliacoesSeed) {
    await prisma.avaliacao.create({
      data: {
        nota_geral: avaliacao.nota_geral,
        nota_didatica: avaliacao.nota_didatica,
        nota_metodologia: avaliacao.nota_metodologia,
        comment: avaliacao.comment,
        student: {
          connect: { student_id: avaliacao.student_id },
        },
        teacher: {
          connect: { teacher_id: avaliacao.teacher_id },
        },
        discipline: {
          connect: { discipline_id: avaliacao.discipline_id },
        },
      },
    });
  }

  console.log("Seed executada com sucesso.");
}

main()
  .catch((error) => {
    console.error("Erro ao executar a seed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
