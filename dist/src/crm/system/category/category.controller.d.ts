import { CategoryService } from './category.service';
import { CreateCategoryDto, UpdateCategoryDto, UpdateFilterForCategoryDto } from './category.dto';
import { Request } from 'express';
export declare class CategoryController {
    private readonly service;
    constructor(service: CategoryService);
    create(createDto: CreateCategoryDto): Promise<{
        message: string;
        success: boolean;
        data: {
            id: number;
            description: string;
            alias: string;
            label: string;
            active: boolean;
            icon: string;
            parentId: number;
            childrenIds: number[];
            deleted: boolean;
            categoryFiltersId: number;
        };
    }>;
    update(updateDto: UpdateCategoryDto): Promise<{
        message: string;
        success: boolean;
        data: boolean;
    }>;
    get(req: Request): Promise<{
        message: string;
        success: boolean;
        data: {
            id: number;
            description: string;
            alias: string;
            label: string;
            active: boolean;
            icon: string;
            parentId: number;
            childrenIds: number[];
            deleted: boolean;
            categoryFiltersId: number;
        };
    }>;
    search(req: Request): Promise<{
        message: string;
        success: boolean;
        data: {
            dataTable: {
                id: number;
                description: string;
                alias: string;
                label: string;
                active: boolean;
                icon: string;
                parentId: number;
                childrenIds: number[];
                deleted: boolean;
                categoryFiltersId: number;
            }[];
            paging: {
                page: number;
                pageSize: number;
            };
            totalCount: number;
        };
    }>;
    getCategoryDetail(req: Request): Promise<{
        message: string;
        success: boolean;
        data: {
            root: {
                CategoryFilters: {
                    id: number;
                    name: string;
                    description: string;
                    filters: import(".prisma/client").Prisma.JsonValue[];
                    createdAt: Date;
                    updatedAt: Date;
                    deleted: boolean;
                };
            } & {
                id: number;
                description: string;
                alias: string;
                label: string;
                active: boolean;
                icon: string;
                parentId: number;
                childrenIds: number[];
                deleted: boolean;
                categoryFiltersId: number;
            };
            children: any;
        };
    }>;
    updateFilter(updateFilterDto: UpdateFilterForCategoryDto): Promise<{
        message: string;
        success: boolean;
        data: {
            id: number;
            description: string;
            alias: string;
            label: string;
            active: boolean;
            icon: string;
            parentId: number;
            childrenIds: number[];
            deleted: boolean;
            categoryFiltersId: number;
        };
    }>;
}
