/*
  Warnings:

  - You are about to drop the column `isShop` on the `ChatMember` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `Message` table. All the data in the column will be lost.
  - Added the required column `type` to the `ChatMember` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payload` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ChatMemberType" AS ENUM ('BUYER', 'SELLER', 'ADMIN');

-- CreateEnum
CREATE TYPE "ChatMessageType" AS ENUM ('TEXT');

-- AlterTable
ALTER TABLE "ChatMember" DROP COLUMN "isShop",
ADD COLUMN     "type" "ChatMemberType" NOT NULL;

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "content",
ADD COLUMN     "payload" JSONB NOT NULL,
ADD COLUMN     "type" "ChatMessageType" NOT NULL;
