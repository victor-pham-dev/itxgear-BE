import { Request } from 'express';
import { PrismaService } from 'services/prisma.service';
export declare class PublicProductService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    get(req: Request): Promise<{
        message: string;
        success: boolean;
        data: {
            configInfo: {
                id: number;
                label: string;
                value: string;
                productId: number;
            }[];
        } & {
            id: number;
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
        };
    }>;
    search(req: Request): Promise<{
        message: string;
        success: boolean;
        data: {
            dataTable: {
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
                };
                name: string;
                code: string;
                categoryId: number;
                images: string;
                price: number;
                salePrice: number;
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
            };
            name: string;
            code: string;
            categoryId: number;
            status: import(".prisma/client").$Enums.ProductStatus;
            images: string;
            price: number;
            salePrice: number;
            view: number;
        }[];
    }>;
}
