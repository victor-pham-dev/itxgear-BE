export declare class ProductProptertyFilterDto {
    readonly label: string;
    readonly valueType: 'STRING' | 'NUMBER' | 'DATETIME' | 'SELECT';
    readonly options: string[];
}
export declare class CreateCategoryFilterDto {
    readonly name: string;
    readonly description?: string;
    readonly filters: ProductProptertyFilterDto[];
}
export declare class UpdateCategoryFilterDto extends CreateCategoryFilterDto {
    readonly id: number;
}
