import { WarehouseLogReason } from '@prisma/client';
export declare class CreateDto {
    readonly warehouseItemId: number;
    readonly reason: WarehouseLogReason;
    readonly quantity: number;
    readonly price: number;
    readonly note: string;
    readonly platformOrderId?: string;
}
export declare class UpdateDto extends CreateDto {
    readonly id: number;
    readonly active: boolean;
}
