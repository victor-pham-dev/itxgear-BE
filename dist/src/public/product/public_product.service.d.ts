import { Request } from 'express';
import { PrismaService } from 'services/prisma.service';
export declare class PublicProductService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    get(req: Request): Promise<{
        message: string;
        success: boolean;
        data: {
            category: {
                id: number;
                description: string;
                alias: string;
                label: string;
                active: boolean;
                icon: string;
                parentId: number;
                childrenIds: number[];
                deleted: boolean;
                categoryFiltersId: number;
            };
            configInfo: {
                id: number;
                label: string;
                value: string;
                productId: number;
            }[];
        } & {
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
    }>;
    search(req: Request): Promise<{
        message: string;
        success: boolean;
        data: {
            dataTable: {
                categoryId: number;
                name: string;
                images: string;
                code: string;
                price: number;
                salePrice: number;
                category: {
                    id: number;
                    description: string;
                    alias: string;
                    label: string;
                    active: boolean;
                    icon: string;
                    parentId: number;
                    childrenIds: number[];
                    deleted: boolean;
                    categoryFiltersId: number;
                };
                WareHouse: {
                    id: number;
                    productId: number;
                    quantity: number;
                    createdAt: Date;
                    updatedAt: Date;
                };
            }[];
            paging: {
                page: number;
                pageSize: number;
            };
            totalCount: number;
        };
    }>;
    getOutStandingExams(): Promise<{
        success: boolean;
        data: {
            status: import(".prisma/client").$Enums.ProductStatus;
            categoryId: number;
            name: string;
            images: string;
            view: number;
            code: string;
            price: number;
            salePrice: number;
            category: {
                id: number;
                description: string;
                alias: string;
                label: string;
                active: boolean;
                icon: string;
                parentId: number;
                childrenIds: number[];
                deleted: boolean;
                categoryFiltersId: number;
            };
        }[];
    }>;
}
