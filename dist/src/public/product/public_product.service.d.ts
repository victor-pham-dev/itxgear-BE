import { Request } from 'express';
import { PrismaService } from 'services/prisma.service';
import { GetDetailForCartDto, IncrementViewDto } from './public_product.dto';
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
            WareHouse: {
                quantity: number;
            };
        } & {
            id: number;
            alias: string;
            createdAt: Date;
            updatedAt: Date;
            searchString: string;
            status: import(".prisma/client").$Enums.ProductStatus;
            rootCategoryId: number;
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
    getSeo(req: Request): Promise<{
        message: string;
        success: boolean;
        data: {
            name: string;
            alias: string;
            images: string;
            seo: string;
            keywords: string;
        };
    }>;
    search(req: Request): Promise<{
        message: string;
        success: boolean;
        data: {
            dataTable: {
                name: string;
                id: number;
                active: boolean;
                alias: string;
                categoryId: number;
                code: string;
                images: string;
                price: number;
                salePrice: number;
                view: number;
                WareHouse: {
                    quantity: number;
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
                categoryFiltersId: number;
            };
            name: string;
            alias: string;
            categoryId: number;
            code: string;
            status: import(".prisma/client").$Enums.ProductStatus;
            images: string;
            price: number;
            salePrice: number;
            view: number;
        }[];
    }>;
    incrementView(data: IncrementViewDto): Promise<{
        message: string;
        success: boolean;
        data: number;
    }>;
    getRelatedProducts(req: Request): Promise<{
        success: boolean;
        message: string;
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
            name: string;
            alias: string;
            categoryId: number;
            code: string;
            images: string;
            price: number;
            salePrice: number;
            view: number;
            WareHouse: {
                id: number;
                productId: number;
                quantity: number;
                createdAt: Date;
                updatedAt: Date;
            };
        }[];
    }>;
    getDetailForCart(getDetailForCartDto: GetDetailForCartDto): Promise<{
        success: boolean;
        message: string;
        data: {
            name: string;
            id: number;
            alias: string;
            status: import(".prisma/client").$Enums.ProductStatus;
            images: string;
            salePrice: number;
            view: number;
            WareHouse: {
                quantity: number;
            };
        }[];
    }>;
}
