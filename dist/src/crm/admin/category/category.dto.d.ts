export declare class CategoryProps {
    readonly alias: string;
    readonly description: string;
    readonly label: string;
    readonly icon: string;
    readonly parentId?: number;
}
export declare class CreateDto extends CategoryProps {
    children: CategoryProps[];
}
export declare class EditCategoryProps extends CategoryProps {
    readonly id: number;
}
export declare class UpdateDto extends EditCategoryProps {
    children: EditCategoryProps[];
}
