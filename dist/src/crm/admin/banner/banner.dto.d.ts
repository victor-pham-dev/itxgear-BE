export declare class CreateDto {
    readonly description: string;
    readonly img: string;
    readonly link: string;
}
export declare class UpdateDto extends CreateDto {
    readonly id: number;
    readonly active: boolean;
}
