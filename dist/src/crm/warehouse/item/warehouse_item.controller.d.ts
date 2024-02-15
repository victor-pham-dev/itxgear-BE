import { WarehouseItemService } from './warehouse_item.service';
import { Request } from 'express';
export declare class WarehouseItemController {
    private readonly service;
    constructor(service: WarehouseItemService);
    get(req: Request): Promise<{
        message: string;
        success: boolean;
        data: {
            Product: {
                id: number;
                alias: string;
                createdAt: Date;
                updatedAt: Date;
                searchString: string;
                status: import(".prisma/client").$Enums.ProductStatus;
                categoryId: number;
                categoryIds: number[];
                name: string;
                images: string;
                description: string;
                view: number;
                rate: number;
                code: string;
                overView: string;
                seo: string;
                keywords: string;
                price: number;
                salePrice: number;
                active: boolean;
                wareHouseId: number;
                properties: import(".prisma/client").Prisma.JsonValue;
            };
        } & {
            id: number;
            productId: number;
            quantity: number;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    search(req: Request): Promise<{
        message: string;
        success: boolean;
        data: {
            dataTable: ({
                Product: {
                    id: number;
                    alias: string;
                    createdAt: Date;
                    updatedAt: Date;
                    searchString: string;
                    status: import(".prisma/client").$Enums.ProductStatus;
                    categoryId: number;
                    categoryIds: number[];
                    name: string;
                    images: string;
                    description: string;
                    view: number;
                    rate: number;
                    code: string;
                    overView: string;
                    seo: string;
                    keywords: string;
                    price: number;
                    salePrice: number;
                    active: boolean;
                    wareHouseId: number;
                    properties: import(".prisma/client").Prisma.JsonValue;
                };
                WareHouseBill: {
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    Order: {
                        id: number;
                        note: string;
                        status: import(".prisma/client").$Enums.OrderStatus;
                        cancelReason: string;
                        voucherId: number;
                        orderPaymentId: number;
                        orderCustomerInfoId: number;
                        orderShippingId: number;
                    };
                    quantity: number;
                    warehouseItemId: number;
                    reason: import(".prisma/client").$Enums.WarehouseLogReason;
                    note: string;
                    platformOrderId: string;
                    orderId: number;
                    WarehouseItem: {
                        id: number;
                        productId: number;
                        quantity: number;
                        createdAt: Date;
                        updatedAt: Date;
                    };
                }[];
            } & {
                id: number;
                productId: number;
                quantity: number;
                createdAt: Date;
                updatedAt: Date;
            })[];
            paging: {
                page: number;
                pageSize: number;
            };
            totalCount: number;
        };
    }>;
}
