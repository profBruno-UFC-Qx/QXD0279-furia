-- DropForeignKey
ALTER TABLE "avaliacao" DROP CONSTRAINT "avaliacao_student_id_fkey";

-- DropForeignKey
ALTER TABLE "documents" DROP CONSTRAINT "documents_student_id_fkey";

-- AddForeignKey
ALTER TABLE "avaliacao" ADD CONSTRAINT "avaliacao_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "student"("student_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "student"("student_id") ON DELETE CASCADE ON UPDATE CASCADE;
