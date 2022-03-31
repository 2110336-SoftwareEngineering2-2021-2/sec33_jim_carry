-- CreateEnum
CREATE TYPE "ShopStatus" AS ENUM ('REQUESTED', 'APPROVED', 'DECLINED');

-- AlterTable
ALTER TABLE "Shop" ADD COLUMN     "citizenIdImage" TEXT,
ADD COLUMN     "shopStatus" "ShopStatus" NOT NULL DEFAULT E'APPROVED';
