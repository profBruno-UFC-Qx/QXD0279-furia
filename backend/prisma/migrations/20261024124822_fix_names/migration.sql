/*
  Warnings:

  - You are about to drop the column `estudante_id` on the `avaliacao` table. All the data in the column will be lost.
  - You are about to drop the column `professor_id` on the `avaliacao` table. All the data in the column will be lost.
  - Added the required column `student_id` to the `avaliacao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teacher_id` to the `avaliacao` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "avaliacao" DROP CONSTRAINT "avaliacao_estudante_id_fkey";

-- DropForeignKey
ALTER TABLE "avaliacao" DROP CONSTRAINT "avaliacao_professor_id_fkey";

-- AlterTable
ALTER TABLE "avaliacao" DROP COLUMN "estudante_id",
DROP COLUMN "professor_id",
ADD COLUMN     "student_id" INTEGER NOT NULL,
ADD COLUMN     "teacher_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "avaliacao" ADD CONSTRAINT "avaliacao_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "student"("student_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "avaliacao" ADD CONSTRAINT "avaliacao_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "teacher"("teacher_id") ON DELETE RESTRICT ON UPDATE CASCADE;
