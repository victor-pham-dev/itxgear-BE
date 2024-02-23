-- CreateTable
CREATE TABLE "Land" (
    "id" SERIAL NOT NULL,
    "landId" INTEGER NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "Land_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LandImageLog" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "image" TEXT NOT NULL,
    "landId" INTEGER NOT NULL,

    CONSTRAINT "LandImageLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResultMember" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "address" TEXT NOT NULL,
    "total_item_done" INTEGER NOT NULL,
    "item_type" TEXT NOT NULL,
    "token_receive" INTEGER NOT NULL,
    "resultPharseId" INTEGER,

    CONSTRAINT "ResultMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResultPharse" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ResultPharse_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Land_id_key" ON "Land"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Land_landId_key" ON "Land"("landId");

-- CreateIndex
CREATE UNIQUE INDEX "LandImageLog_id_key" ON "LandImageLog"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ResultMember_id_key" ON "ResultMember"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ResultPharse_id_key" ON "ResultPharse"("id");

-- AddForeignKey
ALTER TABLE "LandImageLog" ADD CONSTRAINT "LandImageLog_landId_fkey" FOREIGN KEY ("landId") REFERENCES "Land"("landId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResultMember" ADD CONSTRAINT "ResultMember_resultPharseId_fkey" FOREIGN KEY ("resultPharseId") REFERENCES "ResultPharse"("id") ON DELETE SET NULL ON UPDATE CASCADE;
