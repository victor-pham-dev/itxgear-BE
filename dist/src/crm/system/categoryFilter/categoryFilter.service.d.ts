import { CreateCategoryFilterDto, UpdateCategoryFilterDto } from './categoryFilter.dto';
import { Request } from 'express';
import { PrismaService } from 'services/prisma.service';
export declare class CategoryFilterService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createDto: CreateCategoryFilterDto): Promise<{
        message: string;
        success: boolean;
        data: {
            id: number;
            name: string;
            description: string;
            filters: import(".prisma/client").Prisma.JsonValue[];
            createdAt: Date;
            updatedAt: Date;
            deleted: boolean;
        };
    }>;
    update(updateDto: UpdateCategoryFilterDto): Promise<{
        message: string;
        success: boolean;
        data: boolean;
    }>;
    get(req: Request): Promise<{
        message: string;
        success: boolean;
        data: {
            id: number;
            name: string;
            description: string;
            filters: import(".prisma/client").Prisma.JsonValue[];
            createdAt: Date;
            updatedAt: Date;
            deleted: boolean;
        };
    }>;
    search(req: Request): Promise<{
        message: string;
        success: boolean;
        data: {
            dataTable: {
                id: number;
                name: string;
                description: string;
                filters: import(".prisma/client").Prisma.JsonValue[];
                createdAt: Date;
                updatedAt: Date;
                deleted: boolean;
            }[];
            paging: {
                page: number;
                pageSize: number;
            };
            totalCount: number;
        };
    }>;
    delete(req: Request): Promise<{
        message: string;
        success: boolean;
        data: any;
    }>;
}
