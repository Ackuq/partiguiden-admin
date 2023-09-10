/*
  Warnings:

  - You are about to drop the column `update_date` on the `Standpoint` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Standpoint" DROP COLUMN "update_date",
ADD COLUMN     "updateDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
