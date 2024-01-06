/*
  Warnings:

  - You are about to drop the `ProductProptertyFilter` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProductProptertyFilter" DROP CONSTRAINT "ProductProptertyFilter_categoryFiltersId_fkey";

-- AlterTable
ALTER TABLE "CategoryFilters" ADD COLUMN     "filters" JSONB[];

-- DropTable
DROP TABLE "ProductProptertyFilter";

-- DropEnum
DROP TYPE "ValueTypeProductFilter";
