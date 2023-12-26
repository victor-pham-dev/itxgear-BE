import { WarehouseLogReason } from '@prisma/client';
export declare class CreateBillDto {
    readonly warehouseItemId: number;
    readonly reason: WarehouseLogReason;
    readonly quantity: number;
    readonly price: number;
    readonly note: string;
    readonly platformOrderId?: string;
}
export declare class UpdateBillDto extends CreateBillDto {
    readonly id: number;
    readonly active: boolean;
}
