-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "childrenIds" INTEGER[] DEFAULT ARRAY[]::INTEGER[];
