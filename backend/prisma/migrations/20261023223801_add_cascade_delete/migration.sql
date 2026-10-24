-- DropForeignKey
ALTER TABLE "student" DROP CONSTRAINT "student_student_id_fkey";

-- DropForeignKey
ALTER TABLE "teacher" DROP CONSTRAINT "teacher_teacher_id_fkey";

-- AddForeignKey
ALTER TABLE "student" ADD CONSTRAINT "student_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "generic_user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teacher" ADD CONSTRAINT "teacher_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "generic_user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
