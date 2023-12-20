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
}
export declare class CreateDto extends ProductDto {
    readonly configInfo: CreateProductConfigDto[];
}
export declare class UpdateDto extends ProductDto {
    readonly id: number;
    readonly configInfo: UpdateProductConfigDto[];
    readonly active: boolean;
}
