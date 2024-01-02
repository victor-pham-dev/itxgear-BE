export declare class CategoryProps {
    readonly id?: any;
    readonly description?: string;
    readonly label: string;
    readonly icon?: string;
    readonly parentId?: number;
    readonly active?: boolean;
}
export declare class CreateCategoryDto extends CategoryProps {
}
export declare class EditCategoryProps extends CategoryProps {
    readonly id: number;
}
export declare class UpdateCategoryDto extends EditCategoryProps {
    children: EditCategoryProps[];
}
