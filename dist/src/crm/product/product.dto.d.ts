import { ProductStatus } from '@prisma/client';
export declare class CreateProductConfigDto {
    label: string;
    value: string;
}
export declare class UpdateProductConfigDto extends CreateProductConfigDto {
    id: number;
}
export declare class ProductDto {
    readonly name: string;
    readonly categoryId: number;
    readonly status: ProductStatus;
    readonly images: string[];
    readonly overView: string[];
    readonly description: string;
    readonly code: string;
    readonly seo: string;
    readonly keywords: string;
    readonly price: number;
    readonly salePrice: number;
    readonly properties: object;
}
export declare class CreateProductDto extends ProductDto {
    readonly id?: number;
}
export declare class UpdateProductDto extends ProductDto {
    readonly id: number;
    readonly active: boolean;
}
