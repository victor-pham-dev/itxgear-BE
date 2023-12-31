export declare class CreateVoucherDto {
    readonly description: string;
    readonly dueAt: Date;
    readonly code: string;
    readonly usageCount: number;
    readonly activeAt: Date;
    readonly priceMin: number;
    readonly discount: number;
}
export declare class UpdateVoucherDto extends CreateVoucherDto {
    readonly id: number;
    readonly active: boolean;
}
