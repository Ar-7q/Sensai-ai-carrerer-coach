/*
  Warnings:

  - Changed the type of `marketOutlook` on the `IndustryInsight` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `demandLevel` on the `IndustryInsight` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "IndustryInsight" DROP COLUMN "marketOutlook",
ADD COLUMN     "marketOutlook" TEXT NOT NULL,
DROP COLUMN "demandLevel",
ADD COLUMN     "demandLevel" TEXT NOT NULL;
