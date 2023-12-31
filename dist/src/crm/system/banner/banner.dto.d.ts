export declare class CreateBannerDto {
    readonly description: string;
    readonly img: string;
    readonly link: string;
}
export declare class UpdateBannerDto extends CreateBannerDto {
    readonly id: number;
    readonly active: boolean;
}
