import { CategoryService } from './category.service';
import { CreateCategoryDto, UpdateCategoryDto } from './category.dto';
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
            };
            children: any;
        };
    }>;
}
