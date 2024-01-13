import { CreateCategoryDto, UpdateCategoryDto, UpdateFilterForCategoryDto } from './category.dto';
import { Request } from 'express';
import { PrismaService } from 'services/prisma.service';
export declare class CategoryService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getSubcategories(parentId: number): any;
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
    delete(req: Request): Promise<{
        message: string;
        success: boolean;
        data: any;
    }>;
    updateAllChildrenFilter(categoryId: number, categoryFilterId: number): Promise<boolean>;
    updateFilters(updateFilterForCategory: UpdateFilterForCategoryDto): Promise<{
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
    getAllCategoryWithChildren(): Promise<{
        message: string;
        success: boolean;
        data: {
            children: any;
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
    }>;
}
