/*
  Warnings:

  - You are about to drop the column `demadLevel` on the `IndustryInsight` table. All the data in the column will be lost.
  - Added the required column `demandLevel` to the `IndustryInsight` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "IndustryInsight" DROP COLUMN "demadLevel",
ADD COLUMN     "demandLevel" "DemandLevel" NOT NULL;
