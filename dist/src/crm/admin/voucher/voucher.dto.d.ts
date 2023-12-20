export declare class CreateDto {
    readonly description: string;
    readonly dueAt: Date;
    readonly code: string;
    readonly usageCount: number;
    readonly activeAt: Date;
    readonly priceMin: number;
    readonly discount: number;
}
export declare class UpdateDto extends CreateDto {
    readonly id: number;
    readonly active: boolean;
}
