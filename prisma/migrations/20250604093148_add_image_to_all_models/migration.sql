/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `Shop` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Branch" ADD COLUMN     "image" JSONB;

-- AlterTable
ALTER TABLE "Delivery" ADD COLUMN     "image" JSONB;

-- AlterTable
ALTER TABLE "InventoryItem" ADD COLUMN     "image" JSONB;

-- AlterTable
ALTER TABLE "Shop" DROP COLUMN "imageUrl",
ADD COLUMN     "image" JSONB;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "image" JSONB;
