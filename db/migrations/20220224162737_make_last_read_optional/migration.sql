/*
  Warnings:

  - A unique constraint covering the columns `[handle]` on the table `Session` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Shop` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[hashedToken,type]` on the table `Token` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[googleId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[omiseId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[A,B]` on the table `_CategoryToProduct` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[A,B]` on the table `_HashtagToProduct` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[A,B]` on the table `_follow` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[A,B]` on the table `_shoppingCart` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[A,B]` on the table `_wishlist` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Message_createdAt_idx";

-- DropIndex
DROP INDEX "Session_handle_key";

-- DropIndex
DROP INDEX "Shop_userId_key";

-- DropIndex
DROP INDEX "Token_hashedToken_type_key";

-- DropIndex
DROP INDEX "User_email_key";

-- DropIndex
DROP INDEX "User_googleId_key";

-- DropIndex
DROP INDEX "User_omiseId_key";

-- DropIndex
DROP INDEX "_CategoryToProduct_AB_unique";

-- DropIndex
DROP INDEX "_CategoryToProduct_B_index";

-- DropIndex
DROP INDEX "_HashtagToProduct_AB_unique";

-- DropIndex
DROP INDEX "_HashtagToProduct_B_index";

-- DropIndex
DROP INDEX "_follow_AB_unique";

-- DropIndex
DROP INDEX "_follow_B_index";

-- DropIndex
DROP INDEX "_shoppingCart_AB_unique";

-- DropIndex
DROP INDEX "_shoppingCart_B_index";

-- DropIndex
DROP INDEX "_wishlist_AB_unique";

-- DropIndex
DROP INDEX "_wishlist_B_index";

-- AlterTable
ALTER TABLE "ChatMember" ALTER COLUMN "lastMessageReadId" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "Message_createdAt_idx" ON "Message"("createdAt" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "Session_handle_key" ON "Session"("handle");

-- CreateIndex
CREATE UNIQUE INDEX "Shop_userId_key" ON "Shop"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Token_hashedToken_type_key" ON "Token"("hashedToken", "type");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_googleId_key" ON "User"("googleId");

-- CreateIndex
CREATE UNIQUE INDEX "User_omiseId_key" ON "User"("omiseId");

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToProduct_AB_unique" ON "_CategoryToProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToProduct_B_index" ON "_CategoryToProduct"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_HashtagToProduct_AB_unique" ON "_HashtagToProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_HashtagToProduct_B_index" ON "_HashtagToProduct"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_follow_AB_unique" ON "_follow"("A", "B");

-- CreateIndex
CREATE INDEX "_follow_B_index" ON "_follow"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_shoppingCart_AB_unique" ON "_shoppingCart"("A", "B");

-- CreateIndex
CREATE INDEX "_shoppingCart_B_index" ON "_shoppingCart"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_wishlist_AB_unique" ON "_wishlist"("A", "B");

-- CreateIndex
CREATE INDEX "_wishlist_B_index" ON "_wishlist"("B");
