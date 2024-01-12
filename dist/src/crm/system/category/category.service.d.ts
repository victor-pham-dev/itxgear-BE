import { CreateCategoryDto, UpdateCategoryDto, UpdateCategoryFilterDto } from './category.dto';
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
    updateFilters(data: UpdateCategoryFilterDto): Promise<{
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
