import { Request } from 'express';
import { PrismaService } from 'services/prisma.service';
export declare class WarehouseItemService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    get(req: Request): Promise<{
        message: string;
        success: boolean;
        data: {
            Product: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                searchString: string;
                status: import(".prisma/client").$Enums.ProductStatus;
                categoryId: number;
                name: string;
                images: string;
                description: string;
                view: number;
                rate: number;
                code: string;
                overView: string;
                seo: string;
                keywords: string;
                price: bigint;
                salePrice: bigint;
                active: boolean;
                wareHouseId: number;
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
                    createdAt: Date;
                    updatedAt: Date;
                    searchString: string;
                    status: import(".prisma/client").$Enums.ProductStatus;
                    categoryId: number;
                    name: string;
                    images: string;
                    description: string;
                    view: number;
                    rate: number;
                    code: string;
                    overView: string;
                    seo: string;
                    keywords: string;
                    price: bigint;
                    salePrice: bigint;
                    active: boolean;
                    wareHouseId: number;
                };
                WareHouseBill: {
                    id: number;
                    createdAt: Date;
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
                    updatedAt: Date;
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
