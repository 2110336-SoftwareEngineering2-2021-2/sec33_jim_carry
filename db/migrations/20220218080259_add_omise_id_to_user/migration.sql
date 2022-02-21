/*
  Warnings:

  - A unique constraint covering the columns `[omiseId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "omiseId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_omiseId_key" ON "User"("omiseId");
