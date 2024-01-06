-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "categoryFiltersId" INTEGER;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_categoryFiltersId_fkey" FOREIGN KEY ("categoryFiltersId") REFERENCES "CategoryFilters"("id") ON DELETE SET NULL ON UPDATE CASCADE;
