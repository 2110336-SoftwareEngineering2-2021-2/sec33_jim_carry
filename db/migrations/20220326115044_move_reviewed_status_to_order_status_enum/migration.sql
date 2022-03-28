/*
  Warnings:

  - You are about to drop the column `reviewed` on the `Order` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "OrderStatus" ADD VALUE 'REVIEWED';

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "reviewed";
