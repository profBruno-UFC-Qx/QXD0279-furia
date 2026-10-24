/*
  Warnings:

  - You are about to drop the column `course` on the `avaliacao` table. All the data in the column will be lost.
  - You are about to drop the column `hours` on the `avaliacao` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `avaliacao` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "avaliacao" DROP COLUMN "course",
DROP COLUMN "hours",
DROP COLUMN "name";
