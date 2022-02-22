/*
  Warnings:

  - You are about to drop the `Hashtag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_HashtagToProduct` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_HashtagToProduct" DROP CONSTRAINT "_HashtagToProduct_A_fkey";

-- DropForeignKey
ALTER TABLE "_HashtagToProduct" DROP CONSTRAINT "_HashtagToProduct_B_fkey";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "hashtags" TEXT[];

-- DropTable
DROP TABLE "Hashtag";

-- DropTable
DROP TABLE "_HashtagToProduct";
