/*
  Warnings:

  - You are about to drop the column `disciplina_id` on the `avaliacao` table. All the data in the column will be lost.
  - Added the required column `discipline_id` to the `avaliacao` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "avaliacao" DROP CONSTRAINT "avaliacao_disciplina_id_fkey";

-- AlterTable
ALTER TABLE "avaliacao" DROP COLUMN "disciplina_id",
ADD COLUMN     "discipline_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "avaliacao" ADD CONSTRAINT "avaliacao_discipline_id_fkey" FOREIGN KEY ("discipline_id") REFERENCES "discipline"("discipline_id") ON DELETE RESTRICT ON UPDATE CASCADE;
