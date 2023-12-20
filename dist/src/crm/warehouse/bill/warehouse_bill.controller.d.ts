import { WarehouseBillService } from './warehouse_bill.service';
import { CreateDto } from './warehouse_bill.dto';
import { Request } from 'express';
import { WareHouseBill } from '@prisma/client';
export declare class WarehouseBillController {
    private readonly service;
    constructor(service: WarehouseBillService);
    create(createDto: CreateDto): Promise<{
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
