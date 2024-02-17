import { PublicProductService } from './public_product.service';
import { Request } from 'express';
import { GetDetailForCartDto, IncrementViewDto } from './public_product.dto';
export declare class PublicProductController {
    private readonly service;
    constructor(service: PublicProductService);
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
            alias: string;
            name: string;
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
                alias: string;
                id: number;
                categoryId: number;
                name: string;
                images: string;
                view: number;
                code: string;
                price: number;
                salePrice: number;
                active: boolean;
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
            alias: string;
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
    incrementView(data: IncrementViewDto): Promise<{
        message: string;
        success: boolean;
        data: number;
    }>;
    getRelated(req: Request): Promise<{
        success: boolean;
        message: string;
        data: {
            alias: string;
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
            WareHouse: {
                id: number;
                productId: number;
                quantity: number;
                createdAt: Date;
                updatedAt: Date;
            };
        }[];
    }>;
    getDetailForCart(getDetailDto: GetDetailForCartDto): Promise<{
        success: boolean;
        message: string;
        data: {
            alias: string;
            id: number;
            status: import(".prisma/client").$Enums.ProductStatus;
            name: string;
            images: string;
            view: number;
            salePrice: number;
            WareHouse: {
                quantity: number;
            };
        }[];
    }>;
}
