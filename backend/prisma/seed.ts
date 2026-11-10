import bcrypt from "bcrypt";
import { databaseInstance as prisma } from "../src/database/dataBase";
import { Role } from "../src/generated/prisma/enums";

const studentCount = 12;
const teacherCount = 12;
const adminCount = 3;
const disciplineCount = 12;
const documentsCount = 12;
const avaliacoesCount = 12;

const usersSeed = Array.from(
  { length: studentCount + teacherCount + adminCount },
  (_, index) => {
    const role =
      index < studentCount
        ? Role.student
        : index < studentCount + teacherCount
          ? Role.teacher
          : Role.admin;

    const sequence = index + 1;
    const firstName = [
      "Ana",
      "Bruno",
      "Carla",
      "Daniel",
      "Eduarda",
      "Felipe",
      "Giovana",
      "Henrique",
      "Isabela",
      "Joao",
      "Kamila",
      "Lucas",
      "Marina",
      "Nicolas",
      "Olivia",
      "Pedro",
      "Quenia",
      "Rafael",
      "Sara",
      "Thiago",
      "Ulisses",
      "Vitoria",
      "Wagner",
      "Ximena",
      "Yasmin",
      "Zeca",
    ];

    const lastName = [
      "Silva",
      "Costa",
      "Souza",
      "Mendes",
      "Oliveira",
      "Pereira",
      "Rocha",
      "Santos",
      "Carvalho",
      "Araujo",
      "Lima",
      "Ferreira",
      "Moreira",
      "Barbosa",
      "Nunes",
      "Teixeira",
      "Ribeiro",
      "Santana",
      "Almeida",
      "Duarte",
    ];

    const name = `${firstName[index % firstName.length]} ${lastName[index % lastName.length]}`;

    return {
      user_id: sequence,
      email:
        role === Role.student
          ? `aluno${sequence}@avaliae.com`
          : role === Role.teacher
            ? `prof${sequence}@avaliae.com`
            : `admin${sequence}@avaliae.com`,
      name,
      password: "12345678",
      role,
    };
  },
);

const studentCourses = [
  "Engenharia de Software",
  "Ciência da Computação",
  "Design Digital",
  "Sistemas de Informação",
  "Engenharia Elétrica",
  "Administração",
  "Arquitetura",
  "Marketing",
  "Economia",
  "Direito",
  "Psicologia",
  "Medicina",
];

const disciplinesSeed = Array.from({ length: disciplineCount }, (_, index) => ({
  discipline_id: index + 1,
  name: [
    "Algoritmos e Programação",
    "Banco de Dados",
    "Arquitetura de Software",
    "Estruturas de Dados",
    "Redes de Computadores",
    "Inteligência Artificial",
    "Segurança da Informação",
    "Engenharia de Requisitos",
    "DevOps",
    "Machine Learning",
    "Sistemas Distribuídos",
    "UX Research",
  ][index],
  course: [
    "Engenharia de Software",
    "Ciência da Computação",
    "Design Digital",
    "Sistemas de Informação",
    "Engenharia Elétrica",
    "Administração",
    "Arquitetura",
    "Marketing",
    "Economia",
    "Direito",
    "Psicologia",
    "Medicina",
  ][index % 12],
  hours: [40, 50, 60, 80, 70, 60, 45, 50, 75, 90, 80, 55][index],
}));

const avaliacoesSeed = Array.from({ length: avaliacoesCount }, (_, index) => ({
  nota_geral: Number((Math.random() * 2 + 3).toFixed(1)),
  nota_didatica: Number((Math.random() * 2 + 3).toFixed(1)),
  nota_metodologia: Number((Math.random() * 2 + 3).toFixed(1)),
  comment: [
    "Excelente desempenho e muito boa comunicação.",
    "Atuação sólida com grande domínio da disciplina.",
    "Acompanhamento eficiente e muito bem estruturado.",
    "Curso muito bem aplicado e com ótimo feedback.",
    "Pontos fortes em organização e clareza didática.",
    "Desempenho muito bom em todas as atividades.",
    "Excelente postura acadêmica e motivação.",
    "Feedback construtivo e muito útil para evolução.",
    "Domínio técnico acima da média.",
    "Boa explanação e excelente material de apoio.",
    "Performance consistente e muito pontual.",
    "Avaliação bastante positiva com sugestão de melhoria.",
  ][index],
  student_id: (index % studentCount) + 1,
  teacher_id: studentCount + (index % teacherCount) + 1,
  discipline_id: (index % disciplineCount) + 1,
}));

const documentsSeed = Array.from({ length: documentsCount }, (_, index) => ({
  titulo: `Documento ${index + 1}`,
  file_url: `https://example.com/docs/documento-${index + 1}.pdf`,
  student_id: index % 2 === 0 ? (index % studentCount) + 1 : null,
  teacher_id: studentCount + (index % teacherCount) + 1,
  discipline_id: (index % disciplineCount) + 1,
}));

async function main() {
  await prisma.documents.deleteMany();
  await prisma.avaliacao.deleteMany();
  await prisma.teacher.deleteMany();
  await prisma.student.deleteMany();
  await prisma.user.deleteMany();
  await prisma.discipline.deleteMany();

  for (const user of usersSeed) {
    const hashedPassword = await bcrypt.hash(user.password, 10);

    await prisma.user.create({
      data: {
        user_id: user.user_id,
        email: user.email,
        name: user.name,
        password: hashedPassword,
        role: user.role,
      },
    });
  }

  for (let index = 0; index < studentCount; index += 1) {
    const userId = index + 1;
    await prisma.student.create({
      data: {
        student_id: userId,
        course: studentCourses[index % studentCourses.length],
      },
    });
  }

  for (let index = 0; index < teacherCount; index += 1) {
    const userId = studentCount + index + 1;
    await prisma.teacher.create({
      data: {
        teacher_id: userId,
      },
    });
  }

  await prisma.discipline.createMany({
    data: disciplinesSeed,
  });

  for (let teacherIndex = 0; teacherIndex < teacherCount; teacherIndex += 1) {
    const teacherId = studentCount + teacherIndex + 1;
    const disciplineIds = Array.from(
      new Set(
        Array.from(
          { length: 3 },
          (_, offset) => ((teacherIndex + offset) % disciplineCount) + 1,
        ),
      ),
    );

    await prisma.teacher.update({
      where: { teacher_id: teacherId },
      data: {
        disciplines: {
          set: disciplineIds.map((discipline_id) => ({ discipline_id })),
        },
      },
    });
  }

  for (const document of documentsSeed) {
    await prisma.documents.create({
      data: {
        titulo: document.titulo,
        file_url: document.file_url,
        teacher: {
          connect: { teacher_id: document.teacher_id },
        },
        discipline: {
          connect: { discipline_id: document.discipline_id },
        },
        ...(document.student_id
          ? {
              student: {
                connect: { student_id: document.student_id },
              },
            }
          : {}),
      },
    });
  }

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

  const counts = {
    users: await prisma.user.count(),
    students: await prisma.student.count(),
    teachers: await prisma.teacher.count(),
    disciplines: await prisma.discipline.count(),
    documents: await prisma.documents.count(),
    avaliacoes: await prisma.avaliacao.count(),
  };

  console.log("Seed executada com sucesso.", counts);
}

main()
  .catch((error) => {
    console.error("Erro ao executar a seed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
