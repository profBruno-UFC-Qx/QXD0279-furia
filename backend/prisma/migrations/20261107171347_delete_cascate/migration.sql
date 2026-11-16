-- DropForeignKey
ALTER TABLE "avaliacao" DROP CONSTRAINT "avaliacao_discipline_id_fkey";

-- DropForeignKey
ALTER TABLE "avaliacao" DROP CONSTRAINT "avaliacao_teacher_id_fkey";

-- DropForeignKey
ALTER TABLE "documents" DROP CONSTRAINT "documents_discipline_id_fkey";

-- DropForeignKey
ALTER TABLE "documents" DROP CONSTRAINT "documents_teacher_id_fkey";

-- AddForeignKey
ALTER TABLE "avaliacao" ADD CONSTRAINT "avaliacao_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "teacher"("teacher_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "avaliacao" ADD CONSTRAINT "avaliacao_discipline_id_fkey" FOREIGN KEY ("discipline_id") REFERENCES "discipline"("discipline_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "teacher"("teacher_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_discipline_id_fkey" FOREIGN KEY ("discipline_id") REFERENCES "discipline"("discipline_id") ON DELETE CASCADE ON UPDATE CASCADE;
