-- CreateEnum
CREATE TYPE "Role" AS ENUM ('student', 'teacher', 'admin');

-- CreateTable
CREATE TABLE "generic_user" (
    "user_id" SERIAL NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "role" "Role" NOT NULL,

    CONSTRAINT "generic_user_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "student" (
    "student_id" INTEGER NOT NULL,
    "course" VARCHAR(100) NOT NULL,

    CONSTRAINT "student_pkey" PRIMARY KEY ("student_id")
);

-- CreateTable
CREATE TABLE "teacher" (
    "teacher_id" INTEGER NOT NULL,
    "creat_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "teacher_pkey" PRIMARY KEY ("teacher_id")
);

-- CreateTable
CREATE TABLE "discipline" (
    "discipline_id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "course" VARCHAR(100) NOT NULL,
    "hours" INTEGER NOT NULL,

    CONSTRAINT "discipline_pkey" PRIMARY KEY ("discipline_id")
);

-- CreateTable
CREATE TABLE "avaliacao" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "course" VARCHAR(100) NOT NULL,
    "hours" INTEGER NOT NULL,
    "nota_geral" DOUBLE PRECISION NOT NULL,
    "nota_didatica" DOUBLE PRECISION NOT NULL,
    "nota_metodologia" DOUBLE PRECISION NOT NULL,
    "comment" TEXT NOT NULL,
    "creat_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "estudante_id" INTEGER NOT NULL,
    "professor_id" INTEGER NOT NULL,
    "disciplina_id" INTEGER NOT NULL,

    CONSTRAINT "avaliacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_TeacherDisciplines" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_TeacherDisciplines_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "generic_user_email_key" ON "generic_user"("email");

-- CreateIndex
CREATE INDEX "_TeacherDisciplines_B_index" ON "_TeacherDisciplines"("B");

-- AddForeignKey
ALTER TABLE "student" ADD CONSTRAINT "student_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "generic_user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teacher" ADD CONSTRAINT "teacher_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "generic_user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "avaliacao" ADD CONSTRAINT "avaliacao_estudante_id_fkey" FOREIGN KEY ("estudante_id") REFERENCES "student"("student_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "avaliacao" ADD CONSTRAINT "avaliacao_professor_id_fkey" FOREIGN KEY ("professor_id") REFERENCES "teacher"("teacher_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "avaliacao" ADD CONSTRAINT "avaliacao_disciplina_id_fkey" FOREIGN KEY ("disciplina_id") REFERENCES "discipline"("discipline_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TeacherDisciplines" ADD CONSTRAINT "_TeacherDisciplines_A_fkey" FOREIGN KEY ("A") REFERENCES "discipline"("discipline_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TeacherDisciplines" ADD CONSTRAINT "_TeacherDisciplines_B_fkey" FOREIGN KEY ("B") REFERENCES "teacher"("teacher_id") ON DELETE CASCADE ON UPDATE CASCADE;
