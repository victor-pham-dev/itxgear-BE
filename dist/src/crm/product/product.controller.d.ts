import { ProductService } from './product.service';
import { CreateProductDto, UpdateProductDto } from './product.dto';
import { Request } from 'express';
export declare class ProductController {
    private readonly service;
    constructor(service: ProductService);
    create(createDto: CreateProductDto): Promise<{
        message: string;
        success: boolean;
        data: {
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
            })[];
            paging: {
                page: number;
                pageSize: number;
            };
            totalCount: number;
        };
    }>;
}
