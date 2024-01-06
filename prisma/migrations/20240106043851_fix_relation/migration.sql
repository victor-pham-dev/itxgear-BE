-- AlterTable
ALTER TABLE "ProductProptertyFilter" ADD COLUMN     "categoryFiltersId" INTEGER;

-- AddForeignKey
ALTER TABLE "ProductProptertyFilter" ADD CONSTRAINT "ProductProptertyFilter_categoryFiltersId_fkey" FOREIGN KEY ("categoryFiltersId") REFERENCES "CategoryFilters"("id") ON DELETE SET NULL ON UPDATE CASCADE;
