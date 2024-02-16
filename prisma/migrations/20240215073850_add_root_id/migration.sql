-- CreateEnum
CREATE TYPE "ProductStatus" AS ENUM ('STOCKING', 'OUTOFSTOCK', 'INCOMMING', 'STOP_BUSSINESS');

-- CreateEnum
CREATE TYPE "OrderPaymentStatus" AS ENUM ('PROCESSING', 'DONE', 'CANCELED');

-- CreateEnum
CREATE TYPE "OrderPaymentMethod" AS ENUM ('COD', 'QR', 'BANKING', 'EWALLET');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('WAITING_CONFIRM', 'PREPARE', 'DONE', 'CANCELED');

-- CreateEnum
CREATE TYPE "PostType" AS ENUM ('PROMOTION', 'NORMAL');

-- CreateEnum
CREATE TYPE "WarehouseLogReason" AS ENUM ('SELL', 'IMPORT', 'DAMAGED');

-- CreateEnum
CREATE TYPE "WarehouseLogPlatform" AS ENUM ('NO', 'WEB', 'SHOPEE', 'LAZADA');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "avatar" TEXT NOT NULL DEFAULT '',
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "alias" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserRole" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "roleId" INTEGER NOT NULL,

    CONSTRAINT "UserRole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "alias" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "searchString" TEXT NOT NULL,
    "status" "ProductStatus" NOT NULL,
    "rootCategoryId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "categoryIds" INTEGER[] DEFAULT ARRAY[]::INTEGER[],
    "name" TEXT NOT NULL,
    "images" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "view" INTEGER NOT NULL DEFAULT 0,
    "rate" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "code" TEXT NOT NULL DEFAULT '',
    "overView" TEXT NOT NULL,
    "seo" TEXT NOT NULL,
    "keywords" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "salePrice" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "wareHouseId" INTEGER,
    "properties" JSONB NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductConfigInfo" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "productId" INTEGER,

    CONSTRAINT "ProductConfigInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderCustomerInfo" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "OrderCustomerInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderPayment" (
    "id" SERIAL NOT NULL,
    "status" "OrderPaymentStatus" NOT NULL DEFAULT 'PROCESSING',
    "itemsPrice" INTEGER NOT NULL,
    "method" "OrderPaymentMethod" NOT NULL,
    "note" TEXT NOT NULL DEFAULT '',
    "hasPaid" INTEGER NOT NULL,
    "discountAmount" INTEGER NOT NULL DEFAULT 0,
    "voucher" TEXT,
    "paidAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OrderPayment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderShipping" (
    "id" SERIAL NOT NULL,
    "status" TEXT NOT NULL,
    "note" TEXT NOT NULL,

    CONSTRAINT "OrderShipping_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderItem" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "orderId" INTEGER NOT NULL,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "note" TEXT NOT NULL DEFAULT '',
    "status" "OrderStatus" NOT NULL DEFAULT 'WAITING_CONFIRM',
    "cancelReason" TEXT NOT NULL DEFAULT '',
    "voucherId" INTEGER,
    "orderPaymentId" INTEGER,
    "orderCustomerInfoId" INTEGER NOT NULL,
    "orderShippingId" INTEGER,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "alias" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "icon" TEXT NOT NULL DEFAULT '',
    "parentId" INTEGER NOT NULL DEFAULT 0,
    "childrenIds" INTEGER[] DEFAULT ARRAY[]::INTEGER[],
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "categoryFiltersId" INTEGER,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategoryFilters" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "filters" JSONB[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "CategoryFilters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Banner" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "active" BOOLEAN NOT NULL DEFAULT false,
    "img" TEXT NOT NULL,
    "link" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Banner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Voucher" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "activeAt" TIMESTAMP(3) NOT NULL,
    "dueAt" TIMESTAMP(3) NOT NULL,
    "code" TEXT NOT NULL,
    "usageCount" INTEGER NOT NULL,
    "priceMin" INTEGER NOT NULL,
    "discount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Voucher_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "type" "PostType" NOT NULL DEFAULT 'NORMAL',
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "content" TEXT NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WareHouse" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WareHouse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WareHouseBill" (
    "id" SERIAL NOT NULL,
    "warehouseItemId" INTEGER NOT NULL,
    "reason" "WarehouseLogReason" NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "note" TEXT NOT NULL DEFAULT '',
    "platformOrderId" TEXT NOT NULL DEFAULT '',
    "platformSell" "WarehouseLogPlatform" NOT NULL DEFAULT 'NO',
    "orderId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WareHouseBill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmailUserWhiteList" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "registed" BOOLEAN NOT NULL DEFAULT false,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "EmailUserWhiteList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Wish" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "Wish_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Role_id_key" ON "Role"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Role_alias_key" ON "Role"("alias");

-- CreateIndex
CREATE UNIQUE INDEX "UserRole_userId_roleId_key" ON "UserRole"("userId", "roleId");

-- CreateIndex
CREATE UNIQUE INDEX "Product_id_key" ON "Product"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Product_alias_key" ON "Product"("alias");

-- CreateIndex
CREATE UNIQUE INDEX "Product_wareHouseId_key" ON "Product"("wareHouseId");

-- CreateIndex
CREATE UNIQUE INDEX "ProductConfigInfo_id_key" ON "ProductConfigInfo"("id");

-- CreateIndex
CREATE UNIQUE INDEX "OrderCustomerInfo_id_key" ON "OrderCustomerInfo"("id");

-- CreateIndex
CREATE UNIQUE INDEX "OrderPayment_id_key" ON "OrderPayment"("id");

-- CreateIndex
CREATE UNIQUE INDEX "OrderShipping_id_key" ON "OrderShipping"("id");

-- CreateIndex
CREATE UNIQUE INDEX "OrderItem_id_key" ON "OrderItem"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Order_id_key" ON "Order"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Category_id_key" ON "Category"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Category_alias_key" ON "Category"("alias");

-- CreateIndex
CREATE UNIQUE INDEX "CategoryFilters_id_key" ON "CategoryFilters"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Banner_id_key" ON "Banner"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Voucher_id_key" ON "Voucher"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Voucher_code_key" ON "Voucher"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Post_id_key" ON "Post"("id");

-- CreateIndex
CREATE UNIQUE INDEX "WareHouse_id_key" ON "WareHouse"("id");

-- CreateIndex
CREATE UNIQUE INDEX "WareHouse_productId_key" ON "WareHouse"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "WareHouseBill_id_key" ON "WareHouseBill"("id");

-- CreateIndex
CREATE UNIQUE INDEX "EmailUserWhiteList_id_key" ON "EmailUserWhiteList"("id");

-- CreateIndex
CREATE UNIQUE INDEX "EmailUserWhiteList_email_key" ON "EmailUserWhiteList"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Wish_id_key" ON "Wish"("id");

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductConfigInfo" ADD CONSTRAINT "ProductConfigInfo_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderPayment" ADD CONSTRAINT "OrderPayment_voucher_fkey" FOREIGN KEY ("voucher") REFERENCES "Voucher"("code") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_orderPaymentId_fkey" FOREIGN KEY ("orderPaymentId") REFERENCES "OrderPayment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_orderCustomerInfoId_fkey" FOREIGN KEY ("orderCustomerInfoId") REFERENCES "OrderCustomerInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_orderShippingId_fkey" FOREIGN KEY ("orderShippingId") REFERENCES "OrderShipping"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_voucherId_fkey" FOREIGN KEY ("voucherId") REFERENCES "Voucher"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_categoryFiltersId_fkey" FOREIGN KEY ("categoryFiltersId") REFERENCES "CategoryFilters"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WareHouse" ADD CONSTRAINT "WareHouse_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WareHouseBill" ADD CONSTRAINT "WareHouseBill_warehouseItemId_fkey" FOREIGN KEY ("warehouseItemId") REFERENCES "WareHouse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WareHouseBill" ADD CONSTRAINT "WareHouseBill_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;
