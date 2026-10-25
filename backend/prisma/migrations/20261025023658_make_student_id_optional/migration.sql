-- DropForeignKey
ALTER TABLE "documents" DROP CONSTRAINT "documents_student_id_fkey";

-- AlterTable
ALTER TABLE "documents" ALTER COLUMN "student_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "student"("student_id") ON DELETE SET NULL ON UPDATE CASCADE;
