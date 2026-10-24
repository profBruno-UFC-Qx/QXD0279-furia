-- CreateTable
CREATE TABLE "documents" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "data_publicacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "student_id" INTEGER NOT NULL,
    "teacher_id" INTEGER NOT NULL,
    "discipline_id" INTEGER NOT NULL,

    CONSTRAINT "documents_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "student"("student_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "teacher"("teacher_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_discipline_id_fkey" FOREIGN KEY ("discipline_id") REFERENCES "discipline"("discipline_id") ON DELETE RESTRICT ON UPDATE CASCADE;
