/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Shop` will be added. If there are existing duplicate values, this will fail.
  - Made the column `email` on table `Shop` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Shop" ALTER COLUMN "email" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Shop_email_key" ON "Shop"("email");
