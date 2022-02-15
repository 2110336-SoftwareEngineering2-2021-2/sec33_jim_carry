/*
  Warnings:

  - You are about to drop the column `image` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "image",
ADD COLUMN     "images" TEXT[];

-- AlterTable
ALTER TABLE "Shop" ALTER COLUMN "totalSale" SET DEFAULT 0;
