import { CreateProductDto, UpdateProductDto } from './product.dto';
import { Request } from 'express';
import { PrismaService } from 'services/prisma.service';
export declare class ProductService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAllCategoryIds(id: number): Promise<number[]>;
    create(createDto: CreateProductDto): Promise<{
        message: string;
        success: boolean;
        data: {
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
    update(updateDto: UpdateProductDto): Promise<{
        message: string;
        success: boolean;
        data: boolean;
    }>;
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
            dataTable: ({
                WareHouse: {
                    id: number;
                    productId: number;
                    quantity: number;
                    createdAt: Date;
                    updatedAt: Date;
                };
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
            })[];
            paging: {
                page: number;
                pageSize: number;
            };
            totalCount: number;
        };
    }>;
}
