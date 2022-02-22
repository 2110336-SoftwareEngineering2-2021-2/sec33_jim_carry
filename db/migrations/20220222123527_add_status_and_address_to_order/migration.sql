/*
  Warnings:

  - Added the required column `address` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `receiverName` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `receiverPhoneNo` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPrice` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'PAID', 'SHIPPED', 'COMPLETED', 'CANCELLED');

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "addressNote" TEXT,
ADD COLUMN     "receiverName" TEXT NOT NULL,
ADD COLUMN     "receiverPhoneNo" TEXT NOT NULL,
ADD COLUMN     "status" "OrderStatus" NOT NULL DEFAULT E'PENDING',
ADD COLUMN     "totalPrice" DOUBLE PRECISION NOT NULL;
