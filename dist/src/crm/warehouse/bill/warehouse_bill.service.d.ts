import { CreateBillDto } from './warehouse_bill.dto';
import { Request } from 'express';
import { PrismaService } from 'services/prisma.service';
import { WareHouseBill } from '@prisma/client';
export declare class WarehouseBillService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createDto: CreateBillDto): Promise<{
        message: string;
        success: boolean;
        data: {
            id: number;
            warehouseItemId: number;
            reason: import(".prisma/client").$Enums.WarehouseLogReason;
            quantity: number;
            price: number;
            note: string;
            platformOrderId: string;
            platformSell: import(".prisma/client").$Enums.WarehouseLogPlatform;
            orderId: number;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    update(updateDto: Partial<WareHouseBill>): Promise<{
        message: string;
        success: boolean;
        data: {
            id: number;
            warehouseItemId: number;
            reason: import(".prisma/client").$Enums.WarehouseLogReason;
            quantity: number;
            price: number;
            note: string;
            platformOrderId: string;
            platformSell: import(".prisma/client").$Enums.WarehouseLogPlatform;
            orderId: number;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    get(req: Request): Promise<{
        message: string;
        success: boolean;
        data: {
            WarehouseItem: {
                id: number;
                productId: number;
                quantity: number;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
            id: number;
            warehouseItemId: number;
            reason: import(".prisma/client").$Enums.WarehouseLogReason;
            quantity: number;
            price: number;
            note: string;
            platformOrderId: string;
            platformSell: import(".prisma/client").$Enums.WarehouseLogPlatform;
            orderId: number;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    search(req: Request): Promise<{
        message: string;
        success: boolean;
        data: {
            dataTable: {
                id: number;
                warehouseItemId: number;
                reason: import(".prisma/client").$Enums.WarehouseLogReason;
                quantity: number;
                price: number;
                note: string;
                platformOrderId: string;
                platformSell: import(".prisma/client").$Enums.WarehouseLogPlatform;
                orderId: number;
                createdAt: Date;
                updatedAt: Date;
            }[];
            paging: {
                page: number;
                pageSize: number;
            };
            totalCount: number;
        };
    }>;
}
