/*
  Warnings:

  - Added the required column `properties` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ValueTypeProductFilter" AS ENUM ('STRING', 'NUMBER', 'DATETIME', 'SELECT');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "properties" JSONB NOT NULL;

-- CreateTable
CREATE TABLE "CategoryFilters" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "CategoryFilters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductProptertyFilter" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "valueType" "ValueTypeProductFilter" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ProductProptertyFilter_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CategoryFilters_id_key" ON "CategoryFilters"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ProductProptertyFilter_id_key" ON "ProductProptertyFilter"("id");
